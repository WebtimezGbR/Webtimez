"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import {
  AdminCard,
  AdminHeader,
  AdminLabel,
  AdminRowActions,
  AdminToast,
  inputClass,
  textareaClass,
} from "@/components/admin/AdminUI";

interface Project {
  id: number;
  position: number;
  title: string;
  category: string;
  description: string;
  image_path: string | null;
  live_url: string | null;
}

type Draft = Omit<Project, "id">;

const emptyDraft = (position: number): Draft => ({
  position,
  title: "",
  category: "",
  description: "",
  image_path: null,
  live_url: null,
});

function getPublicUrl(path: string | null): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
  return data.publicUrl;
}

function ImageField({
  value,
  onChange,
  flash,
}: {
  value: string | null;
  onChange: (next: string | null) => void;
  flash: (kind: "success" | "error", text: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const publicUrl = getPublicUrl(value);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const path = `${Date.now()}-${safeName || "image"}.${ext}`;
    const { error } = await supabase.storage
      .from("portfolio")
      .upload(path, file, { upsert: false });
    setUploading(false);
    if (error) {
      flash("error", `Upload fehlgeschlagen: ${error.message}`);
      return;
    }
    onChange(path);
    flash("success", "Bild hochgeladen");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div>
      {publicUrl && (
        <div className="mb-3 rounded-xl overflow-hidden border border-white/10 bg-black/30 max-w-xs">
          <img src={publicUrl} alt="Vorschau" className="w-full h-auto" />
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-white/15 bg-black/30 text-white/85 text-sm hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploading ? "Wird hochgeladen…" : value ? "Anderes Bild wählen" : "Bild auswählen"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl text-sm text-white/65 hover:text-white transition-colors cursor-pointer"
          >
            Bild entfernen
          </button>
        )}
      </div>
      {value && (
        <p className="mt-2 text-xs text-white/45 break-all">Pfad: {value}</p>
      )}
    </div>
  );
}

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [drafts, setDrafts] = useState<Record<number, Project>>({});
  const [newDraft, setNewDraft] = useState<Draft | null>(null);
  const [busyId, setBusyId] = useState<number | "new" | null>(null);
  const [toast, setToast] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);

  function flash(kind: "success" | "error", text: string) {
    setToast({ kind, text });
    setTimeout(() => setToast(null), 3000);
  }

  async function loadList() {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("position", { ascending: true });
    if (error) {
      flash("error", error.message);
      return;
    }
    setProjects(data ?? []);
    const next: Record<number, Project> = {};
    (data ?? []).forEach((p) => {
      next[p.id] = p;
    });
    setDrafts(next);
  }

  useEffect(() => {
    loadList();
  }, []);

  async function saveRow(id: number) {
    const d = drafts[id];
    if (!d) return;
    setBusyId(id);
    const { error } = await supabase
      .from("portfolio_projects")
      .update({
        title: d.title.trim(),
        category: d.category.trim(),
        description: d.description.trim(),
        image_path: d.image_path?.trim() || null,
        live_url: d.live_url?.trim() || null,
      })
      .eq("id", id);
    setBusyId(null);
    if (error) {
      flash("error", error.message);
      return;
    }
    flash("success", "Gespeichert");
    await loadList();
  }

  async function deleteRow(id: number) {
    if (!confirm("Dieses Projekt wirklich löschen?")) return;
    setBusyId(id);
    const { error } = await supabase
      .from("portfolio_projects")
      .delete()
      .eq("id", id);
    setBusyId(null);
    if (error) {
      flash("error", error.message);
      return;
    }
    flash("success", "Gelöscht");
    await loadList();
  }

  async function move(id: number, direction: "up" | "down") {
    if (!projects) return;
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;
    const a = projects[idx];
    const b = projects[targetIdx];
    setBusyId(id);
    await supabase
      .from("portfolio_projects")
      .update({ position: b.position })
      .eq("id", a.id);
    await supabase
      .from("portfolio_projects")
      .update({ position: a.position })
      .eq("id", b.id);
    setBusyId(null);
    await loadList();
  }

  function startNew() {
    const maxPos = (projects ?? []).reduce(
      (m, x) => Math.max(m, x.position),
      0
    );
    setNewDraft(emptyDraft(maxPos + 1));
  }

  async function saveNew() {
    if (!newDraft) return;
    if (!newDraft.title.trim()) {
      flash("error", "Titel darf nicht leer sein.");
      return;
    }
    setBusyId("new");
    const { error } = await supabase.from("portfolio_projects").insert({
      position: newDraft.position,
      title: newDraft.title.trim(),
      category: newDraft.category.trim(),
      description: newDraft.description.trim(),
      image_path: newDraft.image_path?.trim() || null,
      live_url: newDraft.live_url?.trim() || null,
    });
    setBusyId(null);
    if (error) {
      flash("error", error.message);
      return;
    }
    flash("success", "Hinzugefügt");
    setNewDraft(null);
    await loadList();
  }

  function renderForm(
    d: Draft | Project,
    onChange: (next: Draft | Project) => void
  ) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminLabel label="Titel">
            <input
              type="text"
              value={d.title}
              onChange={(e) => onChange({ ...d, title: e.target.value })}
              placeholder="z. B. Rhodos Grill"
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Kategorie">
            <input
              type="text"
              value={d.category}
              onChange={(e) => onChange({ ...d, category: e.target.value })}
              placeholder="z. B. Webseite"
              className={inputClass}
            />
          </AdminLabel>
          <div className="sm:col-span-2">
            <AdminLabel label="Beschreibung">
              <textarea
                rows={3}
                value={d.description}
                onChange={(e) =>
                  onChange({ ...d, description: e.target.value })
                }
                placeholder="Kurzer Satz zum Projekt"
                className={textareaClass}
              />
            </AdminLabel>
          </div>
          <div className="sm:col-span-2">
            <AdminLabel label="Live-URL (optional)">
              <input
                type="url"
                value={d.live_url ?? ""}
                onChange={(e) =>
                  onChange({ ...d, live_url: e.target.value || null })
                }
                placeholder="https://kunde-projekt.de"
                className={inputClass}
              />
            </AdminLabel>
          </div>
          <div className="sm:col-span-2">
            <AdminLabel label="Bild">
              <ImageField
                value={d.image_path}
                onChange={(next) => onChange({ ...d, image_path: next })}
                flash={flash}
              />
            </AdminLabel>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <AdminHeader
        title="Portfolio"
        description="Projekte mit Bild und optionaler Live-URL. Bilder werden automatisch in den Storage-Bucket geladen."
        onAddClick={startNew}
        addLabel="Neues Projekt"
        showAdd={!newDraft}
      />

      {newDraft && (
        <AdminCard>
          <p className="text-sm font-semibold text-[#ff5ce0] tracking-wider uppercase mb-4">
            Neues Projekt
          </p>
          {renderForm(newDraft, (next) => setNewDraft(next as Draft))}
          <AdminRowActions
            onSave={saveNew}
            onCancel={() => setNewDraft(null)}
            saving={busyId === "new"}
            saveLabel="Hinzufügen"
            showCancel
          />
        </AdminCard>
      )}

      {projects === null ? (
        <p className="text-white/60 text-sm">Wird geladen…</p>
      ) : projects.length === 0 ? (
        <p className="text-white/60 text-sm">
          Noch keine Projekte angelegt.
        </p>
      ) : (
        <div className="space-y-4">
          {projects.map((p, idx) => (
            <AdminCard key={p.id}>
              <p className="text-xs font-semibold text-white/55 tracking-wider uppercase mb-4">
                Position {p.position}
              </p>
              {drafts[p.id] &&
                renderForm(drafts[p.id], (next) =>
                  setDrafts((prev) => ({ ...prev, [p.id]: next as Project }))
                )}
              <AdminRowActions
                onSave={() => saveRow(p.id)}
                onDelete={() => deleteRow(p.id)}
                onMoveUp={() => move(p.id, "up")}
                onMoveDown={() => move(p.id, "down")}
                canMoveUp={idx > 0}
                canMoveDown={idx < projects.length - 1}
                saving={busyId === p.id}
              />
            </AdminCard>
          ))}
        </div>
      )}

      <AdminToast message={toast} />
    </div>
  );
}
