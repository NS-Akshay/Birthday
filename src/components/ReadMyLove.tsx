"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";

export default function ReadMyLove({ onNext }: { onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen w-full flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-8 text-center z-10 relative select-text"
    >
      {/* Badge & Title */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center mb-3 sm:mb-4 max-w-2xl"
      >
        <span className="text-[11px] sm:text-xs font-heading uppercase tracking-[0.25em] text-[#B8995E] font-semibold mb-1.5 select-none">
          ✦ OUR LITTLE STORY ✦
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-rose-950 max-w-2xl leading-snug tracking-tight">
          {content.readMyLove.title}
        </h2>
      </motion.div>

      {/* Memory Attack Story Paragraphs in Times New Roman */}
      <motion.div 
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.55, ease: "easeOut" }}
        className="max-w-xl sm:max-w-2xl w-full mx-auto space-y-3 sm:space-y-4 font-times text-base sm:text-lg md:text-[18px] text-[#241B17] font-normal leading-relaxed text-left sm:text-center mb-6 sm:mb-8"
      >
        <p>
          Ippudu vachindhi actual dangerous part Ammuuu! 😂❤️ Ikada unna mana memories anni chusi nuv survive avvali mari! Bcz em cheyyali, mana chinna chinna moments anni nak antha special anipinchayi, anduke okkati kuda vadhalakunda collect cheskunna. Prathi pic, prathi silly moment, random conversations, mana cute memories... anni nak chala spcl aipoyayi ma.
        </p>

        <p>
          So, get ready to travel through our little world, my girl! 🥹 Ikada antha mana gurinche. Mana stupid moments, endless teasing, cute fights, chinna chinna arguments, sudden ga vachese laughs, crazy talks and malli malli experience cheyyali anipinche beautiful moments. Asalu konni moments gurthochina chaalu, navvu aagadhu kada! 😂❤️
        </p>

        <p>
          Konni memories chusi nuv full ga navvuthav, konni chusi blush avuthav, inkonni chusthe nee face lo automatic ga smile vachesthadhi. But one thing is sure, ee memories anni chusthunte, nuv naa life lo entha happiness add chesavo neeke ardham avuthundhi.
        </p>

        <p>
          And Ammu, ivanni just photos kaadhu ra, random moments kuda kaadhu. Prathi picture venaka oka story undhi, prathi moment venaka oka feeling undhi. Appudu normal ga anipinchina konni moments, ippudu gurthu cheskunte entha special ga unnayo telusthundhi. Honestly, mana memories lo chala moments naaku eppatiki favourite gaane untayi. I wish I could go back and live some of them all over again.
        </p>

        <div className="pt-2 text-center">
          <p className="font-times font-bold text-[#6B1724] text-base sm:text-lg leading-relaxed">
            So come on naa Bujji Kanna, ready aipoo! Let&apos;s go through our madness, navvukundham, konchem blush avudham, and mana beautiful memories anni okkokatiga malli relive cheddham! 🥹❤️📸
          </p>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.35, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-rose-900 text-rose-50 font-medium tracking-wider shadow-[0_8px_24px_rgba(159,18,57,0.2)] hover:bg-rose-800 transition-all text-xs sm:text-sm uppercase cursor-pointer"
      >
        {content.readMyLove.buttonText}
      </motion.button>
    </motion.div>
  );
}