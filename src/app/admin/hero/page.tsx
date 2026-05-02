"use client";

import { Plus, Trash2 } from "lucide-react";
import { SettingsEditor } from "@/components/admin/SettingsEditor";
import {
  AdminLabel,
  inputClass,
  textareaClass,
} from "@/components/admin/AdminUI";
import type { HeroSettings } from "@/lib/supabase/settings";

const FALLBACK: HeroSettings = {
  tagline:
    "Von Design bis Umsetzung – wir kümmern uns um alles, was ihr für eine professionelle Website braucht.",
  animated_words: ["Entwicklung", "Design", "Optimierung", "Hosting", "Kontrolle"],
  button_primary_label: "Kostenlose Beratung",
  button_primary_href: "#contact",
  button_secondary_label: "Leistungen",
  button_secondary_href: "#services",
};

export default function HeroAdminPage() {
  return (
    <SettingsEditor<HeroSettings>
      settingKey="hero"
      title="Hero (Startseite)"
      description="Der oberste Bereich der Website mit Tagline, animierten Wörtern und den beiden Buttons."
      initialFallback={FALLBACK}
      renderForm={(d, onChange) => (
        <>
          <AdminLabel label="Tagline (Untertitel)">
            <textarea
              rows={3}
              value={d.tagline}
              onChange={(e) => onChange({ ...d, tagline: e.target.value })}
              className={textareaClass}
            />
          </AdminLabel>

          <div className="mt-4">
            <AdminLabel label="Animierte Wörter (zyklisch)">
              <div className="space-y-2">
                {d.animated_words.map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={w}
                      onChange={(e) => {
                        const next = [...d.animated_words];
                        next[i] = e.target.value;
                        onChange({ ...d, animated_words: next });
                      }}
                      placeholder={`Wort ${i + 1}`}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...d,
                          animated_words: d.animated_words.filter(
                            (_, j) => j !== i
                          ),
                        })
                      }
                      aria-label="Wort entfernen"
                      className="flex-shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-xl border border-red-500/30 bg-red-500/5 text-red-300 hover:bg-red-500/15 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...d,
                      animated_words: [...d.animated_words, ""],
                    })
                  }
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-white/15 bg-black/30 text-white/85 text-sm hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Wort hinzufügen
                </button>
              </div>
            </AdminLabel>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminLabel label="Button 1 — Text (links, transparent)">
              <input
                type="text"
                value={d.button_secondary_label}
                onChange={(e) =>
                  onChange({ ...d, button_secondary_label: e.target.value })
                }
                className={inputClass}
              />
            </AdminLabel>
            <AdminLabel label="Button 1 — Link / Anker">
              <input
                type="text"
                value={d.button_secondary_href}
                onChange={(e) =>
                  onChange({ ...d, button_secondary_href: e.target.value })
                }
                placeholder="#services"
                className={inputClass}
              />
            </AdminLabel>
            <AdminLabel label="Button 2 — Text (rechts, weiß)">
              <input
                type="text"
                value={d.button_primary_label}
                onChange={(e) =>
                  onChange({ ...d, button_primary_label: e.target.value })
                }
                className={inputClass}
              />
            </AdminLabel>
            <AdminLabel label="Button 2 — Link / Anker">
              <input
                type="text"
                value={d.button_primary_href}
                onChange={(e) =>
                  onChange({ ...d, button_primary_href: e.target.value })
                }
                placeholder="#contact"
                className={inputClass}
              />
            </AdminLabel>
          </div>
        </>
      )}
    />
  );
}
