"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Greeting({ onNext }: { onNext: () => void }) {
  const letterRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const container = document.getElementById("main-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 300);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToLetter = () => {
    letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    const container = document.getElementById("main-scroll-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex flex-col items-center justify-start py-12 sm:py-16 px-4 sm:px-8 text-center z-10 relative select-text"
    >
      {/* =====================================================================
          HIGHLIGHTED ANIMATED TITLE: HAPPY BIRTHDAY AMMU (NO CLIPPING, LUXURY FINISH)
          ===================================================================== */}
      <div className="flex flex-col items-center relative z-20 mb-10 sm:mb-14 w-full max-w-4xl mx-auto overflow-visible">
        {/* Soft Romantic Ambient Halo Behind Title */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0.55, 0.9, 0.55], scale: [0.96, 1.06, 0.96] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[340px] sm:w-[520px] md:w-[680px] h-[220px] sm:h-[300px] rounded-full pointer-events-none -z-10"
          style={{
            background: "radial-gradient(ellipse at center, rgba(244,63,94,0.22) 0%, rgba(212,175,55,0.14) 40%, transparent 72%)",
            filter: "blur(36px)",
          }}
        />

        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.38em" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2 mb-3 select-none"
        >
          <span className="text-[11px] sm:text-xs font-sans uppercase text-[#B8995E] font-semibold tracking-[0.38em] drop-shadow-sm">
            ✦ A SPECIAL DAY ✦
          </span>
        </motion.div>

        {/* "Happy Birthday," - Attractive Calligraphy Script */}
        <div className="overflow-visible text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bday tracking-wide inline-block leading-[1.3] pb-2 sm:pb-3 pt-1 px-4 overflow-visible select-none"
            style={{
              background: "linear-gradient(135deg, #3B0712 0%, #7F1D1D 32%, #BE123C 68%, #B45309 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.08))",
            }}
          >
            Happy Birthday,
          </motion.h1>
        </div>

        {/* "Ammu" - The Crown Jewel Highlight with Particles & Flourish */}
        <div className="relative mt-1 sm:mt-2 flex flex-col items-center overflow-visible">
          {/* Floating Starlight Sparkle Top Right */}
          <motion.span
            animate={{ 
              scale: [0.85, 1.35, 0.85], 
              opacity: [0.4, 1, 0.4],
              rotate: [0, 45, 90]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-6 sm:-right-10 md:-right-14 text-amber-400 text-lg sm:text-xl md:text-2xl pointer-events-none select-none drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
          >
            ✦
          </motion.span>

          {/* Floating Starlight Sparkle Top Left */}
          <motion.span
            animate={{ 
              scale: [1, 1.3, 1], 
              opacity: [0.45, 1, 0.45],
              y: [0, -5, 0]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1 -left-6 sm:-left-10 md:-left-14 text-rose-400 text-base sm:text-lg md:text-2xl pointer-events-none select-none drop-shadow-[0_0_8px_rgba(251,113,133,0.6)]"
          >
            ✨
          </motion.span>

          {/* Floating Subtle Diamond Star Lower Right */}
          <motion.span
            animate={{ 
              scale: [0.8, 1.2, 0.8], 
              opacity: [0.3, 0.85, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-4 -right-4 sm:-right-8 text-amber-300/80 text-sm sm:text-base pointer-events-none select-none"
          >
            ✧
          </motion.span>

          {/* "Ammu" Script Header with generous padding to prevent cursive ascender/descender clipping */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            transition={{ 
              delay: 0.35, 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ scale: 1.03 }}
            className="inline-block py-2 sm:py-3 px-6 sm:px-10 overflow-visible cursor-default select-none"
          >
            <span
              className="font-script text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] inline-block leading-[1.25] text-transparent tracking-wider uppercase font-bold"
              style={{
                background: "linear-gradient(135deg, #BE123C 0%, #E11D48 40%, #FB7185 75%, #9F1239 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 6px 22px rgba(225,29,72,0.30))",
              }}
            >
              AMMU
            </span>
          </motion.div>

          {/* Symmetrical Luxury Calligraphy Flourish with Center Heart */}
          <div className="relative w-64 sm:w-80 md:w-96 h-8 -mt-2 sm:-mt-1 flex items-center justify-center pointer-events-none overflow-visible">
            <svg 
              viewBox="0 0 400 36" 
              className="w-full h-full overflow-visible"
              fill="none"
            >
              <defs>
                <linearGradient id="goldGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
                  <stop offset="40%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
                <linearGradient id="goldGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#BE123C" />
                  <stop offset="60%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
                </linearGradient>
              </defs>

              {/* Left wing flourish */}
              <motion.path
                d="M 20,18 C 70,6 120,28 180,18"
                stroke="url(#goldGradientLeft)"
                strokeWidth="2.4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.75, duration: 1, ease: "easeOut" }}
              />
              <circle cx="18" cy="18" r="2" fill="#D4AF37" opacity="0.8" />

              {/* Right wing flourish */}
              <motion.path
                d="M 220,18 C 280,28 330,6 380,18"
                stroke="url(#goldGradientRight)"
                strokeWidth="2.4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.75, duration: 1, ease: "easeOut" }}
              />
              <circle cx="382" cy="18" r="2" fill="#D4AF37" opacity="0.8" />
            </svg>

            {/* Glowing ruby gemstone heart in center */}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.35, 1], opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
              className="absolute text-rose-600 text-lg sm:text-xl drop-shadow-[0_2px_8px_rgba(225,29,72,0.5)] select-none"
            >
              ♥
            </motion.span>
          </div>

          {/* Delicate romantic ornament divider before letter */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex items-center gap-3 mt-6 text-rose-300/80 text-xs sm:text-sm select-none"
          >
            <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-rose-300/60" />
            <span className="font-serif italic text-[#B8995E]">❦</span>
            <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-rose-300/60" />
          </motion.div>

          {/* Prominent Interactive Scroll Option Button */}
          <motion.button
            onClick={scrollToLetter}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ 
              opacity: { delay: 1, duration: 0.6 },
              y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/95 border border-rose-300 text-rose-900 text-xs sm:text-sm font-sans font-semibold shadow-md hover:bg-rose-50 hover:shadow-lg transition-all cursor-pointer group select-none ring-2 ring-rose-100"
            title="Scroll down to read the letter"
          >
            <span className="text-rose-500 animate-bounce">📜</span>
            <span>Scroll Down to Read</span>
            <span className="text-rose-600 font-bold group-hover:translate-y-1 transition-transform">↓</span>
          </motion.button>
        </div>
      </div>
      
      {/* =====================================================================
          BIRTHDAY LETTER - VINTAGE HANDWRITTEN LOVE-LETTER TYPOGRAPHY
          ===================================================================== */}
      <motion.div
        ref={letterRef}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl sm:max-w-3xl w-full mx-auto relative my-4 sm:my-6"
      >
        <div 
          className="relative w-full rounded-[6px] sm:rounded-[8px] p-7 sm:p-12 md:p-16 text-left select-text overflow-hidden"
          style={{
            background: "linear-gradient(178deg, #FFFDF9 0%, #FAF6EE 50%, #F7F1E5 100%)",
            boxShadow: "0 4px 24px -2px rgba(60, 35, 20, 0.06), 0 16px 48px -6px rgba(60, 30, 20, 0.06)",
            border: "1px solid rgba(226, 214, 198, 0.75)",
          }}
        >
          {/* Main Letter Body with Times New Roman */}
          <div className="font-times text-[#241B17] text-lg sm:text-xl md:text-[21px] leading-[1.9] sm:leading-[2.0] space-y-6 sm:space-y-7 tracking-[0.01em]">
            
            {/* Opening Greeting with Headings Best Style */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#4A1521] font-bold tracking-tight mb-6 sm:mb-8 text-left">
              My Dearest Ammuuuu! ❤️
            </h2>

            {/* Paragraph 1 */}
            <p>
              Ammuuu finalllyyyyyy its ur day! ❤️ this is the best day of my life. finally tody u turned into 22 🥹❤️ musali danivi ayyipotunnav, 22 years back ee roju world loki oka beautiful little na bujji bangaram vachindi. And honestly I feel so lucky that I get to celebrate another year of your life. I just hope ee birthday neeku chala chala happiness teesukuraavali.
            </p>

            {/* Paragraph 2 */}
            <p>
              My Bangarammmm okkasari aina ninnu nuvvu naa eyes lo chusukunte baagundu. Appudu ayna nek ardham avuthundhi nuv entha beautiful ga unnavo. Nee cute eyes, beautiful smile, nee expressions, nuv navvuthunte aa cuteness, nee bujji bujji lips tho sweetest maatalu... abba everything about you is just so adorable. Nuvvu em chesina naaku cute gaane anipisthav. Nuv eppudu ilage navvuthu undali ma, because nee smile chusthe naaku kuda automatic ga smile vachesthundhi. ❤️ Nee happiness lone na happiness undi.
            </p>

            {/* Paragraph 3 */}
            <p>
              My Bujji Kanna, ippudu nuvvu 22 loki enter avuthunnav. I really wish ee year nek lots and lots happiness, mainly ye health issues undakunda, lots and lots of love and success tho nindipovaali. Nee heart lo unna chinna chinna dreams anni okkokatiga nijam avvali. Nuv anukunnavi anni achieve cheyyali... alage mana pelli kooda ayyipovali 😁 Manam chala chaalaaa places ki vellali, netho ee world motham explore cheyyali, and most importantly, nuvvu eppudu happy ga undali 💖
            </p>

            {/* Paragraph 4 */}
            <p>
              My Bujjikonda, ee year lo nek unlimited success raavali, chaaala memories happy ga create chesukovali. Naaku telusu you are talented, beautiful, capable and honestly, you are much more special than you think. Naa bujji bangaram nuvvu 😘❤️
            </p>

            {/* Paragraph 5 */}
            <p>
              And Ammu, naaku unna biggest wishes lo okati entante, manam inka chala memories create cheskovali. Nee chinna chinna achievements kooda celebrate cheyyali, silly silly conversations cheyyali, reason lekunda navvukovali, special days lo ninnu surprise cheyyali. Nuv nee dreams anni achieve chesthunte chudali. Inka enno birthdays kalisi celebrate cheskovali. After many years, mana old memories gurinchi matladukunnappudu, aa moments gurthochi manam iddaram malli alage navvukovali. I really wish manaki alanti thousands of beautiful memories undali 🤭🫠
            </p>

            {/* Paragraph 6 */}
            <p>
              My little Chitti, life long nek nuv expect chesina happiness kanna inka ekkuva ivvali. Ninnu love chese, understand cheskune, respect chese manchi people — ante na lanti vallu eppudu nee chuttu undali 🤭 Nuv eppudu lonely ga feel avvakudadhu. Whatever happens, never forget that you deserve so much happiness, love and all the beautiful things in this world.
            </p>

            {/* Paragraph 7 */}
            <p>
              Ammu, sometimes naaku anipisthundhi, I have so many things to tell you but maatalu saripovu. Nuv nak entha important oo, nee presence nak entha happiness isthundho nek telidu ma... nuv na pakkana unte nak ee prapancham thone samandham undadu. But one thing I can say is, life lo nuv nak dorakadam genuinely is my best blessing for this life. I never expected someone to become this special, but here you are, being one of the most precious parts of my life. ❤️
            </p>

            {/* Special Birthday Wish - Attractive Font */}
            <div className="py-3 sm:py-4 my-2 text-center sm:text-left">
              <span className="font-bday text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#881337] tracking-wide inline-block drop-shadow-sm">
                Happiest 22nd Birthday, My Ammuuuuu! ❤️🎂
              </span>
            </div>

            {/* Paragraph 8 */}
            <p>
              Nuv eppudu ilage smile chesthu undali my dear princess. Nee 22nd year nee life lo one of the happiest chapters avvali. Mundhu raaboye birthdays anni inthakanna beautiful ga undali. Nuvvu korukune prathi wish okkokatiga nijam avvali. And every single day, you should have at least one reason to smile... and I&apos;ll be that reason for you.
            </p>

            {/* Paragraph 9 */}
            <p>
              And finally, naa Bangaram, okati eppudu gurthupettuko. Nuvvu naa life lo just another person kaadhu. You are the only one I genuinely care for, ur my treasure treasure and someone whose happiness matters a lot to me.
            </p>

            {/* Special Endearments */}
            <div className="py-3 text-center sm:text-left">
              <span className="font-times font-bold text-xl sm:text-2xl md:text-[24px] text-[#6B1724] tracking-wide leading-relaxed inline-block">
                My Bangarammmm, My Bujji Kanna, My Bujjikonda, My Chitti, My Little Princess, My World, ur MY EVERYTHING! 🥹❤️👑
              </span>
            </div>

            {/* Final Signature */}
            <div className="mt-8 sm:mt-10 pt-4 text-center sm:text-right border-t border-rose-200/50">
              <div className="font-heading font-bold text-xl sm:text-2xl md:text-[26px] text-[#881337] tracking-wide leading-relaxed inline-block">
                LOTS AND LOTS OF LOVE TO YOU, AMMUUUUU! ❤️🫂
              </div>
              <p className="mt-2 text-base sm:text-lg md:text-xl font-times text-[#4A1521] leading-relaxed">
                Eppudu happy ga undali, navvuthu undali, nee life lo unna beautiful moments anni full ga enjoy cheyyali. You deserve all the happiness in this world, bangarmmmmmmmmmmmmmmmmmmmmmmmmmm! ❤️
              </p>
            </div>

          </div>
        </div>
      </motion.div>

      {/* =====================================================================
          ACTION BUTTON
          ===================================================================== */}
      <div ref={bottomRef} className="flex justify-center z-20">
        <motion.button
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="mt-10 mb-16 px-10 py-3.5 rounded-full border border-rose-200 text-rose-900 bg-white/95 backdrop-blur-sm shadow-md hover:bg-rose-50 hover:shadow-lg transition-all uppercase tracking-widest text-xs sm:text-sm font-semibold cursor-pointer animate-pulse"
        >
          Make a Wish →
        </motion.button>
      </div>

      {/* =====================================================================
          FLOATING QUICK-SCROLL OPTION
          ===================================================================== */}
      <AnimatePresence>
        <motion.button
          key={isScrolled ? "top" : "down"}
          onClick={isScrolled ? scrollToTop : scrollToLetter}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 text-white font-sans text-xs sm:text-sm font-semibold shadow-[0_6px_20px_rgba(225,29,72,0.35)] border border-rose-300/40 hover:from-rose-700 hover:to-rose-800 transition-all cursor-pointer select-none"
          title={isScrolled ? "Scroll to Top" : "Scroll Down to Read"}
        >
          <span>{isScrolled ? "Scroll to Top" : "Scroll Down"}</span>
          <span className="text-base font-bold animate-pulse">{isScrolled ? "↑" : "↓"}</span>
        </motion.button>
      </AnimatePresence>
    </motion.div>
  );
}
