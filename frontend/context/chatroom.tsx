"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Message } from "@langchain/langgraph-sdk";
import { ChatRoom, ChatRoomsContextType, ProcessedEvent } from "./types";

const ChatRoomContext = createContext<ChatRoomsContextType | undefined>(
  undefined
);

/**
 * ChatRoomProvider - Manages multiple chat rooms with localStorage persistence
 * Each chat room maintains its own messages, timeline, and activities
 */
export function ChatRoomProvider({ children }: { children: React.ReactNode }) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);

  // Load saved chat rooms and current room from localStorage
  useEffect(() => {
    const savedRooms = localStorage.getItem("chatRooms");
    const savedCurrentRoomId = localStorage.getItem("currentRoomId");

    if (savedRooms) {
      const parsedRooms = JSON.parse(savedRooms);
      setChatRooms(parsedRooms);

      // Restore current room or default to first room
      if (
        savedCurrentRoomId &&
        parsedRooms.some((room: ChatRoom) => room.id === savedCurrentRoomId)
      ) {
        setCurrentRoomId(savedCurrentRoomId);
      } else if (parsedRooms.length > 0) {
        setCurrentRoomId(parsedRooms[0].id);
      }
    }
    // REMOVED: No longer automatically create initial room
    // This was causing automatic redirection on homepage
  }, []);

  // Auto-save chat rooms to localStorage
  useEffect(() => {
    if (chatRooms.length > 0) {
      localStorage.setItem("chatRooms", JSON.stringify(chatRooms));
    }
  }, [chatRooms]);

  // Auto-save current room ID to localStorage
  useEffect(() => {
    if (currentRoomId) {
      localStorage.setItem("currentRoomId", currentRoomId);
    }
  }, [currentRoomId]);

  // Create new chat room object with unique ID
  const createNewRoomObject = (): ChatRoom => {
    const now = new Date().toISOString();
    // More robust ID generation to prevent duplicates
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const uniqueId = `room_${timestamp}_${random}_${Math.floor(
      Math.random() * 1000
    )}`;

    return {
      id: uniqueId,
      title: "New Chat",
      createdAt: new Date(now),
      updatedAt: new Date(now),
      messages: [],
      processedEventsTimeline: [],
      historicalActivities: {},
    };
  };

  // Create new room and set as current
  const createNewRoom = (): string => {
    const newRoom = createNewRoomObject();

    // Check for duplicate IDs before adding
    setChatRooms((prev) => {
      const exists = prev.some((room) => room.id === newRoom.id);
      if (exists) {
        console.warn("Duplicate room ID detected, generating new one");
        const retryRoom = createNewRoomObject();
        return [...prev, retryRoom];
      }
      return [...prev, newRoom];
    });

    setCurrentRoomId(newRoom.id);
    return newRoom.id;
  };

  // Switch to specific chat room
  const switchToRoom = (roomId: string) => {
    if (chatRooms.some((room) => room.id === roomId)) {
      setCurrentRoomId(roomId);
    }
  };

  // Delete room (prevents deleting last room)
  const deleteRoom = (roomId: string) => {
    if (chatRooms.length <= 1) return; // Don't delete the last room

    setChatRooms((prev) => prev.filter((room) => room.id !== roomId));

    if (currentRoomId === roomId) {
      const remainingRooms = chatRooms.filter((room) => room.id !== roomId);
      if (remainingRooms.length > 0) {
        setCurrentRoomId(remainingRooms[0].id);
      }
    }
  };

  // Update room title
  const updateRoomTitle = (roomId: string, title: string) => {
    setChatRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, title, updatedAt: new Date() } : room
      )
    );
  };

  // Update room messages
  const updateRoomMessages = (roomId: string, messages: Message[]) => {
    setChatRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, messages, updatedAt: new Date() } : room
      )
    );
  };

  // Update room processing events timeline
  const updateRoomEvents = (roomId: string, events: ProcessedEvent[]) => {
    setChatRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              processedEventsTimeline: events,
              updatedAt: new Date(),
            }
          : room
      )
    );
  };

  // Update room historical activities
  const updateRoomHistoricalActivities = (
    roomId: string,
    activities: Record<string, ProcessedEvent[]>
  ) => {
    setChatRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              historicalActivities: activities,
              updatedAt: new Date(),
            }
          : room
      )
    );
  };

  // Get current active room
  const currentRoom =
    chatRooms.find((room) => room.id === currentRoomId) || null;

  const value: ChatRoomsContextType = {
    chatRooms,
    currentChatRoomId: currentRoomId,
    createChatRoom: createNewRoom,
    deleteChatRoom: deleteRoom,
    switchToChatRoom: switchToRoom,
    updateChatRoom: (id: string, updates: Partial<ChatRoom>) => {
      setChatRooms((prev) =>
        prev.map((room) =>
          room.id === id ? { ...room, ...updates, updatedAt: new Date() } : room
        )
      );
    },
    getCurrentChatRoom: () => currentRoom,
  };

  return (
    <ChatRoomContext.Provider value={value}>
      {children}
    </ChatRoomContext.Provider>
  );
}

export function useChatRoom() {
  const context = useContext(ChatRoomContext);
  if (context === undefined) {
    throw new Error("useChatRoom must be used within a ChatRoomProvider");
  }
  return context;
}
