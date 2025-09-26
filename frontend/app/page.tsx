"use client";

import Image from "next/image";
import styles from "@/styles";
import ChatSection from "@/sections/chat/ChatSection";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        " relative w-full h-full max-h-screen border border-secondary-foreground/10 shadow",
        styles.sectionsBorderRadius
      )}
    >
      <ChatSection />
    </div>
  );
}
