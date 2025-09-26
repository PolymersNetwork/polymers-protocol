"use client";

import { useState, useEffect } from "react";

export default function Partnership() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const partners = [
    {
      name: "Solana",
      description: "Blockchain Infrastructure",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          {/* Replace with official Solana logo SVG */}
          <img src="/logos/solana.svg" alt="Solana" className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Helium",
      description: "IoT Network",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logos/helium.svg" alt="Helium" className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Jupiter",
      description: "DeFi Aggregator",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logos/jupiter.svg" alt="Jupiter" className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Helius",
      description: "RPC Infrastructure",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logos/helius.svg" alt="Helius" className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Raydium",
      description: "AMM & Liquidity",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logos/raydium.svg" alt="Raydium" className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Meteora",
      description: "Yield Farming",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logos/meteora.svg" alt="Meteora" className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "OpenAI",
      description: "AI Integration",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logos/openai.svg" alt="OpenAI" className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Dialect",
      description: "Web3 Messaging",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logos/dialect.svg" alt="Dialect" className="w-8 h-8" />
        </div>
      ),
    },
    {
      name: "Metaplex",
      description: "NFT Infrastructure",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logos/metaplex.svg" alt="Metaplex" className="w-8 h-8" />
        </div>
      ),
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(partners.length / 3));
    }, 3000);
    return () => clearInterval(timer);
  }, [partners.length]);

  const getVisiblePartners = () => {
    const partnersPerSlide = 3;
    const start = currentIndex * partnersPerSlide;
    const end = start + partnersPerSlide;
    return partners.slice(start, end);
  };

  const totalSlides = Math.ceil(partners.length / 3);

  return (
    <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-gray-50/50 dark:bg-black/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-gray-500 uppercase bg-gray-100 rounded-full mb-3 sm:mb-4">
            Powered By
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
            Trusted Partners & Infrastructure
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Built on industry-leading technologies and partnerships that power our decentralized recycling ecosystem
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 transition-all duration-500 ease-in-out">
            {getVisiblePartners().map((partner, index) => (
              <div
                key={`${partner.name}-${currentIndex}-${index}`}
                className="flex flex-col items-center text-center group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4 p-4 rounded-2xl bg-white shadow-sm group-hover:shadow-md transition-all duration-300 border border-gray-100 dark:bg-card dark:border-border">
                  {partner.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-[#16651c] transition-colors">
                  {partner.name}
                </h3>
                <p className="text-sm text-muted-foreground">{partner.description}</p>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="hidden md:flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#16651c] w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Leveraging cutting-edge blockchain, AI, and IoT technologies to create a sustainable future
          </p>
        </div>
      </div>
    </section>
  );
}
