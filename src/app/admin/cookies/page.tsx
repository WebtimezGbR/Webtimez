"use client";

import { SettingsEditor } from "@/components/admin/SettingsEditor";
import {
  AdminLabel,
  inputClass,
  textareaClass,
} from "@/components/admin/AdminUI";
import type { CookieSettings } from "@/lib/supabase/settings";

const FALLBACK: CookieSettings = {
  heading: "Datenschutzeinstellungen",
  body: "",
  footnote: "Mehr Infos in der",
  accept_label: "Alle akzeptieren",
  reject_label: "Alle ablehnen",
};

export default function CookiesAdminPage() {
  return (
    <SettingsEditor<CookieSettings>
      settingKey="cookies"
      title="Cookie-Banner"
      description="Text und Buttons des Cookie-Banners (DSGVO-/TTDSG-konform)."
      initialFallback={FALLBACK}
      renderForm={(d, onChange) => (
        <div className="grid grid-cols-1 gap-4">
          <AdminLabel label="Überschrift">
            <input
              type="text"
              value={d.heading}
              onChange={(e) => onChange({ ...d, heading: e.target.value })}
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Body-Text">
            <textarea
              rows={8}
              value={d.body}
              onChange={(e) => onChange({ ...d, body: e.target.value })}
              className={textareaClass}
            />
          </AdminLabel>
          <AdminLabel label="Footnote (vor den Datenschutz-/Impressum-Links)">
            <input
              type="text"
              value={d.footnote}
              onChange={(e) => onChange({ ...d, footnote: e.target.value })}
              placeholder="Mehr Infos in der"
              className={inputClass}
            />
          </AdminLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminLabel label="Button-Text Akzeptieren">
              <input
                type="text"
                value={d.accept_label}
                onChange={(e) =>
                  onChange({ ...d, accept_label: e.target.value })
                }
                className={inputClass}
              />
            </AdminLabel>
            <AdminLabel label="Button-Text Ablehnen">
              <input
                type="text"
                value={d.reject_label}
                onChange={(e) =>
                  onChange({ ...d, reject_label: e.target.value })
                }
                className={inputClass}
              />
            </AdminLabel>
          </div>
        </div>
      )}
    />
  );
}
