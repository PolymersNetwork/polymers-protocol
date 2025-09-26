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
