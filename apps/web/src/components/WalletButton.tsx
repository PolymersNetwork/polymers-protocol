"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Wallet, ChevronDown, Loader2, LogIn, UserPlus, Play } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useAuth } from "./AuthProvider"

export default function WalletButton() {
  const [open, setOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"wallet" | "signin" | "signup">("wallet")
  const { user, isAuthenticated, isLoading, login, logout } = useAuth()

  const walletProviders = [
    {
      id: "phantom",
      name: "Phantom",
      type: "Solana",
      description: "Connect with Phantom wallet",
      icon: "/icons/wallets/phantom.svg",
      installed: typeof window !== "undefined" && (window as any).solana?.isPhantom,
    },
    {
      id: "solflare",
      name: "Solflare",
      type: "Solana",
      description: "Connect with Solflare wallet",
      icon: "/icons/wallets/solflare.svg",
      installed: typeof window !== "undefined" && (window as any).solflare,
    },
    {
      id: "backpack",
      name: "Backpack",
      type: "Solana",
      description: "Connect with Backpack wallet",
      icon: "/icons/wallets/backpack.png",
      installed: typeof window !== "undefined" && (window as any).backpack,
    },
  ]

  const handleConnect = async (providerId: string) => {
    try {
      const mockAddress = `${providerId}_wallet_${Math.random().toString(36).substr(2, 9)}`
      await login({ walletAddress: mockAddress })
      setOpen(false)
    } catch (error) {
      console.error("Wallet connection failed:", error)
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    try {
      await login({ email, password })
      setOpen(false)
    } catch (error) {
      console.error("Sign in failed:", error)
    }
  }

  const handleSignUp = async (email: string, password: string, username: string) => {
    try {
      await login({ email })
      setOpen(false)
    } catch (error) {
      console.error("Sign up failed:", error)
    }
  }

  const handleDemoAccess = async () => {
    try {
      await login({ walletAddress: "demo_user_12345" })
      setOpen(false)
    } catch (error) {
      console.error("Demo access failed:", error)
    }
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-card/50 backdrop-blur-sm border border-[#16651c]/20 rounded-lg shadow-sm">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gradient-to-br from-[#16651c] to-[#22c55e] rounded-full flex items-center justify-center">
              <span className="text-[8px] text-white">P</span>
            </div>
            <span className="text-sm font-semibold text-[#16651c]">
              {user.total_tokens_earned.toLocaleString()} PLY
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-sm font-medium text-[#15801c]">{user.esg_score} ESG</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="border-[#16651c]/30 hover:border-[#16651c]/50 bg-transparent hover:bg-[#16651c]/5"
        >
          <Wallet className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">
            {user.username ||
              (user.wallet_address?.includes("demo")
                ? "Demo User"
                : `${user.wallet_address?.slice(0, 4)}...${user.wallet_address?.slice(-4)}`)}
          </span>
          <span className="sm:hidden">
            {user.wallet_address?.includes("demo") ? "Demo" : "Wallet"}
          </span>
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="bg-gradient-to-b from-[#16651c] to-[#15801c] hover:from-[#15801c] hover:to-[#14531a] text-white shadow-lg shadow-[#16651c]/25 hover:shadow-[#16651c]/40 transition-all duration-300"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-md border border-border/50">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#16651c] to-[#22c55e] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
          </div>
          <DialogTitle className="font-semibold text-center">Welcome to Polymers</DialogTitle>
        </DialogHeader>

        <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="wallet" className="text-xs">Wallet</TabsTrigger>
            <TabsTrigger value="signin" className="text-xs">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="text-xs">Sign Up</TabsTrigger>
          </TabsList>

          {/* Wallet Connect */}
          <TabsContent value="wallet" className="space-y-3 mt-4">
            <div className="text-sm text-muted-foreground text-center mb-4">
              Connect your Solana wallet to get started
            </div>
            {walletProviders.map((provider) => (
              <Button
                key={provider.id}
                variant="outline"
                onClick={() => handleConnect(provider.id)}
                disabled={isLoading}
                className="w-full justify-start h-14 border-border/50 hover:border-[#16651c]/30 hover:bg-[#16651c]/5 transition-all duration-200"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-3 animate-spin text-[#16651c]" />
                ) : (
                  <img
                    src={provider.icon}
                    alt={`${provider.name} icon`}
                    className="w-8 h-8 mr-3 rounded"
                  />
                )}
                <div className="flex flex-col items-start flex-1">
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-medium">{provider.name}</span>
                    {!provider.installed && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-orange-100 text-orange-700 border-orange-200"
                      >
                        Install
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-light text-muted-foreground">{provider.type}</span>
                </div>
              </Button>
            ))}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleDemoAccess}
              disabled={isLoading}
              className="w-full border-[#16651c]/30 hover:border-[#16651c]/50 hover:bg-[#16651c]/5 bg-transparent"
            >
              <Play className="w-4 h-4 mr-2" />
              Try Demo Account
            </Button>
          </TabsContent>

          {/* Sign In */}
          <TabsContent value="signin" className="space-y-4 mt-4">
            <SignInForm onSubmit={handleSignIn} loading={isLoading} />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleDemoAccess}
              disabled={isLoading}
              className="w-full border-[#16651c]/30 hover:border-[#16651c]/50 hover:bg-[#16651c]/5 bg-transparent"
            >
              <Play className="w-4 h-4 mr-2" />
              Try Demo Account
            </Button>
          </TabsContent>

          {/* Sign Up */}
          <TabsContent value="signup" className="space-y-4 mt-4">
            <SignUpForm onSubmit={handleSignUp} loading={isLoading} />
          </TabsContent>
        </Tabs>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
          Start earning PLY tokens and CRT credits through recycling
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* --------------------
   Sign In Form
-------------------- */
interface FormProps {
  onSubmit: (email: string, password: string, username?: string) => void
  loading: boolean
}

function SignInForm({ onSubmit, loading }: FormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-border/50 focus:border-[#16651c] focus:ring-[#16651c]/20"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-border/50 focus:border-[#16651c] focus:ring-[#16651c]/20"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-b from-[#16651c] to-[#15801c] hover:from-[#15801c] hover:to-[#14531a] text-white shadow-lg shadow-[#16651c]/25"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing In...
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4 mr-2" /> Sign In
          </>
        )}
      </Button>
    </form>
  )
}

/* --------------------
   Sign Up Form
-------------------- */
function SignUpForm({ onSubmit, loading }: FormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password, username)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-username">Username</Label>
        <Input
          id="signup-username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border-border/50 focus:border-[#16651c] focus:ring-[#16651c]/20"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-border/50 focus:border-[#16651c] focus:ring-[#16651c]/20"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-border/50 focus:border-[#16651c] focus:ring-[#16651c]/20"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-b from-[#16651c] to-[#15801c] hover:from-[#15801c] hover:to-[#14531a] text-white shadow-lg shadow-[#16651c]/25"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating Account...
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4 mr-2" /> Sign Up
          </>
        )}
      </Button>
    </form>
  )
}
