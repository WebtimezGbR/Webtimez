"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCard {
  id: number;
  title: string;
  category: string;
  description: string;
  gradient: string;
}

const initialCards: ProjectCard[] = [
  {
    id: 1,
    title: "Projekttitel",
    category: "Kategorie",
    description: "Hier steht eine kurze Beschreibung des Projekts.",
    gradient:
      "linear-gradient(135deg, #ff5ce0 0%, #7b3aed 55%, #1e1b4b 100%)",
  },
  {
    id: 2,
    title: "Projekttitel",
    category: "Kategorie",
    description: "Hier steht eine kurze Beschreibung des Projekts.",
    gradient:
      "linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #0f172a 100%)",
  },
  {
    id: 3,
    title: "Projekttitel",
    category: "Kategorie",
    description: "Hier steht eine kurze Beschreibung des Projekts.",
    gradient:
      "linear-gradient(135deg, #fb923c 0%, #ff5ce0 55%, #4c1d31 100%)",
  },
  {
    id: 4,
    title: "Projekttitel",
    category: "Kategorie",
    description: "Hier steht eine kurze Beschreibung des Projekts.",
    gradient:
      "linear-gradient(135deg, #2dd4bf 0%, #3b82f6 50%, #111827 100%)",
  },
  {
    id: 5,
    title: "Projekttitel",
    category: "Kategorie",
    description: "Hier steht eine kurze Beschreibung des Projekts.",
    gradient:
      "linear-gradient(135deg, #a855f7 0%, #ff5ce0 55%, #1e1b4b 100%)",
  },
  {
    id: 6,
    title: "Projekttitel",
    category: "Kategorie",
    description: "Hier steht eine kurze Beschreibung des Projekts.",
    gradient:
      "linear-gradient(135deg, #22c55e 0%, #38bdf8 50%, #0f172a 100%)",
  },
  {
    id: 7,
    title: "Projekttitel",
    category: "Kategorie",
    description: "Hier steht eine kurze Beschreibung des Projekts.",
    gradient:
      "linear-gradient(135deg, #f472b6 0%, #a855f7 50%, #1e1b4b 100%)",
  },
  {
    id: 8,
    title: "Projekttitel",
    category: "Kategorie",
    description: "Hier steht eine kurze Beschreibung des Projekts.",
    gradient:
      "linear-gradient(135deg, #60a5fa 0%, #2dd4bf 50%, #0f172a 100%)",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

function PlaceholderArt({
  gradient,
  id,
}: {
  gradient: string;
  id: number;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: "#0f0c29", backgroundImage: gradient }}
    >
      <div
        aria-hidden
        className="absolute -top-1/4 -left-1/4 h-3/4 w-3/4 rounded-full opacity-50 blur-3xl"
        style={{ background: "rgba(255,255,255,0.2)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-1/4 -right-1/4 h-3/4 w-3/4 rounded-full opacity-50 blur-3xl"
        style={{ background: "rgba(255,92,224,0.35)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-white/15 select-none">
          {String(id).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // currentIndex zeigt auf das vorderste Projekt im initialCards-Array.
  // Die Reihenfolge bleibt stabil; nur welche Karte vorne liegt, ändert sich.
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const offset = 2.5;
  const scaleStep = 0.04;
  const dimStep = 0.12;
  const borderRadius = 16;
  const stackTransition = {
    type: "tween" as const,
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  const total = initialCards.length;
  // Visuelle Reihenfolge: vorderste Karte zuerst
  const orderedCards = Array.from({ length: total }, (_, k) => {
    const idx = (currentIndex + k) % total;
    return initialCards[idx];
  });

  const advance = (direction: "next" | "prev") => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIndex((prev) =>
      direction === "next" ? (prev + 1) % total : (prev - 1 + total) % total
    );
    window.setTimeout(() => setTransitioning(false), 450);
  };

  const resetCards = () => {
    if (transitioning) return;
    setCurrentIndex(0);
  };

  const frontProject = initialCards[currentIndex];

  return (
    <div ref={sectionRef} className="relative pt-0 pb-16 sm:pb-20 md:pb-24">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 sm:mb-10"
        >
          <h3
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wide mb-2 sm:mb-3"
            style={{ textShadow: headingShadow }}
          >
            Portfolio
          </h3>
          <p
            className="text-base sm:text-lg md:text-xl font-light text-white/85 tracking-wide"
            style={{ textShadow: bodyShadow }}
          >
            Eine Auswahl unserer aktuellen Projekte
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="relative flex flex-col items-center"
        >
          {/* Reset-Button */}
          <div className="mb-6 sm:mb-8 flex items-center justify-center">
            <motion.button
              onClick={resetCards}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Zurücksetzen"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-4 py-2 text-sm text-white/80 hover:bg-black/55 hover:border-[#ff5ce0]/40 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </motion.button>
          </div>

          {/* Progress */}
          <div className="mb-6 sm:mb-8 flex items-center gap-2">
            {initialCards.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-[#ff5ce0] w-8"
                    : "bg-white/20 w-1.5"
                }`}
              />
            ))}
          </div>

          {/* Stage with Cards + Side Buttons */}
          <div className="relative flex w-full items-center justify-center gap-3 sm:gap-6">
            <motion.button
              onClick={() => advance("prev")}
              whileHover={{ scale: 1.08, x: -3 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Vorheriges Projekt"
              className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            {/* Card Stack */}
            <div className="relative w-full max-w-[26rem] sm:max-w-[34rem] md:max-w-[42rem] lg:max-w-[48rem] aspect-[5/3]">
              <ul className="relative h-full w-full m-0 p-0">
                {orderedCards.map((card, k) => {
                  const isFront = k === 0;
                  const brightness = Math.max(0.4, 1 - k * dimStep);
                  const baseZ = total - k;
                  return (
                    <motion.li
                      key={card.id}
                      className="absolute h-full w-full list-none overflow-hidden border border-white/15"
                      style={{
                        borderRadius: `${borderRadius}px`,
                        boxShadow: isFront
                          ? "0 25px 50px rgba(0,0,0,0.55), 0 0 30px rgba(255,92,224,0.15)"
                          : "0 12px 28px rgba(0,0,0,0.35)",
                      }}
                      animate={{
                        top: `${k * offset}%`,
                        scale: 1 - k * scaleStep,
                        filter: `brightness(${brightness})`,
                        zIndex: baseZ,
                      }}
                      transition={stackTransition}
                    >
                      <PlaceholderArt gradient={card.gradient} id={card.id} />
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <motion.button
              onClick={() => advance("next")}
              whileHover={{ scale: 1.08, x: 3 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Nächstes Projekt"
              className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Mobile-Buttons unter dem Stapel */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
            <motion.button
              onClick={() => advance("prev")}
              whileTap={{ scale: 0.92 }}
              aria-label="Vorheriges Projekt"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={() => advance("next")}
              whileTap={{ scale: 0.92 }}
              aria-label="Nächstes Projekt"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Aktuelles Projekt-Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={frontProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
              className="mt-8 sm:mt-12 md:mt-14 lg:mt-16 text-center"
            >
              <span className="inline-block text-[10px] sm:text-xs uppercase tracking-widest text-white/80 px-3 py-1 rounded-full bg-white/10 border border-white/15 mb-3">
                {frontProject.category}
              </span>
              <h4
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-1"
                style={{ textShadow: headingShadow }}
              >
                {frontProject.title}
              </h4>
              <p
                className="text-sm sm:text-base text-white/75 leading-snug max-w-md mx-auto"
                style={{ textShadow: bodyShadow }}
              >
                {frontProject.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <p
            className="mt-4 text-center text-xs sm:text-sm text-white/55 tracking-wide"
            style={{ textShadow: bodyShadow }}
          >
            Projekt{" "}
            <span className="text-white/90 font-medium">
              {currentIndex + 1}
            </span>{" "}
            von {total}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
