"use client";

import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 md:px-12 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Branding & Social */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center">
              <Logo size="default" showText={true} />
            </div>
            <p className="text-muted-foreground max-w-xs">
              Gamified blockchain recycling ecosystem transforming waste into rewards through DePIN infrastructure.
            </p>
            <div className="flex items-center gap-4">
              {[
                { href: "https://x.com/polymersnetwork", title: "X (formerly Twitter)" },
                { href: "https://t.me/polymersnetwork", title: "Telegram" },
                { href: "https://discord.gg/polymersnetwork", title: "Discord" },
                { href: "https://medium.com/@polymersnetwork", title: "Medium" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  title={social.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-[#16651c] hover:bg-[#16651c]/10 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {/* Replace with actual social SVG icon components if available */}
                  <span className="sr-only">{social.title}</span>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Products Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg text-foreground">Products</h4>
            <ul className="space-y-3">
              {[
                { href: "/dashboard", label: "ESG Dashboard" },
                { href: "/products", label: "Mobile App" },
                { href: "/products", label: "Smart Bins" },
                { href: "/products", label: "API Platform" },
                { href: "/tokenomics", label: "Tokens" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="text-muted-foreground hover:text-[#16651c] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg text-foreground">Company</h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/partnerships", label: "Partnerships" },
                { href: "/dashboard/faq", label: "FAQ" },
                { href: "https://docs.polymersnetwork.org", label: "Documentation", external: true },
                { href: "https://github.com/PolymersNetwork", label: "GitHub", external: true },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-[#16651c] transition-colors"
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <span className="text-muted-foreground text-sm">
            © 2025. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
