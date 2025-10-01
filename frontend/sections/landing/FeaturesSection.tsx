"use client";

import { useRouter } from "next/navigation";
import { useChatRooms } from "@/context";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Globe,
  Calendar,
  Newspaper,
  Users,
  FileText,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Github,
  Rss,
  TrendingUp,
  Facebook,
  ArrowRight,
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
import LigatedSquare from "@/public/svg/landing/lighted-square";
import { Boxes } from "@/components/gsap/background-boxes";
import Logo3DFloating from "@/public/svg/landing/logo-3d-floating";
import LightRays from "@/components/gsap/LightRays";
import WikipediaLogoStand from "@/public/svg/landing/wikipedia-logo-stand";
import {
  MotionGrid,
  MotionGridCells,
  type Frames,
} from "@/components/animate-ui/primitives/animate/motion-grid";
import {
  RotatingText,
  RotatingTextContainer,
} from "@/components/animate-ui/primitives/texts/rotating";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import GlobeIllustration from "@/public/svg/landing/globe-illustratio";

const importingFrames = [
  [[2, 2]],
  [
    [1, 2],
    [2, 1],
    [2, 3],
    [3, 2],
  ],
  [
    [2, 2],
    [0, 2],
    [1, 1],
    [1, 3],
    [2, 0],
    [2, 4],
    [3, 1],
    [3, 3],
    [4, 2],
  ],
  [
    [0, 1],
    [0, 3],
    [1, 0],
    [1, 2],
    [1, 4],
    [2, 1],
    [2, 3],
    [3, 0],
    [3, 2],
    [3, 4],
    [4, 1],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 2],
    [0, 4],
    [1, 1],
    [1, 3],
    [2, 0],
    [2, 2],
    [2, 4],
    [3, 1],
    [3, 3],
    [4, 0],
    [4, 2],
    [4, 4],
  ],
  [
    [0, 1],
    [0, 3],
    [1, 0],
    [1, 2],
    [1, 4],
    [2, 1],
    [2, 3],
    [3, 0],
    [3, 2],
    [3, 4],
    [4, 1],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 2],
    [0, 4],
    [1, 1],
    [1, 3],
    [2, 0],
    [2, 4],
    [3, 1],
    [3, 3],
    [4, 0],
    [4, 2],
    [4, 4],
  ],
  [
    [0, 1],
    [1, 0],
    [3, 0],
    [4, 1],
    [0, 3],
    [1, 4],
    [3, 4],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 4],
    [4, 0],
    [4, 4],
  ],
  [],
] as Frames;

const arrowDownFrames = [
  [[2, 0]],
  [
    [1, 0],
    [2, 0],
    [3, 0],
    [2, 1],
  ],
  [
    [2, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [2, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [2, 3],
  ],
  [
    [2, 1],
    [2, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [2, 4],
  ],
  [
    [2, 2],
    [2, 3],
    [1, 4],
    [2, 4],
    [3, 4],
  ],
  [
    [2, 3],
    [2, 4],
  ],
  [[2, 4]],
  [],
] as Frames;

const arrowUpFrames = [
  [[2, 4]],
  [
    [1, 4],
    [2, 4],
    [3, 4],
    [2, 3],
  ],
  [
    [2, 4],
    [1, 3],
    [2, 3],
    [3, 3],
    [2, 2],
  ],
  [
    [2, 4],
    [2, 3],
    [1, 2],
    [2, 2],
    [3, 2],
    [2, 1],
  ],
  [
    [2, 3],
    [2, 2],
    [1, 1],
    [2, 1],
    [3, 1],
    [2, 0],
  ],
  [
    [2, 2],
    [2, 1],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [2, 1],
    [2, 0],
  ],
  [[2, 0]],
  [],
] as Frames;

const syncingFrames = [...arrowDownFrames, ...arrowUpFrames] as Frames;

const searchingFrames = [
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [2, 2],
  ],
  [
    [3, 0],
    [2, 1],
    [3, 1],
    [4, 1],
    [3, 2],
  ],
  [
    [3, 1],
    [2, 2],
    [3, 2],
    [4, 2],
    [3, 3],
  ],
  [
    [3, 2],
    [2, 3],
    [3, 3],
    [4, 3],
    [3, 4],
  ],
  [
    [1, 2],
    [0, 3],
    [1, 3],
    [2, 3],
    [1, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [],
] as Frames;

const busyFrames = [
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [4, 1],
    [4, 2],
    [4, 3],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 3],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [3, 4],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 3],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [2, 1],
    [4, 1],
    [4, 2],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [3, 0],
    [4, 0],
    [4, 1],
    [4, 2],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 1],
    [4, 0],
    [4, 1],
    [4, 2],
  ],
] as Frames;

