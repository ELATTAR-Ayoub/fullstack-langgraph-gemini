// React/Next.js imports
import { useRouter } from "next/navigation";

// Third-party library imports
import { SearchIcon, ArrowDown } from "lucide-react";

// Internal imports - context
import { useChatRooms } from "@/context";

// Internal imports - utilities
import { cn } from "@/lib/utils";

// Internal imports - styles
import styles from "@/styles";

// Internal imports - components
import { Button } from "@/components/ui/button";
import { InputBar } from "@/components/InputBar";
import AnimatedContent from "@/components/gsap/AnimatedContent";
import SplitText from "@/components/gsap/SplitText";
import LiquidEther from "@/components/gsap/LiquidEther";

// Internal imports - assets
import Star from "@/public/svg/star";

export default function HeroSection() {
  const router = useRouter();
  const { createChatRoom } = useChatRooms();

  const handleStartNewChat = () => {
    const newRoomId = createChatRoom();
    router.push(`/chat/${newRoomId}`);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    const newRoomId = createChatRoom();
    // Navigate to the new chat with the suggestion as initial message
    router.push(
      `/chat/${newRoomId}?message=${encodeURIComponent(suggestionText)}`
    );
  };

  const handleInputSubmit = (
    inputValue: string,
    effort: string,
    model: string
  ) => {
    if (!inputValue.trim()) return;
    const newRoomId = createChatRoom();
    // Navigate to the new chat with the input text as initial message
    router.push(`/chat/${newRoomId}?message=${encodeURIComponent(inputValue)}`);
  };

  const suggestions = [
    {
      title: "How might climate change affect global food security by 2030?",
    },
    {
      title:
        "the most effective strategies for reducing carbon footprint in urban areas?",
    },

    {
      title:
        "What are the competitive advantages of Tesla's autonomous driving technology?",
    },

    {
      title:
        "Compare the effectiveness of different machine learning algorithms?",
    },

    {
      title:
        "Compare the effectiveness of different machine learning algorithms?",
    },

    { title: "What are the latest developments in quantum computing?" },

    {
      title:
        "How can AI-driven personalization improve customer retention in the retail industry?",
    },

    {
      title:
        "What are the potential environmental impacts of blockchain technology on sustainability?",
    },

    {
      title:
        "How can AI-driven personalization improve customer retention in the retail industry?",
    },
  ];

  return (
    <section
      className={cn(
        "flex flex-col gap-4 p-4 min-h-screen md:max-h-screen",
        styles.flexCenter,
        "relative"
      )}
      id="hero-section"
    >
      {/* main content */}
      <div className=" relative flex flex-col md:items-center gap-4 max-w-2xl mx-auto py-16 md:py-4 z-[11] ">
        {/* Coming Soon */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={true}
          duration={1.5}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.9}
          threshold={0.1}
          delay={3}
        >
          <p
            className={`${styles.Xsmall} max-w-fit testimonials-section-card-shadow text-center p-2 bg-accent/50 rounded-full shadow border border-border/50`}
          >
            DeepSearch V3 Coming soon!
          </p>
        </AnimatedContent>

        {/* Hero Content */}
        <div className="flex flex-col md:gap-2 ">
          <h1
            className={`${styles.heroHeading} font-normal flex flex-col md:items-center gap-0  `}
          >
            <SplitText
              text="Stop Searching."
              className=" !text-left md:text-center pb-4"
              delay={70}
              duration={2}
              ease="bounce.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <SplitText
              text="Start Discovering."
              className=" !text-left md:text-center pb-4"
              delay={140}
              duration={2}
              ease="bounce.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </h1>

          <AnimatedContent
            distance={50}
            direction="vertical"
            reverse={false}
            duration={1.5}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.9}
            threshold={0.1}
            delay={3}
          >
            <p className={`${styles.p} md:text-center`}>
              Transform any question into a research masterpiece. Our AI doesn't
              just search, it thinks, reflects, and synthesizes information from
              across the web.
            </p>
          </AnimatedContent>
        </div>

        {/* CTA Buttons */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          duration={1.5}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.9}
          threshold={0.1}
          delay={3.5}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[400px] ">
            <Button
              variant="outline"
              onClick={() => {
                const element = document.getElementById("features-section");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <ArrowDown /> Learn more
            </Button>
            <Button onClick={handleStartNewChat} className="w-full">
              <Star /> Ask Your First Question
            </Button>
          </div>
        </AnimatedContent>

        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          duration={1.5}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.9}
          threshold={0.1}
          delay={4}
        >
          <div className="flex flex-col md:items-center gap-0 w-full">
            {/* Input Bar */}

            <InputBar
              onSubmit={handleInputSubmit}
              isLoading={false}
              onCancel={() => {}}
              selectedModel="gemini-2.5-flash"
              selectedEffort="low"
              onModelChange={() => {}}
              onEffortChange={() => {}}
              suggestionText=""
              className="!relative mt-2 !justify-start md:!justify-center"
            />

            {/* Suggestions */}
            <div className="flex flex-col gap-2 w-full max-w-[400px] bg-secondary/50 backdrop-blur-sm p-4 py-2 pb-0 rounded-xl text-primary border border-border/50 shadow">
              <button
                className="w-full flex items-center gap-2 opacity-80 p-1 border-b border-primary/25 pb-3 cursor-pointer"
                onClick={handleStartNewChat}
              >
                <SearchIcon className="size-4" />
                <p className={`${styles.Xsmall}`}>Search...</p>
              </button>

              <div className="w-full flex items-center flex-col gap-2 mt-1 max-h-[124px] overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <AnimatedContent
                    key={index}
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={1.5}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={0.9}
                    threshold={0.1}
                    delay={4.7 + index * 0.15}
                  >
                    <div
                      className="w-full p-2 bg-muted-foreground/15 rounded-full opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion.title)}
                    >
                      <p
                        className={`${styles.small} ellipsis-on-1line capitalize w-full `}
                      >
                        {suggestion.title}
                      </p>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>

      {/* Background */}
      <LiquidEther
        className="!absolute top-0 left-0 w-full h-full z-10 opacity-50 dark:opacity-100"
        style={{ filter: "brightness(1.3) contrast(1.1) saturate(1.3)" }}
      />
    </section>
  );
}
