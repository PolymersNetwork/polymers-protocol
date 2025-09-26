"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  Recycle,
  Coins,
  TrendingUp,
  Target,
  Calendar,
  Award,
  MapPin,
  Users,
  BarChart3,
  Leaf,
  Zap,
  Timer
} from "lucide-react"
import { useAuth } from "./AuthProvider"

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please sign in to view your dashboard.</div>
  }

  const stats = [
    {
      title: "Total PLY Earned",
      value: user.total_tokens_earned.toLocaleString(),
      icon: Coins,
      change: "+125 this week",
      color: "text-[#16651c]"
    },
    {
      title: "Recycled Weight",
      value: `${user.total_recycled_weight} kg`,
      icon: Recycle,
      change: "+12.5kg this week",
      color: "text-blue-600"
    },
    {
      title: "ESG Score",
      value: user.esg_score,
      icon: Target,
      change: "+5 points",
      color: "text-green-600"
    },
    {
      title: "Carbon Offset",
      value: "2.8 tons",
      icon: Leaf,
      change: "+0.3 tons",
      color: "text-emerald-600"
    }
  ]

  const recentActivities = [
    {
      type: "recycle",
      description: "Recycled 5 plastic bottles",
      reward: "+25 PLY",
      time: "2 hours ago",
      location: "Smart Bin #A123"
    },
    {
      type: "achievement",
      description: "Earned 'Eco Warrior' badge",
      reward: "+100 PLY Bonus",
      time: "1 day ago",
      location: "Achievement System"
    },
    {
      type: "recycle",
      description: "Recycled electronics",
      reward: "+50 PLY",
      time: "2 days ago",
      location: "Smart Bin #B456"
    },
    {
      type: "stake",
      description: "Staked 500 PLY tokens",
      reward: "5% APY",
      time: "3 days ago",
      location: "Staking Pool"
    }
  ]

  const achievements = [
    { name: "First Recycle", description: "Complete your first recycling action", earned: true },
    { name: "Eco Warrior", description: "Recycle 100kg of materials", earned: true },
    { name: "Token Master", description: "Earn 1000 PLY tokens", earned: true },
    { name: "Community Leader", description: "Refer 10 friends", earned: false },
    { name: "Carbon Neutral", description: "Offset 5 tons of CO2", earned: false },
    { name: "Sustainability Expert", description: "Maintain 90+ ESG score for 30 days", earned: false },
  ]

  const monthlyGoals = [
    { goal: "Recycle 50kg materials", current: 35, target: 50, unit: "kg" },
    { goal: "Earn 500 PLY tokens", current: 350, target: 500, unit: "PLY" },
    { goal: "Visit 10 smart bins", current: 7, target: 10, unit: "bins" },
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user.username || 'Recycler'}! 👋
              </h1>
              <p className="text-muted-foreground">
                Track your recycling impact and earn rewards
              </p>
            </div>
            <Badge variant="secondary" className="bg-[#16651c]/10 text-[#16651c] border-[#16651c]/20">
              Level 5 Eco Warrior
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-xs sm:text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-[#16651c]" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest recycling actions and rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg border border-border hover:border-[#16651c]/30 transition-colors">
                    <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                      <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'recycle' ? 'bg-[#16651c]/10' :
                        activity.type === 'achievement' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        {activity.type === 'recycle' ? <Recycle className="h-4 w-4 sm:h-5 sm:w-5 text-[#16651c]" /> :
                         activity.type === 'achievement' ? <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" /> :
                         <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base">{activity.description}</p>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{activity.location}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">{activity.time}</span>
                        </div>
                        <div className="sm:hidden text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-[#16651c]/10 text-[#16651c] text-xs sm:text-sm ml-2">
                      {activity.reward}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Monthly Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#16651c]" />
                  Monthly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {monthlyGoals.map((goal, index) => {
                  const progress = (goal.current / goal.target) * 100
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{goal.goal}</span>
                        <span className="text-muted-foreground">
                          {goal.current}/{goal.target} {goal.unit}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#16651c]" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'border-[#16651c]/20 bg-[#16651c]/5' 
                      : 'border-border bg-muted/30'
                  }`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-[#16651c] text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Award className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#16651c]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-[#16651c] hover:bg-[#15801c] text-white">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Smart Bins
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}