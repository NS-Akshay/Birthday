"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";

/* =========================================================================
   MEMORIES DATA — 22 Meaningful Milestones with Poetic Romantic Descriptions
   ========================================================================= */

interface MemoryItem {
  id: number;
  title: string;
  desc: string;
  date: string;
  chapter: string;
  quote: string;
  image: string | null;
}

const DEFAULT_MEMORIES: Omit<MemoryItem, "image">[] = [
  {
    id: 1,
    title: "Our First Meet — Strangers with Little Talks 🎬❤️",
    date: "Theater First Meet",
    chapter: "Moment 01",
    quote: "",
    desc: "The day my life had completely changed aa okka theater lo meet na life ni intha hpyness testundi ani nak telidu"
  },
  {
    id: 2,
    title: "Our First Selfie in That Restaurant 📸💗",
    date: "College Days",
    chapter: "Moment 02",
    quote: "",
    desc: "The 1st selfie wth u in that restaurant and tht moments spent wth u are jst 💗"
  },
  {
    id: 3,
    title: "The Video Calls You Struggled to Make for Me 📱🥹",
    date: "For My Smile",
    chapter: "Moment 03",
    quote: "",
    desc: "Na kosam nuv chese vc and adhi cheyyadaniki nuv chese stunts and unseen efforts for that are too over loving"
  },
  {
    id: 4,
    title: "Our Cute Fights & Complaints 😤❤️",
    date: "Better Together",
    chapter: "Moment 04",
    quote: "",
    desc: "Mana bujji bjji godavalu vidipomu ani telsi kooda godavapadutham and ventane kalsipotham how cuteeee kada"
  },
  {
    id: 5,
    title: "Lost in Your Eyes at the Canteen ☕❤️",
    date: "Canteen Hours",
    chapter: "Moment 05",
    quote: "",
    desc: "Ne kallani choostu alane brathikesta em mantram vesavo teidu kani ne maya lo padesav"
  },
  {
    id: 6,
    title: "That Traditional Look & Shy Blush 🌸✨",
    date: "Traditional Day",
    chapter: "Moment 06",
    quote: "",
    desc: "Ninnu saree lo choosinappudu matram na heart lo 1000 gantalu oke sari mogi nattu untundi"
  },
  {
    id: 7,
    title: "Bus Journeys & Cheeks Teasing 🚌❤️",
    date: "Daily Travel",
    chapter: "Moment 07",
    quote: "",
    desc: "That 1 bus journey wth u ne pakka 1 nyt motham aa journey and aa memories are unforgettable"
  },
  {
    id: 8,
    title: "College Life & Pure Madness 🤪💖",
    date: "Classroom Fun",
    chapter: "Moment 08",
    quote: "",
    desc: "manam kalisi unappudu mana allari chestalu and mana cute cute expressions and alagadam are too mesmarising"
  },
  {
    id: 9,
    title: "Canteen Lunch & Shared Plates 🍛❤️",
    date: "Lunch Break",
    chapter: "Moment 09",
    quote: "",
    desc: "cls bunks kotti canteen velladam daily bayata tinadam ne half plate nak icheyyadam best best memories telsa ma"
  },
  {
    id: 10,
    title: "Kuppam Engineering College — Where It All Began 🏛️🎓",
    date: "Campus Entrance",
    chapter: "Moment 10",
    quote: "",
    desc: "idhi antha manam ee clg lo join avvadam valla strt ayyidi ee clg lo edaina manchi voshayam undi ante adhi ninnu meet avvadam matrame"
  },
  {
    id: 11,
    title: "Garden Peace & Endless Stares 🌸🌿",
    date: "Green Lawn Afternoons",
    chapter: "Moment 11",
    quote: "",
    desc: "especially mana garden batakani enni sarlu bunk kotti garden lo kurchoni bathakai vesam photo shoots anni gurtu unnaya bangaram"
  },
  {
    id: 12,
    title: "Birthday Magic & Sweet Cake 🎂🎈",
    date: "Special Celebration",
    chapter: "Moment 12",
    quote: "",
    desc: "Celebrating ur bdays in restaurent and making ur day too special and nek gifts ivvadam assal marchiponi moments"
  },
  {
    id: 13,
    title: "Temple Blessings & Sacred Prayers 🛕🙏",
    date: "Divine Blessings",
    chapter: "Moment 13",
    quote: "",
    desc: "the best of best memory netho tirumala darshanam aa moments 24 hrs netho tym spend cheyyadam netho kalisi aa devudini darshanam chesukovadam is a magic"
  },
  {
    id: 14,
    title: "Sunset Bike Rides & Wind in Your Hair 🏍️🌅",
    date: "Evening Rides",
    chapter: "Moment 14",
    quote: "",
    desc: "that 1 bike ride wth u jst 2 min ayna sere life long marchipolenu aa moment ni its my best of best memories"
  },
  {
    id: 15,
    title: "Piggyback Rides & Your Weightless Laughter 🎒❤️",
    date: "Carefree Afternoons",
    chapter: "Moment 15",
    quote: "",
    desc: "ninnu ethokovadam tippadam netho aadukovadam those cute moments are jst blissss"
  },
  {
    id: 16,
    title: "When You Feed Me with Love 🍲🥄",
    date: "Dinner Dates",
    chapter: "Moment 16",
    quote: "",
    desc: "nuv nak food tinipchadam ninnu meet avvagane nenu 1st expect chesedi idhe and aa moment lo oka sari na eys loki chooste nek artham avutundi entha hpy ga unta ani"
  },
  {
    id: 17,
    title: "Walking Hand in Hand Forever 🌸👫",
    date: "Every Step with You",
    chapter: "Moment 17",
    quote: "",
    desc: "tht bnglr walks wth u ne chethi lo chey vesi ala walking velladam netho kalisi banglore sreets lo tiragadam , tinadam this was in my top bucket list and we finally fulfilled it"
  },
  {
    id: 18,
    title: "Resting on My Shoulder & Quiet Evenings 🌇❤️",
    date: "Golden Hour",
    chapter: "Moment 18",
    quote: "",
    desc: "nuv na sholder paina padukovadam aa nenu ninu choostu alane undipotha aa moment matram eyes lo nundi water vostadi with unlimited hpyness"
  },
  {
    id: 19,
    title: "Always Here to Care for You 🩹❤️",
    date: "Gentle Care",
    chapter: "Moment 19",
    quote: "",
    desc: "Na Bangaram ki legs pain vochiappudu aa legs press chestunappdu nuv relax avutunte nak aa hpyness ayna nek nenu tappa evaru sevalu cehstaru chpu nenu matarme cheyali vere vallu cheste korukutha"
  },
  {
    id: 20,
    title: "My Safest Haven in the Whole World 🛋️❤️",
    date: "Home in You",
    chapter: "Moment 20",
    quote: "",
    desc: "ne lap lo padukovadam nuv ma amma laga assal prapancham tho sambandham undadu amma odi lo unattu untundi that feel and comfort 1cr ichina assal radu"
  },
  {
    id: 21,
    title: "Celebrating Another Year of Pure Magic 🎂🎉",
    date: "Happy 22nd Birthday",
    chapter: "Moment 21",
    quote: "",
    desc: "finally tdy celebrating ur 22d bday eerou manam pakkana undakapovochu but this bday will be too spcl prati min prathi sec netho spend cheyyadaniki wait chestu unta Bangaram tdy the most special day of my life ne bday kanna spcial day edi untndi chpu kanna nak"
  },
  {
    id: 22,
    title: "Our Unlimited Love Continues... 💖♾️",
    date: "Today, Tomorrow & Forever",
    chapter: "Moment 22",
    quote: "“Mana story ki the end ledu Ammu... it’s an infinite loop of love!”",
    desc: "Mana story ikaditho aagipodhu Ammu, idhi just starting anthe! ❤️ 22 years celebrate chesukuntunnam, but with you, every single day oka beautiful celebration laane anipisthundhi. Enni days gadichina, enni years maarina, mana madhyalo unna ee silly talks, endless teasing, cute blushings, and unconditional love eppatiki ilage continue avuthu untayi. Naa eyes lo nuvvu eppudu naa cute bujji bangaram gaane untav. Life long ninnu ilage premisthu, protect chesthu, navvisthu unta bangarammmm! Our unlimited love story continues forever & ever... 🥹💖♾️👑"
  }
];

/* =========================================================================
   22 BESPOKE ROMANTIC ARTWORKS
   ========================================================================= */

