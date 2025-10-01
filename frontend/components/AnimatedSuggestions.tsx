"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import styles from "@/styles";

interface Suggestion {
  title: string;
}

interface AnimatedSuggestionsProps {
  suggestions: Suggestion[];
  onSuggestionClick: (title: string) => void;
}

const AnimatedSuggestions: React.FC<AnimatedSuggestionsProps> = ({
  suggestions,
  onSuggestionClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedSuggestions, setDisplayedSuggestions] = useState(suggestions);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const lastAnimationTime = useRef<number>(0);

  // Shuffle function
  const shuffleArray = useCallback((array: Suggestion[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Stable animation function
  const animateSuggestions = useCallback(() => {
    const now = Date.now();
    const timeSinceLastAnimation = now - lastAnimationTime.current;

    // 3 second cooldown check
    if (timeSinceLastAnimation < 3000) {
      return;
    }

    if (isAnimating || !containerRef.current) return;

    setIsAnimating(true);
    lastAnimationTime.current = now;
    const elements = containerRef.current.children;

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create a simple, stable timeline
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Phase 1: Smooth fade out with slight upward movement
    tl.to(elements, {
      y: -15,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
    })
      // Phase 2: Update content
      .call(() => {
        setDisplayedSuggestions((prev) => shuffleArray(prev));
      })
      // Phase 3: Smooth fade in with slight downward movement
      .fromTo(
        elements,
        {
          y: 15,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 0.5,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        }
      )
      // Phase 4: Final opacity adjustment
      .to(elements, {
        opacity: 0.6,
        duration: 0.2,
        ease: "power2.out",
      });

    animationRef.current = tl;
  }, [isAnimating, shuffleArray]);

  // Stable initial animation
  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.children;

      // Set initial state
      gsap.set(elements, {
        y: 20,
        opacity: 0,
        scale: 0.9,
      });

      // Simple entrance animation
      gsap.to(elements, {
        y: 0,
        opacity: 0.5,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      });
    }
  }, []);

  // Set up interval with 3-second cooldown
  useEffect(() => {
    const interval = setInterval(() => {
      animateSuggestions();
    }, 4000); // Check every 4 seconds, but animation has 3-second cooldown

    return () => clearInterval(interval);
  }, [animateSuggestions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="w-full flex items-center flex-col gap-2 mt-1 max-h-[124px] overflow-hidden">
      <div ref={containerRef} className="w-full flex flex-col gap-2">
        {displayedSuggestions.map((suggestion, index) => (
          <div
            key={`${suggestion.title}-${index}`}
            className="w-full p-2 bg-border rounded-full opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => onSuggestionClick(suggestion.title)}
          >
            <p className={`${styles.small} truncate capitalize`}>
              {suggestion.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedSuggestions;
