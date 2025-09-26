"use client"

import { useState, createContext, useContext, ReactNode } from "react"

type Route = "home" | "tokenomics" | "dashboard" | "about" | "privacy" | "terms"

interface RouterContextType {
  currentRoute: Route
  navigate: (route: Route) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

export function Router({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<Route>("home")

  const navigate = (route: Route) => {
    setCurrentRoute(route)
    // Update URL hash for browser history
    window.history.pushState({}, "", route === "home" ? "/" : `#${route}`)
  }

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error("useRouter must be used within a Router")
  }
  return context
}