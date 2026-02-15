"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface QuestionTimerProps {
  duration: number;
  onTimeout: () => void;
  isActive: boolean;
  isPaused?: boolean;
  variant?: "ring" | "bar";
}

export function QuestionTimer({
  duration,
  onTimeout,
  isActive,
  isPaused = false,
  variant = "ring",
}: QuestionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startRef = useRef<number>(Date.now());
  const pausedAtRef = useRef<number>(0);
  const elapsedBeforePauseRef = useRef<number>(0);
  const timeoutFiredRef = useRef(false);

  // Reset when duration or isActive changes
  useEffect(() => {
    setTimeLeft(duration);
    startRef.current = Date.now();
    pausedAtRef.current = 0;
    elapsedBeforePauseRef.current = 0;
    timeoutFiredRef.current = false;
  }, [duration, isActive]);

  const stableOnTimeout = useCallback(onTimeout, [onTimeout]);

  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      const elapsed = elapsedBeforePauseRef.current + (Date.now() - startRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0 && !timeoutFiredRef.current) {
        timeoutFiredRef.current = true;
        clearInterval(interval);
        stableOnTimeout();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, isPaused, duration, stableOnTimeout]);

  // Handle pause/resume
  useEffect(() => {
    if (isPaused) {
      elapsedBeforePauseRef.current += (Date.now() - startRef.current) / 1000;
    } else {
      startRef.current = Date.now();
    }
  }, [isPaused]);

  const fraction = timeLeft / duration;
  const color =
    fraction > 0.5
      ? "text-cyber-green"
      : fraction > 0.25
      ? "text-cyber-yellow"
      : "text-cyber-red";
  const bgColor =
    fraction > 0.5
      ? "bg-cyber-green"
      : fraction > 0.25
      ? "bg-cyber-yellow"
      : "bg-cyber-red";
  const strokeColor =
    fraction > 0.5
      ? "#00ff88"
      : fraction > 0.25
      ? "#ffaa00"
      : "#ff3355";
  const pulse = timeLeft <= 5 && timeLeft > 0;

  const elapsed = duration - timeLeft;

  if (variant === "bar") {
    return (
      <div className="w-full" data-elapsed={elapsed}>
        <div className="mb-2 flex items-center justify-between">
          <span className={`text-xs font-bold ${color} ${pulse ? "animate-pulse" : ""}`}>
            {Math.ceil(timeLeft)}s
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-cyber-border">
          <div
            className={`h-full rounded-full ${bgColor} transition-all duration-100 ease-linear`}
            style={{ width: `${fraction * 100}%` }}
          />
        </div>
      </div>
    );
  }

  // Ring variant
  const size = 64;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - fraction);

  return (
    <div className={`relative inline-flex items-center justify-center ${pulse ? "animate-pulse" : ""}`} data-elapsed={elapsed}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-cyber-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          className="transition-all duration-100 ease-linear"
        />
      </svg>
      <span className={`absolute text-sm font-bold ${color}`}>
        {Math.ceil(timeLeft)}
      </span>
    </div>
  );
}
