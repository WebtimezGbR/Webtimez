"use client";

import { useEffect, useState } from "react";
import { Loader2, Upload, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import {
  fetchSetting,
  saveSetting,
  type BrandingSettings,
} from "@/lib/supabase/settings";
import {
  AdminCard,
  AdminHeader,
  AdminLabel,
  AdminToast,
} from "@/components/admin/AdminUI";

const BUCKET = "branding";

export default function BrandingAdminPage() {
  const [current, setCurrent] = useState<BrandingSettings | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);

  function flash(kind: "success" | "error", text: string) {
    setToast({ kind, text });
    setTimeout(() => setToast(null), 3500);
  }

  async function load() {
    const data = await fetchSetting<BrandingSettings>("branding");
    setCurrent(data);
    if (data?.favicon_path) {
      const { data: pub } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(data.favicon_path);
      setPreviewUrl(`${pub.publicUrl}?t=${Date.now()}`);
    } else {
      setPreviewUrl(null);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
    if (!["ico", "png", "svg"].includes(ext)) {
      flash("error", "Nur ICO, PNG oder SVG erlaubt.");
      return;
    }

    setBusy(true);
    const path = `favicon-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || `image/${ext}`,
      });

    if (uploadError) {
      setBusy(false);
      flash("error", `Upload fehlgeschlagen: ${uploadError.message}`);
      return;
    }

    // Alte Datei löschen, falls vorhanden
    if (current?.favicon_path) {
      await supabase.storage.from(BUCKET).remove([current.favicon_path]);
    }

    const saveError = await saveSetting<BrandingSettings>("branding", {
      favicon_path: path,
    });
    setBusy(false);

    if (saveError) {
      flash("error", saveError.message);
      return;
    }
    flash(
      "success",
      "Favicon aktualisiert. Browser cachen Favicons stark — ggf. mit Cmd+Shift+R neu laden."
    );
    e.target.value = "";
    await load();
  }

  async function handleRemove() {
    if (!current?.favicon_path) return;
    if (!confirm("Aktuelles Favicon entfernen? Es wird wieder das Standard-Icon verwendet.")) return;
    setBusy(true);
    await supabase.storage.from(BUCKET).remove([current.favicon_path]);
    const saveError = await saveSetting<BrandingSettings>("branding", {
      favicon_path: "",
    });
    setBusy(false);
    if (saveError) {
      flash("error", saveError.message);
      return;
    }
    flash("success", "Favicon zurückgesetzt.");
    await load();
  }

  return (
    <div className="space-y-4">
      <AdminHeader
        title="Branding"
        description="Logo / Favicon für den Browser-Tab und Lesezeichen verwalten."
        showAdd={false}
      />

      <AdminCard>
        <div className="grid gap-6 sm:grid-cols-[auto,1fr] sm:items-start">
          {/* Vorschau */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-medium text-white/65 tracking-wider uppercase">
              Aktuell
            </span>
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-white/15 bg-black/40 p-4">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Favicon-Vorschau"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-xs text-white/45 text-center">
                  Standard-Icon
                  <br />
                  (Next.js)
                </span>
              )}
            </div>
            {current?.favicon_path && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={busy}
                className="inline-flex items-center gap-1.5 text-xs text-red-300 hover:text-red-200 transition-colors cursor-pointer disabled:opacity-60"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Zurücksetzen
              </button>
            )}
          </div>

          {/* Upload */}
          <div className="space-y-4">
            <AdminLabel label="Neues Favicon hochladen">
              <label className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-dashed border-white/25 bg-black/30 text-white/85 hover:bg-black/45 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer">
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                <span className="text-sm">
                  {busy ? "Wird hochgeladen…" : "Datei auswählen (ICO, PNG, SVG)"}
                </span>
                <input
                  type="file"
                  accept=".ico,.png,.svg,image/*"
                  onChange={handleUpload}
                  disabled={busy}
                  className="hidden"
                />
              </label>
            </AdminLabel>

            <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-white/70 leading-relaxed space-y-2">
              <p>
                <strong className="text-white/85">Empfehlung:</strong> Quadratisches
                PNG mit 512×512 px oder eine ICO-Datei.
              </p>
              <p>
                <strong className="text-white/85">Achtung Cache:</strong> Browser
                merken sich Favicons sehr lange. Falls du das alte noch siehst →
                Cmd+Shift+R (Mac) oder Strg+F5 (Windows). Auf dem iPhone hilft
                manchmal nur Safari schließen und neu öffnen.
              </p>
              <p>
                <strong className="text-white/85">Tipp:</strong> Auf{" "}
                <a
                  href="https://favicon.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff5ce0] hover:underline"
                >
                  favicon.io
                </a>{" "}
                kannst du aus einem Logo eine fertige ICO-Datei generieren.
              </p>
            </div>
          </div>
        </div>
      </AdminCard>

      <AdminToast message={toast} />
    </div>
  );
}
