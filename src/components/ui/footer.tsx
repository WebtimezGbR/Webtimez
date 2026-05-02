"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import { setCookieConsent } from "./cookie-consent";
import { useSetting, type FooterSettings } from "@/lib/supabase/settings";

const FALLBACK_FOOTER: FooterSettings = {
  tagline:
    "Von Design bis Umsetzung — wir kümmern uns um alles, was ihr für eine professionelle Website braucht.",
  mail: "team@webtimez.com",
  instagram_url: "https://www.instagram.com/webtimez_/",
  copyright_name: "Webtimez",
};

const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

const navLinks = [
  { title: "Leistungen", href: "#services" },
  { title: "Prozess", href: "#process" },
  { title: "Portfolio", href: "#portfolio" },
  { title: "Team", href: "#team" },
  { title: "Pricing", href: "#pricing" },
  { title: "Kontakt", href: "#contact" },
];

const legalLinks: Array<{
  title: string;
  href?: string;
  onClick?: () => void;
}> = [
  { title: "Impressum", href: "/impressum" },
  { title: "Datenschutz", href: "/datenschutz" },
  { title: "Cookies", onClick: () => setCookieConsent(null) },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const settingsFromDb = useSetting<FooterSettings>("footer");
  const settings = settingsFromDb ?? FALLBACK_FOOTER;

  return (
    <footer
      ref={ref}
      className="relative w-full border-t border-white/10 bg-black/50 backdrop-blur-md"
    >
      {/* Pinker Glow-Strich am oberen Rand des Footers */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, rgba(255,92,224,0) 0%, rgba(255,92,224,0.6) 50%, rgba(255,92,224,0) 100%)",
          boxShadow: "0 0 24px rgba(255,92,224,0.35)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease }}
        >
          {/* Logo + Tagline */}
          <div className="flex flex-col items-center text-center">
            <a
              href="#home"
              aria-label="Zurück nach oben"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide hover:text-[#ff5ce0] transition-colors"
              style={{ textShadow: headingShadow, letterSpacing: "0.02em" }}
            >
              WEBTIMEZ
            </a>
            <p
              className="mt-3 text-sm sm:text-base font-light text-white/75 tracking-wide max-w-xl"
              style={{ textShadow: bodyShadow }}
            >
              {settings.tagline}
            </p>
            <a
              href={`mailto:${settings.mail}`}
              className="mt-4 inline-flex items-center gap-2 text-sm sm:text-base text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors"
            >
              <Mail className="h-4 w-4" />
              {settings.mail}
            </a>
          </div>

          {/* Trennlinie */}
          <div
            className="my-8 sm:my-10 h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(255,92,224,0) 0%, rgba(255,92,224,0.4) 50%, rgba(255,92,224,0) 100%)",
            }}
          />

          {/* Navigation */}
          <nav
            aria-label="Footer-Navigation"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:gap-x-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-sm sm:text-base font-medium text-white/80 hover:text-[#ff5ce0] tracking-wide transition-colors"
                style={{ textShadow: bodyShadow }}
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="mt-8 flex flex-wrap justify-center gap-5 sm:gap-6">
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/70 hover:text-[#ff5ce0] hover:border-[#ff5ce0]/50 transition-all"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                />
              </svg>
            </a>
          </div>

          {/* Trennlinie */}
          <div
            className="my-8 h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)",
            }}
          />

          {/* Bottom: Copyright + Legal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <span
              className="text-white/60 tracking-wide text-center sm:text-left"
              style={{ textShadow: bodyShadow }}
            >
              © {new Date().getFullYear()} {settings.copyright_name}. Alle Rechte vorbehalten.
            </span>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {legalLinks.map((link) =>
                link.onClick ? (
                  <button
                    key={link.title}
                    type="button"
                    onClick={link.onClick}
                    className="text-white/60 hover:text-[#ff5ce0] tracking-wide transition-colors cursor-pointer bg-transparent border-0 p-0"
                    style={{ textShadow: bodyShadow }}
                  >
                    {link.title}
                  </button>
                ) : (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-white/60 hover:text-[#ff5ce0] tracking-wide transition-colors"
                    style={{ textShadow: bodyShadow }}
                  >
                    {link.title}
                  </a>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
