import type React from "react";
import type { Message } from "@langchain/langgraph-sdk";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Copy, CopyCheck, CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProcessedEvent, ChatMessagesViewProps } from "@/context";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import styles from "@/styles";
import Image from "next/image";
import BubbleTail from "../public/svg/BubbleTail";
import CopyButton from "./micro/CopyButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import BlurText from "./gsap/BlurText";

// Type definition for markdown component props - used for custom markdown rendering
type MdComponentProps = {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
};

// Handles copying code to clipboard and shows visual feedback when copied
const SyntaxHighlighterWithCopy: React.FC<{
  language: string;
  children: string;
  [key: string]: any;
}> = ({ language, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  // Remove trailing newline from code content for cleaner display
  const codeContent = String(children).replace(/\n$/, "");

  // Handles copying code content to clipboard with success feedback
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group max-w-full w-full h-full overflow-x-auto">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        className="rounded-xl my-3"
        PreTag="div"
        customStyle={{
          margin: 0,
          maxWidth: "100%",
          overflow: "auto",
        }}
        {...props}
      >
        {codeContent}
      </SyntaxHighlighter>
      <CopyButton
        content={codeContent}
        messageId={`code-${Date.now()}`} // Generate unique ID for code blocks
        onCopy={handleCopy}
        copiedMessageId={copied ? `code-${Date.now()}` : null}
        className="absolute top-2 right-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
        variant="outline"
        size="icon"
      />
    </div>
  );
};

