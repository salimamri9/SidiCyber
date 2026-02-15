"use client";

import { type ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  /** Max-width constraint for content */
  maxWidth?: "3xl" | "4xl" | "5xl" | "7xl";
  /** Include the cyber-grid background pattern */
  grid?: boolean;
  /** Extra className on outer wrapper */
  className?: string;
  /** Vertically center content */
  center?: boolean;
}

const maxWidthMap = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
};

/**
 * Unified page wrapper providing consistent:
 * - horizontal padding (px-5 sm:px-8)
 * - vertical padding (py-10 sm:py-16)
 * - max-width centering
 * - optional cyber-grid background
 * - flex-1 to fill remaining viewport height
 */
export function PageShell({
  children,
  maxWidth = "3xl",
  grid = true,
  className = "",
  center = true,
}: PageShellProps) {
  return (
    <div
      className={`flex flex-1 flex-col items-center px-5 py-10 sm:px-8 sm:py-16 ${
        grid ? "cyber-grid" : ""
      } ${className}`}
    >
      <div
        className={`w-full ${maxWidthMap[maxWidth]} ${
          center ? "my-auto" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
