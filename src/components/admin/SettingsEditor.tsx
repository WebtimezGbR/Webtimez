"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import {
  fetchSetting,
  saveSetting,
  type SettingKey,
} from "@/lib/supabase/settings";
import {
  AdminCard,
  AdminHeader,
  AdminToast,
} from "@/components/admin/AdminUI";

interface SettingsEditorProps<T> {
  settingKey: SettingKey;
  title: string;
  description: string;
  initialFallback: T;
  renderForm: (
    value: T,
    onChange: (next: T) => void
  ) => React.ReactNode;
}

export function SettingsEditor<T>({
  settingKey,
  title,
  description,
  initialFallback,
  renderForm,
}: SettingsEditorProps<T>) {
  const [draft, setDraft] = useState<T | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);

  function flash(kind: "success" | "error", text: string) {
    setToast({ kind, text });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    let cancelled = false;
    fetchSetting<T>(settingKey).then((value) => {
      if (cancelled) return;
      setDraft(value ?? initialFallback);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingKey]);

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    const error = await saveSetting<T>(settingKey, draft);
    setSaving(false);
    if (error) {
      flash("error", error.message);
      return;
    }
    flash("success", "Gespeichert. Änderung ist live.");
  }

  return (
    <div className="space-y-4">
      <AdminHeader
        title={title}
        description={description}
        showAdd={false}
      />

      <AdminCard>
        {draft === null ? (
          <p className="text-white/60 text-sm">Wird geladen…</p>
        ) : (
          <>
            {renderForm(draft, setDraft)}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#ff5ce0] hover:bg-[#ff5ce0]/90 text-black font-semibold text-sm transition-all hover:shadow-[0_0_30px_rgba(255,92,224,0.5)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Speichern
              </button>
            </div>
          </>
        )}
      </AdminCard>

      <AdminToast message={toast} />
    </div>
  );
}
