"use client";

import { SettingsEditor } from "@/components/admin/SettingsEditor";
import {
  AdminLabel,
  inputClass,
  textareaClass,
} from "@/components/admin/AdminUI";
import type { ImpressumSettings } from "@/lib/supabase/settings";

const FALLBACK: ImpressumSettings = {
  company: "Webtimez GbR",
  owners: "Julius Sturm\nSimon Engel",
  address: "Johann-Reintgen-Straße 19\n50999 Köln\nDeutschland",
  phone_display: "+49 152 59529994",
  phone_link: "+4915259529994",
  email: "team@webtimez.com",
  ust_id: "",
  press_responsible_name: "Julius Sturm",
  press_responsible_address: "Johann-Reintgen-Straße 19\n50999 Köln",
};

export default function ImpressumAdminPage() {
  return (
    <SettingsEditor<ImpressumSettings>
      settingKey="impressum"
      title="Impressum"
      description="Pflichtangaben gemäß § 5 TMG. Mehrzeilige Felder mit Zeilenumbruch werden auf der Seite untereinander angezeigt."
      initialFallback={FALLBACK}
      renderForm={(d, onChange) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminLabel label="Firmenname">
            <input
              type="text"
              value={d.company}
              onChange={(e) => onChange({ ...d, company: e.target.value })}
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="USt-ID">
            <input
              type="text"
              value={d.ust_id}
              onChange={(e) => onChange({ ...d, ust_id: e.target.value })}
              placeholder="z. B. DE123456789"
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Inhaber (eine Zeile pro Person)">
            <textarea
              rows={3}
              value={d.owners}
              onChange={(e) => onChange({ ...d, owners: e.target.value })}
              className={textareaClass}
            />
          </AdminLabel>
          <AdminLabel label="Adresse (Straße / PLZ Ort / Land — pro Zeile)">
            <textarea
              rows={3}
              value={d.address}
              onChange={(e) => onChange({ ...d, address: e.target.value })}
              className={textareaClass}
            />
          </AdminLabel>
          <AdminLabel label="Telefon — Anzeige">
            <input
              type="text"
              value={d.phone_display}
              onChange={(e) =>
                onChange({ ...d, phone_display: e.target.value })
              }
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Telefon — tel-Link">
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
          <div className="sm:col-span-2">
            <AdminLabel label="E-Mail">
              <input
                type="email"
                value={d.email}
                onChange={(e) => onChange({ ...d, email: e.target.value })}
                className={inputClass}
              />
            </AdminLabel>
          </div>
          <AdminLabel label="Verantwortlich i.S.d. § 18 Abs. 2 MStV — Name">
            <input
              type="text"
              value={d.press_responsible_name}
              onChange={(e) =>
                onChange({ ...d, press_responsible_name: e.target.value })
              }
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Verantwortlich — Adresse (mehrzeilig)">
            <textarea
              rows={3}
              value={d.press_responsible_address}
              onChange={(e) =>
                onChange({ ...d, press_responsible_address: e.target.value })
              }
              className={textareaClass}
            />
          </AdminLabel>
        </div>
      )}
    />
  );
}
