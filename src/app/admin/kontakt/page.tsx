"use client";

import { SettingsEditor } from "@/components/admin/SettingsEditor";
import {
  AdminLabel,
  inputClass,
} from "@/components/admin/AdminUI";
import type { ContactSettings } from "@/lib/supabase/settings";

const FALLBACK: ContactSettings = {
  heading: "Lass uns reden.",
  tagline: "Oder schreib uns direkt an",
  email: "team@webtimez.com",
  phone_display: "+49 152 59529994",
  phone_link: "+4915259529994",
  hours: "Mo–Sa, 9–20 Uhr",
};

export default function KontaktAdminPage() {
  return (
    <SettingsEditor<ContactSettings>
      settingKey="contact"
      title="Kontakt"
      description="Überschrift, E-Mail, Telefon und Öffnungszeiten der Kontakt-Sektion."
      initialFallback={FALLBACK}
      renderForm={(d, onChange) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminLabel label="Überschrift">
            <input
              type="text"
              value={d.heading}
              onChange={(e) => onChange({ ...d, heading: e.target.value })}
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Tagline (über E-Mail-Link)">
            <input
              type="text"
              value={d.tagline}
              onChange={(e) => onChange({ ...d, tagline: e.target.value })}
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="E-Mail">
            <input
              type="email"
              value={d.email}
              onChange={(e) => onChange({ ...d, email: e.target.value })}
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Öffnungszeiten">
            <input
              type="text"
              value={d.hours}
              onChange={(e) => onChange({ ...d, hours: e.target.value })}
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Telefon — Anzeige (mit Leerzeichen)">
            <input
              type="text"
              value={d.phone_display}
              onChange={(e) =>
                onChange({ ...d, phone_display: e.target.value })
              }
              placeholder="+49 152 59529994"
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Telefon — tel-Link (ohne Leerzeichen)">
            <input
              type="text"
              value={d.phone_link}
              onChange={(e) =>
                onChange({ ...d, phone_link: e.target.value })
              }
              placeholder="+4915259529994"
              className={inputClass}
            />
          </AdminLabel>
        </div>
      )}
    />
  );
}
