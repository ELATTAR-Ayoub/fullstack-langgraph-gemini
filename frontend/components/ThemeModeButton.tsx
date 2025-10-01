"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { useTheme } from "@/context";

export function ThemeModeButton() {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] =
    useState<boolean>(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsThemeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme as "light" | "dark" | "system");
    setIsThemeDropdownOpen(false);
  };

  const toggleThemeDropdown = () => {
    setIsThemeDropdownOpen(!isThemeDropdownOpen);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <SunIcon className="h-4 w-4" />;
      case "dark":
        return <MoonIcon className="h-4 w-4" />;
      case "system":
        return <MonitorIcon className="h-4 w-4" />;
      default:
        return <MonitorIcon className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "System";
    }
  };

  return (
    <div className="relative" ref={themeDropdownRef}>
      <Button variant="ghost" onClick={toggleThemeDropdown}>
        {getThemeIcon()}
        <span>{getThemeLabel()}</span>
      </Button>

      {isThemeDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-md z-50">
          <div className="p-1">
            <button
              onClick={() => handleThemeSelect("light")}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-secondary hover:text-secondary-foreground rounded-sm cursor-pointer",
                theme === "light" && "bg-secondary text-secondary-foreground"
              )}
            >
              <SunIcon className="h-4 w-4" />
              <span>Light</span>
              {theme === "light" && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  Active
                </Badge>
              )}
            </button>

            <button
              onClick={() => handleThemeSelect("dark")}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-secondary hover:text-secondary-foreground rounded-sm cursor-pointer",
                theme === "dark" && "bg-secondary text-secondary-foreground"
              )}
            >
              <MoonIcon className="h-4 w-4" />
              <span>Dark</span>
              {theme === "dark" && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  Active
                </Badge>
              )}
            </button>

            <button
              onClick={() => handleThemeSelect("system")}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-secondary hover:text-secondary-foreground rounded-sm cursor-pointer",
                theme === "system" && "bg-secondary text-secondary-foreground"
              )}
            >
              <MonitorIcon className="h-4 w-4" />
              <span>System</span>
              {theme === "system" && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  Active
                </Badge>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
