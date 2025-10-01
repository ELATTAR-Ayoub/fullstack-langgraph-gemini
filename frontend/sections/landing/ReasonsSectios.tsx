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
          Expert itelegece for every need
        </h2>

        <p className={`${styles.p} lg:text-center`}>BLA BLA BLA</p>
      </div>

      {/* Features Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-4 gap-4 w-full max-w-6xl mx-auto"></div>
    </section>
  );
}
