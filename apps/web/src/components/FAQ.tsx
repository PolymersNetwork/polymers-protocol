"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I earn PLY tokens?",
    answer:
      "You earn PLY tokens by recycling materials at smart bins, participating in community challenges, and completing verification tasks. Each recycling action is verified through our IoT sensors and blockchain technology.",
  },
  {
    question: "What's the difference between PLY and CARB tokens?",
    answer:
      "PLY is our primary utility token used for governance and rewards, while CARB tokens are earned specifically for recycling actions and can be converted to carbon credits or staked for additional rewards.",
  },
  {
    question: "How does corporate ESG tracking work?",
    answer:
      "Our platform provides real-time ESG metrics, carbon footprint tracking, and compliance reporting. Companies can monitor their environmental impact, set sustainability goals, and generate automated reports for stakeholders.",
  },
  {
    question: "How is recycling verified on the platform?",
    answer:
      "We use IoT sensors in smart bins, computer vision for material recognition, and blockchain technology to create immutable records of recycling activities. This ensures accurate tracking and prevents fraud.",
  },
  {
    question: "What is DePIN and how does it relate to recycling?",
    answer:
      "DePIN (Decentralized Physical Infrastructure Networks) allows us to create a distributed network of smart recycling bins. Participants can operate nodes, earn rewards, and contribute to building sustainable infrastructure.",
  },
  {
    question: "Can I trade my tokens?",
    answer:
      "Yes, PLY and CARB tokens can be traded on supported DEXs. However, some tokens may have vesting periods or staking requirements. Check your wallet for specific token details and trading availability.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Yes, our mobile app is available for iOS and Android. It includes QR/NFC scanning, wallet functionality, gamification features, and real-time recycling tracking. Download it from your app store.",
  },
  {
    question: "What wallets are supported?",
    answer:
      "We support major Solana wallets including Phantom, Solflare, and Backpack. You can also use our embedded wallet for a seamless onboarding experience without needing external wallet setup.",
  },
  {
    question: "How does the gamification system work?",
    answer:
      "Earn XP points, unlock achievements, collect NFT eco-badges, and compete on leaderboards. Complete daily challenges, maintain recycling streaks, and participate in community events to maximize your rewards.",
  },
  {
    question: "Are there any fees for using the platform?",
    answer:
      "The mobile app is free to use. Corporate dashboard starts at $299/month. Transaction fees apply for token swaps and transfers, but basic recycling and earning rewards has no fees.",
  },
  {
    question: "How do I get started?",
    answer:
      "Download our mobile app, create an account, connect your wallet (or use our embedded wallet), find nearby smart bins using our map, and start recycling to earn your first tokens!",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="faq"
      className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-background"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-xs sm:text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">
            Help Center
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Polymers Network, recycling
            rewards, and our blockchain ecosystem.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 sm:px-6 py-4 text-left flex items-start justify-between hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-inset"
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="font-medium text-foreground pr-4 text-sm sm:text-base leading-relaxed">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-0.5 ${
                    openItems.includes(index) ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {openItems.includes(index) && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-4 sm:px-6 pb-4 pt-0">
                      <div className="text-muted-foreground leading-relaxed text-sm sm:text-base border-t border-border pt-4">
                        {item.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm sm:text-base">
            Still have questions?{" "}
            <a
              href="mailto:support@polymers.network"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}