"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useMotionValueEvent, animate } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

const NOV_22_REVEAL_TEXT = `Enno nelala waiting, dreaming, imagination tarwatha, nee raaka kosam edhuruchusina aa most beautiful moment finally vachesindi. Naa chinni princess, nuvvu ee lokamloki finally adugu pettesav! ❤️👑

Nuv first time vachinappudu entha beautiful ga unnavo telusa, naa chinni angel... Nee bujji mukham, aa muddu muddu kallu, chinni mukku, methani cheeks, and aa chinni lips... anni entho adorable ga unnayi. Nee chinni chethulu, bujji fingers, cute little legs, aa muddu muddu paadalu chusthunte, prathi okkariki ninnu daggaraga pattukoni, alane chusthu undalanipinchedi. 🥺🎀

Naaku adrustam ledu nuv puttina ventane ninnu choodataniki, naa yuvarani darshanam chesukodaniki naaku 18 years pattindi... And akkada unna andariki nuvvu heaven nunchi direct ga vachina oka chinni angel la kanipinchavu. Nee innocent face lo edo special beauty undedi, daanini words lo describe cheyyadam kooda chaala kashtame. Nee chinni chinni movements, cute expressions, and aa peaceful smile chusthunte andariki manasulo entho happiness kaligedi. ✨

Ninnu 18 years tarwatha choosina ventane, Heaven thana most beautiful princess ni select chesi, naa world ni inka beautiful ga marchadaniki bhoomi meedhaki pampinchinattu anipinchedi. 💫❤️

And manam kalisi 4 years avuthondi, this is your 4th birthday celebrating with me, and this continues till your last birthday! I will always be the person who celebrates your birthday the most. Can't wait to spend this most beautiful, special day with you! 🥰🎉

**You didn't just enter this world, my little princess. You arrived like a beautiful dream from heaven, with your innocent little face, those adorable tiny features, and a sweetness so magical that everyone who saw you instantly fell in love with you.** 💗👸🏻`;

// March = 01 (index 2)
// November = 09 (index 10)
const PREGNANCY_DATA: Record<number, any> = {
  2: { monthNum: "01", title: "🌸 A Tiny Little Beginning", text: "“Ee chinni prapancham lo oka chitti pranam mellaga peragadam strt ayyindi, na andaala rakumari katha ikkade modalu ayyindi ❤️”" },
  3: { monthNum: "02", title: "💗 Her Tiny Heartbeat", text: "“Na uvarani chinni gunde mellaga kottukovadam modalayindi, na andhala rakumari thana andham aina jeevitha prayanam bujji bujji a modhalu pettindi 💓”" },
  4: { monthNum: "03", title: "🦋 Tiny Hands, Tiny Feet", text: "“Athiloka sundari ayna ne chinni chinni chethulu, bujji bujji paadalu, chilli bulli mokham roju roju ki andham ayna devakanya ee prapancham loki adugu pettadaniki ready avutundi 👣”" },
  5: { monthNum: "04", title: "🌷 A Little Beauty in the Making", text: "“Prapancham lone athi sundaram aina andhala mokham mellaga ready avutondi, na chitti yuvarani bujji body entho mudduga tayaru avutondi 🥹❤️”" },
  6: { monthNum: "05", title: "💕 Her First Little Kicks", text: "“Nee chitti bujji paadhalatho thanthuu ee andham aina prapancham loki adugu pettadaniki sidham avunnav 💕✨”" },
  7: { monthNum: "06", title: "👑 My Little Princess", text: "“Nee chitti fingers, kutti nose and sweetest nose is getting ready... divi nundi dige athiloka sundariki swagatham ivvadaniki ee bhoomi thanani thaanu decorate chestundi 🌸👑”" },
  8: { monthNum: "07", title: "🌙 Growing More Beautiful", text: "“Nee bulli bulli kallatho ee andham choodataniki ready ayyipoyav, and ee prapancham loki adugu pettadaniki deggara avuthunnav 🌙💖”" },
  9: { monthNum: "08", title: "🎀 Almost a Little Angel", text: "“Naa yuvarani ippudu complete ga ready ayyindi, just inka swarga lokam nundi bhoomi paiki digi raavadam maatrame late 🥰🎀”" },
  10: { 
    monthNum: "09", 
    title: "👼 Heaven's Beautiful Princess", 
    text: "“And now finally, my beautiful angel is all set to enter this world! Ala pushpaka vimanam meedha swargam nundi start ayyi ee world loki grand ga vachav, and ee prapancham neeku grand ga welcome cheyyadaniki ready ga undi ❤️👑✨”", 
    revealText: NOV_22_REVEAL_TEXT 
  }
};

