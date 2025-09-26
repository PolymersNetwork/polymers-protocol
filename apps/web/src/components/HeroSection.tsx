"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "./Router";

export default function HeroSection() {
  const { navigate } = useRouter();
  const useCases = [
    "Gamified ESG Tracking",
    "Corporate Recycling Rewards",
    "IoT Smart Bin Management",
    "NFT & Carbon Credit Integration",
  ];

  const [currentUseCase, setCurrentUseCase] = useState(0);

  // Cycle through use cases
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUseCase((prev) => (prev + 1) % useCases.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-14 md:pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Sustainable Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,101,28,0.1),transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] py-8 sm:py-12 lg:py-16">
          <div className="text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto w-full">

            {/* Label */}
            <div className="text-xs sm:text-sm font-medium tracking-widest text-muted-foreground uppercase">
              THE FUTURE OF RECYCLING
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              ESG Dashboard & Rewards
            </h1>

            {/* Dynamic Use-case */}
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#16651c] animate-pulse transition-all duration-500">
              {useCases[currentUseCase]}
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Track recycling, earn{" "}
              <span className="font-bold text-white bg-[#16651c] px-2 py-1 rounded-md">
                $PLY
              </span>{" "}
              tokens, and unlock sustainability milestones. Join a gamified ESG
              ecosystem for individuals & businesses.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 px-4 sm:px-0">
              <Button
                size="default"
                onClick={() => navigate("dashboard")}
                className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-[#16651c] to-[#22c55e] text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm sm:text-base text-center"
              >
                Get Started
              </Button>
              <Button
                size="default"
                variant="outline"
                className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 rounded-md border-2 border-[#16651c]/30 text-[#16651c] hover:bg-[#16651c] hover:text-white bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-[#16651c] font-medium text-sm sm:text-base text-center"
              >
                Documentation
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
