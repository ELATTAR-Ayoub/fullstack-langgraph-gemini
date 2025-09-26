"use client";

import { CatIcon, BotIcon, UtensilsIcon } from "lucide-react";
import SplitText from "@/components/gsap/SplitText";
import { cn } from "@/lib/utils";
import styles from "@/styles";
import { WelcomeScreenProps, SuggestionExample } from "@/context";

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  const promptExamples: SuggestionExample[] = [
    {
      id: 1,
      text: "Generate a blog post about why orange cats are so fun to play with.",
      icon: CatIcon,
      color: "bg-orange-100",
      iconColor: "text-orange-500",
      borderColor: "border-orange-200",
    },
    {
      id: 2,
      text: "Create a post comparing AI models to different types of roommates.",
      icon: BotIcon,
      color: "bg-blue-100",
      iconColor: "text-blue-500",
      borderColor: "border-blue-200",
    },
    {
      id: 3,
      text: "Create a post comparing different pasta shapes to personality types.",
      icon: UtensilsIcon,
      color: "bg-green-100",
      iconColor: "text-green-500",
      borderColor: "border-green-200",
    },
  ];

  const handlePromptExampleClick = (text: string) => {
    onSuggestionClick(text);
  };

  return (
    <div className={cn(styles.flexCenter, "flex-col h-full")}>
      <h1 className={cn(styles.p)}>Hi, there!👋</h1>
      <SplitText
        text="Ask me anything!"
        className="H1 pb-2"
        delay={70}
        duration={2}
        ease="bounce.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />

      {/* prompt examples */}
      <div className="flex items-center gap-4 mt-4 max-w-[800px] lg:flex-row flex-col">
        {promptExamples.map((example) => {
          const IconComponent = example.icon;
          return (
            <div
              key={example.id}
              className="flex lg:items-start items-center flex-col gap-2 border border-muted p-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors shadow-sm lg:max-w-none max-w-[300px]"
              onClick={() => handlePromptExampleClick(example.text)}
            >
              <div
                className={`flex items-center p-2 ${example.color} rounded-sm border ${example.borderColor}`}
              >
                <IconComponent className={`w-4 h-4 ${example.iconColor}`} />
              </div>

              <p className={cn(styles.small, "text-center lg:text-left")}>
                {example.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
