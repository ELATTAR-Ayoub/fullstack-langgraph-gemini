"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChatRooms } from "@/context";

export default function Home() {
  const router = useRouter();
  const { chatRooms, createChatRoom } = useChatRooms();

  useEffect(() => {
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
  }, [chatRooms, createChatRoom, router]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2>Loading...</h2>
      </div>
    </div>
  );
}
