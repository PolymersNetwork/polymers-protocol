"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import {
  PieChart,
  BarChart,
  TrendingUp,
  Users,
  Coins,
  Target,
  Copy,
  ShoppingCart,
  Flame,
  Calculator,
  Calendar,
  Clock,
} from "lucide-react"
import { useState } from "react"

export default function TokenomicsPage() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const tokenDistribution = [
    { category: "Community Rewards", percentage: 30, color: "#16a34a", amount: "5.532B PLY", value: 30 },
    { category: "Ecosystem Development", percentage: 25, color: "#059669", amount: "4.61B PLY", value: 25 },
    { category: "Team", percentage: 15, color: "#0d9488", amount: "2.766B PLY", value: 15 },
    { category: "Partnership & Marketing", percentage: 15, color: "#0f766e", amount: "2.766B PLY", value: 15 },
    { category: "Treasury Reserve", percentage: 10, color: "#134e4a", amount: "1.844B PLY", value: 10 },
    { category: "Liquidity Pool", percentage: 5, color: "#22c55e", amount: "0.922B PLY", value: 5 },
  ]

  const vestingSchedule = [
    {
      category: "Team",
      totalTokens: "2.766B PLY",
      cliff: "12 months",
      vestingPeriod: "36 months",
      monthlyRelease: "2.31%",
      description: "Linear vesting after 1-year cliff",
      progress: 15
    },
    {
      category: "Advisors",
      totalTokens: "0.922B PLY",
      cliff: "6 months",
      vestingPeriod: "24 months",
      monthlyRelease: "4.17%",
      description: "Linear vesting after 6-month cliff",
      progress: 35
    },
    {
      category: "Private Sale",
      totalTokens: "1.844B PLY",
      cliff: "3 months",
      vestingPeriod: "18 months",
      monthlyRelease: "5.56%",
      description: "Linear vesting after 3-month cliff",
      progress: 55
    },
    {
      category: "Public Sale",
      totalTokens: "0.922B PLY",
      cliff: "0 months",
      vestingPeriod: "12 months",
      monthlyRelease: "8.33%",
      description: "Immediate unlock with linear vesting",
      progress: 85
    },
  ]

  const tokenMetrics = [
    { label: "Total Supply", value: "18,440,000,000 PLY", icon: Coins },
    { label: "Circulating Supply", value: "11,000,000,000 PLY", icon: Users },
    { label: "Market Cap", value: "$42.5M", icon: TrendingUp },
    { label: "Current Price", value: "$0.00385", icon: Target },
  ]

  const burnSchedule = [
    { quarter: "Q4 2025", remaining: 10850_000_000, burned: 150_000_000 },
    { quarter: "Q1 2026", remaining: 10783_750_000, burned: 66_250_000 },
    { quarter: "Q2 2026", remaining: 10717_500_000, burned: 66_250_000 },
    { quarter: "Q3 2026", remaining: 10651_250_000, burned: 66_250_000 },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(text)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 bg-gradient-to-br from-[#16651c] to-[#22c55e] rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-balance">Tokenomics</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Understand the economic model behind Polymers native token and its role in creating a sustainable recycling
            ecosystem.
          </p>
        </div>

        {/* Token Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tokenMetrics.map((metric, idx) => (
            <Card
              key={idx}
              className="hover:shadow-lg hover:shadow-[#16651c]/20 transition-all duration-300 border-[#16651c]/10 shadow-md"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-[#16651c]" />
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground break-words">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Token Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg hover:shadow-[#16651c]/20 transition-all duration-300 border-[#16651c]/10 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[#16651c]" />
                Token Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tokenDistribution.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-[#16651c] font-mono text-sm">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">{item.amount}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg hover:shadow-[#16651c]/20 transition-all duration-300 border-[#16651c]/10 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#16651c]" />
                PLY Token Use Cases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border hover:border-[#16651c]/30 transition-colors shadow-sm">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#16651c]" />
                    Recycling Rewards
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Earn PLY tokens for verified recycling activities through IoT-enabled smart bins
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border hover:border-[#16651c]/30 transition-colors shadow-sm">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#16651c]" />
                    Staking & Governance
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Stake PLY to participate in protocol governance and earn additional rewards
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border hover:border-[#16651c]/30 transition-colors shadow-sm">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-[#16651c]" />
                    Marketplace Payments
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Use PLY for eco-products, carbon credits, and premium features
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vesting Schedule */}
        <Card className="hover:shadow-lg hover:shadow-[#16651c]/20 transition-all duration-300 border-[#16651c]/10 shadow-md mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#16651c]" />
              Vesting Schedule & Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {vestingSchedule.map((schedule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-border hover:border-[#16651c]/30 transition-colors shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-foreground">{schedule.category}</h4>
                  <span className="text-sm font-mono text-[#16651c]">{schedule.totalTokens}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Cliff: {schedule.cliff}
                  </div>
                  <div>Vesting: {schedule.vestingPeriod}</div>
                  <div>Monthly: {schedule.monthlyRelease}</div>
                  <div className="text-[#16651c] font-medium">Progress: {schedule.progress}%</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Vesting Progress</span>
                    <span>{schedule.progress}%</span>
                  </div>
                  <Progress value={schedule.progress} className="h-2" />
                </div>

                <p className="text-xs text-muted-foreground mt-2">{schedule.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Burn Schedule and Contract */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="hover:shadow-lg hover:shadow-[#16651c]/20 transition-all duration-300 border-[#16651c]/10 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#16651c]" />
                Quarterly Burn Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {burnSchedule.map((item, idx) => {
                const burnPercent = ((item.remaining / 11_000_000_000) * 100).toFixed(2)
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.quarter}</span>
                      <span className="text-[#16651c] font-mono text-sm">{item.burned.toLocaleString()} PLY</span>
                    </div>
                    <Progress value={Number(burnPercent)} className="h-2" />
                    <div className="text-xs text-muted-foreground">{burnPercent}% remaining supply</div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg hover:shadow-[#16651c]/20 transition-all duration-300 border-[#16651c]/10 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#16651c]" />
                Contract Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-2">Token Contract</div>
                <div className="text-sm font-mono text-foreground break-all bg-muted p-3 rounded-md border flex items-center justify-between">
                  <span>PLYKdaCUgxTUw6rSjWbgSN97Qtecb6Fy6SazWf1tvAC</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard("PLYKdaCUgxTUw6rSjWbgSN97Qtecb6Fy6SazWf1tvAC")}
                    className="ml-2 h-8 w-8 p-0 hover:bg-[#16651c]/10"
                  >
                    <Copy className="w-3 h-3 text-[#16651c]" />
                  </Button>
                </div>
                {copiedAddress === "PLYKdaCUgxTUw6rSjWbgSN97Qtecb6Fy6SazWf1tvAC" && (
                  <div className="text-xs text-[#16651c] mt-1">Copied!</div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs border-[#16651c] text-[#16651c] hover:bg-[#16651c] hover:text-white transition-all duration-300"
                >
                  <PieChart className="w-3 h-3 mr-1" />
                  View on Solscan
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-[#16651c] to-[#15801c] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Buy PLY
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="border-yellow-500/20 bg-yellow-500/5 shadow-md">
          <CardHeader>
            <CardTitle className="text-yellow-600 dark:text-yellow-400">⚠️ Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              PLY tokens are utility tokens designed for use within the Polymers ecosystem. They are not
              investment securities and should not be purchased for speculative purposes. Token distribution and
              economics are subject to change based on network governance decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}