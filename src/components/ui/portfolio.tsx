"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useSectionIntro } from "@/lib/supabase/settings";

const PORTFOLIO_INTRO_FALLBACK = {
  eyebrow: "",
  heading: "Portfolio",
  subheading: "Eine Auswahl unserer aktuellen Projekte",
};

const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

const GRADIENTS = [
  "linear-gradient(135deg, #ff5ce0 0%, #7b3aed 55%, #1e1b4b 100%)",
  "linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #0f172a 100%)",
  "linear-gradient(135deg, #fb923c 0%, #ff5ce0 55%, #4c1d31 100%)",
  "linear-gradient(135deg, #2dd4bf 0%, #3b82f6 50%, #111827 100%)",
  "linear-gradient(135deg, #a855f7 0%, #ff5ce0 55%, #1e1b4b 100%)",
  "linear-gradient(135deg, #22c55e 0%, #38bdf8 50%, #0f172a 100%)",
  "linear-gradient(135deg, #f472b6 0%, #a855f7 50%, #1e1b4b 100%)",
  "linear-gradient(135deg, #60a5fa 0%, #2dd4bf 50%, #0f172a 100%)",
];

function getGradient(position: number) {
  return GRADIENTS[(position - 1) % GRADIENTS.length];
}

interface ProjectRow {
  id: number;
  position: number;
  title: string;
  category: string;
  description: string;
  image_path: string | null;
  live_url: string | null;
}

interface ProjectCard {
  id: number;
  position: number;
  title: string;
  category: string;
  description: string;
  imagePublicUrl: string | null;
  liveUrl: string | null;
  gradient: string;
}

function rowToCard(row: ProjectRow): ProjectCard {
  let imagePublicUrl: string | null = null;
  if (row.image_path) {
    const { data } = supabase.storage
      .from("portfolio")
      .getPublicUrl(row.image_path);
    imagePublicUrl = data.publicUrl;
  }
  return {
    id: row.id,
    position: row.position,
    title: row.title,
    category: row.category,
    description: row.description,
    imagePublicUrl,
    liveUrl: row.live_url,
    gradient: getGradient(row.position),
  };
}

function ProjectArt({ card }: { card: ProjectCard }) {
  if (card.imagePublicUrl) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0f0c29]">
        <img
          src={card.imagePublicUrl}
          alt={card.title}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
    );
  }
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: "#0f0c29", backgroundImage: card.gradient }}
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
          {String(card.position).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const intro = useSectionIntro("portfolio", PORTFOLIO_INTRO_FALLBACK);

  const [cards, setCards] = useState<ProjectCard[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("portfolio_projects")
      .select("*")
      .order("position", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Portfolio konnte nicht geladen werden:", error);
          setCards([]);
          return;
        }
        setCards((data as ProjectRow[]).map(rowToCard));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const offset = 2.5;
  const scaleStep = 0.04;
  const dimStep = 0.12;
  const borderRadius = 16;
  const stackTransition = {
    type: "tween" as const,
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  const total = cards?.length ?? 0;
  const orderedCards =
    cards && total > 0
      ? Array.from({ length: total }, (_, k) => {
          const idx = (currentIndex + k) % total;
          return cards[idx];
        })
      : [];

  const advance = (direction: "next" | "prev") => {
    if (transitioning || total === 0) return;
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

  const frontProject = cards && total > 0 ? cards[currentIndex] : null;

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
          {intro.eyebrow && (
            <span
              className="block text-xs sm:text-sm font-semibold text-[#ff5ce0] tracking-[0.4em] uppercase mb-3"
              style={{ textShadow: bodyShadow }}
            >
              {intro.eyebrow}
            </span>
          )}
          <h3
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wide mb-2 sm:mb-3"
            style={{ textShadow: headingShadow }}
          >
            {intro.heading}
          </h3>
          <p
            className="text-base sm:text-lg md:text-xl font-light text-white/85 tracking-wide"
            style={{ textShadow: bodyShadow }}
          >
            {intro.subheading}
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
          {total > 0 && (
            <div className="mb-6 sm:mb-8 flex items-center gap-2">
              {(cards ?? []).map((_, i) => (
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
          )}

          {/* Stage with Cards + Side Buttons */}
          <div className="relative flex w-full items-center justify-center gap-3 sm:gap-6">
            <motion.button
              onClick={() => advance("prev")}
              whileHover={{ scale: 1.08, x: -3 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Vorheriges Projekt"
              className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={total === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            {/* Card Stack */}
            <div className="relative w-full max-w-[26rem] sm:max-w-[34rem] md:max-w-[42rem] lg:max-w-[48rem] aspect-[5/3]">
              {cards === null ? (
                <div className="absolute inset-0 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <span className="text-white/60 text-sm">
                    Projekte werden geladen…
                  </span>
                </div>
              ) : total === 0 ? (
                <div className="absolute inset-0 rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md flex items-center justify-center text-center px-6">
                  <span className="text-white/70">
                    Bald folgen die ersten Projekte.
                  </span>
                </div>
              ) : (
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
                        <ProjectArt card={card} />
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            <motion.button
              onClick={() => advance("next")}
              whileHover={{ scale: 1.08, x: 3 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Nächstes Projekt"
              className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={total === 0}
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer disabled:opacity-30"
              disabled={total === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={() => advance("next")}
              whileTap={{ scale: 0.92 }}
              aria-label="Nächstes Projekt"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer disabled:opacity-30"
              disabled={total === 0}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Aktuelles Projekt-Info */}
          {frontProject && (
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
                {frontProject.liveUrl && (
                  <a
                    href={frontProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#ff5ce0] hover:bg-[#ff5ce0]/90 text-black font-semibold text-sm px-5 py-2 transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,92,224,0.5)]"
                  >
                    Projekt ansehen
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {total > 0 && (
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
          )}
        </motion.div>
      </div>
    </div>
  );
}
