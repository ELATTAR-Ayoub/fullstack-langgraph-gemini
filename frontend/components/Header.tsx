// styles
import styles from "@/styles";
import { cn } from "@/lib/utils";
import AnimatedContent from "./gsap/AnimatedContent";
import Logo from "@/public/svg/logo_extended";
import { Button } from "./ui/button";
import Star from "@/public/svg/star";
import Link from "next/link";
import { useChatRooms } from "@/context";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { createChatRoom } = useChatRooms();

  const handleStartNewChat = () => {
    const newRoomId = createChatRoom();
    router.push(`/chat/${newRoomId}`);
  };

  return (
    <header
      className={cn(
        "flex justify-between items-center fixed top-0 left-0 right-0 z-30 w-full bg-background/50 lg:bg-transparent lg:backdrop-blur-none backdrop-blur-sm ",
        styles.headerPadding
      )}
    >
      <AnimatedContent
        distance={30}
        direction="horizontal"
        reverse={true}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
      >
        <Logo className="h-6 w-auto hover:scale-105 transition-all duration-300" />
      </AnimatedContent>
      <AnimatedContent
        distance={30}
        direction="horizontal"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
      >
        <Button onClick={handleStartNewChat} size={"sm"}>
          <Star />
          <span>Try DeepSearch</span>
        </Button>
      </AnimatedContent>
    </header>
  );
};

export default Header;
