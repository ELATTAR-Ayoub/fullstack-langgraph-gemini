// types/logging.ts

import { Message } from "@langchain/langgraph-sdk";

// Source structure for web research events
export interface WebResearchSource {
  label?: string;
  url?: string;
  title?: string;
  content?: string;
  // Add other properties as needed based on actual source structure
}

// Generate Query Event
export interface GenerateQueryEvent {
  search_query?: string[];
}

// Web Research Event
export interface WebResearchEvent {
  sources_gathered?: WebResearchSource[];
}

// Reflection Event (seems to be a simple flag/trigger)
export interface ReflectionEvent {
  // This appears to be a trigger event without specific data
  [key: string]: any;
}

// Finalize Answer Event (seems to be a simple flag/trigger)
export interface FinalizeAnswerEvent {
  // This appears to be a trigger event without specific data
  [key: string]: any;
}

// Main Backend Response Event
export interface BackendResponseEvent {
  generate_query?: GenerateQueryEvent;
  web_research?: WebResearchEvent;
  reflection?: ReflectionEvent;
  finalize_answer?: FinalizeAnswerEvent;
}

// Logged Backend Response Event Structure
export interface LoggedBackendResponseEvent {
  timestamp: string;
  eventType: string;
  fullEvent: BackendResponseEvent;
  eventDetails: {
    generate_query?: GenerateQueryEvent;
    web_research?: WebResearchEvent;
    reflection?: ReflectionEvent;
    finalize_answer?: FinalizeAnswerEvent;
  };
}

// Simplified message structure for logging
export interface LoggedMessage {
  type: string;
  id?: string;
  content?: string;
  timestamp?: string;
}

// Thread State Update Structure
export interface ThreadStateUpdate {
  timestamp: string;
  isLoading: boolean;
  messagesCount: number;
  hasError: boolean;
  currentMessages: LoggedMessage[];
}

// Additional logging types for completeness
export interface LoggedBackendError {
  timestamp: string;
  error: any;
  errorMessage: string;
  errorStack?: string;
}

export interface LoggedCancelRequest {
  timestamp: string;
  action: string;
}

export interface LoggedBackendRequest {
  timestamp: string;
  apiUrl: string;
  assistantId: string;
  payload: {
    messages: any[];
    initial_search_query_count: number;
    max_research_loops: number;
    reasoning_model: string;
  };
  userInput: {
    submittedInputValue: string;
    effort: string;
    model: string;
    effortMapping: {
      effort: string;
      initial_search_query_count: number;
      max_research_loops: number;
    };
  };
  messagesCount: number;
  lastMessage: any;
}

// Chat and UI related types
// Update ChatMessage to match LangGraph SDK exactly
export interface ChatMessage {
  type: "human" | "ai" | "system";
  content: string | MessageContentComplex[];
  id?: string;
  timestamp?: string;
}

// Add LangGraph's MessageContentComplex type
export interface MessageContentComplex {
  type: "text" | "image" | "tool_use" | "tool_result";
  text?: string;
  image_url?: string;
  tool_use?: any;
  tool_result?: any;
}

export interface ProcessedEvent {
  title: string;
  data: any;
}

// Update ChatThread to use LangGraph's Message type directly
export interface ChatThread extends Record<string, unknown> {
  messages: Message[]; // Use LangGraph's Message type
  initial_search_query_count: number;
  max_research_loops: number;
  reasoning_model: string;
}

// Component Props Types
export interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

export interface InputBarProps {
  onSubmit: (inputValue: string, effort: string, model: string) => void;
  isLoading: boolean;
  onCancel: () => void;
  selectedModel: string;
  selectedEffort: string;
  onModelChange: (model: string) => void;
  onEffortChange: (effort: string) => void;
  suggestionText?: string;
  className?: string;
}

// Update ChatMessagesViewProps to use LangGraph's Message type
export interface ChatMessagesViewProps {
  messages: Message[]; // Use LangGraph's Message type
  isLoading: boolean;
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  onSubmit: (inputValue: string, effort: string, model: string) => void;
  onCancel: () => void;
  liveActivityEvents: ProcessedEvent[];
  historicalActivities: Record<string, ProcessedEvent[]>;
}

// Model and Effort Types
export interface ModelOption {
  value: string;
  label: string;
}

export interface EffortOption {
  value: "low" | "medium" | "high";
  label: string;
}

// Suggestion Types
export interface SuggestionExample {
  id: number;
  text: string;
  icon: React.ComponentType<any>;
  color: string;
  iconColor: string;
  borderColor: string;
}

// State Management Types
export interface ChatState {
  processedEventsTimeline: ProcessedEvent[];
  historicalActivities: Record<string, ProcessedEvent[]>;
  selectedModel: string;
  selectedEffort: string;
  suggestionText: string;
  error: string | null;
  isLoading: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Environment Types
export interface EnvironmentConfig {
  apiUrl: string;
  assistantId: string;
  isDevelopment: boolean;
}

// Theme Types
export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "light" | "dark"; // The resolved theme (system resolves to light/dark)
}

// Chat Room Types
export interface ChatRoom {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  processedEventsTimeline: ProcessedEvent[];
  historicalActivities: Record<string, ProcessedEvent[]>;
}

export interface ChatRoomsContextType {
  chatRooms: ChatRoom[];
  currentChatRoomId: string | null;
  createChatRoom: (title?: string) => string;
  deleteChatRoom: (id: string) => void;
  switchToChatRoom: (id: string) => void;
  updateChatRoom: (id: string, updates: Partial<ChatRoom>) => void;
  getCurrentChatRoom: () => ChatRoom | null;
  isLoading: boolean; // Add loading state
}
