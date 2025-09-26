"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SendIcon, StopCircleIcon } from "lucide-react";
import styles from "@/styles";
import { InputBarProps } from "@/context";

export function InputBar({
  onSubmit,
  isLoading,
  onCancel,
  selectedModel,
  selectedEffort,
  onModelChange,
  onEffortChange,
  suggestionText = "",
}: InputBarProps) {
  const [inputValue, setInputValue] = useState<string>("");

  // Update input value when suggestion text changes
  useEffect(() => {
    if (suggestionText) {
      setInputValue(suggestionText);
    }
  }, [suggestionText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSubmit(inputValue, selectedEffort, selectedModel);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!inputValue.trim()) return;
      onSubmit(inputValue, selectedEffort, selectedModel);
      setInputValue("");
    }
  };

  return (
    <div
      className={cn(
        "flex items-center w-full bg-transparent absolute md:bottom-2 bottom-2 ",
        styles.headerPadding,
        styles.flexCenter
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center gap-2 bg-background z-10 min-h-[100px] max-w-[400px] mx-3 w-full overflow-hidden rounded-2xl shadow-sm border border-muted-foreground/25",
          styles.flexCenter
        )}
      >
        <Textarea
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleKeyPress}
          className="w-full h-full min-h-[100px] max-h-[100px] border-none !outline-none shadow-none resize-none pr-14"
          placeholder="Type your message here..."
          disabled={isLoading}
        />

        {isLoading ? (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onCancel}
            className="rounded-full absolute top-2 right-2"
          >
            <StopCircleIcon />
          </Button>
        ) : (
          <Button
            type="submit"
            variant="default"
            size="icon"
            className="rounded-full absolute top-2 right-2"
            disabled={!inputValue.trim()}
          >
            <SendIcon className="relative -rotate-45 top-0.5" />
          </Button>
        )}
      </form>
    </div>
  );
}
