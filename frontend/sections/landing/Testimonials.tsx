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

export default function Testimonials() {
  const router = useRouter();
  const { createChatRoom, chatRooms } = useChatRooms();

  const handleStartNewChat = () => {
    const newRoomId = createChatRoom();
    router.push(`/chat/${newRoomId}`);
  };

  return (
    <section className={"Section"}>
      {/* Header Content */}
      <div className="flex flex-col lg:gap-0 max-w-2xl mx-auto">
        <h2 className={`${styles.SectionH2} md:text-center`}>
          What Our Users Say
        </h2>

        <p className={`${styles.p} md:text-center`}>
          Hear from our users about their experience with DeepSearch.
        </p>
      </div>
    </section>
  );
}
