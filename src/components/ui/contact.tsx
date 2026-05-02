"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MessageSquare, User, ArrowRight, Send, Phone, Clock } from "lucide-react";
import { useCookieConsent, setCookieConsent } from "./cookie-consent";

const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const consent = useCookieConsent();
  const consentRejected = consent === "rejected";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (consentRejected) return;
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY!);
    formData.append("subject", "Neue Anfrage über webtimez.com");
    formData.append("from_name", "Webtimez Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-center text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5ce0]/10 border border-[#ff5ce0]/30 mb-5 sm:mb-6">
            <ArrowRight className="h-4 w-4 text-[#ff5ce0]" />
            <span
              className="text-sm font-medium text-white/85 tracking-wide"
              style={{ textShadow: bodyShadow }}
            >
              Kontakt
            </span>
          </span>

          <h3
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wide mb-3 sm:mb-4"
            style={{ textShadow: headingShadow }}
          >
            Lass uns reden.
          </h3>

          <p
            className="text-base sm:text-lg md:text-xl font-light text-white/85 tracking-wide max-w-2xl"
            style={{ textShadow: bodyShadow }}
          >
            Oder schreib uns direkt an{" "}
            <a
              href="mailto:team@webtimez.com"
              className="text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors"
            >
              team@webtimez.com
            </a>
          </p>

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <a
              href="tel:+4915259529994"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-white/85 hover:text-[#ff5ce0] tracking-wide transition-colors"
              style={{ textShadow: bodyShadow }}
            >
              <Phone className="h-4 w-4 text-[#ff5ce0]" />
              +49 152 59529994
            </a>
            <span
              className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/40"
              aria-hidden
            />
            <span
              className="inline-flex items-center gap-2 text-sm sm:text-base text-white/85 tracking-wide"
              style={{ textShadow: bodyShadow }}
            >
              <Clock className="h-4 w-4 text-[#ff5ce0]" />
              Mo–Sa, 9–20 Uhr
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mx-auto w-full max-w-2xl flex flex-col gap-5 sm:gap-6 rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-10"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm sm:text-base font-medium text-white/90 mb-2 tracking-wide"
              style={{ textShadow: bodyShadow }}
            >
              Voller Name
            </label>
            <div className="flex items-center h-12 sm:h-14 px-4 rounded-full border border-white/15 bg-black/30 focus-within:border-[#ff5ce0]/50 focus-within:ring-2 focus-within:ring-[#ff5ce0]/30 transition-all">
              <User className="h-5 w-5 text-white/50 flex-shrink-0" />
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Dein Name"
                className="h-full px-3 w-full outline-none bg-transparent text-white placeholder-white/40 text-base sm:text-lg"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-white/90 mb-2 tracking-wide"
              style={{ textShadow: bodyShadow }}
            >
              E-Mail-Adresse
            </label>
            <div className="flex items-center h-12 sm:h-14 px-4 rounded-full border border-white/15 bg-black/30 focus-within:border-[#ff5ce0]/50 focus-within:ring-2 focus-within:ring-[#ff5ce0]/30 transition-all">
              <Mail className="h-5 w-5 text-white/50 flex-shrink-0" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="dein@email.de"
                className="h-full px-3 w-full outline-none bg-transparent text-white placeholder-white/40 text-base sm:text-lg"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm sm:text-base font-medium text-white/90 mb-2 tracking-wide"
              style={{ textShadow: bodyShadow }}
            >
              Nachricht
            </label>
            <div className="flex items-start gap-3 px-4 py-3 rounded-2xl border border-white/15 bg-black/30 focus-within:border-[#ff5ce0]/50 focus-within:ring-2 focus-within:ring-[#ff5ce0]/30 transition-all">
              <MessageSquare className="h-5 w-5 text-white/50 flex-shrink-0 mt-2" />
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Erzähl uns von deinem Projekt …"
                className="w-full bg-transparent outline-none resize-none text-white placeholder-white/40 text-base sm:text-lg leading-relaxed"
              />
            </div>
          </div>

          {/* Honeypot — versteckt für Bots, unsichtbar für Menschen */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Cookie-Hinweis bei Ablehnung */}
          {consentRejected && (
            <div className="mt-2 rounded-2xl border border-[#ff5ce0]/30 bg-[#ff5ce0]/5 px-5 py-4">
              <p
                className="text-sm sm:text-base font-light text-white/85 tracking-wide leading-relaxed"
                style={{ textShadow: bodyShadow }}
              >
                Du hast die Datenverarbeitung abgelehnt. Um eine Nachricht zu
                senden, akzeptiere bitte die Cookies.
              </p>
              <button
                type="button"
                onClick={() => setCookieConsent(null)}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors"
              >
                Cookie-Einstellungen öffnen
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending" || consentRejected}
            className="group mt-2 inline-flex items-center justify-center gap-2 h-12 sm:h-14 w-full px-8 rounded-full bg-[#ff5ce0] hover:bg-[#ff5ce0]/90 text-black font-semibold text-base sm:text-lg tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,92,224,0.5)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
            <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Status-Meldungen */}
          {status === "success" && (
            <p className="text-center text-[#ff5ce0] font-medium">
              Vielen Dank! Wir melden uns bald.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-red-400 font-medium">
              Etwas ist schiefgegangen — bitte direkt per Mail an{" "}
              <a
                href="mailto:team@webtimez.com"
                className="underline underline-offset-4"
              >
                team@webtimez.com
              </a>
              .
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}
