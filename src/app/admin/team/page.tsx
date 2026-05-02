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

function getTeamPublicUrl(path: string | null): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from("Team").getPublicUrl(path);
  return data.publicUrl;
}

function TeamImageField({
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
  const publicUrl = getTeamPublicUrl(value);

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
      .from("Team")
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
        <div className="mb-3 rounded-full overflow-hidden border border-white/10 bg-black/30 w-32 h-32">
          <img
            src={publicUrl}
            alt="Vorschau"
            className="w-full h-full object-cover"
          />
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
          {uploading
            ? "Wird hochgeladen…"
            : value
            ? "Anderes Bild wählen"
            : "Bild auswählen"}
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

interface TeamMember {
  id: number;
  position: number;
  name: string;
  designation: string;
  image_path: string | null;
  linkedin_url: string | null;
}

type Draft = Omit<TeamMember, "id">;

const emptyDraft = (position: number): Draft => ({
  position,
  name: "",
  designation: "Gründer & Geschäftsführer",
  image_path: null,
  linkedin_url: null,
});

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[] | null>(null);
  const [drafts, setDrafts] = useState<Record<number, TeamMember>>({});
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
      .from("team_members")
      .select("*")
      .order("position", { ascending: true });
    if (error) {
      flash("error", error.message);
      return;
    }
    setMembers(data ?? []);
    const next: Record<number, TeamMember> = {};
    (data ?? []).forEach((m) => {
      next[m.id] = m;
    });
    setDrafts(next);
  }

  useEffect(() => {
    loadList();
  }, []);

  function setDraftField<K extends keyof TeamMember>(
    id: number,
    key: K,
    value: TeamMember[K]
  ) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  }

  async function saveRow(id: number) {
    const d = drafts[id];
    if (!d || !d.name.trim()) {
      flash("error", "Name darf nicht leer sein.");
      return;
    }
    setBusyId(id);
    const { error } = await supabase
      .from("team_members")
      .update({
        name: d.name.trim(),
        designation: d.designation.trim(),
        image_path: d.image_path?.trim() || null,
        linkedin_url: d.linkedin_url?.trim() || null,
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
    if (!confirm("Diesen Eintrag wirklich löschen?")) return;
    setBusyId(id);
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    setBusyId(null);
    if (error) {
      flash("error", error.message);
      return;
    }
    flash("success", "Gelöscht");
    await loadList();
  }

  async function move(id: number, direction: "up" | "down") {
    if (!members) return;
    const idx = members.findIndex((m) => m.id === id);
    if (idx === -1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= members.length) return;

    const a = members[idx];
    const b = members[targetIdx];
    setBusyId(id);
    await supabase
      .from("team_members")
      .update({ position: b.position })
      .eq("id", a.id);
    await supabase
      .from("team_members")
      .update({ position: a.position })
      .eq("id", b.id);
    setBusyId(null);
    await loadList();
  }

  function startNew() {
    const maxPos = (members ?? []).reduce((m, x) => Math.max(m, x.position), 0);
    setNewDraft(emptyDraft(maxPos + 1));
  }

  async function saveNew() {
    if (!newDraft || !newDraft.name.trim()) {
      flash("error", "Name darf nicht leer sein.");
      return;
    }
    setBusyId("new");
    const { error } = await supabase.from("team_members").insert({
      position: newDraft.position,
      name: newDraft.name.trim(),
      designation: newDraft.designation.trim(),
      image_path: newDraft.image_path?.trim() || null,
      linkedin_url: newDraft.linkedin_url?.trim() || null,
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

  return (
    <div className="space-y-4">
      <AdminHeader
        title="Team"
        description="Gründer und Geschäftsführer verwalten. Reihenfolge per Pfeile, Änderungen sind sofort live."
        onAddClick={startNew}
        addLabel="Neues Mitglied"
        showAdd={!newDraft}
      />

      {newDraft && (
        <AdminCard>
          <p className="text-sm font-semibold text-[#ff5ce0] tracking-wider uppercase mb-4">
            Neues Mitglied
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminLabel label="Name">
              <input
                type="text"
                value={newDraft.name}
                onChange={(e) =>
                  setNewDraft({ ...newDraft, name: e.target.value })
                }
                placeholder="Vor- und Nachname"
                className={inputClass}
              />
            </AdminLabel>
            <AdminLabel label="Rolle">
              <input
                type="text"
                value={newDraft.designation}
                onChange={(e) =>
                  setNewDraft({ ...newDraft, designation: e.target.value })
                }
                placeholder="z. B. Gründer & Geschäftsführer"
                className={inputClass}
              />
            </AdminLabel>
            <AdminLabel label="LinkedIn-URL (optional)">
              <input
                type="url"
                value={newDraft.linkedin_url ?? ""}
                onChange={(e) =>
                  setNewDraft({ ...newDraft, linkedin_url: e.target.value })
                }
                placeholder="https://www.linkedin.com/in/…"
                className={inputClass}
              />
            </AdminLabel>
            <div className="sm:col-span-2">
              <AdminLabel label="Foto (optional)">
                <TeamImageField
                  value={newDraft.image_path}
                  onChange={(next) =>
                    setNewDraft({ ...newDraft, image_path: next })
                  }
                  flash={flash}
                />
              </AdminLabel>
            </div>
          </div>
          <AdminRowActions
            onSave={saveNew}
            onCancel={() => setNewDraft(null)}
            saving={busyId === "new"}
            saveLabel="Hinzufügen"
            showCancel
          />
        </AdminCard>
      )}

      {members === null ? (
        <p className="text-white/60 text-sm">Wird geladen…</p>
      ) : members.length === 0 ? (
        <p className="text-white/60 text-sm">
          Noch keine Mitglieder angelegt. Klick oben rechts auf „Neues
          Mitglied".
        </p>
      ) : (
        <div className="space-y-4">
          {members.map((m, idx) => (
            <AdminCard key={m.id}>
              <p className="text-xs font-semibold text-white/55 tracking-wider uppercase mb-4">
                Position {m.position}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminLabel label="Name">
                  <input
                    type="text"
                    value={drafts[m.id]?.name ?? ""}
                    onChange={(e) => setDraftField(m.id, "name", e.target.value)}
                    className={inputClass}
                  />
                </AdminLabel>
                <AdminLabel label="Rolle">
                  <input
                    type="text"
                    value={drafts[m.id]?.designation ?? ""}
                    onChange={(e) =>
                      setDraftField(m.id, "designation", e.target.value)
                    }
                    className={inputClass}
                  />
                </AdminLabel>
                <AdminLabel label="LinkedIn-URL">
                  <input
                    type="url"
                    value={drafts[m.id]?.linkedin_url ?? ""}
                    onChange={(e) =>
                      setDraftField(m.id, "linkedin_url", e.target.value || null)
                    }
                    placeholder="leer = kein LinkedIn"
                    className={inputClass}
                  />
                </AdminLabel>
                <div className="sm:col-span-2">
                  <AdminLabel label="Foto">
                    <TeamImageField
                      value={drafts[m.id]?.image_path ?? null}
                      onChange={(next) => setDraftField(m.id, "image_path", next)}
                      flash={flash}
                    />
                  </AdminLabel>
                </div>
              </div>
              <AdminRowActions
                onSave={() => saveRow(m.id)}
                onDelete={() => deleteRow(m.id)}
                onMoveUp={() => move(m.id, "up")}
                onMoveDown={() => move(m.id, "down")}
                canMoveUp={idx > 0}
                canMoveDown={idx < members.length - 1}
                saving={busyId === m.id}
              />
            </AdminCard>
          ))}
        </div>
      )}

      <AdminToast message={toast} />
    </div>
  );
}
