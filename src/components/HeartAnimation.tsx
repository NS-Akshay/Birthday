"use client";

import { useEffect, useState } from "react";

// Pre-calculate random values for a stable set of hearts
const generateHearts = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    // Start position: 0 to 100vw
    const startX = Math.random() * 100;
    // Slight drift between -15vw and 15vw for natural organic sway
    const drift = (Math.random() - 0.5) * 30; 
    
    return {
      id: i,
      startX: `${startX}vw`,
      endX: `${startX + drift}vw`,
      // Fall duration between 15s and 35s for ultra-slow, peaceful floating
      duration: 15 + Math.random() * 20,
      // Staggered start delays (negative so they are already falling on load)
      delay: -(Math.random() * 30),
      // Opacity between 0.15 and 0.5 to keep them subtle and elegant
      opacity: 0.15 + Math.random() * 0.35,
      // Scale between 0.2 and 0.8
      scale: 0.2 + Math.random() * 0.6,
      // Subtle rotation to make them feel organic
      rotStart: (Math.random() - 0.5) * 45,
      rotEnd: (Math.random() - 0.5) * 180,
      // Subtle blur on some to create depth
      blur: Math.random() > 0.5 ? (Math.random() * 3 + 1) : 0,
      // Soft romantic color palette: pale pink, blush, soft rose
      color: ['#fecdd3', '#ffe4e6', '#fda4af', '#f43f5e'][Math.floor(Math.random() * 4)]
    };
  });
};

export default function HeartAnimation() {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    // Optimize density: 25 on mobile, 45 on desktop
    const isMobile = window.innerWidth < 768;
    setHearts(generateHearts(isMobile ? 25 : 45));
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes elegantFall {
            0% {
              transform: translate3d(var(--startX), -10vh, 0) scale(var(--scale)) rotate(var(--rotStart));
              opacity: 0;
            }
            15% {
              opacity: var(--opacity);
            }
            85% {
              opacity: var(--opacity);
            }
            100% {
              transform: translate3d(var(--endX), 110vh, 0) scale(var(--scale)) rotate(var(--rotEnd));
              opacity: 0;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .heart-particle {
              animation-duration: 40s !important;
              opacity: 0.15 !important;
            }
          }
        `
      }} />

      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute top-0 left-0 will-change-transform heart-particle"
          style={{
            '--startX': h.startX,
            '--endX': h.endX,
            '--opacity': h.opacity,
            '--scale': h.scale,
            '--rotStart': `${h.rotStart}deg`,
            '--rotEnd': `${h.rotEnd}deg`,
            animation: `elegantFall ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            filter: h.blur > 0 ? `blur(${h.blur}px)` : 'none',
            color: h.color,
          } as any}
        >
          {/* Beautiful SVG Heart Shape */}
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 32 32" 
            fill="currentColor" 
            className="drop-shadow-sm"
          >
            <path d="M16 28.5l-2.3-2.1C8.4 21.6 5 18.4 5 14.5 5 11.4 7.4 9 10.5 9c1.7 0 3.4.8 4.5 2.1C16.1 9.8 17.8 9 19.5 9 22.6 9 25 11.4 25 14.5c0 3.9-3.4 7.1-8.7 11.9L16 28.5z"/>
          </svg>
        </div>
      ))}
    </div>
  );
}
