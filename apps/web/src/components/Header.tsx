"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu, X } from "lucide-react"
import Logo from "./Logo"
import WalletButton from "./WalletButton"
import ThemeToggle from "./ThemeToggle"
import { useRouter } from "./Router"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { navigate } = useRouter()

  const navigation = [
    { name: "Home", href: "home" },
    { name: "Features", href: "#features" },
    { name: "Tokenomics", href: "tokenomics" },
    { name: "Dashboard", href: "dashboard" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - responsive sizing */}
        <Logo size="small" className="md:hidden" />
        <Logo size="default" className="hidden md:flex" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navigation.map((item) => (
            item.href.startsWith('#') ? (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-[#16651c] transition-colors duration-200"
              >
                {item.name}
              </a>
            ) : (
              <button
                key={item.name}
                onClick={() => navigate(item.href as any)}
                className="text-sm font-medium text-muted-foreground hover:text-[#16651c] transition-colors duration-200"
              >
                {item.name}
              </button>
            )
          ))}
        </nav>

        {/* Desktop CTA - responsive visibility */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <WalletButton />
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px] px-4">
            <div className="flex flex-col h-full">
              {/* Logo in Mobile Menu */}
              <div className="flex items-center justify-between mb-6 pt-2">
                <Logo size="default" />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1">
                <nav className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    item.href.startsWith('#') ? (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-foreground hover:text-[#16651c] transition-colors py-3 px-2 rounded-md hover:bg-[#16651c]/5 font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigate(item.href as any)
                          setIsOpen(false)
                        }}
                        className="text-foreground hover:text-[#16651c] transition-colors py-3 px-2 rounded-md hover:bg-[#16651c]/5 text-left font-medium"
                      >
                        {item.name}
                      </button>
                    )
                  ))}
                </nav>

                <div className="pt-6 mt-6 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                  <WalletButton />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}