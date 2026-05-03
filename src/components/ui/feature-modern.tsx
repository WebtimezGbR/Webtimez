"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Palette,
  BarChart3,
  Server,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Balancer from "react-wrap-balancer";
import { supabase } from "@/lib/supabase/client";

// Icon-Lookup: DB speichert nur den Namen als Text, hier mappen wir auf Components.
const ICONS: Record<string, React.ElementType> = {
  Code,
  Palette,
  BarChart3,
  Server,
  ShieldCheck,
};

function resolveIcon(name: string | null | undefined): React.ElementType {
  if (!name) return HelpCircle;
  return ICONS[name] ?? HelpCircle;
}

const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

interface Service {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  graphic: React.ReactNode;
}

function GraphicEntwicklung() {
  return (
    <svg
      viewBox="0 0 240 140"
      className="w-full h-auto max-h-[140px]"
      aria-hidden
    >
      <rect
        x="20"
        y="22"
        width="200"
        height="100"
        rx="10"
        fill="rgba(0,0,0,0.35)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />
      <rect
        x="20"
        y="22"
        width="200"
        height="22"
        rx="10"
        fill="rgba(255,255,255,0.06)"
      />
      <rect x="20" y="34" width="200" height="10" fill="rgba(255,255,255,0.06)" />
      <circle cx="33" cy="33" r="3.5" fill="rgba(255,92,224,0.9)" />
      <circle cx="46" cy="33" r="3.5" fill="rgba(255,255,255,0.35)" />
      <circle cx="59" cy="33" r="3.5" fill="rgba(255,255,255,0.35)" />
      <rect x="34" y="58" width="50" height="4" rx="2" fill="rgba(255,92,224,0.75)" />
      <rect x="90" y="58" width="80" height="4" rx="2" fill="rgba(255,255,255,0.45)" />
      <rect x="44" y="74" width="120" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
      <rect x="44" y="90" width="60" height="4" rx="2" fill="rgba(255,92,224,0.65)" />
      <rect x="110" y="90" width="40" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
      <rect x="34" y="106" width="40" height="4" rx="2" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

function GraphicDesign() {
  return (
    <svg
      viewBox="0 0 240 140"
      className="w-full h-auto max-h-[140px]"
      aria-hidden
    >
      <circle cx="90" cy="70" r="40" fill="rgba(255,92,224,0.45)" />
      <circle cx="120" cy="70" r="40" fill="rgba(168,85,247,0.45)" />
      <circle cx="150" cy="70" r="40" fill="rgba(56,189,248,0.4)" />
      <path
        d="M 168 92 L 184 110 L 176 110 L 181 122 L 175 124 L 170 112 L 163 116 Z"
        fill="white"
        stroke="rgba(0,0,0,0.4)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function GraphicOptimierung() {
  return (
    <svg
      viewBox="0 0 240 140"
      className="w-full h-auto max-h-[140px]"
      aria-hidden
    >
      <rect x="38" y="90" width="22" height="30" rx="4" fill="rgba(255,255,255,0.3)" />
      <rect x="72" y="70" width="22" height="50" rx="4" fill="rgba(255,255,255,0.4)" />
      <rect x="106" y="55" width="22" height="65" rx="4" fill="rgba(255,92,224,0.55)" />
      <rect x="140" y="35" width="22" height="85" rx="4" fill="rgba(255,92,224,0.75)" />
      <rect x="174" y="20" width="22" height="100" rx="4" fill="rgba(255,92,224,0.95)" />
      <path
        d="M 49 100 L 83 80 L 117 65 L 151 45 L 185 28"
        fill="none"
        stroke="rgba(255,92,224,1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 185 28 L 191 36 M 185 28 L 178 33"
        fill="none"
        stroke="rgba(255,92,224,1)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GraphicHosting() {
  return (
    <svg
      viewBox="0 0 240 140"
      className="w-full h-auto max-h-[140px]"
      aria-hidden
    >
      <rect
        x="55"
        y="32"
        width="130"
        height="22"
        rx="4"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.28)"
      />
      <rect
        x="55"
        y="58"
        width="130"
        height="22"
        rx="4"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.28)"
      />
      <rect
        x="55"
        y="84"
        width="130"
        height="22"
        rx="4"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.28)"
      />
      <circle cx="68" cy="43" r="2.8" fill="rgba(255,92,224,0.95)" />
      <circle cx="80" cy="43" r="2.8" fill="rgba(255,92,224,0.55)" />
      <circle cx="92" cy="43" r="2.8" fill="rgba(255,255,255,0.4)" />
      <rect x="148" y="40" width="28" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="68" cy="69" r="2.8" fill="rgba(255,92,224,0.55)" />
      <circle cx="80" cy="69" r="2.8" fill="rgba(255,92,224,0.95)" />
      <circle cx="92" cy="69" r="2.8" fill="rgba(255,255,255,0.4)" />
      <rect x="148" y="66" width="28" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="68" cy="95" r="2.8" fill="rgba(255,92,224,0.95)" />
      <circle cx="80" cy="95" r="2.8" fill="rgba(255,92,224,0.55)" />
      <circle cx="92" cy="95" r="2.8" fill="rgba(255,92,224,0.95)" />
      <rect x="148" y="92" width="28" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

function GraphicKontrolle() {
  return (
    <svg
      viewBox="0 0 240 140"
      className="w-full h-auto max-h-[140px]"
      aria-hidden
    >
      <path
        d="M 120 22 L 162 34 L 162 76 Q 162 102 120 118 Q 78 102 78 76 L 78 34 Z"
        fill="rgba(255,92,224,0.18)"
        stroke="rgba(255,92,224,0.75)"
        strokeWidth="1.5"
      />
      <path
        d="M 100 70 L 114 84 L 140 58"
        fill="none"
        stroke="rgba(255,92,224,1)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Graphic-Lookup: DB speichert nur einen String wie "entwicklung", hier mappen wir auf die SVG-Komponente.
const GRAPHICS: Record<string, () => React.ReactElement> = {
  entwicklung: GraphicEntwicklung,
  design: GraphicDesign,
  optimierung: GraphicOptimierung,
  hosting: GraphicHosting,
  kontrolle: GraphicKontrolle,
};

// Akzent-Verlauf passend zum Grafik-Typ (sieht harmonisch aus mit der jeweiligen SVG).
const ACCENTS: Record<string, string> = {
  entwicklung:
    "linear-gradient(135deg, rgba(255,92,224,0.22) 0%, rgba(123,58,237,0.18) 60%, rgba(15,12,41,0) 100%)",
  design:
    "linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(255,92,224,0.18) 60%, rgba(15,12,41,0) 100%)",
  optimierung:
    "linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(255,92,224,0.18) 60%, rgba(15,12,41,0) 100%)",
  hosting:
    "linear-gradient(135deg, rgba(45,212,191,0.18) 0%, rgba(255,92,224,0.18) 60%, rgba(15,12,41,0) 100%)",
  kontrolle:
    "linear-gradient(135deg, rgba(255,92,224,0.22) 0%, rgba(99,102,241,0.18) 60%, rgba(15,12,41,0) 100%)",
};

const FALLBACK_ACCENT =
  "linear-gradient(135deg, rgba(255,92,224,0.18) 0%, rgba(123,58,237,0.14) 60%, rgba(15,12,41,0) 100%)";

interface ServiceRow {
  id: number;
  position: number;
  number: string;
  title: string;
  description: string;
  icon_name: string;
  graphic_type: string;
}

function rowToService(row: ServiceRow): Service {
  const GraphicComponent = GRAPHICS[row.graphic_type] ?? GraphicEntwicklung;
  return {
    number: row.number,
    title: row.title,
    description: row.description,
    icon: resolveIcon(row.icon_name),
    accent: ACCENTS[row.graphic_type] ?? FALLBACK_ACCENT,
    graphic: <GraphicComponent />,
  };
}

interface CardProps {
  service: Service;
  index: number;
  inView: boolean;
}

function ServiceCard({ service, index, inView }: CardProps) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease, delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative h-[440px] sm:h-[460px] w-full flex flex-col rounded-3xl p-7 sm:p-8 border border-white/15 bg-black/45 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-[#ff5ce0]/40 hover:shadow-[0_0_40px_rgba(255,92,224,0.18)]"
    >
      {/* Subtle pink/lila gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundImage: service.accent }}
      />

      {/* Pink glow blob top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 -right-1/4 h-3/4 w-3/4 rounded-full opacity-40 group-hover:opacity-60 blur-3xl transition-opacity duration-500"
        style={{ background: "rgba(255,92,224,0.25)" }}
      />

      {/* Top: Number + Icon — feste Höhe für gleiche Icon-Position über alle Cards */}
      <div className="relative z-10 flex items-start justify-between h-14 shrink-0">
        <span
          className="text-sm font-mono text-white/60 tracking-wider"
          style={{ textShadow: bodyShadow }}
        >
          ( {service.number} )
        </span>
        <div className="text-[#ff5ce0] p-3 rounded-xl bg-white/10 group-hover:bg-[#ff5ce0]/20 transition-colors duration-300">
          <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
      </div>

      {/* Middle: Grafik — feste Höhe, vertikal zentriert */}
      <div className="relative z-10 flex items-center justify-center px-2 h-[150px] sm:h-[160px] shrink-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        {service.graphic}
      </div>

      {/* Title — feste Höhe, unten ausgerichtet → alle Überschriften enden auf gleicher Y-Linie */}
      <h4
        className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide uppercase h-[4.5rem] sm:h-[5rem] flex items-end shrink-0"
        style={{ textShadow: headingShadow }}
      >
        {service.title}
      </h4>

      {/* Description — startet direkt unter der Title-Linie, gleicher Abstand bei allen Cards */}
      <p
        className="relative z-10 text-sm sm:text-base text-white/80 leading-relaxed mt-3 shrink-0"
        style={{ textShadow: bodyShadow }}
      >
        {service.description}
      </p>
    </motion.div>
  );
}

export default function Feature() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [services, setServices] = React.useState<Service[] | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    supabase
      .from("services")
      .select("*")
      .order("position", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Leistungen konnten nicht geladen werden:", error);
          setServices([]);
          return;
        }
        setServices((data as ServiceRow[]).map(rowToService));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    duration: 32,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Wenn die Services geladen sind, muss Embla die neuen Slides erkennen.
  React.useEffect(() => {
    if (!emblaApi || !services) return;
    emblaApi.reInit();
    setSnapCount(emblaApi.scrollSnapList().length);
  }, [emblaApi, services]);

  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi]
  );
  const scrollTo = React.useCallback(
    (idx: number) => emblaApi?.scrollTo(idx),
    [emblaApi]
  );

  return (
    <div ref={ref} className="relative py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="relative mx-auto max-w-7xl w-full px-6 sm:px-8 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          <h3
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wide"
            style={{ textShadow: headingShadow }}
          >
            <Balancer>Unsere Leistungen</Balancer>
          </h3>
          <h4
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/85 tracking-wide"
            style={{ textShadow: bodyShadow }}
          >
            <Balancer>
              Alles aus einer Hand – von der Idee bis zum fertigen Projekt
            </Balancer>
          </h4>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={emblaRef}
            className="overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Unsere Leistungen"
          >
            <div className="flex -ml-4 sm:-ml-5 md:-ml-6">
              {services === null
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:pl-5 md:pl-6 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="h-[440px] sm:h-[460px] rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-7 sm:p-8 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div className="h-4 w-12 rounded bg-white/10 animate-pulse" />
                          <div className="h-12 w-12 rounded-xl bg-white/10 animate-pulse" />
                        </div>
                        <div className="space-y-3">
                          <div className="h-7 w-2/3 rounded bg-white/10 animate-pulse" />
                          <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
                          <div className="h-4 w-5/6 rounded bg-white/5 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))
                : services.map((service, index) => (
                    <div
                      key={service.number}
                      role="group"
                      aria-roledescription="slide"
                      className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:pl-5 md:pl-6 md:basis-1/2 lg:basis-1/3"
                    >
                      <ServiceCard
                        service={service}
                        index={index}
                        inView={isInView}
                      />
                    </div>
                  ))}
            </div>
          </div>

          {/* Controls + Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
            className="mt-8 sm:mt-10 flex items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Vorherige Leistung"
              className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: snapCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Zu Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === selectedIndex
                      ? "bg-[#ff5ce0] w-8"
                      : "bg-white/25 hover:bg-white/45 w-1.5"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Nächste Leistung"
              className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
