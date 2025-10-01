"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import ChatSection from "@/sections/chat/ChatSection";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import styles from "@/styles";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div
      className={cn(
        " relative w-full h-full max-h-screen border border-secondary-foreground/10 shadow",
        styles.sectionsBorderRadius
      )}
    >
      <SidebarProvider>
        <AppSidebar variant="floating" />
        <SidebarInset>
          <ChatSection chatId={resolvedParams.id} initialMessage={message} />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
