"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Zap, Server } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useSectionIntro } from "@/lib/supabase/settings";

const PRICING_INTRO_FALLBACK = {
  eyebrow: "Flexibel & transparent",
  heading: "Das passende Paket für dich",
  subheading:
    "Alle Preise sind Startpreise (Einmalzahlung) — der finale Preis richtet sich nach euren konkreten Anforderungen.",
};

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

type PriceMode = "brutto" | "netto";

interface Plan {
  name: string;
  price: { brutto: number; netto: number };
  description: string;
  features: string[];
  isFeatured: boolean;
}

interface PricingPlanRow {
  id: number;
  position: number;
  name: string;
  description: string;
  price_netto: number;
  price_brutto: number;
  features: string[];
  is_featured: boolean;
}

function rowToPlan(row: PricingPlanRow): Plan {
  return {
    name: row.name,
    description: row.description,
    price: { netto: row.price_netto, brutto: row.price_brutto },
    features: Array.isArray(row.features) ? row.features : [],
    isFeatured: row.is_featured,
  };
}

const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 });
  const intro = useSectionIntro("pricing", PRICING_INTRO_FALLBACK);

  const [plans, setPlans] = useState<Plan[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("pricing_plans")
      .select("*")
      .order("position", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Pricing-Daten konnten nicht geladen werden:", error);
          setPlans([]);
          return;
        }
        setPlans((data as PricingPlanRow[]).map(rowToPlan));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [priceMode, setPriceMode] = useState<PriceMode>("netto");

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          {intro.eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5ce0]/10 border border-[#ff5ce0]/30 mb-5 sm:mb-6"
            >
              <Zap className="h-4 w-4 text-[#ff5ce0]" />
              <span
                className="text-sm font-medium text-white/85 tracking-wide"
                style={{ textShadow: bodyShadow }}
              >
                {intro.eyebrow}
              </span>
            </motion.div>
          )}

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wide mb-3 sm:mb-4"
            style={{ textShadow: headingShadow }}
          >
            {intro.heading}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-light text-white/85 tracking-wide max-w-2xl"
            style={{ textShadow: bodyShadow }}
          >
            {intro.subheading}
          </motion.p>

          {/* Brutto / Netto Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            <span
              className={cn(
                "text-base sm:text-lg transition-colors",
                priceMode === "netto" ? "text-white" : "text-white/40"
              )}
              style={{ textShadow: bodyShadow }}
            >
              Netto
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={priceMode === "brutto"}
              aria-label="Zwischen Netto- und Brutto-Preisen umschalten"
              className="w-14 h-8 flex items-center bg-black/40 backdrop-blur-md border border-white/15 rounded-full p-1 cursor-pointer hover:border-[#ff5ce0]/40 transition-colors"
              onClick={() =>
                setPriceMode(priceMode === "netto" ? "brutto" : "netto")
              }
            >
              <motion.div
                className="w-6 h-6 bg-[#ff5ce0] rounded-full"
                style={{
                  boxShadow: "0 0 16px rgba(255,92,224,0.5)",
                  marginLeft: priceMode === "brutto" ? "auto" : "0",
                }}
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              />
            </button>
            <span
              className={cn(
                "text-base sm:text-lg transition-colors",
                priceMode === "brutto" ? "text-white" : "text-white/40"
              )}
              style={{ textShadow: bodyShadow }}
            >
              Brutto
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 max-w-7xl w-full mx-auto"
        >
          {plans === null
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-7 sm:p-8 md:p-10 h-[480px] flex flex-col"
                >
                  <div className="h-8 w-32 rounded bg-white/10 animate-pulse" />
                  <div className="mt-3 h-4 w-48 rounded bg-white/5 animate-pulse" />
                  <div className="mt-8 h-12 w-40 rounded bg-white/10 animate-pulse" />
                  <div className="mt-8 space-y-3">
                    <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
                    <div className="h-4 w-5/6 rounded bg-white/5 animate-pulse" />
                    <div className="h-4 w-4/6 rounded bg-white/5 animate-pulse" />
                  </div>
                </div>
              ))
            : plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={
                cardsInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 60, scale: 0.95 }
              }
              transition={{
                duration: 0.6,
                ease,
                delay: 0.2 + index * 0.12,
              }}
              whileHover={{ y: -6 }}
              className={cn(
                "relative p-7 sm:p-8 md:p-10 rounded-2xl border overflow-hidden flex flex-col transition-colors duration-300",
                plan.isFeatured
                  ? "bg-black/55 backdrop-blur-md border-[#ff5ce0]/40 shadow-[0_0_40px_rgba(255,92,224,0.18)]"
                  : "bg-black/40 backdrop-blur-md border-white/15 hover:bg-black/55 hover:border-[#ff5ce0]/40 hover:shadow-[0_0_40px_rgba(255,92,224,0.18)]"
              )}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 right-0 text-xs font-bold text-black bg-[#ff5ce0] px-4 py-1.5 rounded-bl-lg tracking-widest uppercase">
                  Beliebteste
                </div>
              )}

              <h4
                className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                {plan.name}
              </h4>
              <p
                className="text-sm sm:text-base text-white/70 mt-2"
                style={{ textShadow: bodyShadow }}
              >
                {plan.description}
              </p>

              <div className="flex items-baseline mt-7 sm:mt-8 gap-2">
                <span
                  className="text-base text-white/60 font-light"
                  style={{ textShadow: bodyShadow }}
                >
                  ab
                </span>
                <span
                  className="text-5xl sm:text-6xl font-bold text-white tracking-tight"
                  style={{ textShadow: headingShadow }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={priceMode}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease }}
                      className="inline-block"
                    >
                      {plan.price[priceMode].toLocaleString("de-DE")} €
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
              <p
                className="text-xs sm:text-sm text-white/55 mt-1.5 tracking-wide"
                style={{ textShadow: bodyShadow }}
              >
                Einmalzahlung · Endpreis je nach Anforderungen
              </p>

              <ul className="mt-7 sm:mt-8 space-y-3 sm:space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm sm:text-base text-white/85 tracking-wide"
                    style={{ textShadow: bodyShadow }}
                  >
                    <Check className="h-5 w-5 text-[#ff5ce0] mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Hosting-Hinweis für alle Pakete */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease, delay: 0.65 }}
          className="mt-8 sm:mt-10 mx-auto max-w-3xl rounded-2xl border border-[#ff5ce0]/30 bg-[#ff5ce0]/5 backdrop-blur-md p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff5ce0]/15 text-[#ff5ce0]">
            <Server className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h5
              className="text-base sm:text-lg font-semibold text-white tracking-wide mb-1"
              style={{ textShadow: headingShadow }}
            >
              Hosting für alle Pakete
            </h5>
            <p
              className="text-sm sm:text-base text-white/80 tracking-wide leading-relaxed"
              style={{ textShadow: bodyShadow }}
            >
              Nach Auftragsabschluss läuft das Hosting monatlich ab{" "}
              <span className="font-semibold text-white">20 € pro Monat</span>{" "}
              weiter — gilt einheitlich für Starter, Business und Premium.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