const MemoryArtwork = ({ id }: { id: number }) => {
  switch (id) {
    case 1:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2D1E2F" />
              <stop offset="50%" stopColor="#4A2E44" />
              <stop offset="100%" stopColor="#6E445B" />
            </linearGradient>
            <linearGradient id="cupGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE0C8" />
              <stop offset="100%" stopColor="#E5A882" />
            </linearGradient>
            <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE8B0" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFE8B0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg1)" />
          <circle cx="160" cy="110" r="90" fill="url(#glow1)" />
          {[
            [40, 40], [90, 60], [130, 35], [200, 45], [260, 30], [280, 80],
            [70, 110], [250, 120], [160, 50]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.5" fill="#FFF8E7" opacity={0.7 + (i % 3) * 0.1} />
          ))}
          <ellipse cx="125" cy="165" rx="36" ry="12" fill="#241422" opacity="0.4" />
          <ellipse cx="195" cy="165" rx="36" ry="12" fill="#241422" opacity="0.4" />
          <path d="M 105 130 C 105 160 145 160 145 130 Z" fill="url(#cupGrad)" />
          <path d="M 175 130 C 175 160 215 160 215 130 Z" fill="url(#cupGrad)" />
          <path d="M 125 125 Q 120 100 140 85 Q 160 70 160 95 Q 160 70 180 85 Q 200 100 195 125" 
                fill="none" stroke="#FFE7C4" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
          <path d="M 160 85 Q 160 55 160 45" fill="none" stroke="#FFE7C4" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          <circle cx="160" cy="42" r="3" fill="#FFE58F" />
        </svg>
      );

    case 2:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF1D6" />
              <stop offset="50%" stopColor="#FFE0B2" />
              <stop offset="100%" stopColor="#FFCC80" />
            </linearGradient>
            <radialGradient id="sunBurst" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFE79A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFCC80" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg2)" />
          <circle cx="160" cy="100" r="110" fill="url(#sunBurst)" />
          <g transform="translate(130, 85) rotate(-15) scale(0.9)">
            <ellipse cx="15" cy="15" rx="16" ry="11" fill="#E65100" opacity="0.75" />
            <ellipse cx="35" cy="15" rx="16" ry="11" fill="#E65100" opacity="0.75" />
            <ellipse cx="20" cy="27" rx="11" ry="8" fill="#F57C00" opacity="0.8" />
            <ellipse cx="30" cy="27" rx="11" ry="8" fill="#F57C00" opacity="0.8" />
            <circle cx="25" cy="20" r="2.5" fill="#4E342E" />
          </g>
          <text x="75" y="145" fontSize="22" fill="#D84315" opacity="0.75" fontFamily="serif">♪</text>
          <text x="220" y="80" fontSize="26" fill="#D84315" opacity="0.75" fontFamily="serif">♫</text>
          <text x="90" y="70" fontSize="18" fill="#BF360C" opacity="0.6">✨</text>
          <text x="210" y="150" fontSize="20" fill="#BF360C" opacity="0.6">✨</text>
          <path d="M 160 145 C 150 130 130 130 130 148 C 130 165 160 185 160 185 C 160 185 190 165 190 148 C 190 130 170 130 160 145 Z" 
                fill="#E64A19" opacity="0.85" />
        </svg>
      );

    case 3:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="60%" stopColor="#1C2541" />
              <stop offset="100%" stopColor="#3A506B" />
            </linearGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF3B0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFF3B0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg3)" />
          <circle cx="220" cy="70" r="45" fill="url(#moonGlow)" />
          <path d="M 230 40 A 32 32 0 1 0 230 100 A 26 26 0 1 1 230 40 Z" fill="#FFFBE6" />
          <path d="M 50 60 L 90 45 L 130 75 L 160 55" stroke="#89CFF0" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.7" />
          <circle cx="50" cy="60" r="2" fill="#FFF" />
          <circle cx="90" cy="45" r="2.5" fill="#FFF" />
          <circle cx="130" cy="75" r="2" fill="#FFF" />
          <circle cx="160" cy="55" r="3" fill="#FFF" />
          <rect x="135" y="145" width="50" height="75" rx="3" fill="#FFD166" opacity="0.95" />
          <line x1="160" y1="145" x2="160" y2="220" stroke="#0B132B" strokeWidth="2.5" />
          <line x1="135" y1="180" x2="185" y2="180" stroke="#0B132B" strokeWidth="2.5" />
          <ellipse cx="160" cy="210" rx="14" ry="4" fill="#0B132B" />
        </svg>
      );

    case 4:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg4)" />
          <path d="M 70 190 A 90 90 0 0 1 250 190" fill="none" stroke="#F87171" strokeWidth="5" opacity="0.6" />
          <path d="M 77 190 A 83 83 0 0 1 243 190" fill="none" stroke="#FBBF24" strokeWidth="5" opacity="0.6" />
          <path d="M 84 190 A 76 76 0 0 1 236 190" fill="none" stroke="#34D399" strokeWidth="5" opacity="0.6" />
          <path d="M 91 190 A 69 69 0 0 1 229 190" fill="none" stroke="#60A5FA" strokeWidth="5" opacity="0.6" />
          <path d="M 120 90 A 25 25 0 0 1 165 75 A 35 35 0 0 1 210 95 A 25 25 0 0 1 195 125 L 125 125 A 20 20 0 0 1 120 90 Z" 
                fill="#94A3B8" opacity="0.8" />
          {[130, 150, 170, 190].map((x, i) => (
            <line key={i} x1={x} y1={135} x2={x - 4} y2={155} stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          ))}
          <text x="150" y="180" fontSize="22" textAnchor="middle">🌱</text>
        </svg>
      );

    case 5:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg5" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4A192C" />
              <stop offset="50%" stopColor="#832145" />
              <stop offset="100%" stopColor="#BC4749" />
            </linearGradient>
            <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#FFF9C4" />
              <stop offset="100%" stopColor="#FFD54F" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg5)" />
          <path d="M 20 140 C 60 140 80 120 110 120 C 130 120 145 130 150 135" 
                stroke="#FFCDD2" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M 300 140 C 260 140 240 120 210 120 C 190 120 175 130 170 135" 
                stroke="#FFCDD2" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M 110 110 C 130 70 160 70 160 110 C 160 70 190 70 210 110 C 230 150 160 175 160 175 C 160 175 90 150 110 110 Z" 
                fill="none" stroke="url(#goldRibbon)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="160" cy="110" r="5" fill="#FFF9C4" />
        </svg>
      );

    case 6:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg6" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="70%" stopColor="#334155" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg6)" />
          <line x1="160" y1="0" x2="160" y2="220" stroke="#64748B" strokeWidth="4" opacity="0.6" />
          <line x1="0" y1="110" x2="320" y2="110" stroke="#64748B" strokeWidth="4" opacity="0.6" />
          {[
            [40, 50], [80, 80], [60, 160], [120, 140],
            [200, 40], [240, 90], [280, 150], [220, 180]
          ].map(([cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="2" ry="4" fill="#94A3B8" opacity="0.5" />
          ))}
          <path d="M 90 55 C 80 40 60 40 60 60 C 60 80 90 100 90 100 C 90 100 120 80 120 60 C 120 40 100 40 90 55 Z" 
                fill="none" stroke="#F1F5F9" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <rect x="235" y="165" width="20" height="40" rx="2" fill="#FEF08A" />
          <path d="M 245 165 Q 248 150 245 145 Q 242 150 245 165 Z" fill="#F97316" />
        </svg>
      );

    case 7:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg7" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDF2F8" />
              <stop offset="60%" stopColor="#FCE7F3" />
              <stop offset="100%" stopColor="#FBCFE8" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg7)" />
          <rect x="120" y="70" width="80" height="110" rx="14" fill="#FFFFFF" fillOpacity="0.6" stroke="#DB2777" strokeWidth="3" />
          <rect x="135" y="58" width="50" height="12" rx="4" fill="#BE185D" />
          <line x1="130" y1="70" x2="190" y2="70" stroke="#BE185D" strokeWidth="3" />
          <text x="140" y="105" fontSize="18" fill="#F59E0B">⭐</text>
          <text x="165" y="130" fontSize="16" fill="#F59E0B">✨</text>
          <text x="135" y="150" fontSize="20" fill="#EC4899">💖</text>
          <text x="160" y="165" fontSize="15" fill="#F59E0B">⭐</text>
          <circle cx="85" cy="65" r="16" fill="#FFF" stroke="#DB2777" strokeWidth="2" />
          <text x="85" y="71" fontSize="13" textAnchor="middle" fill="#BE185D" fontWeight="bold">haha</text>
          <circle cx="235" cy="80" r="18" fill="#FFF" stroke="#DB2777" strokeWidth="2" />
          <text x="235" y="87" fontSize="14" textAnchor="middle" fill="#BE185D" fontWeight="bold">us :)</text>
        </svg>
      );

    case 8:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg8" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDFBF7" />
              <stop offset="100%" stopColor="#EADBC8" />
            </linearGradient>
            <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#AA7C11" />
              <stop offset="100%" stopColor="#E5C158" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg8)" />
          <circle cx="160" cy="110" r="65" fill="none" stroke="url(#brassGrad)" strokeWidth="6" />
          <circle cx="160" cy="110" r="56" fill="#FFFBF0" stroke="#C5A059" strokeWidth="1.5" />
          <text x="160" y="70" textAnchor="middle" fontSize="11" fill="#8C6524" fontWeight="bold">N</text>
          <text x="160" y="158" textAnchor="middle" fontSize="11" fill="#8C6524" fontWeight="bold">S</text>
          <text x="205" y="114" textAnchor="middle" fontSize="11" fill="#8C6524" fontWeight="bold">E</text>
          <text x="115" y="114" textAnchor="middle" fontSize="11" fill="#8C6524" fontWeight="bold">W</text>
          <polygon points="160,78 154,110 166,110" fill="#E11D48" />
          <polygon points="160,142 154,110 166,110" fill="#64748B" />
          <circle cx="160" cy="110" r="5" fill="#AA7C11" />
          <circle cx="160" cy="74" r="3" fill="#FFE4E6" />
        </svg>
      );

    case 9:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg9" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF1F2" />
              <stop offset="100%" stopColor="#FFE4E6" />
            </linearGradient>
            <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg9)" />
          <text x="120" y="60" fontSize="18" fill="#F59E0B">✨</text>
          <text x="185" y="45" fontSize="22" fill="#F59E0B">✨</text>
          <text x="150" y="30" fontSize="24" fill="#E11D48">💖</text>
          <rect x="120" y="115" width="80" height="70" rx="3" fill="url(#boxGrad)" />
          <rect x="153" y="115" width="14" height="70" fill="#FDE047" />
          <g transform="translate(110, 95) rotate(-12)">
            <rect x="0" y="0" width="100" height="22" rx="3" fill="#BE123C" />
            <rect x="42" y="0" width="16" height="22" fill="#FDE047" />
            <circle cx="42" cy="-6" r="10" fill="none" stroke="#FDE047" strokeWidth="4" />
            <circle cx="58" cy="-6" r="10" fill="none" stroke="#FDE047" strokeWidth="4" />
          </g>
        </svg>
      );

    case 10:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg10" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="65%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <radialGradient id="fireGlow" cx="50%" cy="80%" r="50%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#EAB308" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg10)" />
          <circle cx="160" cy="180" r="100" fill="url(#fireGlow)" />
          {[
            [150, 130], [170, 115], [145, 95], [165, 80], [155, 60],
            [130, 70], [185, 90], [160, 40]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={1.5 + (i % 2)} fill="#FDE047" opacity={0.8} />
          ))}
          <line x1="125" y1="185" x2="195" y2="175" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          <line x1="130" y1="175" x2="190" y2="185" stroke="#92400E" strokeWidth="7" strokeLinecap="round" />
          <path d="M 160 140 Q 175 160 170 180 Q 150 185 145 175 Q 145 155 160 140 Z" fill="#EF4444" />
          <path d="M 160 150 Q 170 165 165 178 Q 155 180 152 173 Z" fill="#FBBF24" />
        </svg>
      );

    case 11:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg11" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#4338CA" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg11)" />
          <circle cx="230" cy="50" r="26" fill="#FEF08A" opacity="0.9" />
          <path d="M 0 170 Q 60 150 120 170 T 240 170 T 360 170 L 320 220 L 0 220 Z" fill="#FFFFFF" fillOpacity="0.2" />
          <path d="M 0 185 Q 70 170 150 185 T 320 185 L 320 220 L 0 220 Z" fill="#FFFFFF" fillOpacity="0.4" />
          <g transform="translate(130, 140)">
            <polygon points="0,20 60,20 50,35 10,35" fill="#FFFFFF" />
            <polygon points="30,0 30,20 10,20" fill="#F8FAFC" />
            <polygon points="30,5 50,20 30,20" fill="#E2E8F0" />
            <circle cx="30" cy="-2" r="3" fill="#F43F5E" />
          </g>
        </svg>
      );

    case 12:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg12" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="50%" stopColor="#FEF9E7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="laurel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg12)" />
          <circle cx="160" cy="105" r="62" fill="none" stroke="url(#laurel)" strokeWidth="2.5" strokeDasharray="5 3" />
          <text x="160" y="98" fontSize="26" textAnchor="middle" fill="#92400E" fontFamily="serif" fontWeight="bold">365</text>
          <text x="160" y="118" fontSize="12" textAnchor="middle" fill="#B45309" letterSpacing="3">DAYS</text>
          <text x="160" y="132" fontSize="10" textAnchor="middle" fill="#B45309">✦ OF US ✦</text>
          <rect x="135" y="165" width="12" height="35" rx="2" fill="#E11D48" />
          <path d="M 141 165 Q 144 153 141 148 Q 138 153 141 165 Z" fill="#F59E0B" />
          <rect x="173" y="165" width="12" height="35" rx="2" fill="#E11D48" />
          <path d="M 179 165 Q 182 153 179 148 Q 176 153 179 165 Z" fill="#F59E0B" />
        </svg>
      );

    case 13:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg13" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
            <linearGradient id="umbGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg13)" />
          {[40, 80, 120, 200, 240, 280].map((x, i) => (
            <line key={i} x1={x} y1={20} x2={x - 8} y2={60} stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          <path d="M 100 115 Q 160 50 220 115 Q 190 110 160 115 Q 130 110 100 115 Z" fill="url(#umbGrad)" />
          <line x1="160" y1="115" x2="160" y2="175" stroke="#FDE047" strokeWidth="3" />
          <path d="M 160 175 C 160 185 150 185 150 178" fill="none" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
          <text x="145" y="165" fontSize="22">🌹</text>
          <text x="165" y="165" fontSize="22">🌹</text>
        </svg>
      );

    case 14:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg14" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF7ED" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg14)" />
          <path d="M 160 145 C 130 135 90 145 60 155 L 60 185 C 90 175 130 165 160 175 C 190 165 230 175 260 185 L 260 155 C 230 145 190 135 160 145 Z" 
                fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
          <line x1="160" y1="145" x2="160" y2="175" stroke="#C2410C" strokeWidth="2.5" />
          <text x="140" y="115" fontSize="18">🦋</text>
          <text x="175" y="85" fontSize="24">🦋</text>
          <text x="120" y="60" fontSize="16">✨</text>
          <text x="200" y="55" fontSize="20">✨</text>
        </svg>
      );

    case 15:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg15" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="60%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg15)" />
          <circle cx="160" cy="60" r="32" fill="#E0F2FE" opacity="0.9" />
          <ellipse cx="160" cy="180" rx="100" ry="8" fill="#38BDF8" opacity="0.3" />
          <path d="M 120 165 C 135 150 148 135 145 115 C 145 105 152 105 155 110 C 158 115 152 135 145 145 L 120 165 Z" fill="#FFFFFF" />
          <ellipse cx="120" cy="165" rx="22" ry="10" fill="#FFFFFF" />
          <path d="M 200 165 C 185 150 172 135 175 115 C 175 105 168 105 165 110 C 162 115 168 135 175 145 L 200 165 Z" fill="#FFFFFF" />
          <ellipse cx="200" cy="165" rx="22" ry="10" fill="#FFFFFF" />
          <circle cx="160" cy="110" r="2.5" fill="#FB923C" />
        </svg>
      );

    case 16:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg16" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#451A03" />
              <stop offset="50%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg16)" />
          <path d="M 100 200 L 100 120 Q 160 70 220 120 L 220 200 Z" fill="#1C1917" />
          <path d="M 160 145 Q 175 170 170 195 Q 150 200 145 190 Z" fill="#EA580C" />
          <path d="M 160 160 Q 168 175 165 190 Q 155 192 153 185 Z" fill="#FDE047" />
          <path d="M 60 50 Q 160 80 260 50" fill="none" stroke="#FEF08A" strokeWidth="1.5" />
          {[75, 110, 150, 185, 225, 245].map((x, i) => (
            <circle key={i} cx={x} cy={55 + Math.sin(i) * 5} r="3" fill="#FEF08A" />
          ))}
          <text x="160" y="210" textAnchor="middle" fontSize="12" fill="#FED7AA">COZIEST PLACE</text>
        </svg>
      );

    case 17:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg17" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="50%" stopColor="#BE185D" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg17)" />
          <circle cx="160" cy="180" r="55" fill="#FEF08A" opacity="0.6" />
          <g transform="translate(130, 95)">
            <path d="M 0 30 C 15 30 25 20 25 0 C 25 -10 35 -10 35 0 C 35 20 45 30 60 30" 
                  fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <circle cx="30" cy="-5" r="4" fill="#FDE047" />
          </g>
          <text x="160" y="160" textAnchor="middle" fontSize="13" fill="#FFF" letterSpacing="3">PROMISE</text>
        </svg>
      );

    case 18:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg18" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="70%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg18)" />
          <polygon points="160,80 0,0 0,160" fill="#FEF08A" fillOpacity="0.25" />
          <polygon points="160,80 320,0 320,160" fill="#FEF08A" fillOpacity="0.25" />
          <polygon points="152,80 168,80 173,175 147,175" fill="#F8FAFC" />
          <rect x="149" y="105" width="22" height="15" fill="#DC2626" />
          <rect x="148" y="140" width="24" height="15" fill="#DC2626" />
          <rect x="154" y="68" width="12" height="12" fill="#FEF08A" />
          <polygon points="150,68 170,68 160,55" fill="#1E293B" />
          <path d="M 125 175 Q 160 165 195 175 L 210 220 L 110 220 Z" fill="#334155" />
        </svg>
      );

    case 19:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg19" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="60%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#86EFAC" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg19)" />
          <circle cx="80" cy="55" r="30" fill="#FBBF24" />
          <g transform="translate(160, 140)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <ellipse key={deg} cx="0" cy="0" rx="7" ry="24" fill="#F59E0B" transform={`rotate(${deg})`} />
            ))}
            <circle cx="0" cy="0" r="14" fill="#78350F" />
            <line x1="0" y1="20" x2="0" y2="80" stroke="#15803D" strokeWidth="4" />
          </g>
          <text x="210" y="80" fontSize="16">✨</text>
          <text x="240" y="110" fontSize="14">✨</text>
          <text x="260" y="60" fontSize="18">🎈</text>
        </svg>
      );

    case 20:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg20" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ECFDF5" />
              <stop offset="50%" stopColor="#D1FAE5" />
              <stop offset="100%" stopColor="#A7F3D0" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg20)" />
          <path d="M 160 85 C 140 40 80 40 80 90 C 80 135 160 170 160 170 C 160 170 240 135 240 90 C 240 40 180 40 160 85 Z" 
                fill="#34D399" opacity="0.8" />
          <path d="M 160 95 C 145 60 100 60 100 100 C 100 130 160 160 160 160 C 160 160 220 130 220 100 C 220 60 175 60 160 95 Z" 
                fill="#F472B6" opacity="0.6" />
          <path d="M 135 210 Q 165 175 145 150 Q 135 130 150 110" stroke="#854D0E" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 185 210 Q 155 175 175 150 Q 185 130 170 110" stroke="#713F12" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 21:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg21" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2A1B16" />
              <stop offset="50%" stopColor="#4A312A" />
              <stop offset="100%" stopColor="#6C483F" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg21)" />
          <path d="M 20 180 Q 90 120 160 150 T 300 90" fill="none" stroke="#D4AF37" strokeWidth="48" strokeLinecap="round" opacity="0.85" />
          <path d="M 20 165 Q 90 105 160 135 T 300 75" fill="none" stroke="#2A1B16" strokeWidth="4" strokeDasharray="6 6" />
          <path d="M 20 195 Q 90 135 160 165 T 300 105" fill="none" stroke="#2A1B16" strokeWidth="4" strokeDasharray="6 6" />
          <rect x="95" y="115" width="30" height="24" rx="2" fill="#FFFBEB" />
          <rect x="180" y="125" width="30" height="24" rx="2" fill="#FFFBEB" />
          <text x="160" y="60" textAnchor="middle" fontSize="24" fill="#FDE047">🎞️</text>
        </svg>
      );

    case 22:
    default:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full object-cover rounded">
          <defs>
            <linearGradient id="bg22" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3F0019" />
              <stop offset="50%" stopColor="#700B2B" />
              <stop offset="100%" stopColor="#9B1139" />
            </linearGradient>
            <linearGradient id="goldInf" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#bg22)" />
          <path d="M 115 110 C 115 85 85 85 85 110 C 85 135 115 135 160 110 C 205 85 235 85 235 110 C 235 135 205 135 160 110 C 115 85 115 85 115 110 Z" 
                fill="none" stroke="url(#goldInf)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="145" y="118" fontSize="26">🌹</text>
          <text x="75" y="118" fontSize="22">🌹</text>
          <text x="220" y="118" fontSize="22">🌹</text>
          <text x="160" y="60" textAnchor="middle" fontSize="13" fill="#FDE68A" letterSpacing="4">TODAY &amp; ALWAYS</text>
        </svg>
      );
  }
};

