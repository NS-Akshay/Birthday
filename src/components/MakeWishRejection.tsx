"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";

export default function MakeWishRejection({ onNext }: { onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-10 text-center z-10 relative select-text"
    >
      {/* Title & Badge */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center mb-8 max-w-2xl"
      >
        <span className="text-xs sm:text-sm font-heading uppercase tracking-[0.25em] text-[#B8995E] font-semibold mb-3 select-none">
          ✦ Wait a minute... ✦
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-rose-950 tracking-tight leading-tight">
          {content.makeAWishRejection.title}
        </h2>
      </motion.div>

      {/* Playful & Warm Note in Times New Roman Typography */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.22, duration: 0.6, ease: "easeOut" }}
        className="max-w-xl sm:max-w-2xl w-full mx-auto space-y-6 font-times text-lg sm:text-xl md:text-[21px] text-[#241B17] leading-[1.85] sm:leading-[1.95] tracking-[0.01em] mb-10 text-center"
      >
        <p>
          Go ahead, Ammu... close your eyes and make a wish! But wait assal nek inkoka korika nduku chpu na lanti manchi frd husband life partner already dorikesadu kada. aa devudu nek nakanna best gift ivvagalada... the best gift God can give u is <span className="font-heading font-bold text-[#881337] text-2xl sm:text-3xl md:text-[32px] inline-block px-1 align-baseline">ME!</span> 😂❤️
        </p>

        <p>
          nek already nenu dorikesa so no upgrades, no exchanges! You already got the premium edition, with unlimited love, care, silly talks, endless teasing and lifetime entertainment! 🤭 especially na sodi nuv devudni okati korukovochu: na sodi barinche laga patience and na over love ni receive chesukone open heart! 🤭💖
        </p>

        <p>
          So, my princess, enjoy your birthday because nek nakanna best gift radhu and ranivannu... ee janmaniki na torcher tho adjust ayypo, <span className="font-heading font-bold text-[#881337] text-xl sm:text-2xl md:text-[26px] inline-block px-1 align-baseline">bangarammmmmmm!</span> ❤️💖😘😘😘
        </p>
      </motion.div>

      {/* Action Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.35, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-8 py-3 rounded-full border border-rose-200 text-rose-900 bg-white/90 hover:bg-rose-50 hover:shadow-md transition-all uppercase tracking-widest text-xs sm:text-sm font-medium cursor-pointer"
      >
        Continue →
      </motion.button>
    </motion.div>
  );
}