const savingFrames = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 0],
    [3, 1],
    [3, 2],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [2, 0],
    [2, 1],
    [2, 2],
    [3, 0],
    [3, 1],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [2, 0],
    [2, 1],
    [3, 0],
    [4, 0],
    [4, 1],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [2, 0],
    [4, 0],
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1],
    [0, 1],
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1],
    [0, 1],
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1],
    [0, 1],
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
    [0, 4],
  ],
] as Frames;

const initializingFrames = [
  [],
  [
    [1, 0],
    [3, 0],
  ],
  [
    [1, 0],
    [3, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
  ],
  [
    [1, 0],
    [3, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
  ],
  [
    [1, 0],
    [3, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ],
  [
    [1, 0],
    [3, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [2, 4],
  ],
  [
    [1, 2],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 2],
  ],
  [[2, 2]],
  [],
] as Frames;

const states = {
  importing: {
    frames: importingFrames,
    label: "Processing...",
  },
  syncing: {
    frames: syncingFrames,
    label: "Generating...",
  },
  searching: {
    frames: searchingFrames,
    label: "Searching...",
  },
  busy: {
    frames: busyFrames,
    label: "Reflecting...",
  },
  saving: {
    frames: savingFrames,
    label: "Saving...",
  },
  initializing: {
    frames: initializingFrames,
    label: "Finalizing!",
  },
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MotionGridDemo = ({ className }: { className?: string }) => {
  const [state, setState] = useState<keyof typeof states>("importing");

  const runStates = async () => {
    while (true) {
      for (const state of Object.keys(states) as (keyof typeof states)[]) {
        setState(state);
        await sleep(3000);
      }
    }
  };

  useEffect(() => {
    runStates();
  }, []);

  return (
    <motion.button
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-3 h-11 gap-x-3 relative bg-primary inline-flex items-center justify-center rounded-md",
        className
      )}
    >
      <motion.div layout="preserve-aspect">
        <MotionGrid
          gridSize={[5, 5]}
          frames={states[state].frames}
          className="w-fit gap-0.5"
        >
          <MotionGridCells className="size-[3px] rounded-full aspect-square bg-white/20 dark:bg-black/20 data-[active=true]:bg-white/70 dark:data-[active=true]:bg-black/70" />
        </MotionGrid>
      </motion.div>

      <RotatingTextContainer
        text={states[state].label}
        className="absolute left-[46px] top-1/2 -translate-y-1/2"
      >
        <RotatingText
          layout="preserve-aspect"
          className="text-primary-foreground"
        />
      </RotatingTextContainer>

      <span className="invisible opacity-0" aria-hidden>
        {states[state].label}
      </span>
    </motion.button>
  );
};

export default function Home() {
  const router = useRouter();
  const { createChatRoom, chatRooms } = useChatRooms();

  const handleStartNewChat = () => {
    const newRoomId = createChatRoom();
    router.push(`/chat/${newRoomId}`);
  };

  const sources_logos = {
    row1: [
      <Twitter className="w-6 h-6" />,
      <Facebook className="w-6 h-6" />,
      ,
      ,
      <Github className="w-6 h-6" />,
      ,
      <Youtube className="w-6 h-6" />,
      <Linkedin className="w-6 h-6" />,
      <Globe className="w-6 h-6" />,
      ,
      <Twitter className="w-6 h-6" />,
      <Facebook className="w-6 h-6" />,
      ,
      ,
      <Github className="w-6 h-6" />,
      ,
      <Youtube className="w-6 h-6" />,
      <Linkedin className="w-6 h-6" />,
      <Globe className="w-6 h-6" />,
      ,
    ],
    row2: [
      <BookOpen className="w-6 h-6" />,
      <Instagram className="w-6 h-6" />,
      ,
      <Newspaper className="w-6 h-6" />,
      ,
      <FileText className="w-6 h-6" />,
      ,
      <Rss className="w-6 h-6" />,
      <Calendar className="w-6 h-6" />,
      ,
      ,
      ,
      <BookOpen className="w-6 h-6" />,
      <Instagram className="w-6 h-6" />,
      ,
      <Newspaper className="w-6 h-6" />,
      ,
      <FileText className="w-6 h-6" />,
      ,
      <Rss className="w-6 h-6" />,
      <Calendar className="w-6 h-6" />,
      ,
      ,
      ,
    ],
    row3: [
      ,
      <Users className="w-6 h-6" />,
      ,
      <TrendingUp className="w-6 h-6" />,
      <Globe className="w-6 h-6" />,
      ,
      <Twitter className="w-6 h-6" />,
      ,
      ,
      <Linkedin className="w-6 h-6" />,
      <Youtube className="w-6 h-6" />,
      <Facebook className="w-6 h-6" />,
      ,
      ,
      ,
      ,
      <Users className="w-6 h-6" />,
      ,
      <TrendingUp className="w-6 h-6" />,
      <Globe className="w-6 h-6" />,
      ,
      <Twitter className="w-6 h-6" />,
      ,
      ,
      <Linkedin className="w-6 h-6" />,
      <Youtube className="w-6 h-6" />,
      <Facebook className="w-6 h-6" />,
      ,
      ,
      ,
    ],
    row4: [
      ,
      ,
      ,
      <Instagram className="w-6 h-6" />,
      ,
      ,
      ,
      <Globe className="w-6 h-6" />,

      <BookOpen className="w-6 h-6" />,
      ,
      ,
      <FileText className="w-6 h-6" />,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      <Instagram className="w-6 h-6" />,
      ,
      ,
      ,
      <Globe className="w-6 h-6" />,

      <BookOpen className="w-6 h-6" />,
      ,
      ,
      <FileText className="w-6 h-6" />,
      ,
      ,
      ,
      ,
    ],
  };

  return (
    <section
      className={cn(
        "relative flex flex-col gap-4 p-4 py-16 lg:py-24",
        styles.flexStart,
        "relative"
      )}
    >
      {/* Header Content */}
      <div className="flex flex-col lg:gap-0 max-w-2xl mx-auto">
        <h2
          className={`${styles.H2} text-3xl sm:text-4xl lg:text-5xl text-balance lg:text-center`}
        >
          Everything You Need for Deep Research
        </h2>

        <p className={`${styles.p} lg:text-center`}>
          Transform any question into a research masterpiece. Our AI doesn't
          just search, it thinks, reflects, and synthesizes information from
          across the web.
        </p>
      </div>

      {/* Features Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-4 gap-4 w-full max-w-6xl mx-auto">
        {/* Top Left Card */}
        <div className="relative min-h-[350px] w-full bg-black text-white border border-border rounded-xl lg:col-span-4 lg:row-span-2 overflow-hidden">
          <div className="absolute top-4 left-4 max-w-lg z-10">
            <h3 className={`${styles.large} text-balance`}>
              Intelligent Reasoning
            </h3>
            <p
              className={`${styles.small} font-normal text-balance mt-2 text-white/50`}
            >
              Our AI reflects on search results, identifies knowledge gaps, and
              iteratively refines research materials.
            </p>
          </div>
          {/* Illustrations */}
          <Boxes className="center-in-parent scale-125 opacity-50" />
          <LigatedSquare className="absolute -top-[200px] left-[48.5%] -translate-x-1/2 pointer-events-none z-[2] opacity-95 " />
          {/* <Logo3DFloating className="absolute size-42 top-12 right-[70px]  animate-float hover:scale-105 transition-all duration-300" /> */}

          <MotionGridDemo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float hover:scale-105 transition-all duration-300" />
        </div>

        {/* Top Right Card */}
        <div className="relative min-h-[350px] w-full bg-black text-white border border-border rounded-xl lg:col-span-2 lg:row-span-4 overflow-hidden">
          <div className="absolute bottom-4 left-4 max-w-lg z-10">
            <h3 className={`${styles.large} text-balance`}>
              Source Transparency
            </h3>
            <p
              className={`${styles.small} font-normal text-balance mt-2 text-white/50`}
            >
              Every answer includes detailed sources and research timeline.
            </p>
          </div>

          {/* Illustrations */}
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={2}
            rayLength={3}
            followMouse={true}
            mouseInfluence={1}
            noiseAmount={0.1}
            distortion={0}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-10 sss"
          />

          <div className="absolute top-1/2 md:top-24 left-1/2 -translate-y-1/2 md:translate-y-0 -translate-x-1/2 flex flex-col gap-2 overflow-hidden w-full">
            {Object.values(sources_logos).map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex gap-2 ${
                  rowIndex % 2 === 0
                    ? "animate-slide-left"
                    : "animate-slide-right"
                } ${
                  rowIndex === 0
                    ? "opacity-90" // Row 1: 90% opacity
                    : rowIndex === 1
                    ? "opacity-75" // Row 2: 75% opacity
                    : rowIndex === 2
                    ? "opacity-50" // Row 3: 50% opacity
                    : "opacity-30" // Row 4: 30% opacity
                }`}
              >
                {Array.from({ length: 25 }, (_, index) => {
                  const icon = row[index];
                  // Create different opacity levels: 25%, 50%, and 100%
                  const getOpacity = () => {
                    const random = Math.random();
                    if (random < 0.3) return "opacity-25"; // 25% opacity
                    if (random < 0.6) return "opacity-50"; // 50% opacity
                    return ""; // 100% opacity (default)
                  };

                  return (
                    <Button
                      key={index}
                      variant="accent"
                      className={`flex items-center gap-2 p-6 light-reflection-shadow ${
                        !icon ? getOpacity() : ""
                      }`}
                      size="icon"
                    >
                      {icon}
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Wikipedia Logo */}
          <WikipediaLogoStand className="absolute top-1/2 md:top-auto md:bottom-24 -translate-y-1/2 md:translate-y-0 left-1/2 -translate-x-1/2 animate-float" />
        </div>

        {/* Bottom Full Width Card */}
        <div className="relative min-h-[350px] w-full bg-black text-white border border-border rounded-xl p-6 lg:col-span-4 lg:row-span-2 overflow-hidden">
          <div className="absolute top-4 left-4 max-w-lg z-10">
            <h3 className={`${styles.large} text-balance`}>
              Research The Globe
            </h3>
            <p
              className={`${styles.small} font-normal text-balance mt-2 text-white/50`}
            >
              Get answers with proper citations, source links, and research
              methodology, perfect for academic and professional use.
            </p>
          </div>

          {/* Illustrations */}
          <GlobeIllustration className="absolute top-16 md:top-0 -right-32 md:-right-52 size-[400px] md:size-[550px]  hover:scale-105 transition-all duration-300" />
        </div>
      </div>

      <Button onClick={handleStartNewChat} className="w-fit mx-auto">
        Get Started Now <ArrowRight />
      </Button>
    </section>
  );
}
