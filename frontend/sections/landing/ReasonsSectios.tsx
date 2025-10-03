"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import styles from "@/styles";
import Image from "next/image";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  visualContent: {
    img: string;
  };
}

const features: FeatureItem[] = [
  {
    id: "writing",
    title: "An expressive writing partner",
    description:
      "DeepSearch helps you craft compelling content, from technical documentation to creative writing, with natural language understanding and style adaptation.",
    visualContent: {
      img: "/img/landing/writing.jpg",
    },
  },
  {
    id: "research",
    title: "Comprehensive research tools",
    description:
      "Gather information from multiple sources, synthesize findings, and present comprehensive research results with source verification and fact-checking.",
    visualContent: {
      img: "/img/landing/research.jpg",
    },
  },
  {
    id: "collaboration",
    title: "Team collaboration",
    description:
      "Share findings, collaborate on research projects, and maintain knowledge bases with real-time synchronization and version control.",
    visualContent: {
      img: "/img/landing/collaboration.jpg",
    },
  },
  {
    id: "safety",
    title: "Safer and more accurate",
    description:
      "DeepSearch prioritizes safety and accuracy in all responses, with built-in safeguards and fact-checking capabilities.",
    visualContent: {
      img: "/img/landing/safety.jpg",
    },
  },
];

export default function ReasonsSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [autoRotateInterval, setAutoRotateInterval] = useState(7000);

  // Auto-rotate features every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [isAnimating, autoRotateInterval]);

  // Animate visual content changes
  useEffect(() => {
    if (!visualRef.current || !contentRef.current) return;

    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Fade out current content
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    })
      // Update content and fade in
      .set(contentRef.current, {
        src: features[activeFeature].visualContent.img,
        alt: features[activeFeature].title,
      })
      .fromTo(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
  }, [activeFeature]);

  // Animate description changes
  useEffect(() => {
    descriptionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      if (index === activeFeature) {
        // Show description with smooth animation
        gsap.fromTo(
          ref,
          {
            height: 0,
            opacity: 0,
            y: -10,
          },
          {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      } else {
        // Hide description with smooth animation
        gsap.to(ref, {
          height: 0,
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  }, [activeFeature]);

  const handleFeatureClick = (index: number) => {
    if (!isAnimating) {
      setActiveFeature(index);
    }
  };

  return (
    <section className={"Section"}>
      {/* Main Content */}

      {/* Header */}
      <div className="flex flex-col lg:gap-0 max-w-2xl mx-auto">
        <p className={`${styles.Xsmall} header-special-title`}>
          Why choose DeepSearch?
        </p>

        <h2 className={`${styles.SectionH2} md:text-center`}>
          Expert intelligence for everyone
        </h2>

        <p className={`${styles.p} md:text-center`}>
          DeepSearch is smarter across the board, providing more useful
          responses across math, science, finance, law, and more. DeepSearch
          uses multiple models to ensure the best results.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 lg:gap-16 w-full max-w-6xl mx-auto">
        {/* Left Column - Text Content */}
        <div className="space-y-8 lg:col-span-3">
          {/* Feature List */}
          <div className="space-y-0">
            {features.map((feature, index) => (
              <div key={feature.id} className="group">
                <Button
                  variant="ghost"
                  onClick={() => handleFeatureClick(index)}
                  className={cn(
                    "w-full justify-start items-start px-0 py-4 h-auto text-left transition-all duration-300 hover:scale-100 hover:!bg-transparent opacity-50 hover:opacity-100",
                    activeFeature === index && " opacity-100"
                  )}
                >
                  <div className="flex flex-col w-full">
                    <span className="text-base font-medium">
                      {feature.title}
                    </span>
                    <div
                      ref={(el) => {
                        descriptionRefs.current[index] = el;
                      }}
                      className="overflow-hidden"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <span
                        className={`${styles.small} font-normal text-muted-foreground w-full text-balance block mt-2`}
                      >
                        {feature.description}
                      </span>
                    </div>
                  </div>
                </Button>
                {index < features.length - 1 && (
                  <Separator className="bg-border/50" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Visual Content */}
        <div className="relative lg:col-span-5">
          <div
            ref={visualRef}
            className="relative aspect-video w-full rounded-xl overflow-hidden"
          >
            {/* Content area */}
            <Image
              ref={contentRef as React.RefObject<HTMLImageElement>}
              className="w-full object-cover rounded-xl"
              src={features[activeFeature].visualContent.img}
              alt={features[activeFeature].title}
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
}
