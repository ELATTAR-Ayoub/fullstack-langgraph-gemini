"use client";

import { useRouter } from "next/navigation";
import { useChatRooms } from "@/context";
import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  SparklesIcon,
  Zap,
  BookOpen,
  History,
  StarIcon,
  ArrowDown,
} from "lucide-react";
import Logo from "@/public/svg/logo_extended";
import AnimatedContent from "@/components/gsap/AnimatedContent";
import SplitText from "@/components/gsap/SplitText";
import { cn } from "@/lib/utils";
import styles from "@/styles";
import Star from "@/public/svg/star";
import Header from "@/components/Header";
import { InputBar } from "@/components/InputBar";
import HeroSection from "@/sections/landing/HeroSection";
import FeaturesSection from "@/sections/landing/FeaturesSection";
import ReasonsSection from "@/sections/landing/ReasonsSectios";

export default function Home() {
  const router = useRouter();
  const { createChatRoom, chatRooms } = useChatRooms();

  const handleStartNewChat = () => {
    const newRoomId = createChatRoom();
    router.push(`/chat/${newRoomId}`);
  };

  const handleContinueChat = () => {
    if (chatRooms.length > 0) {
      const mostRecent = chatRooms.sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      )[0];
      router.push(`/chat/${mostRecent.id}`);
    } else {
      handleStartNewChat();
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    const newRoomId = createChatRoom();
    // Navigate to the new chat with the suggestion as initial message
    router.push(
      `/chat/${newRoomId}?message=${encodeURIComponent(suggestionText)}`
    );
  };

  const handleInputSubmit = (
    inputValue: string,
    effort: string,
    model: string
  ) => {
    if (!inputValue.trim()) return;
    const newRoomId = createChatRoom();
    // Navigate to the new chat with the input text as initial message
    router.push(`/chat/${newRoomId}?message=${encodeURIComponent(inputValue)}`);
  };

  return (
    <div
      className={cn(
        " relative w-full h-full border border-secondary-foreground/10 shadow min-h-screen flex flex-col",
        styles.sectionsBorderRadius
      )}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <HeroSection />

        {/* Features section */}
        <FeaturesSection />

        {/* Reasons section */}
        <ReasonsSection />
      </main>
    </div>
  );
}
