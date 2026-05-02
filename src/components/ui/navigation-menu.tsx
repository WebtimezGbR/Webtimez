"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Leistungen", href: "#services" },
  { name: "Prozess", href: "#process" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Team", href: "#team" },
  { name: "Pricing", href: "#pricing" },
  { name: "Kontakt", href: "#contact" },
];

const COLLAPSE_AT = 220;
const EXPAND_AT = 60;
const ease = [0.22, 1, 0.36, 1] as const;

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > COLLAPSE_AT) {
      if (isExpanded) setExpanded(false);
    } else if (latest < EXPAND_AT) {
      if (!isExpanded) setExpanded(true);
    }
  });

  return (
    <AnimatePresence initial={false} mode="wait">
      {isExpanded ? (
        <motion.div
          key="expanded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          style={{
            left: "50%",
            translate: "-50% 0",
            maxWidth: "calc(100vw - 1rem)",
          }}
          className="fixed top-4 sm:top-6 z-50"
        >
          <motion.nav
            initial={{ y: -16, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -16, scale: 0.96 }}
            transition={{ duration: 0.28, ease }}
            className="flex items-center justify-center rounded-full border border-white/20 bg-black/35 shadow-lg backdrop-blur-md h-11 sm:h-12 text-white"
          >
            <a
              href="#home"
              className="hidden md:flex flex-shrink-0 items-center font-extrabold text-sm tracking-wide pl-4 pr-2 hover:text-[#ff5ce0] transition-colors"
            >
              WEBTIMEZ
            </a>
            <div className="flex items-center justify-center gap-0.5 sm:gap-2 md:gap-3 px-3 sm:px-4 md:pr-4 md:pl-0">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xs sm:text-sm font-medium text-white/70 hover:text-white transition-colors px-1.5 sm:px-2 py-1 whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.nav>
        </motion.div>
      ) : (
        <motion.button
          key="collapsed"
          onClick={() => setExpanded(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.28, ease }}
          aria-label="Menü öffnen"
          className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 shadow-lg backdrop-blur-md text-white cursor-pointer"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
