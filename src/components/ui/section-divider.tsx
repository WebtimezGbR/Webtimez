"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionDivider() {
  return (
    <div
      aria-hidden
      className="relative z-30 mx-auto h-16 sm:h-20 md:h-24 max-w-7xl px-6 sm:px-8 md:px-12"
    >
      {/* Horizontaler Glow-Strich */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-px w-2/3 -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{
          background:
            "linear-gradient(to right, rgba(255,92,224,0) 0%, rgba(255,92,224,0.7) 50%, rgba(255,92,224,0) 100%)",
          boxShadow: "0 0 24px rgba(255,92,224,0.45)",
        }}
      />

      {/* Mittiger Pink-Punkt mit pulsierendem Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease, delay: 0.25 }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-2.5 w-2.5 rounded-full bg-[#ff5ce0]"
          style={{
            boxShadow:
              "0 0 16px rgba(255,92,224,0.95), 0 0 32px rgba(255,92,224,0.45)",
          }}
        />
        <motion.span
          aria-hidden
          animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-[#ff5ce0]/60"
        />
        <motion.span
          aria-hidden
          animate={{ scale: [1, 3.2], opacity: [0.35, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1.1,
          }}
          className="absolute inset-0 rounded-full border border-[#ff5ce0]/40"
        />
      </motion.div>

      {/* Seitliche Funken-Punkte */}
      {[-160, -100, 100, 160].map((x, i) => (
        <motion.span
          key={x}
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease, delay: 0.35 + i * 0.05 }}
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-[#ff5ce0]/60"
          style={{
            left: `calc(50% + ${x}px)`,
            boxShadow: "0 0 8px rgba(255,92,224,0.6)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Scroll-Progress-Balken am oberen Bildschirmrand — wandert mit dem Scroll mit.
 * Wird in page.tsx einmal eingebunden.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: "0% 50%",
      }}
      className="fixed top-0 left-0 right-0 h-0.5 z-[55] pointer-events-none"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(to right, rgba(255,92,224,0) 0%, rgba(255,92,224,0.9) 50%, rgba(255,92,224,0) 100%)",
          boxShadow: "0 0 16px rgba(255,92,224,0.7)",
        }}
      />
    </motion.div>
  );
}
