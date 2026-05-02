"use client";

import { SettingsEditor } from "@/components/admin/SettingsEditor";
import {
  AdminLabel,
  inputClass,
  textareaClass,
} from "@/components/admin/AdminUI";
import type { FooterSettings } from "@/lib/supabase/settings";

const FALLBACK: FooterSettings = {
  tagline:
    "Von Design bis Umsetzung — wir kümmern uns um alles, was ihr für eine professionelle Website braucht.",
  mail: "team@webtimez.com",
  instagram_url: "https://www.instagram.com/webtimez_/",
  copyright_name: "Webtimez",
};

export default function FooterAdminPage() {
  return (
    <SettingsEditor<FooterSettings>
      settingKey="footer"
      title="Footer"
      description="Tagline, Kontakt-E-Mail, Instagram-Link und Copyright im Seiten-Footer."
      initialFallback={FALLBACK}
      renderForm={(d, onChange) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <AdminLabel label="Tagline">
              <textarea
                rows={3}
                value={d.tagline}
                onChange={(e) => onChange({ ...d, tagline: e.target.value })}
                className={textareaClass}
              />
            </AdminLabel>
          </div>
          <AdminLabel label="E-Mail">
            <input
              type="email"
              value={d.mail}
              onChange={(e) => onChange({ ...d, mail: e.target.value })}
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Instagram-URL">
            <input
              type="url"
              value={d.instagram_url}
              onChange={(e) =>
                onChange({ ...d, instagram_url: e.target.value })
              }
              placeholder="https://www.instagram.com/…"
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Copyright-Name">
            <input
              type="text"
              value={d.copyright_name}
              onChange={(e) =>
                onChange({ ...d, copyright_name: e.target.value })
              }
              placeholder="z. B. Webtimez"
              className={inputClass}
            />
          </AdminLabel>
        </div>
      )}
    />
  );
}
