import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import Partnership from "./components/Partnership"
import Features from "./components/Features"
import Testimonials from "./components/Testimonials"
import CTASection from "./components/CTASection"
import Pricing from "./components/Pricing"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"
import TokenomicsPage from "./components/TokenomicsPage"
import Dashboard from "./components/Dashboard"
import { Router, useRouter } from "./components/Router"
import { AuthProvider } from "./components/AuthProvider"

function AppContent() {
  const { currentRoute } = useRouter()

  const renderPage = () => {
    switch (currentRoute) {
      case "tokenomics":
        return <TokenomicsPage />
      case "dashboard":
        return <Dashboard />
      case "home":
      default:
        return (
          <main>
            {/* Hero / Landing section */}
            <section id="home">
              <HeroSection />
            </section>

            {/* Partnership section */}
            <Partnership />

            {/* Core features of the platform */}
            <section id="features">
              <Features />
            </section>

            {/* User testimonials / social proof */}
            <Testimonials />

            {/* Call-to-action section */}
            <CTASection />

            {/* Pricing or subscription plans */}
            <section id="pricing">
              <Pricing />
            </section>

            {/* FAQ Section */}
            <section id="faq">
              <FAQ />
            </section>
          </main>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Header */}
      <Header />

      {/* Dynamic Content */}
      <div className="w-full">
        {renderPage()}
      </div>

      {/* Footer - only show on home page */}
      {currentRoute === "home" && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}