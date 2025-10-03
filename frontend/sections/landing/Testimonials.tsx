// React/Next.js imports
import { useRouter } from "next/navigation";
import Image from "next/image";

// Third-party library imports
import { ArrowRight, Star } from "lucide-react";

// Internal imports - context
import { useChatRooms } from "@/context";

// Internal imports - utilities
import { cn } from "@/lib/utils";

// Internal imports - styles
import styles from "@/styles";

// Internal imports - components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Testimonials data object - 16 testimonials with optimized images
const testimonials = [
  // Female testimonials (8)
  {
    id: 1,
    quote:
      "DeepSearch has revolutionized how I conduct research. The AI-powered insights save me hours of work every day.",
    name: "Sarah Chen",
    title: "Research Scientist at MIT",
    rating: 5,
    avatar: "SC",
    image:
      "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    quote:
      "DeepSearch has become an essential tool in my workflow. The accuracy and speed are unmatched.",
    name: "Emily Rodriguez",
    title: "Product Manager at Microsoft",
    rating: 5,
    avatar: "ER",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    quote:
      "The AI-powered search results are incredibly accurate and relevant. It's like having a research assistant that never sleeps.",
    name: "Alexandra Thompson",
    title: "PhD Student at Stanford",
    rating: 5,
    avatar: "AT",
    image:
      "https://images.unsplash.com/photo-1441123694162-e54a981ceba5?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    quote:
      "I've tried many search tools, but DeepSearch stands out with its intelligent filtering and comprehensive results.",
    name: "Maria Garcia",
    title: "Journalist at The New York Times",
    rating: 5,
    avatar: "MG",
    image:
      "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    quote:
      "DeepSearch has saved me countless hours of manual research. The AI really understands context.",
    name: "Lisa Park",
    title: "Consultant at McKinsey",
    rating: 5,
    avatar: "LP",
    image:
      "https://images.unsplash.com/photo-1439778615639-28529f7628bc?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 11,
    quote:
      "I'm amazed by how quickly DeepSearch can find relevant information from vast datasets. Game changer!",
    name: "Jennifer Lee",
    title: "Data Scientist at Netflix",
    rating: 5,
    avatar: "JL",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 13,
    quote:
      "DeepSearch has transformed my research methodology. The AI suggestions are always on point.",
    name: "Amanda White",
    title: "Research Fellow at Oxford",
    rating: 5,
    avatar: "AW",
    image:
      "https://images.unsplash.com/photo-1618085222100-93f0eecad0aa?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 15,
    quote:
      "I've never used a search tool this intelligent. DeepSearch anticipates my research needs perfectly.",
    name: "Rachel Green",
    title: "Policy Analyst at Brookings",
    rating: 5,
    avatar: "RG",
    image:
      "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Male testimonials (8)
  {
    id: 2,
    quote:
      "The search capabilities are incredible. I can find exactly what I need in seconds, not hours.",
    name: "Marcus Johnson",
    title: "Data Analyst at Google",
    rating: 5,
    avatar: "MJ",
    image:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    quote:
      "This tool has transformed how I approach complex research tasks. Highly recommended!",
    name: "David Kim",
    title: "Software Engineer at OpenAI",
    rating: 5,
    avatar: "DK",
    image:
      "https://plus.unsplash.com/premium_photo-1664476788423-7899ac87bd7f?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    quote:
      "DeepSearch has made my research process 10x more efficient. The quality of results is outstanding.",
    name: "James Wilson",
    title: "Research Director at Harvard",
    rating: 5,
    avatar: "JW",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    quote:
      "The interface is intuitive and the results are always spot-on. This is the future of research tools.",
    name: "Robert Chen",
    title: "Tech Lead at Meta",
    rating: 5,
    avatar: "RC",
    image:
      "https://plus.unsplash.com/premium_photo-1679888488670-4b4bf8e05bfc?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 10,
    quote:
      "The depth of information DeepSearch provides is remarkable. It's become my go-to research platform.",
    name: "Michael Brown",
    title: "Professor at Yale",
    rating: 5,
    avatar: "MB",
    image:
      "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    quote:
      "The search results are not just fast, they're incredibly insightful. DeepSearch understands what I'm really looking for.",
    name: "Christopher Taylor",
    title: "Investment Analyst at Goldman Sachs",
    rating: 5,
    avatar: "CT",
    image:
      "https://plus.unsplash.com/premium_photo-1666298858421-3765c17bcf80?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 14,
    quote:
      "The quality of search results is exceptional. DeepSearch consistently delivers exactly what I need.",
    name: "Daniel Martinez",
    title: "Senior Engineer at Tesla",
    rating: 5,
    avatar: "DM",
    image:
      "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 16,
    quote:
      "DeepSearch has made complex research tasks simple and efficient. The AI-powered insights are invaluable.",
    name: "Kevin Zhang",
    title: "Research Manager at IBM",
    rating: 5,
    avatar: "KZ",
    image:
      "https://images.unsplash.com/photo-1508341591423-4347099e1f19?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Custom Infinite Moving Cards with previous design
const CustomInfiniteMovingCards = ({
  items,
  direction = "left",
}: {
  items: typeof testimonials;
  direction?: "left" | "right";
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Left shadow gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

      {/* Right shadow gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-8 hover:[animation-play-state:paused]"
        style={{
          animation: `scroll-${direction} 200s linear infinite`,
          width: "max-content",
        }}
      >
        {/* First set of cards */}
        {items.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="flex flex-col justify-between w-[350px] md:w-[400px] p-6 hover:shadow-md transition-shadow flex-shrink-0 testimonials-section-card-shadow"
          >
            {/* Content */}
            <p className={`${styles.p} !p-0 italic w-full`}>
              "{testimonial.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {/* Duplicate set for seamless loop */}
        {items.map((testimonial) => (
          <Card
            key={`duplicate-${testimonial.id}`}
            className="flex flex-col justify-between w-[350px] md:w-[400px] p-6 hover:shadow-lg transition-shadow flex-shrink-0 testimonials-section-card-shadow"
          >
            {/* Content */}
            <p className={`${styles.p} !p-0 italic w-full`}>
              "{testimonial.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function Testimonials() {
  const router = useRouter();
  const { createChatRoom, chatRooms } = useChatRooms();

  const handleStartNewChat = () => {
    const newRoomId = createChatRoom();
    router.push(`/chat/${newRoomId}`);
  };

  return (
    <section className={"Section"}>
      <div className="container max-w-full mx-auto flex flex-col gap-8">
        {/* Header Content */}
        <div className="flex flex-col lg:gap-0 max-w-2xl mx-auto">
          <p className={`${styles.Xsmall} header-special-title`}>
            Testimonials from our users
          </p>

          <h2 className={`${styles.SectionH2} md:text-center`}>
            What Our Users Say
          </h2>

          <p className={`${styles.p} md:text-center`}>
            Hear from our users about their experience with DeepSearch.
          </p>
        </div>

        {/* 3 Rows of Infinite Moving Cards */}
        <div className="space-y-8">
          <style jsx>{`
            @keyframes scroll-left {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-50%);
              }
            }

            @keyframes scroll-right {
              from {
                transform: translateX(-50%);
              }
              to {
                transform: translateX(0);
              }
            }
          `}</style>

          {/* Row 1: Left to Right */}
          <CustomInfiniteMovingCards
            items={testimonials.slice(0, 8)}
            direction="left"
          />

          {/* Row 2: Right to Left */}
          <CustomInfiniteMovingCards
            items={testimonials.slice(8, 16)}
            direction="right"
          />

          {/* Row 3: Left to Right */}
          <CustomInfiniteMovingCards items={testimonials} direction="left" />
        </div>

        {/* CTA */}
        {/* <Button onClick={handleStartNewChat} className="w-fit mx-auto">
          Get Started Now <ArrowRight />
        </Button> */}
      </div>
    </section>
  );
}
