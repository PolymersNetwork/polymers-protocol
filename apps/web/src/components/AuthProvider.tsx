"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  wallet_address?: string
  username?: string
  email?: string
  created_at: string
  total_recycled_weight: number
  total_tokens_earned: number
  esg_score: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: { email?: string; password?: string; walletAddress?: string }) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const isAuthenticated = !!user

  const login = async (credentials: { email?: string; password?: string; walletAddress?: string }) => {
    setIsLoading(true)
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: "user_123",
        wallet_address: credentials.walletAddress || "demo_wallet_address",
        username: credentials.email?.split('@')[0] || "demo_user",
        email: credentials.email || "demo@polymers.network",
        created_at: new Date().toISOString(),
        total_recycled_weight: 125.5,
        total_tokens_earned: 1250,
        esg_score: 85
      }
      
      setUser(mockUser)
      localStorage.setItem("auth_token", "mock_token_123")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      // Simulate checking existing session
      const mockUser: User = {
        id: "user_123",
        wallet_address: "demo_wallet_address",
        username: "demo_user",
        email: "demo@polymers.network",
        created_at: new Date().toISOString(),
        total_recycled_weight: 125.5,
        total_tokens_earned: 1250,
        esg_score: 85
      }
      setUser(mockUser)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}