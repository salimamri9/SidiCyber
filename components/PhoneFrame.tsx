"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface PhoneFrameProps {
  children: React.ReactNode;
  sender?: string;
  type?: "sms" | "whatsapp" | "email";
}

export function PhoneFrame({ children, sender, type = "sms" }: PhoneFrameProps) {
  const { t } = useI18n();

  const typeConfig = {
    sms: { color: "text-cyber-cyan", bg: "bg-cyan-500/10", label: "SMS" },
    whatsapp: { color: "text-cyber-green", bg: "bg-green-500/10", label: "WhatsApp" },
    email: { color: "text-cyber-yellow", bg: "bg-yellow-500/10", label: "Email" },
  };

  const config = typeConfig[type];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.2 }}
      className="relative mx-auto w-full max-w-[340px] sm:max-w-md"
    >
      {/* Phone body */}
      <div className="rounded-[2.25rem] border-2 border-zinc-700 bg-black p-2 shadow-2xl shadow-black/50 sm:rounded-[2.75rem] sm:p-2.5">
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2rem] bg-zinc-900 sm:rounded-[2.25rem]">
          {/* Notch */}
          <div className="phone-notch" />

          {/* Status bar */}
          <div className="flex items-center justify-between px-6 py-2 text-[10px] text-zinc-400 sm:px-7 sm:py-2.5 sm:text-xs">
            <span>Ooredoo TN</span>
            <span>85%</span>
          </div>

          {/* Message header */}
          <div className="border-b border-zinc-800 px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex items-center gap-3">
              <div className={`h-7 w-7 rounded-full ${config.bg} flex items-center justify-center sm:h-8 sm:w-8`}>
                <span className={`text-[10px] font-bold sm:text-xs ${config.color}`}>
                  {config.label[0]}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-200 sm:text-sm">
                  {sender || t("phone.unknown")}
                </p>
                <p className={`text-[10px] sm:text-xs ${config.color}`}>
                  {config.label}
                </p>
              </div>
            </div>
          </div>

          {/* Message content */}
          <div className="min-h-[260px] p-5 sm:min-h-[320px] sm:p-6">
            <div className={`rounded-2xl rounded-tr-sm ${config.bg} border border-zinc-800 p-5 sm:p-6`}>
              <p className="text-xs leading-relaxed text-zinc-200 sm:text-sm" dir="rtl">
                {children}
              </p>
            </div>
            <p className="mt-2 text-start text-[10px] text-zinc-600 sm:text-xs">
              14:32
            </p>
          </div>

          {/* Bottom bar */}
          <div className="h-1 w-1/3 mx-auto mb-2 rounded-full bg-zinc-700" />
        </div>
      </div>
    </motion.div>
  );
}
