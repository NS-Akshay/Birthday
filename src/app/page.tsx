"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeartAnimation from "@/components/HeartAnimation";
import Curtain from "@/components/Curtain";
import Greeting from "@/components/Greeting";
import MakeWishRejection from "@/components/MakeWishRejection";
import LoveConfession from "@/components/LoveConfession";
import Cake from "@/components/Cake";
import ReadMyLove from "@/components/ReadMyLove";
import Memories from "@/components/Memories";
import Timeline from "@/components/Timeline";
import Letter from "@/components/Letter";
import AngelJourney from "@/components/AngelJourney";

export default function Home() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const restart = () => {
    setStep(0);
  };

  return (
    <main className="min-h-screen bg-[#FCFBF9] text-zinc-800 overflow-hidden selection:bg-rose-200 selection:text-zinc-900 font-times">
      {/* Global ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FCFBF9] to-[#F5F3ED]" />
      
      {/* Global Hearts (appear consistently behind all primary UI) */}
      <HeartAnimation />

      <AnimatePresence>
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          id="main-scroll-container"
          className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {step === 0 && <Curtain onOpen={nextStep} />}
          {step === 1 && <AngelJourney onNext={nextStep} />}
          {step === 2 && <Greeting onNext={nextStep} />}
          {step === 3 && <MakeWishRejection onNext={nextStep} />}
          {step === 4 && <LoveConfession onNext={nextStep} />}
          {step === 5 && <Cake onNext={nextStep} />}
          {step === 6 && <ReadMyLove onNext={nextStep} />}
          {step === 7 && <Memories onNext={nextStep} />}
          {step === 8 && <Timeline onNext={nextStep} />}
          {step === 9 && <Letter onRestart={restart} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
