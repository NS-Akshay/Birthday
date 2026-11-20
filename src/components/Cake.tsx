"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";

export default function Cake({ onNext }: { onNext: () => void }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [breathIntensity, setBreathIntensity] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const candlesBlownRef = useRef(false);
  const micActiveRef = useRef(false);

  // Stop microphone stream and close AudioContext safely
  const cleanupAudio = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close().catch(() => {});
      } catch {}
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    micActiveRef.current = false;
  }, []);

  // Extinguish candles and proceed to the next section
  const handleBlow = useCallback(() => {
    if (candlesBlownRef.current) return;
    candlesBlownRef.current = true;
    setCandlesBlown(true);

    // Release microphone tracks immediately after candles are blown
    cleanupAudio();

    setTimeout(() => {
      onNext();
    }, 3500);
  }, [cleanupAudio, onNext]);

  // Real-time acoustic blow detector distinguishing airflow from speech, music & clicks
  const startListening = useCallback(
    (analyser: AnalyserNode) => {
      const bufferLength = analyser.frequencyBinCount;
      const freqData = new Uint8Array(bufferLength);
      const timeData = new Uint8Array(analyser.fftSize);

      let calibrationFrames = 0;
      let ambientRms = 0.015;
      let ambientLowEnergy = 10;
      let consecutiveBlowFrames = 0;

      const analyzeAudio = () => {
        if (candlesBlownRef.current) return;

        analyser.getByteFrequencyData(freqData);
        analyser.getByteTimeDomainData(timeData);

        // 1. Calculate RMS volume and waveform peak deviation
        let sumSquares = 0;
        let maxPeakDev = 0;
        for (let i = 0; i < timeData.length; i++) {
          const deviation = Math.abs(timeData[i] - 128);
          if (deviation > maxPeakDev) maxPeakDev = deviation;
          const normalized = (timeData[i] - 128) / 128;
          sumSquares += normalized * normalized;
        }
        const rms = Math.sqrt(sumSquares / timeData.length);
        const peak = maxPeakDev / 128;

        // 2. Frequency distribution analysis
        // Bins 0-3 (~0 - 375 Hz): Direct breath airflow & wind turbulence
        let lowFreqSum = 0;
        for (let i = 0; i <= 3; i++) {
          lowFreqSum += freqData[i];
        }
        const lowFreqAvg = lowFreqSum / 4;

        // Bins 12-36 (~1125 - 3400 Hz): Speech harmonics, consonants, room audio
        let highFreqSum = 0;
        for (let i = 12; i <= 36; i++) {
          highFreqSum += freqData[i];
        }
        const highFreqAvg = highFreqSum / 25;

        // Wind turbulence ratio: physical breath produces heavy low-frequency pressure
        const windRatio = lowFreqAvg / Math.max(10, highFreqAvg);

        // 3. Ambient noise calibration (first 30 frames ~ 0.5s)
        if (calibrationFrames < 30) {
          calibrationFrames++;
          ambientRms = (ambientRms * (calibrationFrames - 1) + rms) / calibrationFrames;
          ambientLowEnergy = (ambientLowEnergy * (calibrationFrames - 1) + lowFreqAvg) / calibrationFrames;
        } else {
          // Slow dynamic noise floor adaptation during quiet periods
          if (rms < ambientRms * 1.3) {
            ambientRms = ambientRms * 0.98 + rms * 0.02;
            ambientLowEnergy = ambientLowEnergy * 0.98 + lowFreqAvg * 0.02;
          }
        }

        // 4. Real-time flame reaction factor (0 - 100)
        const currentIntensity = Math.min(
          100,
          Math.round(
            Math.max(
              ((rms - ambientRms) / 0.1) * 100,
              ((lowFreqAvg - ambientLowEnergy) / 50) * 100,
              (peak / 0.35) * 100
            )
          )
        );
        setBreathIntensity(Math.max(0, currentIntensity));

        // 5. Blowing criteria:
        // - Elevated RMS above calibrated ambient noise
        // - Dominant low-frequency airflow turbulence (windRatio > 1.3)
        // - Significant diaphragm displacement (peak > 0.14)
        // - Rejects speech/music because their highFreqAvg keeps windRatio low
        const isBlowingFrame =
          (rms > ambientRms + 0.035 || rms > 0.065) &&
          (lowFreqAvg > ambientLowEnergy + 12 || lowFreqAvg > 22) &&
          windRatio > 1.3 &&
          peak > 0.14;

        if (isBlowingFrame) {
          consecutiveBlowFrames++;
          // Requires sustained airflow across at least 7 frames (~120ms)
          if (consecutiveBlowFrames >= 7) {
            handleBlow();
            return;
          }
        } else {
          consecutiveBlowFrames = Math.max(0, consecutiveBlowFrames - 2);
        }

        animFrameRef.current = requestAnimationFrame(analyzeAudio);
      };

      animFrameRef.current = requestAnimationFrame(analyzeAudio);
    },
    [handleBlow]
  );

  // Initialize microphone access
  const requestMic = useCallback(async () => {
    if (micActiveRef.current || candlesBlownRef.current) return;

    try {
      if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        return;
      }

      cleanupAudio();

      let stream: MediaStream;
      try {
        // Disable WebRTC speech filters so raw breath airflow turbulence is captured
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });
      } catch {
        // Fallback to standard audio constraints if custom constraints are unsupported
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      if (candlesBlownRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      // Verify stream has live audio tracks
      const audioTracks = stream.getAudioTracks();
      if (!audioTracks || audioTracks.length === 0 || !audioTracks[0].enabled) {
        return;
      }

      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      if (ctx.state === "suspended") {
        await ctx.resume().catch(() => {});
      }

      const analyser = ctx.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.12;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      micActiveRef.current = true;
      startListening(analyser);
    } catch (err) {
      // Diagnostic output only; no error UI or warning cards
      console.warn("Microphone not enabled or permission not granted yet:", err);
    }
  }, [cleanupAudio, startListening]);

  // Request mic on mount and also on any first user gesture on the page
  useEffect(() => {
    requestMic();

    // Ensure AudioContext and mic activate on first interaction if browser requires a user gesture
    const handleFirstInteraction = () => {
      if (!micActiveRef.current && !candlesBlownRef.current) {
        requestMic();
      }
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().catch(() => {});
      }
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      cleanupAudio();
    };
  }, [requestMic, cleanupAudio]);

  // Keyboard accessibility: Space, Enter, or B acts as a fallback to blow the candles
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;

      if (e.key === " " || e.key === "Enter" || e.key.toLowerCase() === "b") {
        e.preventDefault();
        handleBlow();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleBlow]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
      className="h-full min-h-screen max-h-screen w-full flex flex-col items-center justify-center py-4 px-4 text-center z-10 relative overflow-hidden select-none"
    >
      {/* Title & Subtitle in Cursive Font */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="mb-2 sm:mb-4 z-20 max-w-xl sm:max-w-2xl mx-auto px-4"
      >
        <span className="text-[11px] sm:text-xs font-heading uppercase tracking-[0.3em] text-[#B8995E] font-semibold mb-1 block select-none">
          ✦ MAKE A WISH ✦
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-rose-950 mb-2 leading-snug drop-shadow-sm">
          {content.cakeSection.title}
        </h2>
        <p className="font-times text-base sm:text-lg md:text-xl text-[#4A261E] font-medium leading-relaxed max-w-lg sm:max-w-xl mx-auto">
          {content.cakeSection.subtitle}
        </p>
      </motion.div>

      {/* 3-Tier Realistic Cake */}
      <div
        className="relative my-1 sm:my-2 cursor-pointer transform scale-[0.88] sm:scale-95 md:scale-100 origin-center"
        onClick={handleBlow}
        title="Blow toward your microphone or tap the cake"
      >
        {!candlesBlown && (
          <motion.div
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-[80px] z-0 pointer-events-none"
          />
        )}

        <div className="relative z-10 w-[300px] md:w-[400px] flex flex-col items-center pt-20 pb-8">
          {/* TIER 3 (Top) */}
          <div className="relative z-30" style={{ width: "130px", height: "70px" }}>
            {/* Candles on top tier */}
            <div className="absolute -top-[55px] left-1/2 -translate-x-1/2 flex gap-3 w-full justify-center z-50">
              <Candle blown={candlesBlown} offset={6} delay={0.1} breath={breathIntensity} />
              <Candle blown={candlesBlown} offset={2} delay={0.3} breath={breathIntensity} />
              <Candle blown={candlesBlown} offset={0} delay={0} breath={breathIntensity} />
              <Candle blown={candlesBlown} offset={2} delay={0.2} breath={breathIntensity} />
              <Candle blown={candlesBlown} offset={6} delay={0.4} breath={breathIntensity} />
            </div>

            {/* Body */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#e8dbce] via-[#ffffff] to-[#dcd0c2] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.03),0_10px_20px_rgba(0,0,0,0.05)]"
              style={{ borderBottomLeftRadius: "50% 15px", borderBottomRightRadius: "50% 15px" }}
            >
              <div className="absolute w-full h-full opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]" />
            </div>

            {/* Top Surface */}
            <div className="absolute top-0 w-full h-10 bg-[#fdfbf7] -translate-y-1/2 rounded-[50%] border-t border-white shadow-[inset_0_-2px_10px_rgba(0,0,0,0.03)]" />

            {/* Decorations */}
            <div className="absolute bottom-1 right-2 text-rose-200/90 text-sm blur-[0.5px] drop-shadow-sm">🌸</div>
            <div className="absolute bottom-0 left-3 text-rose-100/80 text-xs blur-[0.5px]">🌺</div>
          </div>

          {/* TIER 2 (Middle) */}
          <div className="relative z-20 -mt-3" style={{ width: "190px", height: "80px" }}>
            {/* Body */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#e8dbce] via-[#ffffff] to-[#dcd0c2] shadow-[inset_-15px_0_25px_rgba(0,0,0,0.04),0_15px_25px_rgba(0,0,0,0.06)]"
              style={{ borderBottomLeftRadius: "50% 18px", borderBottomRightRadius: "50% 18px" }}
            >
              <div className="absolute w-full h-full opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]" />
            </div>

            {/* Top Surface */}
            <div className="absolute top-0 w-full h-12 bg-[#fcf9f5] -translate-y-1/2 rounded-[50%] border-t border-white shadow-[inset_0_-3px_12px_rgba(0,0,0,0.04)]" />

            {/* Decorations */}
            <div className="absolute bottom-1 left-4 text-rose-200/90 text-sm blur-[0.5px] drop-shadow-sm">🌸</div>
            <div className="absolute bottom-2 right-5 text-rose-100/80 text-lg blur-[0.5px]">🌸</div>
          </div>

          {/* TIER 1 (Bottom) */}
          <div className="relative z-10 -mt-4" style={{ width: "260px", height: "95px" }}>
            {/* Body */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#e8dbce] via-[#ffffff] to-[#dcd0c2] shadow-[inset_-20px_0_30px_rgba(0,0,0,0.05),0_20px_40px_rgba(0,0,0,0.08)]"
              style={{ borderBottomLeftRadius: "50% 22px", borderBottomRightRadius: "50% 22px" }}
            >
              <div className="absolute w-full h-full opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]" />
            </div>

            {/* Top Surface */}
            <div className="absolute top-0 w-full h-14 bg-[#fbf7f2] -translate-y-1/2 rounded-[50%] border-t border-white shadow-[inset_0_-4px_15px_rgba(0,0,0,0.05)]" />

            {/* Base Cake Platter/Stand */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[300px] h-16 bg-gradient-to-r from-[#d6c7b8] via-[#ffffff] to-[#cbbcae] rounded-[50%] -z-10 shadow-[0_15px_30px_rgba(0,0,0,0.15)] border-b-2 border-white" />

            {/* Decorations */}
            <div className="absolute bottom-2 right-8 text-rose-200/90 text-xl blur-[0.5px] drop-shadow-sm">🌸</div>
            <div className="absolute bottom-4 left-6 text-rose-100/90 text-lg blur-[0.5px]">🌺</div>
            <div className="absolute bottom-1 left-16 text-rose-200/80 text-sm blur-[0.5px]">🌸</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Candle = ({
  blown,
  offset,
  delay,
  breath,
}: {
  blown: boolean;
  offset: number;
  delay: number;
  breath: number;
}) => (
  <div
    className="relative w-2.5 h-12 bg-gradient-to-b from-[#fdf9f4] to-[#e8dbce] rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
    style={{ transform: `translateY(${offset}px)` }}
  >
    {/* Wick */}
    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-zinc-700 rounded-full" />

    {/* Smoke wisp after extinguishing */}
    <AnimatePresence>
      {blown && (
        <motion.div
          initial={{ opacity: 0.7, scale: 0.4, y: -4, x: 0 }}
          animate={{ opacity: 0, scale: 2.5, y: -36, x: delay % 2 === 0 ? 6 : -6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -top-4 -left-1 w-4 h-4 rounded-full bg-zinc-400/40 blur-[2px] pointer-events-none"
        />
      )}
    </AnimatePresence>

    {/* Flame reacting to breath turbulence in real-time */}
    <AnimatePresence>
      {!blown && (
        <motion.div
          exit={{ opacity: 0, scale: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="absolute -top-8 -left-2 w-6 h-8 pointer-events-none"
          style={{
            transformOrigin: "bottom center",
            rotate: breath > 8 ? `${(breath / 100) * (delay % 2 === 0 ? 30 : -30)}deg` : "0deg",
            scaleY: breath > 10 ? Math.max(0.4, 1 - breath / 130) : 1,
            scaleX: breath > 10 ? Math.max(0.6, 1 - breath / 200) : 1,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0], skewX: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 0.3 + delay }}
            className="w-full h-full bg-gradient-to-t from-orange-400 via-yellow-200 to-transparent rounded-[50%_50%_20%_20%] blur-[1px] shadow-[0_0_15px_rgba(255,165,0,0.6)] origin-bottom"
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