/* =========================================================================
   SYNTHESIZED AUDIO — Tactile Archival Paper Rustle & Cover Movement
   ========================================================================= */

function playPaperSound(type: "open" | "flip" | "close") {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const duration = type === "open" ? 0.85 : type === "close" ? 0.6 : 0.42;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.98 * b0 + white * 0.055;
      b1 = 0.94 * b1 + white * 0.055;
      b2 = 0.88 * b2 + white * 0.055;
      data[i] = (b0 + b1 + b2) * 0.24;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Dual-stage filtering for realistic textured paper rustle
    const filter = ctx.createBiquadFilter();
    filter.type = type === "close" ? "lowpass" : "bandpass";
    filter.frequency.setValueAtTime(
      type === "open" ? 820 : type === "close" ? 340 : 1150,
      ctx.currentTime
    );
    filter.Q.setValueAtTime(type === "close" ? 1.0 : 1.4, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.005, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(
      type === "open" ? 0.22 : type === "close" ? 0.18 : 0.15,
      ctx.currentTime + 0.05
    );
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors gracefully
  }
}

/* =========================================================================
   BACKGROUND FLOATING HEARTS
   ========================================================================= */

const FLOATING_HEARTS = [
  { left: "4%", size: 14, delay: 0, duration: 16 },
  { left: "14%", size: 18, delay: 3, duration: 21 },
  { left: "26%", size: 12, delay: 6, duration: 15 },
  { left: "38%", size: 20, delay: 1.5, duration: 23 },
  { left: "48%", size: 15, delay: 8, duration: 18 },
  { left: "58%", size: 13, delay: 4, duration: 20 },
  { left: "68%", size: 19, delay: 7, duration: 22 },
  { left: "78%", size: 12, delay: 2, duration: 16 },
  { left: "88%", size: 21, delay: 5.5, duration: 24 },
  { left: "94%", size: 16, delay: 1, duration: 19 },
];

