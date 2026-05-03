"use client";

import { SettingsEditor } from "@/components/admin/SettingsEditor";
import { AdminLabel, inputClass, textareaClass } from "@/components/admin/AdminUI";
import type { SectionIntrosSettings, SectionIntro } from "@/lib/supabase/settings";

export const FALLBACK_SECTION_INTROS: SectionIntrosSettings = {
  team: {
    eyebrow: "U N S E R",
    heading: "Team",
    subheading:
      "Drei Gründer, eine Vision — wir bringen eure Website von der ersten Idee bis zum Live-Gang.",
  },
  portfolio: {
    eyebrow: "",
    heading: "Portfolio",
    subheading: "Eine Auswahl unserer aktuellen Projekte",
  },
  pricing: {
    eyebrow: "Flexibel & transparent",
    heading: "Das passende Paket für dich",
    subheading:
      "Alle Preise sind Startpreise (Einmalzahlung) — der finale Preis richtet sich nach euren konkreten Anforderungen.",
  },
  leistungen: {
    eyebrow: "",
    heading: "Unsere Leistungen",
    subheading: "Alles aus einer Hand – von der Idee bis zum fertigen Projekt",
  },
  prozess: {
    eyebrow: "",
    heading: "Unser Prozess",
    subheading: "In vier Schritten zu eurer Website",
  },
};

const SECTIONS: { key: keyof SectionIntrosSettings; label: string; eyebrowHint?: string }[] =
  [
    { key: "leistungen", label: "Leistungen", eyebrowHint: "Optional – meist leer" },
    { key: "prozess", label: "Prozess", eyebrowHint: "Optional – meist leer" },
    { key: "portfolio", label: "Portfolio", eyebrowHint: "Optional – meist leer" },
    { key: "team", label: "Team", eyebrowHint: 'z. B. "U N S E R"' },
    { key: "pricing", label: "Pricing", eyebrowHint: 'z. B. "Flexibel & transparent"' },
  ];

function IntroBlock({
  label,
  eyebrowHint,
  value,
  onChange,
}: {
  label: string;
  eyebrowHint?: string;
  value: SectionIntro;
  onChange: (next: SectionIntro) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-[#ff5ce0] tracking-wide uppercase mb-4">
        {label}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdminLabel label={`Eyebrow (kleine Schrift über Heading)${eyebrowHint ? ` – ${eyebrowHint}` : ""}`}>
          <input
            type="text"
            value={value.eyebrow}
            onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
            placeholder="(leer lassen, wenn nicht gewünscht)"
            className={inputClass}
          />
        </AdminLabel>
        <AdminLabel label="Heading (große Überschrift)">
          <input
            type="text"
            value={value.heading}
            onChange={(e) => onChange({ ...value, heading: e.target.value })}
            placeholder="z. B. Portfolio"
            className={inputClass}
          />
        </AdminLabel>
        <div className="sm:col-span-2">
          <AdminLabel label="Subheading (Untertitel)">
            <textarea
              rows={2}
              value={value.subheading}
              onChange={(e) =>
                onChange({ ...value, subheading: e.target.value })
              }
              placeholder="Kurzer Beschreibungstext"
              className={textareaClass}
            />
          </AdminLabel>
        </div>
      </div>
    </div>
  );
}

export default function SektionenAdminPage() {
  return (
    <SettingsEditor<SectionIntrosSettings>
      settingKey="section_intros"
      title="Sektions-Texte"
      description="Eyebrow, Überschrift und Untertitel für alle Hauptsektionen der Startseite."
      initialFallback={FALLBACK_SECTION_INTROS}
      renderForm={(value, onChange) => (
        <div className="space-y-4">
          {SECTIONS.map((s) => (
            <IntroBlock
              key={s.key}
              label={s.label}
              eyebrowHint={s.eyebrowHint}
              value={value[s.key]}
              onChange={(next) =>
                onChange({ ...value, [s.key]: next })
              }
            />
          ))}
        </div>
      )}
    />
  );
}
