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

  const features = [
    {
      icon: SearchIcon,
      title: "Deep Web Research",
      description:
        "Comprehensive search across multiple sources for accurate, up-to-date information",
      color: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: SparklesIcon,
      title: "AI-Powered Analysis",
      description:
        "Advanced reasoning with Google Gemini for insightful and contextual responses",
      color: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Zap,
      title: "Configurable Search Depth",
      description:
        "Choose your search intensity from quick answers to comprehensive research",
      color: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: BookOpen,
      title: "Source Transparency",
      description:
        "Every answer includes detailed sources and research timeline",
      color: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
  ];

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
        <section
          className={cn(
            "flex flex-col gap-4 p-4 min-h-screen md:max-h-screen",
            styles.flexCenter,
            "relative"
          )}
        >
          <h2 className={`${styles.H2}`}>Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>
        </section>
      </main>
    </div>
  );
}
