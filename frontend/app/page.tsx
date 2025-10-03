"use client";

// Internal imports - utilities
import { cn } from "@/lib/utils";

// Internal imports - styles
import styles from "@/styles";

// Internal imports - components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Internal imports - sections
import HeroSection from "@/sections/landing/HeroSection";
import FeaturesSection from "@/sections/landing/FeaturesSection";
import ReasonsSection from "@/sections/landing/ReasonsSectios";
import JoinUSSection from "@/sections/landing/JoinUsSection";
import Testimonials from "@/sections/landing/Testimonials";

export default function Home() {
  return (
    <div
      className={cn(
        " relative w-full h-full border border-secondary-foreground/10 shadow flex flex-col overflow-hidden ",
        styles.sectionsBorderRadius
      )}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex flex-col w-full">
          {/* Hero Section */}
          <HeroSection />

          {/* Features section */}
          <FeaturesSection />

          {/* Reasons section */}
          <ReasonsSection />

          {/* Testimonials section */}
          <Testimonials />

          {/* Join US section */}
          <JoinUSSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
