"use client";

import { motion, AnimatePresence } from "framer-motion";

interface XPToastProps {
  xp: number;
  reason?: string;
  show: boolean;
}

export function XPToast({ xp, reason, show }: XPToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          className="fixed top-20 left-1/2 z-[100] -translate-x-1/2"
        >
          <div className="flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-card px-5 py-2.5 shadow-lg shadow-cyber-cyan/20">
            <span className="text-lg font-black text-cyber-cyan text-glow-cyan">
              +{xp} XP
            </span>
            {reason && (
              <span className="text-xs font-semibold text-cyber-text-dim">
                {reason}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
