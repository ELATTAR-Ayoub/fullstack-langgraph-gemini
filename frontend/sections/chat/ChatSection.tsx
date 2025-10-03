"use client";

// React/Next.js imports
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// Third-party library imports
import { useStream } from "@langchain/langgraph-sdk/react";
import type { Message } from "@langchain/langgraph-sdk";
import {
  PlusIcon,
  SettingsIcon,
  Trash2Icon,
  AlertTriangle,
} from "lucide-react";

// Internal imports - context
import {
  ProcessedEvent,
  BackendResponseEvent,
  LoggedBackendResponseEvent,
  LoggedBackendError,
  ThreadStateUpdate,
  LoggedBackendRequest,
  LoggedCancelRequest,
  ChatThread,
} from "@/context";
import { useChatRooms } from "@/context";

// Internal imports - utilities
import { cn } from "@/lib/utils";

// Internal imports - styles
import styles from "@/styles";

// Internal imports - components
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ChatMessagesView } from "@/components/ChatMessagesView";
import { InputBar } from "@/components/InputBar";
import { ThemeModeButton } from "@/components/ThemeModeButton";
import { Button } from "@/components/ui/button";
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
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

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

interface ChatSectionProps {
  chatId: string;
  initialMessage?: string | null;
}

export default function ChatSection({
  chatId,
  initialMessage,
}: ChatSectionProps) {
  // Chat rooms context
  const {
    getCurrentChatRoom,
    updateChatRoom,
    createChatRoom,
    deleteChatRoom,
    chatRooms,
  } = useChatRooms();
  const router = useRouter();

  // UI
  const [selectedModel, setSelectedModel] =
    useState<string>("gemini-2.5-flash");
  const [selectedEffort, setSelectedEffort] = useState<string>("medium");
  const [suggestionText, setSuggestionText] = useState<string>("");
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] =
    useState<boolean>(false);
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] =
    useState<boolean>(false);

  // Data - now managed per chat room
  const currentRoom = getCurrentChatRoom();
  const [processedEventsTimeline, setProcessedEventsTimeline] = useState<
    ProcessedEvent[]
  >([]);
  const [historicalActivities, setHistoricalActivities] = useState<
    Record<string, ProcessedEvent[]>
  >({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasFinalizeEventOccurredRef = useRef<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when chat room changes
  useEffect(() => {
    if (currentRoom) {
      setProcessedEventsTimeline(currentRoom.processedEventsTimeline || []);
      setHistoricalActivities(currentRoom.historicalActivities || {});
      setError(null);
      hasFinalizeEventOccurredRef.current = false;
    } else {
      // Clear state if no current room
      setProcessedEventsTimeline([]);
      setHistoricalActivities({});
      setError(null);
      hasFinalizeEventOccurredRef.current = false;
    }
  }, [currentRoom?.id]);

  // Set initial suggestion text from URL parameter
  useEffect(() => {
    if (initialMessage) {
      setSuggestionText(initialMessage);
    }
  }, [initialMessage]);

  // Stable update function to prevent infinite loops
  const updateChatRoomStable = useCallback(
    (id: string, updates: any) => {
      updateChatRoom(id, updates);
    },
    [updateChatRoom]
  );

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
        setProcessedEventsTimeline((prevEvents) => {
          const newEvents = [...prevEvents, processedEvent!];
          // Defer the chat room update to avoid render cycle issues
          setTimeout(() => {
            if (currentRoom) {
              updateChatRoomStable(currentRoom.id, {
                processedEventsTimeline: newEvents,
              });
            }
          }, 0);
          return newEvents;
        });
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

  // Update chat room with thread messages when they change
  useEffect(() => {
    if (currentRoom && thread.messages.length > 0) {
      // Only update if the messages are different to avoid infinite loops
      const currentMessages = currentRoom.messages;
      const threadMessages = thread.messages;

      if (JSON.stringify(currentMessages) !== JSON.stringify(threadMessages)) {
        // Defer the update to avoid render cycle issues
        setTimeout(() => {
          updateChatRoomStable(currentRoom.id, { messages: threadMessages });
        }, 0);
      }
    }
  }, [thread.messages, currentRoom?.id, updateChatRoomStable]);

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
        const newHistoricalActivities = {
          ...historicalActivities,
          [lastMessage.id!]: [...processedEventsTimeline],
        };
        setHistoricalActivities(newHistoricalActivities);

        // Defer the chat room update to avoid render cycle issues
        setTimeout(() => {
          if (currentRoom) {
            updateChatRoomStable(currentRoom.id, {
              historicalActivities: newHistoricalActivities,
            });
          }
        }, 0);
      }
      hasFinalizeEventOccurredRef.current = false;
    }
  }, [
    thread.messages,
    thread.isLoading,
    processedEventsTimeline,
    historicalActivities,
    currentRoom?.id,
    updateChatRoomStable,
  ]);

  const handleSubmit = useCallback(
    (submittedInputValue: string, effort: string, model: string) => {
      if (!submittedInputValue.trim()) return;

      // Clear the timeline for the new message
      setProcessedEventsTimeline([]);
      hasFinalizeEventOccurredRef.current = false;

      // Get effort configuration from the object
      const effortConfig =
        SEARCH_DEPTH_OPTIONS[effort as keyof typeof SEARCH_DEPTH_OPTIONS];
      const initial_search_query_count = effortConfig.initialSearchQueryCount;
      const max_research_loops = effortConfig.maxResearchLoops;

      const newMessages: Message[] = [
        ...(currentRoom?.messages || []),
        {
          type: "human",
          content: submittedInputValue,
          id: Date.now().toString(),
        },
      ];

      // Update chat room title if it's the first message and still default
      if (
        currentRoom &&
        currentRoom.messages.length === 0 &&
        currentRoom.title === "New Chat"
      ) {
        const title =
          submittedInputValue.length > 50
            ? submittedInputValue.substring(0, 50) + "..."
            : submittedInputValue;
        // Defer the update to avoid render cycle issues
        setTimeout(() => {
          updateChatRoomStable(currentRoom.id, { title });
        }, 0);
      }

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

      console.log("📤 SENDING TO BACKEND:", payloadToBackend);
      thread.submit(payloadToBackend.payload);

      // Update chat room with new messages
      if (currentRoom) {
        // Defer the update to avoid render cycle issues
        setTimeout(() => {
          updateChatRoomStable(currentRoom.id, { messages: newMessages });
        }, 0);
      }
    },
    [thread, currentRoom?.id, updateChatRoomStable]
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

  const handleNewChat = () => {
    const newRoomId = createChatRoom();
    router.push(`/chat/${newRoomId}`);
  };

  // Handle delete all chats
  const handleDeleteAllChats = () => {
    // Clear localStorage completely first
    localStorage.removeItem("chatRooms");
    localStorage.removeItem("currentRoomId");

    // Close dialogs
    setIsDeleteAllDialogOpen(false);
    setIsSettingsDialogOpen(false);

    // Refresh the page to reset everything
    window.location.reload();
  };

  // Add sidebar state
  const sidebarState = useSidebar();
  const { openMobile, isMobile, open, state } = sidebarState;

  // If no current room, show loading
  if (!currentRoom) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2>Loading chat room...</h2>
        </div>
      </div>
    );
  }

  // Use current room messages for display, fallback to thread messages
  const displayMessages =
    currentRoom.messages.length > 0 ? currentRoom.messages : thread.messages;

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
          "flex justify-between items-center md:!pt-4 ",
          styles.chatHeaderPadding
        )}
      >
        {/* left side - Theme Switcher */}
        <div className="flex items-center gap-2 ">
          <div
            className={cn(
              "flex items-center gap-2  rounded-full h-full md:px-2 md:bg-muted/50",
              // Only show on mobile when sidebar is closed
              !isMobile && open && "hidden"
            )}
          >
            <SidebarTrigger />
            <Button
              variant="ghost"
              className="hidden md:flex"
              onClick={handleNewChat}
            >
              <PlusIcon />
              <span>New chat</span>
            </Button>
          </div>
          <ThemeModeButton />
        </div>

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
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Settings & Controls</DialogTitle>
              <DialogDescription>
                Configure search settings and manage your chat data.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* Search Settings */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="model">Reasoning Model</Label>
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                  >
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

              <Separator />

              {/* Data Management */}
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Chat Rooms</p>
                  <p className="text-xs text-muted-foreground">
                    {chatRooms.length} chat room
                    {chatRooms.length !== 1 ? "s" : ""} stored
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteAllDialogOpen(true)}
                >
                  <Trash2Icon className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
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

        {/* Delete All Chats Dialog */}
        <Dialog
          open={isDeleteAllDialogOpen}
          onOpenChange={setIsDeleteAllDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Delete All Chats
              </DialogTitle>
              <DialogDescription className="text-destructive/80">
                <strong>This action cannot be undone.</strong> This will
                permanently delete all your chat rooms, messages, and clear all
                stored data from your browser.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-destructive">
                      You are about to delete:
                    </p>
                    <ul className="text-sm text-destructive/80 space-y-1">
                      <li>
                        • {chatRooms.length} chat room
                        {chatRooms.length !== 1 ? "s" : ""}
                      </li>
                      <li>• All conversation history</li>
                      <li>• All AI processing timelines</li>
                      <li>• All stored data in this browser</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteAllDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAllChats}
                className="bg-destructive hover:bg-destructive/90"
              >
                <Trash2Icon className="h-4 w-4 mr-2" />
                Delete All Chats
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Chat Area */}
      <div className={cn("h-full w-full relative flex-col overflow-y-auto  ")}>
        {/* welcome message and Message View */}
        {displayMessages.length === 0 && !thread.isLoading ? (
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
            messages={displayMessages}
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
