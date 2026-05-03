"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSetting, type CookieSettings } from "@/lib/supabase/settings";

const STORAGE_KEY = "webtimez_cookie_consent";
const CONSENT_EVENT = "webtimez:consent-change";
const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

const FALLBACK_COOKIES: CookieSettings = {
  heading: "Datenschutzeinstellungen",
  body: "Wir verwenden Cookies und vergleichbare Technologien (z. B. localStorage) auf dieser Website. Einige sind technisch notwendig, damit die Seite funktioniert und deine Anfragen über das Kontaktformular verarbeitet werden können. Andere sind optional und helfen uns dabei, dein Nutzererlebnis zu verbessern oder die Reichweite zu messen. Optionale Cookies setzen wir nur mit deiner Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG. Personenbezogene Daten (z. B. IP-Adresse) können dabei verarbeitet werden.",
  footnote: "Mehr Infos in der",
  accept_label: "Alle akzeptieren",
  reject_label: "Alle ablehnen",
};

export type CookieConsentValue = "accepted" | "rejected" | null;

function readConsent(): CookieConsentValue {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return null;
}

export function setCookieConsent(value: CookieConsentValue) {
  if (typeof window === "undefined") return;
  if (value === null) window.localStorage.removeItem(STORAGE_KEY);
  else window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function useCookieConsent(): CookieConsentValue {
  const [consent, setConsent] = useState<CookieConsentValue>(null);

  useEffect(() => {
    setConsent(readConsent());
    const handler = () => setConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  return consent;
}

export default function CookieConsent() {
  const consent = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const settingsFromDb = useSetting<CookieSettings>("cookies");
  const settings = settingsFromDb ?? FALLBACK_COOKIES;

  // Banner darf den LCP nicht blockieren: erst nach First Paint mounten.
  // requestIdleCallback wartet bis der Browser idle ist, Fallback auf 800ms.
  useEffect(() => {
    type Idle = (cb: () => void, opts?: { timeout: number }) => number;
    const ric = (window as unknown as { requestIdleCallback?: Idle })
      .requestIdleCallback;
    if (typeof ric === "function") {
      ric(() => setMounted(true), { timeout: 1500 });
    } else {
      const t = setTimeout(() => setMounted(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const isOpen = mounted && consent === null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop — dimmt die Seite und blockt Klicks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden
          />

          {/* Banner — zentriert */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-consent-heading"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-black/85 backdrop-blur-xl p-5 sm:p-6 md:p-8 shadow-[0_8px_60px_rgba(0,0,0,0.7)]"
          >
            <h4
              id="cookie-consent-heading"
              className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-wide mb-2 sm:mb-3"
              style={{ textShadow: headingShadow }}
            >
              {settings.heading}
            </h4>
            <p
              className="text-sm sm:text-base font-light text-white/80 tracking-wide leading-relaxed whitespace-pre-line"
              style={{ textShadow: bodyShadow }}
            >
              {settings.body}
            </p>
            <p
              className="mt-3 text-sm sm:text-base font-light text-white/70 tracking-wide leading-relaxed"
              style={{ textShadow: bodyShadow }}
            >
              Du kannst deine Einwilligung jederzeit mit Wirkung für die
              Zukunft über den Link „Cookies" im Footer widerrufen oder
              anpassen. {settings.footnote}{" "}
              <a
                href="/datenschutz"
                className="text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors"
              >
                Datenschutzerklärung
              </a>{" "}
              und im{" "}
              <a
                href="/impressum"
                className="text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors"
              >
                Impressum
              </a>
              .
            </p>

            <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setCookieConsent("rejected")}
                className="h-11 sm:h-12 px-5 rounded-full border border-white/25 bg-white/10 hover:bg-white/15 hover:border-white/45 text-white font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer"
                style={{ textShadow: bodyShadow }}
              >
                {settings.reject_label}
              </button>
              <button
                onClick={() => setCookieConsent("accepted")}
                className="h-11 sm:h-12 px-5 rounded-full bg-[#ff5ce0] hover:bg-[#ff5ce0]/90 text-black font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,92,224,0.5)] cursor-pointer"
              >
                {settings.accept_label}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
