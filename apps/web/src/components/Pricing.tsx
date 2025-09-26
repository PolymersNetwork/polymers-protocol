import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Check, Star } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Personal",
    price: "Free",
    period: "",
    description:
      "Perfect for individuals getting started with sustainable recycling",
    features: [
      "Mobile app access",
      "Basic token earning",
      "Personal dashboard",
      "Recycling tracking",
      "Community leaderboards",
      "Basic rewards",
    ],
  },
  {
    name: "Business",
    price: "$299",
    period: "/month",
    description:
      "Ideal for companies wanting to track ESG metrics and engage employees",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Everything in Personal",
      "Corporate dashboard",
      "ESG reporting",
      "Employee engagement tools",
      "Custom challenges",
      "API access",
      "Priority support",
      "Carbon credit tracking",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "For large organizations needing advanced features and custom solutions",
    features: [
      "Everything in Business",
      "White-label solutions",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
      "On-premise deployment",
      "Custom token economics",
      "SLA guarantees",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-gray-50/80 to-gray-100/40 dark:from-black/20 dark:to-black/40">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="text-xs sm:text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">
            PRICING PLANS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Choose the plan that's right for you. Start free and scale as you grow your sustainability impact.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative border transition-all duration-300 hover:shadow-xl ${
                tier.highlighted
                  ? "border-[#16651c] shadow-xl scale-105 bg-gradient-to-b from-white via-white to-[#16651c]/5 ring-2 ring-[#16651c]/20 dark:from-card dark:via-card dark:to-[#16651c]/5"
                  : "border-gray-200 hover:border-[#16651c]/40 bg-white shadow-md hover:shadow-lg dark:bg-card dark:border-border dark:hover:border-[#16651c]/40"
              } rounded-xl overflow-hidden backdrop-blur-sm`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-[#16651c] to-[#22c55e] text-white px-4 py-1.5 shadow-lg border-0 font-medium">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center space-y-4 pb-6">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                    {tier.period && (
                      <span className="text-muted-foreground ml-1">{tier.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? "text-[#16651c]" : "text-muted-foreground"}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Get Started Button */}
                <div className="flex justify-center">
                  <button
                    className={`w-full max-w-xs h-12 rounded-lg font-medium text-center transition-all duration-300 ${
                      tier.highlighted
                        ? "bg-gradient-to-b from-[#16651c] to-[#15801c] text-white hover:from-[#15801c] hover:to-[#14531a]"
                        : "bg-white border-2 border-[#16651c] text-[#16651c] hover:bg-gradient-to-b hover:from-[#16651c] hover:to-[#15801c] hover:text-white dark:bg-card dark:hover:bg-[#16651c]"
                    }`}
                  >
                    {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            All plans include basic support. Need something custom?{" "}
            <a href="#contact" className="text-[#16651c] hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