// Custom markdown components configuration for rendering chat messages
// Provides styled components for all markdown elements with consistent theming
const mdComponents = {
  h1: ({ className, children, ...props }: MdComponentProps) => (
    <h1 className={cn(styles.H1, className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }: MdComponentProps) => (
    <h2 className={cn(styles.H2, className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }: MdComponentProps) => (
    <h3 className={cn(styles.H3, className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ className, children, ...props }: MdComponentProps) => (
    <h4 className={cn(styles.H4, className)} {...props}>
      {children}
    </h4>
  ),
  p: ({ className, children, ...props }: MdComponentProps) => (
    <p className={cn(styles.p, className)} {...props}>
      {children}
    </p>
  ),
  a: ({ className, children, href, ...props }: MdComponentProps) => {
    return (
      <Badge className="mx-0.5 bg-secondary/50 border-muted-foreground/25">
        <a
          className={cn(
            "text-blue-500 hover:text-blue-400 hover:underline",
            className
          )}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      </Badge>
    );
  },
  ul: ({ className, children, ...props }: MdComponentProps) => (
    <ul className={cn(styles.list, "list-disc")} {...props}>
      {children}
    </ul>
  ),
  ol: ({ className, children, ordered, ...props }: MdComponentProps) => (
    <ol className={cn(styles.list, "list-decimal", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ className, children, ...props }: MdComponentProps) => (
    <li className={cn(styles.list, className)} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ className, children, ...props }: MdComponentProps) => (
    <blockquote className={cn(styles.blockquote, className)} {...props}>
      {children}
    </blockquote>
  ),
  // Code elements - handles both inline code and code blocks with syntax highlighting
  code: ({ className, children, ...props }: MdComponentProps) => {
    // Check if this is a code block (has language specified)
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      // Render as syntax-highlighted code block with copy functionality
      <SyntaxHighlighterWithCopy language={match[1]} {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighterWithCopy>
    ) : (
      // Render as inline code with special styling
      <code className={cn(styles.inlineCode, className)} {...props}>
        {children}
      </code>
    );
  },
  // Pre-formatted text blocks with background and border styling
  pre: ({ className, children, ...props }: MdComponentProps) => (
    <pre
      className={cn(
        "bg-primary/5 border border-muted-foreground/10 p-3 rounded-lg text-xs my-3 w-full max-w-[calc(100vw-64px)] whitespace-pre-wrap break-words",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  ),
  hr: ({ className, ...props }: MdComponentProps) => (
    <hr className={cn("border-muted my-4", className)} {...props} />
  ),
  table: ({ className, children, ...props }: MdComponentProps) => (
    <div className="my-3 overflow-x-auto">
      <table className={cn(styles.table, className)} {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ className, children, ...props }: MdComponentProps) => (
    <th className={cn(styles.tableHead, className)} {...props}>
      {children}
    </th>
  ),
  td: ({ className, children, ...props }: MdComponentProps) => (
    <td className={cn(styles.tableCell, className)} {...props}>
      {children}
    </td>
  ),
};

// Extracts plain text from markdown content by removing all formatting
// Used for copying message content without markdown syntax
const extractPlainText = (content: string): string => {
  // First convert URLs to links, then extract plain text

  return content
    .replace(/#{1,6}\s+/g, "") // Remove headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/`(.*?)`/g, "$1") // Remove inline code
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
    .replace(/^\s*[-*+]\s+/gm, "") // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, "") // Remove numbered list markers
    .replace(/\n{3,}/g, "\n\n") // Replace multiple newlines with double
    .trim();
};

// Props interface for human message bubble component
interface HumanMessageBubbleProps {
  message: Message;
  mdComponents: typeof mdComponents;
  handleCopy: (text: string, messageId: string) => void;
  copiedMessageId: string | null;
}

// Component that renders human user messages with bubble styling and copy functionality
const HumanMessageBubble: React.FC<HumanMessageBubbleProps> = ({
  message,
  mdComponents,
  handleCopy,
  copiedMessageId,
}) => {
  return (
    <div
      className={` relative bg-primary text-secondary break-words min-h-7 max-w-[100%] sm:max-w-[90%] px-4 py-3 rounded-3xl mb-16 `}
    >
      <ReactMarkdown components={mdComponents}>
        {typeof message.content === "string"
          ? message.content
          : JSON.stringify(message.content)}
      </ReactMarkdown>
      <BubbleTail className="absolute bottom-0 right-[1px] text-primary" />

      {/* Copy Button for human messages */}
      <CopyButton
        content={
          typeof message.content === "string"
            ? message.content
            : JSON.stringify(message.content)
        }
        messageId={message.id!}
        onCopy={handleCopy}
        copiedMessageId={copiedMessageId}
        className={` absolute -bottom-12 right-0 ${
          message.content.length > 0 ? "visible" : "hidden"
        }`}
      />
    </div>
  );
};

// Props interface for AI message bubble component
interface AiMessageBubbleProps {
  message: Message;
  historicalActivity: ProcessedEvent[] | undefined;
  liveActivity: ProcessedEvent[] | undefined;
  isLastMessage: boolean;
  isOverallLoading: boolean;
  mdComponents: typeof mdComponents;
  handleCopy: (text: string, messageId: string) => void;
  copiedMessageId: string | null;
}

// AiMessageBubble Component
const AiMessageBubble: React.FC<AiMessageBubbleProps> = ({
  message,
  historicalActivity,
  liveActivity,
  isLastMessage,
  isOverallLoading,
  mdComponents,
  handleCopy,
  copiedMessageId,
}) => {
  // Determine which activity events to show based on message state
  // Shows live activity for the last message when loading, otherwise shows historical activity
  const activityForThisBubble =
    isLastMessage && isOverallLoading ? liveActivity : historicalActivity;
  const isLiveActivityForThisBubble = isLastMessage && isOverallLoading;

  return (
    <div className={`relative break-words flex flex-col mb-12`}>
      {/* Activity timeline showing AI processing steps */}
      {activityForThisBubble && activityForThisBubble.length > 0 && (
        <ActivityTimeline
          processedEvents={activityForThisBubble}
          isLoading={isLiveActivityForThisBubble}
        />
      )}
      <ReactMarkdown components={mdComponents}>
        {typeof message.content === "string"
          ? message.content
          : JSON.stringify(message.content)}
      </ReactMarkdown>
      {/* Copy Button for AI messages */}
      <CopyButton
        content={extractPlainText(
          typeof message.content === "string"
            ? message.content
            : JSON.stringify(message.content)
        )}
        messageId={message.id!}
        onCopy={handleCopy}
        copiedMessageId={copiedMessageId}
        className={`${
          message.content.length > 0 && !(isLastMessage && isOverallLoading)
            ? "visible"
            : "hidden"
        } absolute -bottom-8 left-0`}
      />
    </div>
  );
};

// Main component that renders the chat messages view with scrollable area and message handling
export function ChatMessagesView({
  messages,
  isLoading,
  scrollAreaRef,
  onSubmit,
  onCancel,
  liveActivityEvents,
  historicalActivities,
}: ChatMessagesViewProps) {
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  // Handles copying message content to clipboard with visual feedback
  const handleCopy = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col h-full w-full ">
      <ScrollArea
        className="flex-1 overflow-y-auto w-full "
        ref={scrollAreaRef}
      >
        <div
          className={cn(
            styles.padding,
            " w-full space-y-2 max-w-4xl mx-auto pt-16 pb-[124px] md:pb-[124px] lg:pb-[124px]"
          )}
        >
          {/* Render all messages with appropriate bubble components */}
          {messages.map((message, index) => {
            const isLast = index === messages.length - 1;
            return (
              <div key={message.id || `msg-${index}`} className="space-y-3">
                <div
                  className={`flex items-start gap-3 ${
                    message.type === "human" ? "justify-end" : ""
                  }`}
                >
                  {message.type === "human" ? (
                    <HumanMessageBubble
                      message={message}
                      mdComponents={mdComponents}
                      handleCopy={handleCopy}
                      copiedMessageId={copiedMessageId}
                    />
                  ) : (
                    <AiMessageBubble
                      message={message}
                      historicalActivity={historicalActivities[message.id!]}
                      liveActivity={liveActivityEvents} // Pass global live events
                      isLastMessage={isLast}
                      isOverallLoading={isLoading} // Pass global loading state
                      mdComponents={mdComponents}
                      handleCopy={handleCopy}
                      copiedMessageId={copiedMessageId}
                    />
                  )}
                </div>
              </div>
            );
          })}
          {/* Loading indicator when AI is processing a response */}
          {isLoading &&
            (messages.length === 0 ||
              messages[messages.length - 1].type === "human") && (
              <div className="flex items-start gap-3 mt-3">
                {" "}
                {/* AI message row structure */}
                <div className="relative group w-full break-words text-primary ">
                  {liveActivityEvents.length > 0 ? (
                    <ActivityTimeline
                      processedEvents={liveActivityEvents}
                      isLoading={true}
                    />
                  ) : (
                    <div className="flex items-center justify-start h-full">
                      <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </ScrollArea>
    </div>
  );
}
