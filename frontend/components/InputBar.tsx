"use client";

// React/Next.js imports
import { useState, useRef, useEffect } from "react";

// Third-party library imports
import {
  CpuIcon,
  Globe,
  SendIcon,
  SettingsIcon,
  StopCircleIcon,
} from "lucide-react";

// Internal imports - context
import { InputBarProps } from "@/context";

// Internal imports - utilities
import { cn } from "@/lib/utils";

// Internal imports - styles
import styles from "@/styles";

// Internal imports - components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function InputBar({
  onSubmit,
  isLoading,
  onCancel,
  selectedModel,
  selectedEffort,
  onModelChange,
  onEffortChange,
  suggestionText = "",
  className = "",
}: InputBarProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [deepThinkEnabled, setDeepThinkEnabled] = useState<boolean>(false);
  const [showWebSearchAlert, setShowWebSearchAlert] = useState<boolean>(false);

  // Update input value when suggestion text changes
  useEffect(() => {
    if (suggestionText) {
      setInputValue(suggestionText);
    }
  }, [suggestionText]);

  // Update effort based on DeepThink toggle
  useEffect(() => {
    if (deepThinkEnabled) {
      onEffortChange("high");
    } else {
      onEffortChange("medium");
    }
  }, [deepThinkEnabled, onEffortChange]);

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

  const handleDeepThinkToggle = (pressed: boolean) => {
    setDeepThinkEnabled(pressed);
  };

  const handleWebSearchClick = () => {
    setShowWebSearchAlert(true);
  };

  return (
    <div
      className={cn(
        "flex items-center w-full bg-transparent absolute md:bottom-2 bottom-2 ",
        styles.flexCenter,
        className
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center gap-2 bg-background/75 backdrop-blur-sm z-10 min-h-[124px] max-w-[400px] w-full overflow-hidden rounded-2xl shadow-sm border border-muted-foreground/25",
          styles.flexCenter
        )}
      >
        <Textarea
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleKeyPress}
          className="w-full h-full min-h-[124px] max-h-[124px] border-none !outline-none shadow-none resize-none pr-14"
          placeholder="Type your message here..."
          disabled={isLoading}
        />

        <div className="flex items-center gap-2 absolute bottom-2 left-2">
          <Toggle
            pressed={deepThinkEnabled}
            onPressedChange={handleDeepThinkToggle}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <CpuIcon />
            <span>DeepThink</span>
          </Toggle>

          <Toggle
            pressed={true}
            onPressedChange={handleWebSearchClick}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <Globe />
            <span>Web Search</span>
          </Toggle>

          <AlertDialog
            open={showWebSearchAlert}
            onOpenChange={setShowWebSearchAlert}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Web Search Always Active</AlertDialogTitle>
                <AlertDialogDescription>
                  Web search is always enabled in this mode. The AI will
                  automatically search the web for the most up-to-date
                  information to provide comprehensive answers to your
                  questions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setShowWebSearchAlert(false)}>
                  Got it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

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
