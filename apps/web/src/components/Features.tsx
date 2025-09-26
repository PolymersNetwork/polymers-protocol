"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronRight, Layers, Grid3x3, LayoutDashboard, ListCheck, Star, BookOpen } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  expandedDescription: string;
  icon: React.JSX.Element;
}

export default function Features() {
  const [openFeature, setOpenFeature] = useState<number | null>(null);

  const features: Feature[] = [
    {
      title: "Smart Recycling Bins",
      description:
        "IoT-enabled bins with NFC/QR scanning and AI-assisted contamination detection.",
      expandedDescription:
        "Advanced sensors, real-time monitoring, and AI-powered contamination detection. Each recycling action is verified via NFC/QR, weight sensors, geolocation, and timestamp for maximum accuracy.",
      icon: <Layers size={26} className="text-[#15801c]" />,
    },
    {
      title: "Tokenized Rewards",
      description: "Earn CARB, PLY, and CRT tokens for verified recycling and eco-actions.",
      expandedDescription:
        "Every verified recycling action earns blockchain tokens. Build loyalty streaks, join community challenges, and convert environmental impact into digital assets for staking or trading.",
      icon: <Grid3x3 size={26} className="text-[#15801c]" />,
    },
    {
      title: "Gamified Engagement",
      description: "Leaderboards, eco-badges, Wayfinder maps, and community challenges.",
      expandedDescription:
        "Compete via leaderboards, unlock eco-badges, discover nearby recycling opportunities with Wayfinder maps, and participate in seasonal challenges for exclusive rewards.",
      icon: <LayoutDashboard size={26} className="text-[#15801c]" />,
    },
    {
      title: "Corporate ESG & Carbon Credits",
      description: "Traceable recycling data and tokenized ESG/CRT credits for businesses.",
      expandedDescription:
        "Businesses gain ESG tracking with verified data, automated compliance reporting, and tokenized carbon credits. Track impact in real-time and meet sustainability goals.",
      icon: <ListCheck size={26} className="text-[#15801c]" />,
    },
    {
      title: "Decentralized Validation (DePIN)",
      description:
        "Community and corporate nodes verify recycling events and earn staking rewards.",
      expandedDescription:
        "Join the decentralized physical infrastructure network as a node operator. Validate recycling events, earn staking rewards, and secure the global recycling verification network.",
      icon: <Star size={26} className="text-[#15801c]" />,
    },
    {
      title: "Analytics & Dashboard",
      description:
        "Real-time dashboards, predictive insights, and recycling trend visualizations.",
      expandedDescription:
        "Access analytics through the dashboard. Track personal recycling impact, view predictive insights, and analyze trends to maximize contributions and token rewards.",
      icon: <BookOpen size={26} className="text-[#15801c]" />,
    },
  ];

  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };

  return (
    <section id="features" className="w-full py-14 md:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-14">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="text-xs sm:text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">
            CORE FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Why Choose Our Ecosystem?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
            A blockchain-powered recycling ecosystem that rewards environmental action.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`rounded-xl border transition-all duration-300 shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-[#16651c]/40 ${
                openFeature === index
                  ? "border-[#16651c]/50 shadow-[#16651c]/10"
                  : "border-border hover:border-[#16651c]/30"
              } bg-card`}
            >
              <CollapsibleTrigger className="w-full text-left p-6 flex flex-col focus:outline-none group">
                <div className="flex justify-start items-center mb-5">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-[#16651c]/10 to-[#15801c]/20 flex items-center justify-center shadow-sm mr-4">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{feature.description}</p>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:text-[#16651c] ${
                      openFeature === index ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-6 pb-6 pt-0">
                <div className="pt-3 border-t border-border">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                    {feature.expandedDescription}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
