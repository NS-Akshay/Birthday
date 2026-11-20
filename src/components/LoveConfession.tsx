"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";

export default function LoveConfession({ onNext }: { onNext: () => void }) {
  const [declinePos, setDeclinePos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);

  const moveDecline = () => {
    // Generate random position within reasonable bounds
    const newX = (Math.random() - 0.5) * 220; // -110 to 110
    const newY = (Math.random() - 0.5) * 120 - 40; // -100 to 20
    setDeclinePos({ x: newX, y: newY });
  };

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      onNext();
    }, 2200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-start py-12 sm:py-16 px-4 sm:px-8 text-center z-10 relative select-text"
    >
      {/* Header with Title in Times Roman */}
      <motion.div
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center mb-8 sm:mb-10 max-w-2xl"
      >
        <span className="text-xs sm:text-sm font-heading uppercase tracking-[0.25em] text-[#B8995E] font-semibold mb-3 select-none">
          ✦ FROM MY HEART ✦
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-rose-950 tracking-tight leading-tight">
          {content.loveConfession.title}
        </h2>
      </motion.div>

      {/* Confession Letter Body in Times New Roman Font */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.22, duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full mx-auto space-y-6 font-times text-base sm:text-lg md:text-[19px] text-[#341F1A] leading-[1.85] sm:leading-[1.95] text-left mb-10"
      >
        <p>
          Ammuuu, netho epatnuncho cheppali anukuntunna oka chaala imp vishayam undhi ma, but ela cheppalo nak assalu teliyatledhu. Mana conversations, nee silly talks, nee beautiful smile, mana chinna chinna moments... ivanni madhyalo eppudo teliyakunda that make me feel that ur too special. Starting lo idhi just a normal feeling anukunna, but mellaga adhi nak teliyakundane chala deep aipoyindhi. ❤️
        </p>

        <p>
          Nuv nak eppudu intha important ayyavo exact ga cheppalenu Ammu, but oka point lo realise ayya, nee happiness nak chala important aipoyindhi ani. Nuv happy ga unte nak kuda automatic ga happy ga untundhi. Nee smile chusthe nak teliyakundane smile vachesthadhi, nee voice vinte na roju motham hpy ga maripotundi, and nee nunchi oka small message vachina chaalu, face lo oka big smile vachesthadhi, full blush ayyipotha. Sometimes reason lekunda kuda nee gurinche alochisthu unta. Endhuko telidhu, but I genuinely love that feeling. 🥹❤️
        </p>

        <p>
          Ammu, life lo everything perfect ga untundhi ani nenu promises cheyyalenu. Manaki happy days untayi, konni difficult days kuda untayi. But alanti times lo nee pakkana undali ani nak anipisthundhi. Nee happiness lo celebrate chese person ga, nee cute cute talks vine person ga, nee dreams ki support chese person ga, nuv silent ga unna kuda understand cheskune person ga undali anukuntunna. Nuv low ga feel ayinappudu navvinchali, nee meedha nek doubt vachinappudu how special you are ani gurthu cheyyali. Basically, nee life lo oka person unte chaalu, who genuinely cares about you and wants to see you happy. And I would love to be tht person. ❤️
        </p>

        <p>
          Future lo em jaruguthundho nak telidhu Ammu. Mana story ela untundho kuda telidhu. But okati matram telusu, nuv naa life lo undadam nenu eppudu take for granted ga teesukonu. Inka chala matladukovali, reason lekunda navvukovali, silly silly fights cheskovali, okariki okaram surprises ivvali, and enno beautiful memories create cheskovali. I don&apos;t want these little moments to end. Inka chala memories manakosam wait chesthunnayi ani hope chesthunna.
        </p>

        <p>
          And Ammu, life lo enni chances vachina, malli malli choose cheskune opportunity vachina, I would still choose to have you in my life. Not because nuv perfect ani, but because nuv nuvve kabatti. Nee way of talking, nee childish behaviour, nee cute expressions, nee smile... everything has its own place in my heart. I don&apos;t know how to explain tht feeling, but it&apos;s something I genuinely don&apos;t want to lose. ❤️
        </p>

        <p className="font-bold text-[#6B1724] leading-relaxed">
          Nak nee meedha unna feelings entha ani perfect ga words lo explain cheyyadam raadhu Ammu. But naa care lo, naa actions lo, nenu chese chinna chinna efforts lo neeku adhi konchem aina kanipinchali ani korukuntunna. Nuv nak chala chaala special ma, and idhi just cheppadaniki chepthunna words kaadhu. Everything comes straight from the deep bottom of my heart. I genuinely mean every single word. ❤️
        </p>

        <div className="pt-2 text-center sm:text-left space-y-2">
          <p className="font-serif font-bold text-rose-950 text-base sm:text-lg">
            And finally, one little question, naa princess... 🥹
          </p>
          <p className="italic font-semibold text-rose-900 text-lg sm:text-xl md:text-[21px] leading-relaxed">
            Oka vela life manaki kalisi oka beautiful story raasukune chance isthe, aa story lo nak oka place isthava? Will you let me be a part of ur life, not just for a few beautiful moments, but for all the little moments that are yet to come? ❤️🫂
          </p>
        </div>
      </motion.div>

      {/* Interactive Answer Buttons */}
      {!accepted ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center my-6"
        >
          <button
            onClick={handleAccept}
            className="px-10 py-3.5 rounded-full bg-rose-900 text-white font-medium hover:bg-rose-800 hover:shadow-lg transition-all tracking-wider text-sm sm:text-base cursor-pointer shadow-md"
          >
            ❤️ YES, OF COURSE!
          </button>
          
          <motion.button
            animate={{ x: declinePos.x, y: declinePos.y }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            onHoverStart={moveDecline}
            onClick={moveDecline}
            onTouchStart={moveDecline}
            className="px-8 py-3 rounded-full border border-zinc-300 text-zinc-400 bg-white/70 backdrop-blur-sm hover:bg-zinc-100 text-sm font-medium cursor-pointer"
          >
            💔 DECLINE
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-2xl sm:text-3xl text-rose-600 font-times font-bold my-8"
        >
          {content.loveConfession.acceptMessage}
        </motion.div>
      )}
    </motion.div>
  );
}