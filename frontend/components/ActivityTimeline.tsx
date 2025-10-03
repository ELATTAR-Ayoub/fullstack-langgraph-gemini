// React/Next.js imports
import { useEffect, useState } from "react";

// Third-party library imports
import { Loader2, Activity, TextSearch, Brain, Pen, Globe } from "lucide-react";

// Internal imports - utilities
import { cn } from "@/lib/utils";

// Internal imports - styles
import styles from "@/styles";

export interface ProcessedEvent {
  title: string;
  data: any;
}

interface ActivityTimelineProps {
  processedEvents: ProcessedEvent[];
  isLoading: boolean;
}

export function ActivityTimeline({
  processedEvents,
  isLoading,
}: ActivityTimelineProps) {
  const [isTimelineCollapsed, setIsTimelineCollapsed] =
    useState<boolean>(false);
  const getEventIcon = (title: string, index: number) => {
    if (index === 0 && isLoading && processedEvents.length === 0) {
      return <Loader2 className={`h-3 w-3 text-muted animate-spin`} />;
    }
    if (title.toLowerCase().includes("generating")) {
      return (
        <TextSearch
          className={`h-3 w-3 text-muted ${isLoading ? "animate-pulse" : ""}`}
        />
      );
    } else if (title.toLowerCase().includes("thinking")) {
      return <Loader2 className={`h-3 w-3 text-muted animate-spin`} />;
    } else if (title.toLowerCase().includes("reflection")) {
      return (
        <Brain
          className={`h-3 w-3 text-muted ${isLoading ? "animate-pulse" : ""}`}
        />
      );
    } else if (title.toLowerCase().includes("research")) {
      return (
        <Globe
          className={`h-3 w-3 text-muted ${isLoading ? "animate-pulse" : ""}`}
        />
      );
    } else if (title.toLowerCase().includes("finalizing")) {
      return (
        <Pen
          className={`h-3 w-3 text-muted ${isLoading ? "animate-pulse" : ""}`}
        />
      );
    }
    return (
      <Activity
        className={`h-3 w-3 text-muted ${isLoading ? "animate-pulse" : ""}`}
      />
    );
  };

  useEffect(() => {
    if (!isLoading && processedEvents.length !== 0) {
      setIsTimelineCollapsed(true);
    }
  }, [isLoading, processedEvents]);

  return (
    <div className=" text-primary text-xs">
      {isLoading && processedEvents.length === 0 && (
        <div className="  relative pl-[0.5px] pb-4 flex items-center justify-start gap-4">
          <div className="absolute left-3 top-3 h-full w-0.5 bg-primary" />
          <div
            className={cn(styles.flexCenter, "h-6 w-6 rounded-full bg-primary")}
          >
            <Loader2 className="h-3 w-3 text-muted animate-spin" />
          </div>
          <div>
            <p className="text-sm text-primary font-medium">
              Searching the web...
            </p>
          </div>
        </div>
      )}
      {processedEvents.length > 0 ? (
        <div className="space-y-0">
          {processedEvents.map((eventItem, index) => (
            <div
              key={`event-${index}-${eventItem.title}`}
              className="  relative pl-[0.5px] pb-4 flex items-center justify-start gap-4"
            >
              {index < processedEvents.length - 1 ||
              (isLoading && index === processedEvents.length - 1) ? (
                <div className="absolute left-3 top-3 h-full w-0.5 bg-primary" />
              ) : null}
              <div
                className={cn(
                  styles.flexCenter,
                  "h-6 w-6 min-w-6 min-h-6 rounded-full bg-primary z-[2]"
                )}
              >
                {getEventIcon(eventItem.title, index)}
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm text-primary font-medium">
                  {eventItem.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed ellipsis-on-1line">
                  {typeof eventItem.data === "string"
                    ? eventItem.data
                    : Array.isArray(eventItem.data)
                    ? (eventItem.data as string[]).join(", ")
                    : JSON.stringify(eventItem.data)}
                </p>
              </div>
            </div>
          ))}
          {isLoading && processedEvents.length > 0 && (
            <div className="relative pl-[0.5px] pb-4 flex items-center justify-start gap-4">
              <div
                className={cn(
                  styles.flexCenter,
                  "h-6 w-6 rounded-full bg-primary z-[2]"
                )}
              >
                <Loader2 className="h-3 w-3 text-muted animate-spin" />
              </div>
              <div>
                <p className="text-sm text-primary font-medium">
                  Searching the web...
                </p>
              </div>
            </div>
          )}
        </div>
      ) : !isLoading ? ( // Only show "No activity" if not loading and no events
        <div className="  relative pl-[0.5px] pb-4 flex items-center justify-start gap-4">
          <div
            className={cn(styles.flexCenter, "h-6 w-6 rounded-full bg-primary")}
          >
            <Loader2 className="h-3 w-3 text-muted animate-spin" />
          </div>
          <div>
            <p className="text-sm text-primary font-medium">
              Searching the web...{" "}
              <span className={cn(styles.Xsmall, styles.inlineCode, "text-xs")}>
                Timeline will update during processing.
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
