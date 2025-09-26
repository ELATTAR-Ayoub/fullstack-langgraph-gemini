"use client";

import { useStream } from "@langchain/langgraph-sdk/react";
import type { Message } from "@langchain/langgraph-sdk";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ProcessedEvent,
  BackendResponseEvent,
  LoggedBackendResponseEvent,
  LoggedBackendError,
  ThreadStateUpdate,
  LoggedBackendRequest,
  LoggedCancelRequest,
  ChatThread,
  WelcomeScreenProps,
  InputBarProps,
  ChatMessagesViewProps,
} from "@/context";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ChatMessagesView } from "@/components/ChatMessagesView";
import { InputBar } from "@/components/InputBar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "@/styles";
import { SettingsIcon } from "lucide-react";
import SplitText from "@/components/gsap/SplitText";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeModeButton } from "@/components/ThemeModeButton";

// Configuration objects for easy editing
const SEARCH_DEPTH_OPTIONS = {
  low: {
    value: "low",
    label: "Low - Quick search (1 query, 1 loop)",
    initialSearchQueryCount: 1,
    maxResearchLoops: 1,
  },
  medium: {
    value: "medium",
    label: "Medium - Balanced search (3 queries, 3 loops)",
    initialSearchQueryCount: 3,
    maxResearchLoops: 3,
  },
  high: {
    value: "high",
    label: "High - Comprehensive search (5 queries, 10 loops)",
    initialSearchQueryCount: 5,
    maxResearchLoops: 10,
  },
} as const;

const REASONING_MODELS = {
  "gemini-2.5-flash": {
    value: "gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    disabled: false,
  },
} as const;

