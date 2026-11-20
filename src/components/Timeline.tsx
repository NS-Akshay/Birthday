"use client";

import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";
import { useState, useEffect, useRef } from "react";

interface MilestoneConfig {
  year: number;
  icon: string;
  tag: string;
  mobileLeft: string;
  desktopLeft: string;
  desktopSide: "left" | "right" | "center";
  quote?: string;
  story?: string;
  image?: string;
  isTurningPoint?: boolean;
  isDestination?: boolean;
}

const MILESTONES_CONFIG: MilestoneConfig[] = [
  {
    year: 2004,
    image: "/roadmap/2004_baby_origin.jpg",
    icon: "👑",
    tag: "ORIGIN · 2004",
    mobileLeft: "28px",
    desktopLeft: "46%",
    desktopSide: "left",
    story:
      "On this magical day, the world officially became ten times prettier, sweeter, and infinitely more adorable! 🌸✨ Heaven decided to send down its prettiest little angel—the cutest baby princess with chubby cheeks, tiny sparkling eyes, and a sweet little smile that could melt anyone's heart instantly. 🥹🎀\n\nYou looked just like a precious little doll, completely unaware that years later, this gorgeous little girl would grow up to become my whole universe and the prettiest person I have ever laid eyes on! Even before I knew you existed, my princess, this was the day that made my entire life complete. You've been stunning and cute since day one! 👑❤️",
  },
  {
    year: 2005,
    image: "/roadmap/2005_first_steps.jpg",
    icon: "👣",
    tag: "MILESTONE · 2005",
    mobileLeft: "28px",
    desktopLeft: "54%",
    desktopSide: "right",
    story:
      "Your very first year of spreading pure joy, giggling like a little fairy, and taking the most adorable wobbly baby steps into this big world! 🥹👣\n\nJust imagine those cute chubby little cheeks bouncing with every step, those tiny sparkling eyes full of wonder, and that sweet little smile that made everyone fall completely in love with you. You were basically a real-life little doll—so sweet, so pretty, and ridiculously cute! 🧸🎀\n\nThose tiny little feet were only just learning how to balance, but little did anyone know, every single step was secretly paving the sweetest road straight into my life. Even as a baby, you had that magical charm and beauty that could brighten any room. The cutest little princess this world has ever seen! 🌸✨",
  },
  {
    year: 2006,
    image: "/roadmap/2006_little_explorer.jpg",
    icon: "🎈",
    tag: "MILESTONE · 2006",
    mobileLeft: "28px",
    desktopLeft: "45%",
    desktopSide: "left",
    story:
      "The most adorable little explorer with the biggest, shiniest eyes and the cutest curiosity ever! 🎈✨\n\nRunning around with endless energy, playing without a single worry, and bringing pure sunshine everywhere you went. Your contagious little baby giggles, chubby cheeks, and sweet innocent face were so heart-meltingly pretty that nobody could ever say no to you. You were basically a little bundle of pure cuteness overload! 🥹🧸\n\nLaughing at the silliest little things, making cute little expressions, and already showing glimpses of the cheerful, loving, and stunning girl you are today. Honestly, you've been stealing hearts with your natural beauty and irresistible charm since day one! 🌸💖",
  },
  {
    year: 2010,
    image: "/roadmap/2010_school_days.jpg",
    icon: "🎒",
    tag: "MILESTONE · 2010",
    mobileLeft: "28px",
    desktopLeft: "55%",
    desktopSide: "right",
    story:
      "The sweetest, prettiest little schoolgirl with a cute school bag probably bigger than you! 🎒🎀\n\nMorning bells, sharing lunchbox snacks, whispered classroom secrets, and making your very first circle of friends. With your cute little hairstyles, big sparkling eyes, and that bright, sunshine smile, you must have been everyone's favourite little classmate! You were so adorably sweet that just seeing you smile could make anyone's day brighter. 🥹✨\n\nGrowing up with such a pure heart of gold, always kind, always cheerful, and collecting sweet innocent childhood memories. Even back in school uniforms and notebook doodles, you were effortlessly pretty, wonderfully gentle, and growing into the stunning, lovable princess you are today! 🌸💖",
  },
  {
    year: 2015,
    image: "/roadmap/2015_teenage_dreams.jpg",
    icon: "🌸",
    tag: "MILESTONE · 2015",
    mobileLeft: "28px",
    desktopLeft: "46%",
    desktopSide: "left",
    story:
      "Stepping into your teenage years and blossoming like the prettiest flower into someone truly breathtaking! 🌸✨\n\nDiscovering your own thoughts, dreaming bigger dreams, lost in your favourite music, and developing the cutest little personality quirks. This was when your natural glow really started shining—your beautiful smile was becoming brighter, your eyes were growing softer, and you were becoming so effortlessly gorgeous! 🥹🎧\n\nYet through all the growing up, you kept that same pure, golden heart. Always caring, deeply gentle, and spreading warmth to everyone around you. You weren't just growing up; you were blossoming into the most stunning, kind-hearted angel! 🌷💖",
  },
  {
    year: 2021,
    image: "/roadmap/2021_college_girl.jpg",
    icon: "✨",
    tag: "MILESTONE · 2021",
    mobileLeft: "28px",
    desktopLeft: "54%",
    desktopSide: "right",
    story:
      "Living life in your own sweetest rhythm, completely unaware of how stunning and radiant you were becoming every single day! 🌷✨\n\nMaking cute memories with friends, laughing until your tummy hurt, and carrying yourself with that quiet, gentle grace. You were just living in your own lovely world with your sweet expressions, shining eyes, and that heart-melting smile that could make anyone adore you instantly. 🥹🎀\n\nLittle did you know, the universe was already plotting something magical behind the scenes. Destiny was quietly arranging its stars, preparing for the moment my life would change forever. Even before I knew you, you were already the prettiest soul—and life was just getting ready to bring us together! 💫💖",
  },
  {
    year: 2022,
    image: "/roadmap/2022_engineering_meet.jpg",
    icon: "💫",
    tag: "✦ OUR FIRST CHAPTER · 2022 ✦",
    mobileLeft: "28px",
    desktopLeft: "50%",
    desktopSide: "center",
    isTurningPoint: true,
    quote: "“We went to the theatre to watch a movie, but life gave me a memory I'll never stop replaying.” 🎬🥹❤️",
    story:
      "Our first meeting... in a theatre, of all places! 🎬❤️ We both came there to watch a movie, not knowing that something much more beautiful was about to begin. Among all the movie scenes, lights and people around us, life was quietly planning its own little surprise. I never imagined that a simple day at the theatre would become such a special memory for me.\n\nWho knew that the girl I met that day would slowly become the one whose smile I would love, whose messages I would wait for and whose presence would make even ordinary days feel special? 🥹💕 Sometimes I wish I could go back to that very first day, just to see you again with the same excitement, knowing what a beautiful person you would become in my life.\n\nAmmuuu, the movie might have ended that day, but our little story was only getting started. And honestly, that's my favourite story ever! ❤️",
  },
  {
    year: 2023,
    image: "/roadmap/2023_studying_together.jpg",
    icon: "☕",
    tag: "MILESTONE · 2023",
    mobileLeft: "28px",
    desktopLeft: "54%",
    desktopSide: "right",
    story:
      "Late-night calls, endless texting, and catching myself smiling like a complete idiot at my phone screen! ☕🌙✨\n\nDays flew by in hours of non-stop talking, sharing the most random updates, laughing until our stomachs hurt at the stupidest inside jokes, and sending cute voice notes that could fix any bad mood instantly. Seeing you drop your guard and show your completely unmasked, goofy, dramatic, and adorable crazy side was the prettiest thing in the world. 🥹🎀\n\nWe weren't just having conversations anymore; you were quietly becoming my favourite habit, my softest comfort zone, and the safest haven I had ever known. Getting to know the real, lovely, cute, and crazy Ammu was honestly the best upgrade my life could have ever received! 🧸❤️",
  },
  {
    year: 2024,
    image: "/roadmap/2024_heart_necklace.jpg",
    icon: "💌",
    tag: "MILESTONE · 2024",
    mobileLeft: "28px",
    desktopLeft: "45%",
    desktopSide: "left",
    story:
      "The year we basically developed our own secret telepathy! 💌🌷✨\n\nSuddenly, we didn't even need full sentences anymore. Just one look, a single emoji, or even complete silence was enough to know exactly what the other was feeling. I could tell when you were pouting, when you were being a cute little drama queen, or when you just needed comfort—without you having to say a single word. 🥹🎀\n\nOur bond grew into something so rare, so deeply comforting, and completely unbreakable. Having someone who understands your silences just as much as your laughs is rare, but having that someone be a girl as pretty, sweet, and caring as you? That's pure magic. My favourite connection in this whole wide world! 💫❤️",
  },
  {
    year: 2025,
    image: "/roadmap/2025_fav_person.jpg",
    icon: "🔐",
    tag: "MILESTONE · 2025",
    mobileLeft: "28px",
    desktopLeft: "55%",
    desktopSide: "right",
    story:
      "The year you officially locked yourself inside my heart forever! 🔐✨❤️\n\nThrough every high, low, happy victory, and silly little everyday moment, you became the very first name my fingers typed. If something exciting happened, I wanted to tell you before anyone else. And on days when the world felt heavy, just hearing your cute voice or seeing your sweet face was enough to melt all my worries away. 🥹🌸\n\nYou quietly became my absolute favourite human, my safest haven, and the warmest piece of home I've ever found. No matter how chaotic life gets, being with my pretty, sweet, and adorable Ammu is my favourite place in the universe. You're permanently stuck as my favourite person! 🧸💖",
  },
  {
    year: 2026,
    image: "/roadmap/2026_birthday_22.jpg",
    icon: "🎂",
    tag: "✦ TODAY · 2026 ✦",
    mobileLeft: "28px",
    desktopLeft: "50%",
    desktopSide: "center",
    isDestination: true,
    quote: "“Out of all the stories written in the stars, yours is my absolute favourite. Will you let me stay and write every single chapter ahead with you?” 💍🥹❤️",
    story:
      "And look where this beautiful roadmap has finally brought us... right here to your 22nd Birthday, standing beside the prettiest birthday girl in the universe! 🎂👑✨\n\n22 years of you spreading sunshine, cute smiles, and pure magic wherever you go. Looking back from the little baby princess in 2004 all the way to our theatre meeting and every memory since, I realize just how blessed I am. Out of 8 billion people on this planet, destiny chose me to stand by your side, listen to your silly talks, hold your hand, and celebrate you today. 🥹🎀\n\nYou are not just my favourite person, Ammu; you are my home, my happiest habit, and the sweetest dream come true. Today, blow out those 22 candles with the biggest smile on your gorgeous face, knowing how deeply loved you are! Happy 22nd Birthday, my little queen! 💖🎉",
  },
];

