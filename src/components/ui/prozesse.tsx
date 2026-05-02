"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  PenTool,
  Code2,
  Rocket,
  Sparkles,
  Flag,
} from "lucide-react";

const cn = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ");

const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

interface Step {
  id: string;
  number: string;
  icon: React.ElementType;
  heading: string;
  description: string;
  details: string[];
  badge?: { label: string; icon: React.ElementType };
}

const steps: Step[] = [
  {
    id: "beratung",
    number: "01",
    icon: MessageSquare,
    heading: "Kostenlose Erstberatung",
    description:
      "Wir lernen euch und euer Projekt kennen. Gemeinsam definieren wir Ziele, Zielgruppe und den Umfang eurer Website.",
    details: [
      "Analyse eurer Anforderungen",
      "Zielgruppen-Definition",
      "Projektumfang & Zeitplan",
      "Transparentes Angebot",
    ],
    badge: { label: "Start", icon: Sparkles },
  },
  {
    id: "design",
    number: "02",
    icon: PenTool,
    heading: "Individuelles Design",
    description:
      "Basierend auf eurer Markenidentität gestalten wir ein einzigartiges Design, das eure Vision zum Leben erweckt.",
    details: [
      "Erste Skizzen & Vorschauen",
      "Design passend zu eurer Marke",
      "Sieht auf Handy & PC gut aus",
      "Ihr gebt Feedback, wir passen an",
    ],
  },
  {
    id: "entwicklung",
    number: "03",
    icon: Code2,
    heading: "Technische Umsetzung",
    description:
      "Wir setzen euer Design mit modernsten Technologien um – performant, sicher und skalierbar.",
    details: [
      "Programmierung mit modernen Tools",
      "Wird bei Google gefunden",
      "Schnelle Ladezeiten",
      "Inhalte selbst pflegbar",
    ],
  },
  {
    id: "launch",
    number: "04",
    icon: Rocket,
    heading: "Go Live & Support",
    description:
      "Wir bringen eure Website live und stehen euch auch danach mit Wartung und Support zur Seite.",
    details: [
      "Alles ausführlich getestet",
      "Domain & Hosting eingerichtet",
      "Wir begleiten den Start",
      "Laufende Pflege & Updates",
    ],
    badge: { label: "Live", icon: Flag },
  },
];

function StepCard({ step }: { step: Step }) {
  const StepIcon = step.icon;
  return (
    <div className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-5 sm:p-6 md:p-7 transition-all duration-300 hover:bg-black/60 hover:border-[#ff5ce0]/40 hover:shadow-[0_0_40px_rgba(255,92,224,0.18)]">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <div className="text-[#ff5ce0] p-2 rounded-lg bg-white/10">
          <StepIcon className="h-6 w-6" />
        </div>
        <span
          className="text-sm sm:text-base font-medium text-white/70 tracking-wider uppercase"
          style={{ textShadow: bodyShadow }}
        >
          Schritt {step.number}
        </span>
      </div>

      <h3
        className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-2"
        style={{ textShadow: headingShadow }}
      >
        {step.heading}
      </h3>
      <p
        className="text-base sm:text-lg text-white/75 leading-relaxed mb-4 sm:mb-5"
        style={{ textShadow: bodyShadow }}
      >
        {step.description}
      </p>

      <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-4 gap-y-2">
        {step.details.map((detail, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-base text-white/80 tracking-wide"
            style={{ textShadow: bodyShadow }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5ce0] flex-shrink-0" />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepRow({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 items-center min-h-[200px]"
    >
      {/* Number-Dot auf der Mittel-Linie */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.5, ease, delay: 0.15 }}
        className="absolute z-20 left-6 -translate-x-1/2 top-6 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
      >
        {step.badge && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={
              inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }
            }
            transition={{ duration: 0.5, ease, delay: 0.45 }}
            className="absolute left-1/2 -translate-x-1/2 -top-7 sm:-top-8 inline-flex items-center gap-1.5 rounded-full bg-[#ff5ce0] text-black text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-1 whitespace-nowrap"
            style={{
              boxShadow: "0 0 20px rgba(255,92,224,0.4)",
            }}
          >
            <step.badge.icon className="h-3 w-3" />
            {step.badge.label}
          </motion.div>
        )}

        <div
          className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-[#ff5ce0]/60 bg-black/80 backdrop-blur-md flex items-center justify-center text-white font-bold text-base sm:text-lg"
          style={{
            boxShadow:
              "0 0 20px rgba(255,92,224,0.45), 0 0 40px rgba(255,92,224,0.18)",
            textShadow: bodyShadow,
          }}
        >
          {step.number}
        </div>
      </motion.div>

      {/* Karten-Spalte */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -80 : 80, y: 20 }}
        animate={
          inView
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: isLeft ? -80 : 80, y: 20 }
        }
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        className={cn(
          "pl-16 md:pl-0",
          isLeft ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10"
        )}
      >
        <StepCard step={step} />
      </motion.div>
    </div>
  );
}

export default function Prozesse() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 sm:px-8 md:px-12">
      {/* Vertikale Mittel-Linie */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 w-px left-6 md:left-1/2 md:-translate-x-1/2"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,92,224,0) 0%, rgba(255,92,224,0.6) 4%, rgba(255,255,255,0.18) 18%, rgba(255,255,255,0.18) 82%, rgba(255,92,224,0.6) 96%, rgba(255,92,224,0) 100%)",
        }}
      />

      <div className="relative space-y-16 sm:space-y-20 md:space-y-28">
        {steps.map((step, i) => (
          <StepRow key={step.id} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}
