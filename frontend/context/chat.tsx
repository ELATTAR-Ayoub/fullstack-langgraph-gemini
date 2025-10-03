"use client";

// React/Next.js imports
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Internal imports - types
import { ChatRoom, ChatRoomsContextType } from "./types";

const ChatRoomsContext = createContext<ChatRoomsContextType | undefined>(
  undefined
);

/**
 * ChatRoomsProvider - Manages multiple chat rooms with localStorage persistence
 * Each chat room has its own messages, timeline, and activities
 */
export function ChatRoomsProvider({ children }: { children: React.ReactNode }) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentChatRoomId, setCurrentChatRoomId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  // Load saved chat rooms from localStorage on mount
  useEffect(() => {
    const savedChatRooms = localStorage.getItem("chatRooms");
    if (savedChatRooms) {
      try {
        const parsed = JSON.parse(savedChatRooms);
        setChatRooms(
          parsed.map((room: any) => ({
            ...room,
            createdAt: new Date(room.createdAt),
            updatedAt: new Date(room.updatedAt),
          }))
        );
      } catch (error) {
        console.error("Failed to parse saved chat rooms:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Auto-save chat rooms to localStorage when they change
  useEffect(() => {
    if (!isLoading && chatRooms.length > 0) {
      localStorage.setItem("chatRooms", JSON.stringify(chatRooms));
    }
  }, [chatRooms, isLoading]);

  // Handle URL-based navigation: /chat/[id] routes
  useEffect(() => {
    if (isLoading) return; // Don't run until we've loaded from localStorage

    const match = pathname.match(/^\/chat\/(.+)$/);
    if (match) {
      const roomId = match[1];
      setCurrentChatRoomId(roomId);

      // Create room if it doesn't exist (handles direct URL access)
      if (!chatRooms.find((room) => room.id === roomId)) {
        createChatRoom("New Chat", roomId);
      }
    }
  }, [pathname, chatRooms, router, isLoading]);

  // Create new chat room with unique ID
  const createChatRoom = (title?: string, id?: string): string => {
    const newId =
      id || `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newRoom: ChatRoom = {
      id: newId,
      title: title || `New Chat`,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
      processedEventsTimeline: [],
      historicalActivities: {},
    };

    setChatRooms((prev) => [...prev, newRoom]);
    return newId;
  };

  // Delete chat room and handle navigation
  const deleteChatRoom = (id: string) => {
    setChatRooms((prev) => prev.filter((room) => room.id !== id));

    if (currentChatRoomId === id) {
      const remaining = chatRooms.filter((room) => room.id !== id);
      if (remaining.length > 0) {
        const mostRecent = remaining.sort(
          (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
        )[0];
        router.push(`/chat/${mostRecent.id}`);
      } else {
        router.push("/");
      }
    }
  };

  // Navigate to specific chat room
  const switchToChatRoom = (id: string) => {
    router.push(`/chat/${id}`);
  };

  // Update chat room data (messages, timeline, activities, etc.)
  const updateChatRoom = (id: string, updates: Partial<ChatRoom>) => {
    setChatRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, ...updates, updatedAt: new Date() } : room
      )
    );
  };

  // Get current active chat room
  const getCurrentChatRoom = (): ChatRoom | null => {
    return chatRooms.find((room) => room.id === currentChatRoomId) || null;
  };

  const value: ChatRoomsContextType = {
    chatRooms,
    currentChatRoomId,
    createChatRoom,
    deleteChatRoom,
    switchToChatRoom,
    updateChatRoom,
    getCurrentChatRoom,
    isLoading, // Add loading state to context
  };

  return (
    <ChatRoomsContext.Provider value={value}>
      {children}
    </ChatRoomsContext.Provider>
  );
}

export function useChatRooms() {
  const context = useContext(ChatRoomsContext);
  if (context === undefined) {
    throw new Error("useChatRooms must be used within a ChatRoomsProvider");
  }
  return context;
}
