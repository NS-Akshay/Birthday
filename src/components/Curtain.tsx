"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useRef } from "react";

export default function Curtain({ onOpen }: { onOpen: () => void }) {
  const [isTriggered, setIsTriggered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Real-time tracking refs to avoid render lag during pointer events
  const isDragging = useRef(false);
  const startDragY = useRef(0);
  const startDragX = useRef(0);
  const initialY = useRef(0);
  const initialX = useRef(0);

  // Curtain opening is driven by explicit state now to ensure it works reliably
  const leftCurtainX = useMotionValue("0%");
  const rightCurtainX = useMotionValue("0%");

  // Dynamically calculate the SVG thread path based on handle position
  // 400px wide SVG container so startX is 200 (exact center). startY is 0 (exact top).
  const pathData = useTransform([x, y], ([latestX, latestY]) => {
    const startX = 200; 
    const startY = 0;
    const handleBaseY = 350;
    const currentX = latestX as number;
    const currentY = latestY as number;
    
    // The endpoint physically follows the handle
    const endX = startX + currentX;
    const endY = handleBaseY + currentY;
    
    // Calculate natural slack/curve if pushed up or dragged horizontally
    const isSlack = currentY < 0;
    const slackAmount = isSlack ? Math.abs(currentY) * 0.6 : 0;
    
    const controlX = (startX + endX) / 2 + (isSlack ? 30 : currentX * 0.1);
    const controlY = (startY + endY) / 2 + slackAmount;

    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  });

  const triggerCurtain = () => {
    if (isTriggered) return;
    setIsTriggered(true);
    isDragging.current = false;

    // 1. Quick retract motion (snap up into the ceiling)
    animate(y, -350, { duration: 0.25, ease: "easeIn" });
    animate(x, 0, { duration: 0.2 });

    // 2. Then fade/open curtain
    setTimeout(() => {
      animate(leftCurtainX, "-100%", { duration: 1.5, ease: [0.22, 1, 0.36, 1] });
      animate(rightCurtainX, "100%", { 
        duration: 1.5, 
        ease: [0.22, 1, 0.36, 1], 
        onComplete: () => {
          onOpen();
        }
      });
    }, 150); // Slight delay so retract is visible before curtain splits
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTriggered) return;
    
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    
    startDragY.current = e.clientY;
    startDragX.current = e.clientX;
    initialY.current = y.get();
    initialX.current = x.get();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || isTriggered) return;
    
    const deltaY = e.clientY - startDragY.current;
    const deltaX = e.clientX - startDragX.current;
    
    const newY = initialY.current + deltaY;
    const newX = initialX.current + deltaX;
    
    y.set(newY);
    x.set(newX);

    // Trigger threshold check (pull down 180px)
    if (newY >= 180) {
      triggerCurtain();
    }
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || isTriggered) return;
    
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    // Incomplete pull -> smoothly return to start
    animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden pointer-events-auto select-none touch-none bg-black">
      {/* Left Curtain */}
      <motion.div
        style={{ x: leftCurtainX }}
        className="w-1/2 h-full z-10 flex justify-end origin-top relative shadow-[20px_0_50px_rgba(0,0,0,0.8)]"
      >
        <div 
          className="absolute inset-0 bg-[#1a0505]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, 
                rgba(0,0,0,0.8) 0%, 
                rgba(0,0,0,0.2) 15%, 
                rgba(0,0,0,0.7) 30%, 
                rgba(255,255,255,0.03) 45%, 
                rgba(0,0,0,0.6) 60%, 
                rgba(0,0,0,0.2) 75%, 
                rgba(0,0,0,0.7) 90%, 
                rgba(0,0,0,0.4) 100%
              )
            `,
          }}
        />
      </motion.div>

      {/* Right Curtain */}
      <motion.div
        style={{ x: rightCurtainX }}
        className="w-1/2 h-full z-10 flex justify-start origin-top relative shadow-[-20px_0_50px_rgba(0,0,0,0.8)]"
      >
        <div 
          className="absolute inset-0 bg-[#1a0505]" 
          style={{
            backgroundImage: `
              linear-gradient(to left, 
                rgba(0,0,0,0.8) 0%, 
                rgba(0,0,0,0.2) 15%, 
                rgba(0,0,0,0.7) 30%, 
                rgba(255,255,255,0.03) 45%, 
                rgba(0,0,0,0.6) 60%, 
                rgba(0,0,0,0.2) 75%, 
                rgba(0,0,0,0.7) 90%, 
                rgba(0,0,0,0.4) 100%
              )
            `,
          }}
        />
      </motion.div>

      {/* Dynamic SVG Thread - ALWAYS fixed to top 0 */}
      <div className="absolute top-0 left-1/2 bottom-0 w-[400px] -translate-x-1/2 z-20 pointer-events-none">
        <svg className="w-full h-full overflow-visible">
          <motion.path 
            d={pathData} 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            className="drop-shadow-sm"
            animate={{ opacity: isTriggered ? 0 : 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          />
        </svg>
      </div>

      {/* Draggable Handle Bead Wrapper (larger invisible hit area) */}
      <motion.div
        style={{ x, y }}
        className="absolute top-[350px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 touch-none flex flex-col items-center justify-center group"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
        animate={{ opacity: isTriggered ? 0 : 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        {/* Invisible Hit Box */}
        <div className="p-6 cursor-grab active:cursor-grabbing flex flex-col items-center">
          {/* The physical gold handle visual */}
          <div className="w-[16px] h-[16px] rounded-full bg-gradient-to-br from-[#FDF5E6] via-[#D4AF37] to-[#AA7C11] shadow-[0_4px_8px_rgba(0,0,0,0.4)] border border-[#FDF5E6]/60" />
        </div>

        <motion.div 
          className="pointer-events-none transition-opacity duration-300 group-active:opacity-0 -mt-2"
        >
          <p className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase font-light drop-shadow-[0_2px_4px_rgba(0,0,0,1)] opacity-70 whitespace-nowrap">
            Pull Down
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}