/**
 * Builds a continuous, organic cubic Bezier path threading smoothly through the checkpoints.
 */
function buildSerpentinePath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const dy = p1.y - p0.y;
    const dx = p1.x - p0.x;

    if (Math.abs(dx) > 10) {
      const cp1x = p0.x;
      const cp1y = p0.y + dy * 0.52;
      const cp2x = p1.x;
      const cp2y = p1.y - dy * 0.52;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    } else {
      const bow = (i % 2 === 0 ? 1 : -1) * 32;
      const cp1x = p0.x + bow;
      const cp1y = p0.y + dy * 0.35;
      const cp2x = p1.x + bow;
      const cp2y = p1.y - dy * 0.35;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }
  }

  return d;
}

export default function Timeline({ onNext }: { onNext: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const highlightTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [pathD, setPathD] = useState<string>("");
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number | null>(null);
  const [highlightedMilestoneIndex, setHighlightedMilestoneIndex] = useState<number | null>(null);

  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const points: { x: number; y: number }[] = [];

      pinRefs.current.forEach((pinEl) => {
        if (pinEl) {
          const pinRect = pinEl.getBoundingClientRect();
          points.push({
            x: pinRect.left - containerRect.left + pinRect.width / 2,
            y: pinRect.top - containerRect.top + pinRect.height / 2,
          });
        }
      });

      if (points.length >= 2) {
        const startPoint = { x: points[0].x, y: Math.max(0, points[0].y - 65) };
        const endPoint = { x: points[points.length - 1].x, y: points[points.length - 1].y + 65 };
        const allPoints = [startPoint, ...points, endPoint];
        setPathD(buildSerpentinePath(allPoints));
      }
    };

    calculatePath();
    const t1 = setTimeout(calculatePath, 60);
    const t2 = setTimeout(calculatePath, 300);

    const ro = new ResizeObserver(() => calculatePath());
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", calculatePath);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("resize", calculatePath);
    };
  }, []);

  // Keyboard accessibility: Escape to close opened memory
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedMilestoneIndex !== null) {
        closeMemory();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Open memory view for specific milestone
  const openMemory = (index: number) => {
    setSelectedMilestoneIndex(index);
  };

  // Close memory view and automatically focus on the next milestone
  const closeMemory = () => {
    if (selectedMilestoneIndex === null) return;
    const currentIdx = selectedMilestoneIndex;

    const nextIdx = currentIdx < content.timeline.length - 1 ? currentIdx + 1 : currentIdx;

    setSelectedMilestoneIndex(null);
    setHighlightedMilestoneIndex(nextIdx);

    // Smoothly scroll to the next milestone
    setTimeout(() => {
      const targetEl = cardRefs.current[nextIdx];
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 120);

    // Clear subtle temporary highlight after 3.2 seconds
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => {
      setHighlightedMilestoneIndex(null);
    }, 3200);
  };

  const activeItem =
    selectedMilestoneIndex !== null ? content.timeline[selectedMilestoneIndex] : null;
  const activeCfg =
    selectedMilestoneIndex !== null ? MILESTONES_CONFIG[selectedMilestoneIndex] : null;
  const nextMilestoneItem =
    selectedMilestoneIndex !== null && selectedMilestoneIndex < content.timeline.length - 1
      ? content.timeline[selectedMilestoneIndex + 1]
      : selectedMilestoneIndex !== null
      ? content.timeline[selectedMilestoneIndex]
      : null;

  return (
    <div className="relative min-h-screen py-12 md:py-20 px-3 sm:px-6 md:px-8 z-10 flex flex-col items-center">
      {/* Elegant, smooth stardust travel animation */}
      <style jsx global>{`
        @keyframes stardustTravel {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -42;
          }
        }
        .smooth-stardust-dash {
          animation: stardustTravel 3s linear infinite;
        }
        @keyframes pathGlowPulse {
          0%, 100% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.45));
          }
        }
        .path-luminous-core {
          animation: pathGlowPulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* Roadmap Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8 md:mb-12 z-20 flex flex-col items-center max-w-3xl mx-auto px-2"
      >
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-50/90 border border-rose-200/80 shadow-sm text-xs font-mono font-bold tracking-[0.25em] text-rose-800 uppercase mb-3">
          <span>✦</span>
          <span>OUR STORY ROADMAP</span>
          <span>✦</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-rose-950 mb-3 tracking-tight">
          ✦ The Story of You & Us ✦
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-rose-900/80 font-sans max-w-xl mx-auto leading-relaxed px-4">
          Every winding curve, every little chapter, and every single year was quietly leading me straight to you.
        </p>
      </motion.div>

      {/* Main Roadmap Board: An Illustrated Parchment Canvas */}
      <div className="relative w-full max-w-4xl mx-auto bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F6] to-[#FFF5F2] border-2 border-rose-200/70 rounded-3xl p-4 sm:p-6 md:p-10 shadow-[0_20px_60px_rgba(244,63,94,0.07)] backdrop-blur-sm">
        {/* Decorative Archival Corner Accents */}
        <div className="absolute top-3 left-4 text-rose-300/70 font-mono text-xs select-none pointer-events-none">╔══</div>
        <div className="absolute top-3 right-4 text-rose-300/70 font-mono text-xs select-none pointer-events-none">══╗</div>
        <div className="absolute bottom-3 left-4 text-rose-300/70 font-mono text-xs select-none pointer-events-none">╚══</div>
        <div className="absolute bottom-3 right-4 text-rose-300/70 font-mono text-xs select-none pointer-events-none">══╝</div>

        {/* Cartographic Coordinate Tag Watermark */}
        <div className="absolute top-3.5 right-10 text-[10px] font-mono tracking-widest text-rose-400/50 hidden md:block select-none pointer-events-none">
          LAT 12° 58&apos; N • DESTINATION: AMMU&apos;S HEART
        </div>

        {/* Container for the curved roadmap */}
        <div ref={containerRef} className="relative w-full py-4">
          {/* Curved SVG Road Layers (Sleek, Luminous Ribbon) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <filter id="road-ambient-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <linearGradient id="roseGoldPath" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="25%" stopColor="#F43F5E" />
                <stop offset="60%" stopColor="#E11D48" />
                <stop offset="85%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              <linearGradient id="stardustGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FEF3C7" />
              </linearGradient>
            </defs>

            {pathD && (
              <>
                {/* 1. Soft atmospheric glow behind the trail */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(244, 63, 94, 0.22)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#road-ambient-glow)"
                />

                {/* 2. Sleek metallic rose-gold core path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#roseGoldPath)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="path-luminous-core"
                />

                {/* 3. Refined stardust light trail with smooth flowing motion */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#stardustGlow)"
                  strokeWidth="1.8"
                  strokeDasharray="5 9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="smooth-stardust-dash"
                />
              </>
            )}
          </svg>

          {/* Milestones along the curved roadmap (Clean, unobstructed layout) */}
          {content.timeline.map((item, index) => {
            const cfg = MILESTONES_CONFIG[index] || {
              year: item.year,
              icon: item.year >= 2022 ? "💫" : "📍",
              tag: `MILESTONE ${index + 1}`,
              mobileLeft: "28px",
              desktopLeft: index % 2 === 0 ? "46%" : "54%",
              desktopSide: index % 2 === 0 ? "left" : "right",
              isTurningPoint: item.year === 2022,
              isDestination: item.year === 2026,
            };

            const isSpecial = item.year >= 2022;
            const isLeft = cfg.desktopSide === "left";
            const isCenter = cfg.desktopSide === "center";
            const isHighlighted = highlightedMilestoneIndex === index;

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative flex items-center my-8 md:my-14 min-h-[110px] ${
                  isCenter ? "flex-col justify-center" : ""
                }`}
              >
                {/* 3D Landmark Enamel Pin on the Road (Unobstructed & Clean) */}
                <div
                  ref={(el) => {
                    pinRefs.current[index] = el;
                  }}
                  style={
                    {
                      "--pin-mobile-left": cfg.mobileLeft,
                      "--pin-desktop-left": cfg.desktopLeft,
                    } as React.CSSProperties
                  }
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center cursor-default transition-transform duration-300 hover:scale-125 left-[var(--pin-mobile-left)] md:left-[var(--pin-desktop-left)] ${
                    isCenter ? "md:top-2 md:translate-y-0" : ""
                  }`}
                >
                  {/* Pulsing Aura Ring */}
                  <span
                    className={`absolute -inset-1.5 rounded-full pointer-events-none ${
                      cfg.isDestination
                        ? "bg-amber-400/40 animate-ping"
                        : cfg.isTurningPoint
                        ? "bg-rose-500/35 animate-pulse"
                        : isSpecial
                        ? "bg-rose-400/25 animate-pulse"
                        : "bg-rose-200/50"
                    }`}
                  />

                  {/* Pin Core Badge */}
                  <div
                    className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-base md:text-lg border-2 transition-all ring-4 ${
                      cfg.isDestination
                        ? "bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-600 text-white border-white ring-amber-200/80 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-110"
                        : cfg.isTurningPoint
                        ? "bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-300 text-white border-white ring-rose-200/80 shadow-[0_0_18px_rgba(244,63,94,0.45)] scale-110"
                        : isSpecial
                        ? "bg-gradient-to-tr from-rose-400 to-rose-500 text-white border-white ring-rose-100 shadow-md"
                        : "bg-white text-rose-800 border-rose-200 ring-rose-50 shadow-sm"
                    }`}
                  >
                    <span className="select-none">{cfg.icon}</span>
                  </div>
                </div>

                {/* Milestone Card (Clean alternating positioning with zero overlap on the road) */}
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`w-full pl-16 md:pl-0 relative ${
                    isCenter
                      ? "md:w-[62%] md:mx-auto md:text-center mt-12 md:mt-14"
                      : isLeft
                      ? "md:w-[40%] md:mr-auto md:text-left"
                      : "md:w-[40%] md:ml-auto md:text-left"
                  }`}
                >
                  {/* Subtle Anchor Connector Line on Desktop */}
                  {!isCenter && (
                    <span
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-5 border-b border-dashed border-rose-300/60 pointer-events-none ${
                        isLeft ? "-right-5" : "-left-5"
                      }`}
                    />
                  )}

                  <div
                    className={`p-5 md:p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 ${
                      isHighlighted
                        ? "ring-4 ring-rose-400 ring-offset-2 shadow-[0_0_30px_rgba(244,63,94,0.35)] scale-[1.02]"
                        : ""
                    } ${
                      cfg.isDestination
                        ? "bg-gradient-to-br from-amber-50/95 via-rose-50/95 to-pink-50/90 border-2 border-amber-300 shadow-[0_15px_35px_rgba(245,158,11,0.18)]"
                        : cfg.isTurningPoint
                        ? "bg-gradient-to-br from-rose-50/95 via-pink-50/90 to-amber-50/90 border-2 border-rose-300 shadow-[0_15px_35px_rgba(244,63,94,0.15)]"
                        : isSpecial
                        ? "bg-white/95 border-rose-200 shadow-[0_10px_25px_rgba(244,63,94,0.08)]"
                        : "bg-white/90 border-rose-100 shadow-[0_6px_20px_rgba(244,63,94,0.04)]"
                    }`}
                  >
                    {/* Card Header: Tag Badge */}
                    <div className={`flex items-center mb-2.5 ${isCenter ? "md:justify-center" : "justify-start"}`}>
                      <span
                        className={`text-[10px] md:text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                          cfg.isDestination
                            ? "bg-amber-100 text-amber-900 border border-amber-200 shadow-sm"
                            : cfg.isTurningPoint
                            ? "bg-rose-100 text-rose-900 border border-rose-200 shadow-sm"
                            : isSpecial
                            ? "bg-rose-50 text-rose-800 border border-rose-100"
                            : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                        }`}
                      >
                        {cfg.tag}
                      </span>
                    </div>

                    {/* Clickable Title with Small Elegant Arrow (Opens Memory) */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => openMemory(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openMemory(index);
                        }
                      }}
                      className={`group/title inline-flex items-center gap-2 cursor-pointer select-none transition-colors mb-2 ${
                        isCenter ? "md:justify-center" : "justify-start"
                      }`}
                      aria-label={`Open memory for ${item.title}`}
                    >
                      <h4
                        className={`text-xl md:text-2xl font-serif font-bold tracking-tight transition-colors group-hover/title:text-rose-600 ${
                          cfg.isDestination
                            ? "text-rose-950"
                            : cfg.isTurningPoint
                            ? "text-rose-950"
                            : isSpecial
                            ? "text-rose-900"
                            : "text-zinc-800"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span
                        className="inline-flex items-center justify-center text-rose-400 group-hover/title:text-rose-600 text-base md:text-lg transition-transform duration-200 group-hover/title:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-sm md:text-base leading-relaxed ${
                        isSpecial ? "text-rose-900/80 font-sans" : "text-zinc-600 font-sans"
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Special Romantic Note */}
                    {cfg.quote && (
                      <div
                        className={`mt-3 pt-3 border-t text-xs md:text-sm font-serif italic ${
                          cfg.isDestination
                            ? "border-amber-200/70 text-amber-900 font-semibold"
                            : "border-rose-200/70 text-rose-700 font-semibold"
                        }`}
                      >
                        {cfg.quote}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Destination Arrival & Next Section Button */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-20 mb-8 flex flex-col items-center text-center z-20"
          >
            {/* Destination Wax Seal Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 text-white flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(244,63,94,0.4)] mb-5 ring-4 ring-rose-100 animate-pulse">
              💌
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-rose-950 mb-3 tracking-tight max-w-xl px-4 leading-snug">
              ✦ TO MANY MORE CHAPTERS, WITH YOU. FOREVER! ❤️
            </h3>

            <p className="text-sm md:text-base font-serif italic text-rose-900/75 max-w-md px-4 mb-8">
              “No matter what turns lie ahead, my favorite place on this entire map will always be right beside you.”
            </p>

            <button
              onClick={onNext}
              className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-[0_12px_28px_rgba(244,63,94,0.35)] hover:shadow-[0_18px_36px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm font-semibold cursor-pointer"
            >
              <span>Read My Letter</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-base">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Full-Screen Dedicated Memory Reading Experience */}
      <AnimatePresence>
        {selectedMilestoneIndex !== null && activeItem && (
          <motion.div
            key="memory-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeMemory();
              }
            }}
            className="fixed inset-0 z-50 overflow-y-auto bg-rose-950/40 backdrop-blur-sm flex justify-center items-start sm:items-center p-3 sm:p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="memory-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F6] to-[#FFF5F2] border-2 border-rose-200/90 rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(244,63,94,0.18)] text-left my-4 sm:my-auto"
            >
              {/* Top Navigation Bar: Back Button */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-rose-100">
                <button
                  onClick={closeMemory}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-200 shadow-sm text-xs sm:text-sm font-sans font-medium text-rose-900 hover:bg-rose-50 hover:text-rose-700 transition-all cursor-pointer"
                >
                  <span className="transition-transform group-hover:-translate-x-1 text-base">←</span>
                  <span className="font-semibold">Back to Our Journey</span>
                </button>

                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-600 font-semibold px-3 py-1 rounded-full bg-rose-50 border border-rose-100">
                  {activeCfg?.tag || `MILESTONE · ${activeItem.year}`}
                </span>
              </div>

              {/* Milestone Year & Title */}
              <div className="mb-6">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-rose-500 uppercase block mb-1">
                  {activeItem.year} MEMORY CHAPTER
                </span>
                <h2
                  id="memory-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-rose-950 tracking-tight"
                >
                  {activeItem.title}
                </h2>
              </div>

              {/* Memory Photograph Area */}
              <div className="w-full max-h-[440px] rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50/90 to-amber-50/50 border border-rose-200/80 mb-6 shadow-sm relative flex items-center justify-center p-2 sm:p-3">
                {activeCfg?.image && activeCfg.image !== "/placeholder.jpg" ? (
                  <img
                    src={activeCfg.image}
                    alt={activeItem.title}
                    className="max-h-[410px] w-auto h-auto max-w-full object-contain rounded-xl shadow-sm"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 select-none">
                    <div className="w-14 h-14 rounded-full bg-white/90 border border-rose-200 shadow-sm flex items-center justify-center text-2xl mb-3">
                      📸
                    </div>
                    <p className="text-sm font-serif italic text-rose-900/80">
                      A keepsake memory from {activeItem.year}
                    </p>
                    <p className="text-[11px] font-mono text-rose-400 mt-1">
                      ✦ Memory Photo Space ✦
                    </p>
                  </div>
                )}
              </div>

              {/* Memory Story Narrative */}
              <div className="space-y-4 mb-8 text-rose-900/85 font-sans leading-relaxed text-sm sm:text-base">
                <p className="whitespace-pre-line leading-relaxed">
                  {activeCfg?.story || activeItem.description}
                </p>

                {/* Quote if present */}
                {activeCfg?.quote && (
                  <div className="p-4 rounded-xl bg-white/80 border-l-4 border-rose-400 border-rose-100 shadow-sm text-sm sm:text-base font-serif italic text-rose-800 my-4">
                    {activeCfg.quote}
                  </div>
                )}
              </div>

              {/* Bottom Actions: Back to Our Journey + Next Milestone hint */}
              <div className="pt-5 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={closeMemory}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-medium cursor-pointer"
                >
                  <span className="transition-transform group-hover:-translate-x-1">←</span>
                  <span className="font-semibold">Back to Our Journey</span>
                </button>

                {nextMilestoneItem && nextMilestoneItem.year !== activeItem.year && (
                  <span className="text-xs font-mono text-rose-500/80 tracking-wide text-center sm:text-right">
                    Up Next: <span className="font-semibold text-rose-700">{nextMilestoneItem.title}</span> ({nextMilestoneItem.year}) →
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
