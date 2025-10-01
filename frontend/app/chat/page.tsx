"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChatRooms } from "@/context";

export default function ChatPage() {
  const router = useRouter();
  const { chatRooms, createChatRoom, isLoading } = useChatRooms();

  useEffect(() => {
    // Don't do anything until we've finished loading from localStorage
    if (isLoading) return;

    if (chatRooms.length === 0) {
      // Create first chat room if none exist
      const newRoomId = createChatRoom();
      router.push(`/chat/${newRoomId}`);
    } else {
      // Redirect to the most recent chat room
      const mostRecent = chatRooms.sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      )[0];
      router.push(`/chat/${mostRecent.id}`);
    }
  }, [chatRooms, createChatRoom, router, isLoading]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2>Loading chat...</h2>
      </div>
    </div>
  );
}
