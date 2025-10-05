// React/Next.js imports
import { useRouter } from "next/navigation";

// Third-party library imports
import { ArrowRight } from "lucide-react";

// Internal imports - context
import { useChatRooms } from "@/context";

// Internal imports - utilities
import { cn } from "@/lib/utils";

// Internal imports - styles
import styles from "@/styles";

// Internal imports - components
import { Button } from "@/components/ui/button";
import LiquidEther from "@/components/gsap/LiquidEther";

export default function JoinUSSection() {
  const router = useRouter();
  const { createChatRoom, chatRooms } = useChatRooms();

  const handleStartNewChat = () => {
    const newRoomId = createChatRoom();
    router.push(`/chat/${newRoomId}`);
  };

  return (
    <section className={"Section"} id="join-us-section">
      {/* Header Content */}
      <div
        className={`relative ${styles.flexCenter} flex-col max-w-6xl mx-auto min-h-96 md:min-h-[60vh] w-full rounded-2xl border border-border overflow-hidden`}
      >
        {/* Header */}
        <div
          className={`flex flex-col md:items-center w-full max-w-2xl mx-auto ${styles.padding} `}
        >
          <h2 className={`${styles.SectionH2} md:text-center`}>
            Start Your AI-Powered Research Journey
          </h2>

          <p className={`${styles.p} md:text-center`}>
            Join over 10,000 researchers, analysts, and knowledge workers who've
            revolutionized their research process with DeepSearch.
          </p>

          <Button onClick={handleStartNewChat} className="w-fit z-[11]">
            Get Started Now <ArrowRight />
          </Button>
        </div>

        {/* Background */}
        <LiquidEther
          className="!absolute top-0 left-0 w-full h-full z-10 opacity-50 dark:opacity-100"
          style={{ filter: "brightness(1.3) contrast(1.1) saturate(1.3)" }}
        />
      </div>
    </section>
  );
}