/* =========================================================================
   MAIN MEMORIES COMPONENT
   ========================================================================= */

export default function Memories({ onNext }: { onNext: () => void }) {
  const [bookState, setBookState] = useState<"closed" | "opening" | "open" | "closing">("closed");
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [loveCounts, setLoveCounts] = useState<Record<number, number>>({});
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; quote: string } | null>(null);

  // Synchronized refs to guarantee zero stale closure drops on keyboard or rapid taps
  const currentSpreadRef = useRef(currentSpread);
  const isFlippingRef = useRef(isFlipping);
  const bookStateRef = useRef(bookState);

  useEffect(() => {
    currentSpreadRef.current = currentSpread;
  }, [currentSpread]);

  useEffect(() => {
    isFlippingRef.current = isFlipping;
  }, [isFlipping]);

  useEffect(() => {
    bookStateRef.current = bookState;
  }, [bookState]);

  // Fixed luxury album dimensions (pixel-perfect typography & margins)
  const singleW = 370;
  const singleH = 510;
  const totalSpreads = 12; // Spread 0 (Inside cover + Moment 01), Spreads 1-10 (Moments 02-21), Spread 11 (Moment 22 + Epilogue)

  // Fluid responsive stage scale so album is always 100% visible on all devices
  const [stageScale, setStageScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const availableW = vw * 0.94;
      const availableH = vh - 90;
      const targetW = singleW * 2 + 50; // Spread width + navigation margin
      const scaleW = availableW / targetW;
      const scaleH = availableH / singleH;
      const computed = Math.min(1.08, Math.min(scaleW, scaleH));
      setStageScale(Math.max(0.46, computed));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [singleW, singleH]);

  // Prevent background scrolling while album is active
  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    const origTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = origOverflow;
      document.body.style.touchAction = origTouchAction;
    };
  }, []);

  // Merge content.memories with fallback records
  const memories: MemoryItem[] = useMemo(() => {
    return DEFAULT_MEMORIES.map((def, i) => {
      const userMem = content.memories && content.memories[i];
      if (!userMem) {
        return { ...def, image: null };
      }
      const isPlaceholderTitle = !userMem.title || userMem.title.startsWith("Memory Title");
      const isPlaceholderDesc = !userMem.details || userMem.details.includes("Write the real story");
      const hasRealImage = Boolean(userMem.image && userMem.image !== "/placeholder.jpg" && !userMem.image.includes("placeholder"));
      return {
        id: def.id,
        title: isPlaceholderTitle ? def.title : userMem.title,
        desc: isPlaceholderDesc ? def.desc : userMem.details,
        date: def.date,
        chapter: def.chapter,
        quote: def.quote,
        image: hasRealImage ? userMem.image : null,
      };
    });
  }, []);

  const triggerAudio = useCallback((type: "open" | "flip" | "close") => {
    if (soundEnabled) {
      playPaperSound(type);
    }
  }, [soundEnabled]);

  // Open the physical book with human-like multi-phase realism
  const handleOpenBook = useCallback(() => {
    if (bookStateRef.current !== "closed") return;
    triggerAudio("open");
    setBookState("opening");
    bookStateRef.current = "opening";
    setTimeout(() => {
      setBookState("open");
      bookStateRef.current = "open";
    }, 1450);
  }, [triggerAudio]);

  // Close the physical book
  const handleCloseBook = useCallback(() => {
    if (bookStateRef.current !== "open" || isFlippingRef.current) return;
    triggerAudio("close");
    setBookState("closing");
    bookStateRef.current = "closing";
    setTimeout(() => {
      setBookState("closed");
      bookStateRef.current = "closed";
      setCurrentSpread(0);
      currentSpreadRef.current = 0;
    }, 1150);
  }, [triggerAudio]);

  // Turn to Next Spread (Right-to-Left flip)
  const handleNextSpread = useCallback(() => {
    if (isFlippingRef.current) return;
    const s = currentSpreadRef.current;
    if (s >= totalSpreads - 1) return;

    isFlippingRef.current = true;
    setIsFlipping(true);
    setFlipDirection("next");
    triggerAudio("flip");

    setTimeout(() => {
      const nextS = s + 1;
      currentSpreadRef.current = nextS;
      setCurrentSpread(nextS);
      isFlippingRef.current = false;
      setIsFlipping(false);
    }, 750);
  }, [totalSpreads, triggerAudio]);

  // Turn to Previous Spread (Left-to-Right flip)
  const handlePrevSpread = useCallback(() => {
    if (isFlippingRef.current) return;
    const s = currentSpreadRef.current;
    if (s <= 0) return;

    isFlippingRef.current = true;
    setIsFlipping(true);
    setFlipDirection("prev");
    triggerAudio("flip");

    setTimeout(() => {
      const prevS = s - 1;
      currentSpreadRef.current = prevS;
      setCurrentSpread(prevS);
      isFlippingRef.current = false;
      setIsFlipping(false);
    }, 750);
  }, [triggerAudio]);

  // Jump to specific spread
  const handleJumpSpread = useCallback((sIdx: number) => {
    if (isFlippingRef.current) return;
    const s = currentSpreadRef.current;
    if (sIdx === s || sIdx < 0 || sIdx >= totalSpreads) return;

    isFlippingRef.current = true;
    setIsFlipping(true);
    setFlipDirection(sIdx > s ? "next" : "prev");
    triggerAudio("flip");

    setTimeout(() => {
      currentSpreadRef.current = sIdx;
      setCurrentSpread(sIdx);
      isFlippingRef.current = false;
      setIsFlipping(false);
    }, 750);
  }, [totalSpreads, triggerAudio]);

  // Comprehensive keyboard navigation supporting all "front" and "back" keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Do not intercept if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key;

      // Front / Next keys: ArrowRight, ArrowDown, PageDown, Space, Enter, d, D, ]
      const isNextKey =
        key === "ArrowRight" ||
        key === "ArrowDown" ||
        key === "PageDown" ||
        key === "d" ||
        key === "D" ||
        key === "]" ||
        key === "Enter" ||
        (key === " " && !e.shiftKey);

      // Back / Previous keys: ArrowLeft, ArrowUp, PageUp, Backspace, a, A, [, Shift+Space
      const isPrevKey =
        key === "ArrowLeft" ||
        key === "ArrowUp" ||
        key === "PageUp" ||
        key === "Backspace" ||
        key === "a" ||
        key === "A" ||
        key === "[" ||
        (key === " " && e.shiftKey);

      if (isNextKey) {
        e.preventDefault();
        if (bookStateRef.current === "closed") {
          handleOpenBook();
        } else if (bookStateRef.current === "open") {
          handleNextSpread();
        }
      } else if (isPrevKey) {
        e.preventDefault();
        if (bookStateRef.current === "open") {
          if (currentSpreadRef.current > 0) {
            handlePrevSpread();
          } else {
            handleCloseBook();
          }
        }
      }
    };

    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [handleOpenBook, handleCloseBook, handleNextSpread, handlePrevSpread]);

  // Heart celebration particle trigger
  const handleHeartClick = (e: React.MouseEvent, memId: number) => {
    e.stopPropagation();
    setLoveCounts((prev) => ({ ...prev, [memId]: (prev[memId] || 0) + 1 }));
    const rect = e.currentTarget.getBoundingClientRect();
    const newSparkle = { id: Date.now(), x: rect.left + rect.width / 2, y: rect.top };
    setSparkles((prev) => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1200);
  };

  /* -------------------------------------------------------------------------
     RENDER PROLOGUE (INSIDE FRONT COVER)
     ------------------------------------------------------------------------- */
  const renderInsideCover = () => (
    <div 
      className="w-full h-full relative flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden bg-gradient-to-r from-[#FFFDFB] via-[#FAF8F5] to-[#F2EFE8] border-r border-[#8C6524]/15"
      style={{
        boxShadow: "inset -20px 0 28px -12px rgba(60, 40, 20, 0.08)",
      }}
    >
      {/* Decorative Gold Filigree Frame */}
      <div className="absolute inset-3.5 border-2 border-double border-[#B8995E]/30 rounded pointer-events-none" />
      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#B8995E]/60 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#B8995E]/60 pointer-events-none" />

      {/* Top Vignette */}
      <div className="text-center z-10 pt-2">
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#9A825C] font-serif font-semibold">
          ✦ PROLOGUE ✦
        </span>
      </div>

      {/* Center Dedication Message */}
      <div className="text-center z-10 my-auto flex flex-col items-center px-4">
        <span className="text-2xl text-[#B8995E] mb-2 font-serif">❦</span>
        <h2 className="font-serif italic text-xl sm:text-2xl font-bold text-[#2D2218] tracking-wide mb-3">
          To My Beloved Ammu ❤️
        </h2>
        <div className="w-14 h-0.5 bg-[#B8995E]/40 mb-4" />
        <p className="font-serif text-[12.5px] sm:text-[13px] leading-relaxed text-[#4A3D31] italic max-w-xs">
          “Every memory inside this album is a sacred page from my heart. From our very first conversation to our endless late-night talks and silly laughs, you turned ordinary seconds into pure magic.”
        </p>
        <p className="font-serif text-[11.5px] sm:text-[12px] leading-relaxed text-[#7C6651] mt-3.5">
          Turn the page to relive our 22 moments together...
        </p>
      </div>

      {/* Bottom Stamp */}
      <div className="text-center z-10 pb-2">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#A6895C] font-mono">
          ✦ DEDICATED WITH UNCONDITIONAL LOVE ✦
        </span>
      </div>
    </div>
  );

  /* -------------------------------------------------------------------------
     RENDER EPILOGUE (SPREAD 11 RIGHT PAGE)
     ------------------------------------------------------------------------- */
  const renderEpilogue = () => (
    <div 
      className="w-full h-full relative flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden bg-gradient-to-l from-[#FFFDFB] via-[#FAF8F5] to-[#F2EFE8] border-l border-[#8C6524]/15"
      style={{
        boxShadow: "inset 20px 0 28px -12px rgba(60, 40, 20, 0.08)",
      }}
    >
      <div className="absolute inset-3.5 border-2 border-double border-[#B8995E]/30 rounded pointer-events-none" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#B8995E]/60 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#B8995E]/60 pointer-events-none" />

      {/* Top Vignette */}
      <div className="text-center z-10 pt-2">
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#9A825C] font-serif font-semibold">
          ✦ EPILOGUE ✦
        </span>
      </div>

      {/* Center Forever Message */}
      <div className="text-center z-10 my-auto flex flex-col items-center px-4">
        <span className="text-3xl text-rose-500 mb-2 font-serif animate-pulse">♥</span>
        <h2 className="font-serif italic text-xl sm:text-2xl font-bold text-[#2D2218] tracking-wide mb-3">
          Our Story Never Ends
        </h2>
        <div className="w-14 h-0.5 bg-[#B8995E]/40 mb-4" />
        <p className="font-serif text-[12.5px] sm:text-[13px] leading-relaxed text-[#4A3D31] italic max-w-xs">
          “Thank you for being the most radiant blessing in my life, Ammu. Every yesterday was wonderful because of you, and every tomorrow will be our next grand adventure.”
        </p>
        
        {/* Call to action button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B8995E] to-[#8C6524] text-white font-serif text-xs uppercase tracking-[0.2em] font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer animate-pulse"
        >
          Continue Our Story →
        </button>
      </div>

      {/* Bottom Stamp */}
      <div className="text-center z-10 pb-2">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#A6895C] font-mono">
          ✦ TODAY, TOMORROW & FOREVER ✦
        </span>
      </div>
    </div>
  );

  /* -------------------------------------------------------------------------
     RENDER A SINGLE MEMORY PAGE FACE
     ------------------------------------------------------------------------- */
  const renderPage = (mem: MemoryItem | undefined, side: "left" | "right") => {
    if (!mem) return <div className="w-full h-full bg-[#FFFDFB]" />;

    const loveCount = loveCounts[mem.id] || 0;

    return (
      <div 
        className={`w-full h-full relative flex flex-col justify-between p-5 sm:p-6 select-none overflow-hidden ${
          side === "left"
            ? "bg-gradient-to-r from-[#FFFDFB] via-[#FAF8F5] to-[#F1EDE5] border-r border-[#8C6524]/15"
            : "bg-gradient-to-l from-[#FFFDFB] via-[#FAF8F5] to-[#F1EDE5] border-l border-[#8C6524]/15"
        }`}
        style={{
          boxShadow: side === "left"
            ? "inset -20px 0 28px -12px rgba(60, 40, 20, 0.08)"
            : "inset 20px 0 28px -12px rgba(60, 40, 20, 0.08)",
        }}
      >
        {/* Deckled Border */}
        <div className="absolute inset-3 border border-[#B8995E]/20 rounded pointer-events-none" />

        {/* Corner Brass / Gold Accent */}
        <div className={`absolute top-4 ${side === "left" ? "left-4 border-l" : "right-4 border-r"} w-3.5 h-3.5 border-t border-[#B8995E]/40 pointer-events-none`} />

        {/* Top Ornamental Romantic Vignette Design */}
        <div className="relative z-10 w-full flex items-center justify-center pt-1.5 pb-1">
          <div className="flex items-center gap-2 select-none">
            <span className="w-12 sm:w-16 md:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#B8995E]/45 to-[#B8995E]" />
            <span className="text-[10px] sm:text-xs text-[#B8995E]">✦</span>
            <span className="font-serif italic text-xs sm:text-sm text-rose-400/90">♥</span>
            <span className="text-[10px] sm:text-xs text-[#B8995E]">✦</span>
            <span className="w-12 sm:w-16 md:w-20 h-[1px] bg-gradient-to-l from-transparent via-[#B8995E]/45 to-[#B8995E]" />
          </div>
        </div>

        {/* Center: Scrapbook Polaroid Photo Mount */}
        <div className="relative z-10 my-auto flex flex-col items-center pt-1">
          <motion.div 
            whileHover={!isFlipping ? { scale: 1.02, rotate: side === "left" ? -1 : 1 } : undefined}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              if (mem.image && !isFlipping) {
                e.stopPropagation();
                setPreviewImage({ src: mem.image, title: mem.title, quote: mem.desc });
              }
            }}
            className={`relative bg-white p-2.5 pb-3 rounded-sm shadow-[0_10px_25px_-5px_rgba(40,30,20,0.14),0_2px_6px_rgba(0,0,0,0.06)] border border-black/5 w-full ${
              mem.image ? "max-w-[285px] cursor-zoom-in" : "max-w-[270px]"
            }`}
            style={{ transform: "translateZ(0)" }}
          >
            {/* Washi Tape */}
            <div 
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 rounded-sm opacity-90 shadow-sm z-20 pointer-events-none"
              style={{
                background: "repeating-linear-gradient(45deg, rgba(230,210,185,0.7), rgba(230,210,185,0.7) 6px, rgba(215,190,160,0.85) 6px, rgba(215,190,160,0.85) 12px)",
                border: "1px dashed rgba(160,130,90,0.3)",
              }}
            />

            {/* Photo / Artwork Canvas - Exact uploaded aspect ratio (16:9 for photos, 4:3 for artworks) */}
            <div 
              className={`w-full rounded overflow-hidden bg-[#FAF8F5] relative shadow-inner flex items-center justify-center ${
                mem.image ? "aspect-video" : "aspect-[4/3]"
              }`}
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {mem.image ? (
                <img
                  src={mem.image}
                  alt={mem.title}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              ) : (
                <MemoryArtwork id={mem.id} />
              )}
            </div>

            {/* Quote Caption beneath photo */}
            {mem.quote ? (
              <p className="mt-1.5 text-center text-[10.5px] md:text-[11px] font-serif italic text-[#7C6651] tracking-wide">
                {mem.quote}
              </p>
            ) : null}
          </motion.div>
        </div>

        {/* Memory Description & Title */}
        <div className="relative z-10 text-center flex flex-col items-center mt-1 pb-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="font-serif italic text-base md:text-lg font-semibold text-[#2D2218] tracking-wide">
              {mem.title}
            </h3>
            {/* Love Button */}
            <button
              onClick={(e) => handleHeartClick(e, mem.id)}
              className="text-sm text-rose-500 hover:text-rose-600 transition-transform active:scale-125 cursor-pointer"
              title="Give love to this memory"
            >
              ♥ <span className="text-[10px] font-sans font-medium text-[#8C6524]">{loveCount > 0 ? loveCount : ""}</span>
            </button>
          </div>

          <p className="font-serif text-[11.5px] md:text-[12.5px] leading-relaxed text-[#4A3D31] max-w-sm">
            {mem.desc}
          </p>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------------------
     RENDER FRONT COVER FACE (Luxurious Archival Linen Hardcover)
     ------------------------------------------------------------------------- */
  const renderFrontCoverFace = () => (
    <div 
      className="w-full h-full rounded-r-md border border-[#C5A059]/40 relative overflow-hidden flex flex-col items-center justify-between p-6 sm:p-8 select-none"
      style={{
        background: "linear-gradient(135deg, #FAF7F2 0%, #F4EFE6 45%, #EBE2D4 100%)",
        boxShadow: "inset 0 1px 3px rgba(255,255,255,0.95), inset -2px 0 5px rgba(120,90,50,0.18), inset 0 -2px 4px rgba(120,90,50,0.12)",
      }}
    >
      {/* Woven linen fine grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#8C6524 0.75px, transparent 0.75px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Brass Corner Brackets */}
      <div className="absolute top-2.5 right-2.5 w-8 h-8 border-t-2 border-r-2 border-[#B8995E] rounded-tr pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-8 h-8 border-b-2 border-r-2 border-[#B8995E] rounded-br pointer-events-none" />

      {/* Spine hinge line on left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-4.5 bg-gradient-to-r from-[#D8CEBA] via-[#FAF7F2] to-[#ECE4D6] border-r border-[#B8995E]/30 pointer-events-none flex flex-col justify-around py-8">
        <div className="h-0.5 w-full bg-[#B8995E]/40" />
        <div className="h-0.5 w-full bg-[#B8995E]/40" />
        <div className="h-0.5 w-full bg-[#B8995E]/40" />
      </div>

      {/* Blind Debossed Inset Frame */}
      <div className="absolute inset-4 border border-[#B8995E]/30 rounded pointer-events-none" />

      {/* Cover Top Vignette */}
      <div className="text-center z-10 mt-1">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#9A825C] font-serif font-semibold">
          ✦ PRIVATE ARCHIVE ✦
        </span>
      </div>

      {/* Cover Center: Foil Embossed Title */}
      <div className="text-center z-10 flex flex-col items-center my-auto">
        <span className="text-2xl text-[#B8995E] mb-2 font-serif">❦</span>
        <h1 
          className="font-serif text-2xl md:text-3xl font-bold tracking-[0.16em] leading-tight"
          style={{
            background: "linear-gradient(135deg, #BFA064 0%, #8C6524 50%, #B8995E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 1px 1px rgba(255,255,255,0.8))",
          }}
        >
          OUR MEMORIES
        </h1>

        <div className="w-16 h-0.5 bg-[#B8995E]/50 my-3" />

        <p className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase text-[#7A6242] font-medium">
          22 Moments with Ammu
        </p>
      </div>

      {/* Wax Seal Monogram */}
      <div 
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full shadow-lg border-2 border-[#D4AF37] flex items-center justify-center text-amber-100 font-serif font-bold text-base sm:text-lg z-10"
        style={{
          background: "radial-gradient(circle at 35% 35%, #BE123C 0%, #881337 70%, #4C0519 100%)",
          boxShadow: "0 6px 14px rgba(136, 19, 55, 0.35)",
        }}
      >
        A♥A
      </div>

      {/* Bottom Prompt */}
      <div className="text-center z-10 mt-2">
        <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#9A825C] font-serif animate-pulse font-semibold">
          ✦ Tap to Open Album ✦
        </span>
      </div>
    </div>
  );

  /* -------------------------------------------------------------------------
     HELPER: GET LEFT AND RIGHT CONTENT FOR ANY SPREAD
     - Spread 0: Left = InsideCover (Prologue), Right = Memory 1 (The Beginning)
     - Spread 1 to 10: Left = memories[2*s - 1], Right = memories[2*s]
     - Spread 11: Left = memories[21] (Moment 22), Right = Epilogue
     ------------------------------------------------------------------------- */
  const getSpreadContent = (spreadIdx: number) => {
    if (spreadIdx === 0) {
      return {
        left: renderInsideCover(),
        right: renderPage(memories[0], "right"),
        title: `Prologue & ${memories[0]?.title || "The Beginning"}`,
      };
    }
    if (spreadIdx === 11) {
      return {
        left: renderPage(memories[21], "left"),
        right: renderEpilogue(),
        title: `${memories[21]?.title || "Looking Ahead"} & Epilogue`,
      };
    }
    const leftMem = memories[2 * spreadIdx - 1];
    const rightMem = memories[2 * spreadIdx];
    return {
      left: renderPage(leftMem, "left"),
      right: renderPage(rightMem, "right"),
      title: `${leftMem?.title || ""} & ${rightMem?.title || ""}`,
    };
  };

  const currentContent = getSpreadContent(currentSpread);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col items-center justify-between select-none z-10"
      style={{
        background: "radial-gradient(ellipse at 50% 25%, #FFFFFF 0%, #FAF8F5 55%, #F2EFE8 100%)",
        padding: "14px 18px",
        boxSizing: "border-box",
      }}
    >
      {/* Dynamic Sparkle Hearts */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, y: 0, scale: 0.8 }}
          animate={{ opacity: 0, y: -65, scale: 1.4 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed pointer-events-none z-50 text-rose-500 font-bold text-lg"
          style={{ left: s.x, top: s.y }}
        >
          ♥
        </motion.div>
      ))}

      {/* Background Soft Falling Blush Hearts */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {FLOATING_HEARTS.map((h, i) => (
          <motion.div
            key={i}
            initial={{ y: "105vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.4, 0.4, 0] }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute text-rose-300 font-serif"
            style={{ left: h.left, fontSize: `${h.size}px` }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* =====================================================================
          HEADER BAR
          ===================================================================== */}
      <header className="w-full max-w-5xl flex items-center justify-end text-center z-20 py-1">
        <div className="flex items-center gap-2.5 ml-auto">
          {bookState === "open" && (
            <button
              onClick={handleCloseBook}
              className="text-xs uppercase tracking-[0.16em] text-[#8C6524] hover:text-[#5C3D0E] border border-[#B8995E]/35 hover:border-[#B8995E]/70 px-3.5 py-1.5 rounded-full transition-all duration-200 bg-white/80 hover:bg-white shadow-sm cursor-pointer"
            >
              ✕ Close Album
            </button>
          )}

          <button
            onClick={onNext}
            className="text-xs uppercase tracking-[0.18em] text-[#8C6524] hover:text-[#5C3D0E] border border-[#B8995E]/50 hover:border-[#B8995E] px-4 py-1.5 rounded-full transition-all duration-200 bg-white/95 hover:bg-[#FAF7F2] shadow-sm cursor-pointer font-medium"
          >
            Continue Story →
          </button>
        </div>
      </header>

      {/* =====================================================================
          MAIN PHYSICAL 3D DIARY STAGE
          - High-end 3D book physics:
            1. Closed: Single volume perfectly centered at X = 0! (Spine at -singleW/2)
               ZERO phantom panels on the left.
            2. Opening: Cover lifts with organic corner flex and rotates 0 -> -180deg
               while spine glides from -singleW/2 to 0! Symmetrical open expansion.
            3. 1st Page Turn: Moment 01 flexible 3D paper curl with specular sheen,
               dynamic cast shadows, and acoustic rustle.
          ===================================================================== */}
      <main 
        className="relative flex items-center justify-center w-full flex-1 min-h-0 z-10 py-1 select-none"
        style={{ perspective: "2400px" }}
      >
        {/* Navigation Arrow Previous */}
        {bookState === "open" && (
          <button
            onClick={handlePrevSpread}
            disabled={currentSpread === 0 || isFlipping}
            className={`absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#B8995E]/40 bg-white/90 backdrop-blur text-[#8C6524] text-2xl flex items-center justify-center shadow-lg transition-all z-40 cursor-pointer ${
              currentSpread === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110 hover:bg-white"
            }`}
            aria-label="Previous Spread"
          >
            ‹
          </button>
        )}

        {/* -------------------------------------------------------------------
            RESPONSIVE SCALING CONTAINER
            ------------------------------------------------------------------- */}
        <div 
          className="relative flex items-center justify-center"
          style={{
            transform: `scale(${stageScale})`,
            transformOrigin: "center center",
            transition: "transform 0.25s ease-out",
          }}
        >
          {/* -----------------------------------------------------------------
              THE 3D BOOK ASSEMBLY (Spine Hinge at local X = 0)
              ----------------------------------------------------------------- */}
          <motion.div
            animate={{
              x: bookState === "closed"
                ? -singleW / 2
                : bookState === "opening"
                ? [-singleW / 2, -singleW / 2, -singleW * 0.38, -singleW * 0.15, 0, 0]
                : bookState === "closing"
                ? [0, -singleW * 0.15, -singleW * 0.38, -singleW / 2, -singleW / 2]
                : 0,
              scale: bookState === "closed" ? 0.99 : 1,
            }}
            transition={{
              duration: bookState === "opening" ? 1.45 : bookState === "closing" ? 1.15 : 0.4,
              times: bookState === "opening" ? [0, 0.14, 0.38, 0.65, 0.92, 1.0] : undefined,
              ease: [0.22, 0.9, 0.28, 1.0],
            }}
            whileHover={bookState === "closed" ? { y: -6, scale: 1.01 } : {}}
            onClick={bookState === "closed" ? handleOpenBook : undefined}
            className={`relative select-none ${bookState === "closed" ? "cursor-pointer" : ""}`}
            style={{
              width: 0,
              height: singleH,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Table Surface Contact Shadow */}
            <motion.div 
              animate={{
                left: bookState === "closed" ? -12 : -singleW - 14,
                width: bookState === "closed" ? singleW + 24 : singleW * 2 + 28,
                opacity: bookState === "closed" ? 0.85 : 1,
              }}
              transition={{
                duration: bookState === "opening" ? 1.45 : 1.15,
                ease: [0.22, 0.9, 0.28, 1.0],
              }}
              className="absolute -inset-y-4 top-4 rounded-3xl pointer-events-none -z-20"
              style={{
                background: "radial-gradient(ellipse at 50% 50%, rgba(45,30,20,0.36) 0%, rgba(45,30,20,0.12) 55%, transparent 75%)",
                filter: "blur(22px)",
              }}
            />

            {/* Hardcover Back Board (Underneath supporting base) */}
            <motion.div 
              animate={{
                left: bookState === "closed" ? 0 : -singleW - 3,
                width: bookState === "closed" ? singleW + 3 : singleW * 2 + 6,
              }}
              transition={{
                duration: bookState === "opening" ? 1.45 : 1.15,
                ease: [0.22, 0.9, 0.28, 1.0],
              }}
              className="absolute -inset-y-2 rounded-lg -z-10 border border-[#C5A059]/40 bg-[#FAF7F2]"
              style={{
                boxShadow: "0 24px 50px -12px rgba(45,30,20,0.25)",
              }}
            />

            {/* Stacked Paper Fore-edge Layers (Right side page thickness) */}
            <div 
              className="absolute top-2.5 bottom-2.5 w-3.5 rounded-r pointer-events-none z-10"
              style={{
                left: singleW - 2,
                background: "repeating-linear-gradient(to right, #FFFDFB 0px, #FFFDFB 1.5px, #DFD9C0 1.5px, #DFD9C0 3px)",
                boxShadow: "3px 0 6px rgba(0,0,0,0.08)",
              }}
            />

            {/* Stacked Paper Bottom Layers */}
            <motion.div 
              animate={{
                left: bookState === "closed" ? 8 : -singleW + 8,
                width: bookState === "closed" ? singleW - 16 : singleW * 2 - 16,
              }}
              transition={{
                duration: bookState === "opening" ? 1.45 : 1.15,
                ease: [0.22, 0.9, 0.28, 1.0],
              }}
              className="absolute -bottom-2.5 h-2.5 rounded-b pointer-events-none z-10"
              style={{
                background: "repeating-linear-gradient(to bottom, #FFFDFB 0px, #FFFDFB 1.5px, #DFD9C0 1.5px, #DFD9C0 3px)",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              }}
            />

            {/* Stacked Paper Fore-edge Layers (Left side when open) */}
            {bookState === "open" && (
              <div 
                className="absolute top-2.5 bottom-2.5 w-3.5 rounded-l pointer-events-none z-10"
                style={{
                  left: -singleW - 2.5,
                  background: "repeating-linear-gradient(to left, #FFFDFB 0px, #FFFDFB 1.5px, #DFD9C0 1.5px, #DFD9C0 3px)",
                  boxShadow: "-3px 0 6px rgba(0,0,0,0.08)",
                }}
              />
            )}

            {/* -----------------------------------------------------------------
                LEFT PAGE WING (BASE AT [-singleW, 0])
                - Closed state: COMPLETELY UNMOUNTED (Zero ghost panels!)
                - Open state: Displays left side of current spread
                - Tap anywhere on left page to flip from left to right (Previous)
                ----------------------------------------------------------------- */}
            {bookState === "open" && (
              <div 
                onClick={handlePrevSpread}
                className={`absolute top-0 rounded-l overflow-hidden z-20 ${
                  currentSpread > 0 && !isFlipping ? "cursor-pointer" : ""
                }`}
                style={{
                  left: -singleW,
                  width: singleW,
                  height: singleH,
                }}
                title={currentSpread > 0 ? "Tap to flip back (left to right)" : undefined}
              >
                {isFlipping && flipDirection === "prev"
                  ? getSpreadContent(currentSpread - 1).left
                  : currentContent.left}
              </div>
            )}

            {/* Central Spine Binding Cylinder / Crease */}
            <div 
              className="absolute top-0 bottom-0 pointer-events-none z-30"
              style={{
                left: bookState === "closed" ? -12 : -10,
                width: bookState === "closed" ? 16 : 20,
                background: bookState === "closed"
                  ? "linear-gradient(90deg, #1F150D 0%, #3D2817 22%, #FAF7F2 48%, #E5DFC8 75%, #C5A059 100%)"
                  : "linear-gradient(90deg, rgba(50,30,15,0.24) 0%, rgba(50,30,15,0.06) 38%, rgba(255,255,255,0.4) 50%, rgba(50,30,15,0.06) 62%, rgba(50,30,15,0.24) 100%)",
                borderRadius: bookState === "closed" ? "6px 0 0 6px" : "0",
                boxShadow: bookState === "closed" ? "-3px 0 6px rgba(0,0,0,0.18)" : "none",
              }}
            />

            {/* -----------------------------------------------------------------
                RIGHT PAGE WING (BASE AT [0, singleW])
                - Permanently attached to the spine at X = 0! (NEVER slides sideways!)
                - Tap anywhere on right page to flip from right to left (Next)
                ----------------------------------------------------------------- */}
            <div 
              onClick={bookState === "open" ? handleNextSpread : undefined}
              className={`absolute top-0 rounded-r overflow-hidden z-20 ${
                bookState === "open" && currentSpread < totalSpreads - 1 && !isFlipping ? "cursor-pointer" : ""
              }`}
              style={{
                left: 0,
                width: singleW,
                height: singleH,
              }}
              title={bookState === "open" && currentSpread < totalSpreads - 1 ? "Tap to flip forward (right to left)" : undefined}
            >
              {isFlipping && flipDirection === "next"
                ? getSpreadContent(currentSpread + 1).right
                : currentContent.right}

              {/* Dynamic Cast Shadow on Right Page as Cover Lifts */}
              {bookState === "opening" && (
                <motion.div
                  initial={{ opacity: 0.65 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.25, ease: "easeOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none z-30"
                />
              )}
            </div>

            {/* -----------------------------------------------------------------
                3D FRONT HARDCOVER (Swings 0deg -> -180deg around spine at X=0)
                - Front face: Cover plate (title, wax seal, brass corners)
                - Back face: The Inside Cover / Prologue (lands face-up on the left!)
                ----------------------------------------------------------------- */}
            {(bookState === "closed" || bookState === "opening" || bookState === "closing") && (
              <motion.div
                animate={{
                  rotateY: bookState === "closed"
                    ? 0
                    : bookState === "opening"
                    ? [0, -6, -35, -90, -155, -181.5, -180]
                    : [-180, -150, -90, -30, 2, 0],
                  rotateZ: bookState === "closed"
                    ? 0
                    : bookState === "opening"
                    ? [0, -2, -3.2, -1.8, 1.2, 0, 0]
                    : [0, 1.2, -1.8, -3.2, -2, 0],
                  z: bookState === "closed"
                    ? 0
                    : bookState === "opening"
                    ? [0, 14, 38, 52, 28, 4, 0]
                    : [0, 28, 52, 38, 14, 0],
                }}
                transition={{
                  duration: bookState === "opening" ? 1.45 : 1.15,
                  times: bookState === "opening" ? [0, 0.12, 0.35, 0.60, 0.84, 0.96, 1.0] : undefined,
                  ease: [0.22, 0.9, 0.28, 1.0],
                }}
                className="absolute top-0 z-40"
                style={{
                  left: 0,
                  width: singleW,
                  height: singleH,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front Face: The Book Cover */}
                <div 
                  className="absolute inset-0 rounded-r-md overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.2)",
                  }}
                >
                  {renderFrontCoverFace()}

                  {/* Dynamic Lighting Glint across cover during opening */}
                  {bookState === "opening" && (
                    <motion.div
                      animate={{ opacity: [0, 0.35, 0] }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none z-30"
                    />
                  )}

                  {/* Satin Ribbon hanging from bottom */}
                  <div 
                    className="absolute left-1/3 -bottom-7 w-5 h-16 rounded-b shadow-md pointer-events-none z-20 flex flex-col items-center justify-end pb-1"
                    style={{
                      background: "linear-gradient(to right, #9F1239, #E11D48, #9F1239)",
                    }}
                  >
                    <span className="text-[10px] text-amber-200">♥</span>
                  </div>
                </div>

                {/* Back Face: Inside Cover / Prologue (Lands on the left wing face up!) */}
                <div 
                  className="absolute inset-0 rounded-l-md overflow-hidden"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.2)",
                  }}
                >
                  {renderInsideCover()}

                  {/* Overhead light catching inside page as it lands */}
                  {bookState === "opening" && (
                    <motion.div
                      animate={{ opacity: [0, 0.35, 0] }}
                      transition={{ duration: 0.7, delay: 0.65, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/35 to-transparent pointer-events-none z-30"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* -----------------------------------------------------------------
                3D TURNING LEAF (Active during Page Flips in Open State)
                - True 3D paper curl: dual-axis rotation, dynamic Z-lift, traveling
                  specular highlights, and cast shadows!
                ----------------------------------------------------------------- */}
            <AnimatePresence mode="wait">
              {isFlipping && flipDirection === "next" && (
                <motion.div
                  key={`flip-forward-${currentSpread}`}
                  initial={{ rotateY: 0, rotateZ: 0, z: 0 }}
                  animate={{
                    rotateY: -180,
                    rotateZ: [0, -2.2, 0],
                    z: [0, 32, 0],
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.33, 0.0, 0.2, 1.0],
                  }}
                  className="absolute top-0 z-45 pointer-events-none"
                  style={{
                    left: 0,
                    width: singleW,
                    height: singleH,
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {/* Front Face: Current Right Page (Turning away to the left) */}
                  <div 
                    className="absolute inset-0 rounded-r overflow-hidden"
                    style={{
                      transform: "rotateY(0deg) translateZ(1px)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      boxShadow: "0 14px 32px rgba(40,25,15,0.16)",
                    }}
                  >
                    {currentContent.right}

                    {/* Specular traveling paper curve highlight */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.35, 0.15, 0] }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                      className="absolute inset-0 pointer-events-none z-30"
                      style={{
                        background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.42) 50%, rgba(0,0,0,0.12) 75%, transparent 100%)",
                      }}
                    />
                  </div>

                  {/* Back Face: Next Left Page (Landing face up on the left) */}
                  <div 
                    className="absolute inset-0 rounded-l overflow-hidden"
                    style={{
                      transform: "rotateY(180deg) translateZ(1px)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      boxShadow: "0 14px 32px rgba(40,25,15,0.16)",
                    }}
                  >
                    {getSpreadContent(currentSpread + 1).left}

                    {/* Specular landing paper sheen */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.15, 0.35, 0] }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                      className="absolute inset-0 pointer-events-none z-30"
                      style={{
                        background: "linear-gradient(255deg, transparent 25%, rgba(255,255,255,0.4) 50%, rgba(0,0,0,0.1) 75%, transparent 100%)",
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {isFlipping && flipDirection === "prev" && (
                <motion.div
                  key={`flip-backward-${currentSpread}`}
                  initial={{ rotateY: 0, rotateZ: 0, z: 0 }}
                  animate={{
                    rotateY: 180,
                    rotateZ: [0, 2.2, 0],
                    z: [0, 32, 0],
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.33, 0.0, 0.2, 1.0],
                  }}
                  className="absolute top-0 z-45 pointer-events-none"
                  style={{
                    left: -singleW,
                    width: singleW,
                    height: singleH,
                    transformOrigin: "right center",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {/* Front Face: Current Left Page (Turning away to the right) */}
                  <div 
                    className="absolute inset-0 rounded-l overflow-hidden"
                    style={{
                      transform: "rotateY(0deg) translateZ(1px)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      boxShadow: "0 14px 32px rgba(40,25,15,0.16)",
                    }}
                  >
                    {currentContent.left}

                    {/* Specular traveling paper curve highlight */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.35, 0.15, 0] }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                      className="absolute inset-0 pointer-events-none z-30"
                      style={{
                        background: "linear-gradient(255deg, transparent 25%, rgba(255,255,255,0.42) 50%, rgba(0,0,0,0.12) 75%, transparent 100%)",
                      }}
                    />
                  </div>

                  {/* Back Face: Previous Right Page (Landing face up on the right) */}
                  <div 
                    className="absolute inset-0 rounded-r overflow-hidden"
                    style={{
                      transform: "rotateY(180deg) translateZ(1px)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      boxShadow: "0 14px 32px rgba(40,25,15,0.16)",
                    }}
                  >
                    {getSpreadContent(currentSpread - 1).right}

                    {/* Specular landing paper sheen */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.15, 0.35, 0] }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                      className="absolute inset-0 pointer-events-none z-30"
                      style={{
                        background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.4) 50%, rgba(0,0,0,0.1) 75%, transparent 100%)",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Traveling Shadows while flipping */}
            {isFlipping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.35, 0] }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 pointer-events-none z-35"
                style={{
                  left: flipDirection === "next" ? -singleW : 0,
                  width: singleW,
                  background: flipDirection === "next"
                    ? "linear-gradient(to right, transparent, rgba(40,25,15,0.28))"
                    : "linear-gradient(to left, transparent, rgba(40,25,15,0.28))",
                }}
              />
            )}
          </motion.div>
        </div>

        {/* Navigation Arrow Next */}
        {bookState === "open" && (
          <button
            onClick={handleNextSpread}
            disabled={currentSpread === totalSpreads - 1 || isFlipping}
            className={`absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#B8995E]/40 bg-white/90 backdrop-blur text-[#8C6524] text-2xl flex items-center justify-center shadow-lg transition-all z-40 cursor-pointer ${
              currentSpread === totalSpreads - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-110 hover:bg-white"
            }`}
            aria-label="Next Spread"
          >
            ›
          </button>
        )}
      </main>

      {/* High-Resolution Full-Aspect Lightbox Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center bg-white/95 p-3 sm:p-5 rounded-2xl shadow-2xl border border-amber-200/40"
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-rose-900 text-white flex items-center justify-center text-sm font-bold shadow-lg hover:bg-rose-800 transition-transform active:scale-90 cursor-pointer z-10"
                title="Close"
              >
                ✕
              </button>
              <div className="w-full overflow-hidden rounded-xl bg-black/5 flex items-center justify-center">
                <img
                  src={previewImage.src}
                  alt={previewImage.title}
                  className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-sm"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#3A151E]">
                  {previewImage.title}
                </h3>
                <p className="font-times italic text-sm text-[#7C6651] mt-1">
                  {previewImage.quote}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
