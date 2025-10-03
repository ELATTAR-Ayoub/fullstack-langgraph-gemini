"use client";

import * as React from "react";
import { PlusIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "@/public/svg/logo";
import LogoExtended from "@/public/svg/logo_extended";
import { Button } from "../ui/button";
import { useChatRooms } from "@/context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SidebarHead() {
  const { createChatRoom } = useChatRooms();
  const router = useRouter();

  const handleNewChat = () => {
    const newRoomId = createChatRoom();
    router.push(`/chat/${newRoomId}`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-between gap-2 w-full mb-1">
          <Link
            href="/"
            className="w-full cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <LogoExtended />
          </Link>
          <SidebarTrigger />
        </div>
        <Button className="w-full mb-1" onClick={handleNewChat}>
          <PlusIcon />
          <span>New chat</span>
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
