"use client";

import React from "react";

export default function Logo({
  className = "",
  showText = true,
  size = "default",
  useImage = false,
}: {
  className?: string;
  showText?: boolean;
  size?: "small" | "default" | "large";
  useImage?: boolean;
}) {
  const sizeClasses = {
    small: { icon: "w-6 h-6", text: "text-base", image: 24 },
    default: { icon: "w-8 h-8", text: "text-xl", image: 32 },
    large: { icon: "w-12 h-12", text: "text-2xl", image: 48 },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div
          className={`${currentSize.icon} bg-gradient-to-br from-[#16651c] to-[#22c55e] rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
        >
          {useImage ? (
            <img
              src="/logo.png"
              alt="Logo"
              width={currentSize.image}
              height={currentSize.image}
              className="object-contain"
            />
          ) : (
            <svg
              width={currentSize.image}
              height={currentSize.image}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M4 10l1.41 1.41L7 9.83V16h2v-6.17l1.59 1.58L12 10l-4-4-4 4zm16 4l-1.41-1.41L17 14.17V8h-2v6.17l-1.59-1.58L12 14l4 4 4-4zM12 2L9.41 4.59 11 6H6v2h6l-1.59 1.41L12 12l4-4-4-4z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Brand Name */}
      {showText && (
        <span
          className={`${currentSize.text} font-semibold text-foreground tracking-tight`}
        >
          Polymers
        </span>
      )}
    </div>
  );
}
