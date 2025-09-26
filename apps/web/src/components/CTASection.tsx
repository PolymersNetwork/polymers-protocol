"use client"

import { Button } from "./ui/button"

const CTASection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-gradient-to-br from-[#16651c] to-[#15801c] dark:from-[#16651c]/90 dark:to-[#15801c]/70 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,0.08)_50%,transparent_65%)] bg-[length:24px_24px]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none">
        <div className="w-full h-full opacity-20 dark:opacity-10 bg-green-400 blur-[120px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Heading + description */}
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-medium tracking-widest text-white/70 uppercase">
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Join the Recycling Revolution
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Whether you’re an individual recycler, a community, or a corporate partner —
            recycling is now profitable, traceable, and engaging.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button className="bg-white text-[#16651c] hover:bg-white/90 text-base h-12 px-8 transition-all duration-200 shadow-lg hover:shadow-xl font-medium rounded-lg">
            Start Recycling
          </Button>
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white text-base h-12 px-8 transition-all duration-200 shadow-lg hover:shadow-xl font-medium rounded-lg bg-transparent hover:border-white/50"
          >
            Partner with Us
          </Button>
        </div>

        {/* Footer text */}
        <p className="pt-4 text-xs sm:text-sm text-white/80">
          Join thousands earning rewards • No fees • Instant token rewards
        </p>
      </div>
    </section>
  )
}

export default CTASection