const ITEM_HEIGHT = 80;
const MIN_INDEX = 2; // March
const MAX_INDEX = 10; // November

const WordReveal = ({ 
  text, 
  onComplete,
  isParagraphMode = false
}: { 
  text: string; 
  onComplete: () => void;
  isParagraphMode?: boolean;
}) => {
  const paragraphs = useMemo(() => text.split(/\n\n+/), [text]);
  const totalWords = useMemo(() => {
    return paragraphs.reduce((sum, p) => sum + p.trim().split(/\s+/).filter(Boolean).length, 0);
  }, [paragraphs]);

  const [isFinished, setIsFinished] = useState(false);

  // For long multi-paragraph texts (150+ words), animate at a smooth 0.038s/word (~8-9s total).
  // For short single-line quotes (15-20 words), animate at 0.18s/word.
  const stagger = totalWords > 40 ? 0.038 : 0.18;

  useEffect(() => {
    const totalDuration = (0.5 + totalWords * stagger + 0.4) * 1000 + 2000;
    const timer = setTimeout(() => {
      onComplete();
    }, totalDuration);
    return () => clearTimeout(timer);
  }, [totalWords, stagger, onComplete]);

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [isFinished, onComplete]);

  let wordCounter = 0;

  return (
    <div 
      className={isParagraphMode ? "space-y-4 cursor-pointer" : "inline cursor-pointer"}
      onClick={() => {
        setIsFinished(true);
        onComplete();
      }}
      title="Click to reveal all words instantly"
    >
      {paragraphs.map((para, pIdx) => {
        const isBoldBlock = para.includes("**");
        const cleanPara = para.replace(/\*\*/g, "");
        const words = cleanPara.trim().split(/\s+/).filter(Boolean);

        return (
          <p 
            key={pIdx} 
            className={`${isParagraphMode ? "leading-relaxed" : "inline"} ${
              isBoldBlock 
                ? "font-semibold text-[#2D2218] not-italic border-l-2 border-[#d4af37] pl-3 py-1 bg-[#FAF7F2]/60 rounded-r" 
                : ""
            }`}
          >
            {words.map((word, wIdx) => {
              const currentDelay = 0.4 + wordCounter * stagger;
              const isVeryLastWord = pIdx === paragraphs.length - 1 && wIdx === words.length - 1;
              wordCounter++;

              return (
                <motion.span
                  key={wIdx}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 4 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ 
                    duration: 0.35, 
                    delay: isFinished ? 0 : currentDelay,
                    ease: "easeOut"
                  }}
                  onAnimationComplete={isVeryLastWord ? () => setIsFinished(true) : undefined}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};

const WheelItem = ({ 
  index, 
  label, 
  y, 
  isActive, 
  showReveal,
  onClick
}: { 
  index: number; 
  label: string; 
  y: any; 
  isActive: boolean; 
  showReveal: boolean;
  onClick?: () => void;
}) => {
  const itemY = index * ITEM_HEIGHT;
  
  const distance = useTransform(y, (currentY: number) => currentY + itemY);
  
  const opacity = useTransform(distance, [-ITEM_HEIGHT * 2.5, 0, ITEM_HEIGHT * 2.5], [0, 1, 0]);
  const scale = useTransform(distance, [-ITEM_HEIGHT * 2.5, 0, ITEM_HEIGHT * 2.5], [0.5, 1, 0.5]);
  const rotateX = useTransform(distance, [-ITEM_HEIGHT * 2.5, 0, ITEM_HEIGHT * 2.5], [60, 0, -60]);
  const translateY = useTransform(distance, (d) => d); 
  const isClickable = index >= MIN_INDEX && index <= MAX_INDEX;

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: translateY,
        rotateX,
        scale,
        opacity,
        marginTop: -ITEM_HEIGHT / 2,
        height: ITEM_HEIGHT,
        transformOrigin: "center center -100px",
      }}
      onClick={isClickable ? onClick : undefined}
      className={`flex flex-col items-center justify-center w-full transition-all duration-300 ${
        isClickable ? "cursor-pointer pointer-events-auto" : "pointer-events-none"
      }`}
    >
       <span className={`text-2xl md:text-3xl font-serif tracking-widest transition-all duration-500 ${
         isActive 
           ? 'text-[#24211F] font-semibold scale-110' 
           : 'text-[#8a8480] hover:text-[#3a3532]'
       }`}>
         {label}
       </span>
       {index === 10 && isActive && showReveal && (
         <motion.div 
           initial={{ opacity: 0, y: -5 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="text-[#d4af37] font-serif text-lg tracking-widest mt-1 font-semibold"
         >
           22
         </motion.div>
       )}
    </motion.div>
  );
};

export default function AngelJourney({ onNext }: { onNext: () => void }) {
  // Start directly at Pregnancy Month 1 (March, index 2)
  const y = useMotionValue(-MIN_INDEX * ITEM_HEIGHT);
  const [activeIndex, setActiveIndex] = useState(MIN_INDEX);
  const [showReveal, setShowReveal] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [isMonthInfoShown, setIsMonthInfoShown] = useState(false);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const showRevealRef = useRef(showReveal);
  showRevealRef.current = showReveal;

  const showContinueRef = useRef(showContinue);
  showContinueRef.current = showContinue;

  const goToNext = () => {
    if (activeIndexRef.current < MAX_INDEX) {
      const nextIndex = activeIndexRef.current + 1;
      setIsMonthInfoShown(false);
      setActiveIndex(nextIndex);
      animate(y, -nextIndex * ITEM_HEIGHT, { type: "spring", stiffness: 300, damping: 30 });
    } else if (activeIndexRef.current === MAX_INDEX && !showRevealRef.current) {
      setShowReveal(true);
    }
  };

  const goToPrev = () => {
    if (showRevealRef.current) {
      setShowReveal(false);
      setShowContinue(false);
      return;
    }
    if (activeIndexRef.current > MIN_INDEX) {
      const prevIndex = activeIndexRef.current - 1;
      setIsMonthInfoShown(false);
      setActiveIndex(prevIndex);
      animate(y, -prevIndex * ITEM_HEIGHT, { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  const goToIndex = (targetIndex: number) => {
    if (targetIndex < MIN_INDEX || targetIndex > MAX_INDEX) return;
    if (showRevealRef.current) {
      setShowReveal(false);
      setShowContinue(false);
    }
    setIsMonthInfoShown(false);
    setActiveIndex(targetIndex);
    animate(y, -targetIndex * ITEM_HEIGHT, { type: "spring", stiffness: 300, damping: 30 });
  };

  // When info for the current month is completely shown, mark it shown
  // IT NEVER AUTOMATICALLY SWITCHES TO THE NEXT MONTH - WAITS FOR BUTTON CLICK!
  const handleMonthComplete = () => {
    setIsMonthInfoShown(true);
  };

  // Keyboard navigation: Left/Right arrow keys only
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll while the story sequence is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none"; // Prevents pull-to-refresh and accidental scroll on mobile

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, []);

  const currentData = PREGNANCY_DATA[activeIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex flex-col md:flex-row items-center justify-between p-4 md:p-8 z-10 relative bg-[#FAF7F2] select-none overflow-hidden"
    >
      {/* Decorative top corner title */}
      <div className="absolute top-4 left-6 z-20 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8995E] font-semibold">
          ✦ NINE-MONTH SACRED JOURNEY ✦
        </span>
      </div>

      {/* LEFT SIDE: 3D CYLINDER MONTH WHEEL */}
      <div 
        className="w-full md:w-[45%] h-[40dvh] md:h-[100dvh] relative flex items-center justify-center overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Selection Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-[80px] border-y border-[#d4af37]/40 z-10 pointer-events-none" />
        
        {/* Items */}
        {MONTHS.map((m, i) => (
          <WheelItem 
            key={m} 
            index={i} 
            label={m} 
            y={y} 
            isActive={activeIndex === i} 
            showReveal={showReveal} 
            onClick={() => goToIndex(i)}
          />
        ))}
      </div>

      {/* RIGHT SIDE: ANGEL STORY & FINAL REVEAL (Never switches until user clicks a button) */}
      <div 
        className="w-full md:w-[55%] h-[60dvh] md:h-[100dvh] flex flex-col items-center justify-center px-4 md:px-12 relative overflow-hidden select-text"
      >
        <AnimatePresence mode="wait">
          {currentData && (
            activeIndex === 10 && showReveal ? (
              <motion.div
                key="final-reveal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full flex flex-col items-center md:items-start max-w-xl max-h-[82dvh] overflow-y-auto pr-3 py-2 text-center md:text-left select-text"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(212, 175, 55, 0.4) transparent",
                }}
              >
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mb-5" />
                
                <h3 className="text-[11px] md:text-xs tracking-[0.35em] text-[#B8995E] font-heading uppercase font-semibold mb-2">
                  NOVEMBER 22 ✦ SACRED ARRIVAL
                </h3>
                
                <h2 className="text-2xl md:text-3xl font-heading text-[#d1a69a] mb-6 uppercase tracking-widest drop-shadow-sm">
                  💖 Welcome to the World, Little Princess
                </h2>
                
                <div className="text-base md:text-lg lg:text-[19px] font-times text-[#3E3024] leading-relaxed mb-8">
                  <WordReveal 
                    text={currentData.revealText} 
                    onComplete={() => setShowContinue(true)} 
                    isParagraphMode={true}
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowReveal(false);
                      setShowContinue(false);
                    }}
                    className="px-5 py-2.5 rounded-full border border-[#d4af37]/40 text-[#7a6224] bg-white/70 hover:bg-white text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all"
                  >
                    ← Back to Month 09
                  </button>

                  <AnimatePresence>
                    {showContinue && (
                      <motion.button 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNext();
                        }}
                        className="px-8 py-3 rounded-full border border-rose-200 text-rose-900 bg-white/80 backdrop-blur-md shadow-md hover:bg-rose-50 hover:shadow-lg transition-all uppercase tracking-[0.2em] text-[11px] md:text-xs font-semibold cursor-pointer animate-pulse"
                      >
                        Continue Story →
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`month-${activeIndex}`}
                initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center md:items-start text-center md:text-left w-full max-w-lg"
              >
                <h3 className="text-xs md:text-sm tracking-[0.4em] text-zinc-400 mb-4 font-heading uppercase">
                  MONTH {currentData.monthNum}
                </h3>
                
                <h2 className="text-2xl md:text-3xl font-heading text-[#d1a69a] mb-6 uppercase tracking-widest drop-shadow-sm">
                  {currentData.title}
                </h2>
                
                <div className="text-lg md:text-2xl font-times text-[#443830] leading-relaxed drop-shadow-sm min-h-[140px]">
                  <WordReveal 
                    text={currentData.text} 
                    onComplete={handleMonthComplete} 
                  />
                </div>

                {/* Manual Navigation Controls (Waits indefinitely until user clicks a button) */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-8 z-30">
                  {activeIndex > MIN_INDEX && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrev();
                      }}
                      className="px-5 py-2.5 rounded-full border border-rose-200/90 text-rose-800/90 bg-white/80 hover:bg-rose-50 shadow-sm hover:shadow transition-all text-xs font-sans tracking-wider cursor-pointer"
                    >
                      ← Previous Month
                    </motion.button>
                  )}

                  {activeIndex < MAX_INDEX ? (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                      }}
                      className={`px-7 py-3 rounded-full border border-rose-300 text-rose-950 bg-gradient-to-r from-rose-100 via-pink-100 to-rose-50 hover:from-rose-200 hover:to-pink-200 shadow-md hover:shadow-lg transition-all uppercase tracking-[0.2em] text-xs font-semibold cursor-pointer flex items-center gap-2 group ${
                        isMonthInfoShown ? "ring-2 ring-rose-300/70 ring-offset-2 shadow-rose-200 animate-pulse" : ""
                      }`}
                    >
                      <span>Next Month</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowReveal(true);
                      }}
                      className="px-8 py-3.5 rounded-full border-2 border-amber-300 text-amber-950 bg-gradient-to-r from-amber-100 via-rose-100 to-pink-100 hover:from-amber-200 hover:to-rose-200 shadow-lg hover:shadow-xl transition-all uppercase tracking-[0.2em] text-xs font-bold cursor-pointer flex items-center gap-2 animate-pulse"
                    >
                      <span>✨ Reveal November 22 Arrival</span>
                      <span>→</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