export default function ChatSection() {
  // UI
  const [selectedModel, setSelectedModel] =
    useState<string>("gemini-2.5-flash");
  const [selectedEffort, setSelectedEffort] = useState<string>("medium");
  const [suggestionText, setSuggestionText] = useState<string>("");
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] =
    useState<boolean>(false);

  // Data
  const [processedEventsTimeline, setProcessedEventsTimeline] = useState<
    ProcessedEvent[]
  >([]);
  const [historicalActivities, setHistoricalActivities] = useState<
    Record<string, ProcessedEvent[]>
  >({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasFinalizeEventOccurredRef = useRef<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const thread = useStream<ChatThread>({
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:2024"
        : "http://localhost:8123",
    assistantId: "agent",
    messagesKey: "messages",
    onUpdateEvent: (event: BackendResponseEvent) => {
      // 🔍 LOGGING: Backend Response Event
      const loggedEvent: LoggedBackendResponseEvent = {
        timestamp: new Date().toISOString(),
        eventType: Object.keys(event)[0],
        fullEvent: event,
        eventDetails: {
          generate_query: event.generate_query,
          web_research: event.web_research,
          reflection: event.reflection,
          finalize_answer: event.finalize_answer,
        },
      };
      console.log("🔄 BACKEND RESPONSE EVENT:", loggedEvent);

      let processedEvent: ProcessedEvent | null = null;
      if (event.generate_query) {
        processedEvent = {
          title: "Generating Search Queries",
          data: event.generate_query?.search_query?.join(", ") || "",
        };
      } else if (event.web_research) {
        const sources = event.web_research.sources_gathered || [];
        const numSources = sources.length;
        const uniqueLabels = [
          ...new Set(sources.map((s: any) => s.label).filter(Boolean)),
        ];
        const exampleLabels = uniqueLabels.slice(0, 3).join(", ");
        processedEvent = {
          title: "Web Research",
          data: `Gathered ${numSources} sources. Related to: ${
            exampleLabels || "N/A"
          }.`,
        };
      } else if (event.reflection) {
        processedEvent = {
          title: "Reflection",
          data: "Analysing Web Research Results",
        };
      } else if (event.finalize_answer) {
        processedEvent = {
          title: "Finalizing Answer",
          data: "Composing and presenting the final answer.",
        };
        hasFinalizeEventOccurredRef.current = true;
      }
      if (processedEvent) {
        setProcessedEventsTimeline((prevEvents) => [
          ...prevEvents,
          processedEvent!,
        ]);
      }
    },
    onError: (error: any) => {
      // 🔍 LOGGING: Backend Error
      const loggedError: LoggedBackendError = {
        timestamp: new Date().toISOString(),
        error: error,
        errorMessage: error.message,
        errorStack: error.stack,
      };
      console.error("❌ BACKEND ERROR:", loggedError);
      setError(error.message);
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [thread.messages]);

  useEffect(() => {
    if (
      hasFinalizeEventOccurredRef.current &&
      !thread.isLoading &&
      thread.messages.length > 0
    ) {
      const lastMessage = thread.messages[thread.messages.length - 1];
      if (lastMessage && lastMessage.type === "ai" && lastMessage.id) {
        setHistoricalActivities((prev) => ({
          ...prev,
          [lastMessage.id!]: [...processedEventsTimeline],
        }));
      }
      hasFinalizeEventOccurredRef.current = false;
    }
  }, [thread.messages, thread.isLoading, processedEventsTimeline]);

  const handleSubmit = useCallback(
    (submittedInputValue: string, effort: string, model: string) => {
      if (!submittedInputValue.trim()) return;
      setProcessedEventsTimeline([]);
      hasFinalizeEventOccurredRef.current = false;

      // Get effort configuration from the object
      const effortConfig =
        SEARCH_DEPTH_OPTIONS[effort as keyof typeof SEARCH_DEPTH_OPTIONS];
      const initial_search_query_count = effortConfig.initialSearchQueryCount;
      const max_research_loops = effortConfig.maxResearchLoops;

      const newMessages: Message[] = [
        ...(thread.messages || []),
        {
          type: "human",
          content: submittedInputValue,
          id: Date.now().toString(),
        },
      ];

      // 🔍 LOGGING: Data being sent to backend
      const payloadToBackend: LoggedBackendRequest = {
        timestamp: new Date().toISOString(),
        apiUrl:
          process.env.NODE_ENV === "development"
            ? "http://localhost:2024"
            : "http://localhost:8123",
        assistantId: "agent",
        payload: {
          messages: newMessages,
          initial_search_query_count: initial_search_query_count,
          max_research_loops: max_research_loops,
          reasoning_model: model,
        },
        userInput: {
          submittedInputValue,
          effort,
          model,
          effortMapping: {
            effort,
            initial_search_query_count,
            max_research_loops,
          },
        },
        messagesCount: newMessages.length,
        lastMessage: newMessages[newMessages.length - 1],
      };

      console.log("�� SENDING TO BACKEND:", payloadToBackend);
      thread.submit(payloadToBackend.payload);
    },
    [thread]
  );

  const handleCancel = useCallback(() => {
    // 🔍 LOGGING: Cancel request
    const cancelRequest: LoggedCancelRequest = {
      timestamp: new Date().toISOString(),
      action: "stop_and_reload",
    };
    console.log("🛑 CANCELING REQUEST:", cancelRequest);
    thread.stop();
    window.location.reload();
  }, [thread]);

  // 🔍 LOGGING: Thread state changes
  useEffect(() => {
    const threadStateUpdate: ThreadStateUpdate = {
      timestamp: new Date().toISOString(),
      isLoading: thread.isLoading,
      messagesCount: thread.messages.length,
      hasError: !!error,
      currentMessages: thread.messages.map((msg) => ({
        type: msg.type,
        id: msg.id,
        content: msg.content + (msg.content?.length > 100 ? "..." : ""),
      })),
    };
    console.log("📊 THREAD STATE UPDATE:", threadStateUpdate);
  }, [thread.isLoading, thread.messages, error]);

  const handleSuggestionClick = (text: string) => {
    setSuggestionText(text);
  };

  const handleSaveSettings = () => {
    setIsSettingsDialogOpen(false);
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-between relative overflow-hidden",
        styles.GoodChildDimensions
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex justify-between items-center ",
          styles.headerPadding
        )}
      >
        {/* left side - Theme Switcher */}
        <ThemeModeButton />

        {/* right side - Settings Dialog */}
        <Dialog
          open={isSettingsDialogOpen}
          onOpenChange={setIsSettingsDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="ghost">
              <SettingsIcon />
              <span>Control</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Search Settings</DialogTitle>
              <DialogDescription>
                Configure the search effort and reasoning model for your
                queries.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="model">Reasoning Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(REASONING_MODELS).map((model) => (
                      <SelectItem
                        key={model.value}
                        value={model.value}
                        disabled={model.disabled}
                      >
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="effort">Search Effort</Label>
                <Select
                  value={selectedEffort}
                  onValueChange={setSelectedEffort}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select effort level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(SEARCH_DEPTH_OPTIONS).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Chat Area */}
      <div className={cn("h-full w-full relative flex-col overflow-y-auto  ")}>
        {/* welcome message and Message View */}
        {thread.messages.length === 0 && !thread.isLoading ? (
          <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-2xl text-red-400 font-bold">Error</h1>
              <p className="text-red-400">{JSON.stringify(error)}</p>

              <Button
                variant="destructive"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <ChatMessagesView
            messages={thread.messages}
            isLoading={thread.isLoading}
            scrollAreaRef={scrollAreaRef}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            liveActivityEvents={processedEventsTimeline}
            historicalActivities={historicalActivities}
          />
        )}
      </div>

      {/* Input Bar */}
      <InputBar
        onSubmit={handleSubmit}
        isLoading={thread.isLoading}
        onCancel={handleCancel}
        selectedModel={selectedModel}
        selectedEffort={selectedEffort}
        onModelChange={setSelectedModel}
        onEffortChange={setSelectedEffort}
        suggestionText={suggestionText}
      />
    </div>
  );
}
