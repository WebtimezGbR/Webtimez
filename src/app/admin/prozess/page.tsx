"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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

const STEP_ICONS = ["MessageSquare", "PenTool", "Code2", "Rocket"];
const BADGE_ICONS = ["", "Sparkles", "Flag"];

interface ProcessStep {
  id: number;
  position: number;
  number: string;
  icon_name: string;
  heading: string;
  description: string;
  details: string[];
  badge_label: string | null;
  badge_icon: string | null;
}

type Draft = Omit<ProcessStep, "id">;

const emptyDraft = (position: number): Draft => ({
  position,
  number: String(position).padStart(2, "0"),
  icon_name: "MessageSquare",
  heading: "",
  description: "",
  details: [],
  badge_label: null,
  badge_icon: null,
});

function DetailsEditor({
  details,
  onChange,
}: {
  details: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      {details.map((d, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={d}
            onChange={(e) => {
              const next = [...details];
              next[i] = e.target.value;
              onChange(next);
            }}
            placeholder={`Stichpunkt ${i + 1}`}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => onChange(details.filter((_, j) => j !== i))}
            aria-label="Entfernen"
            className="flex-shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-xl border border-red-500/30 bg-red-500/5 text-red-300 hover:bg-red-500/15 transition-colors cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...details, ""])}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-white/15 bg-black/30 text-white/85 text-sm hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        Stichpunkt hinzufügen
      </button>
    </div>
  );
}

export default function ProzessAdminPage() {
  const [steps, setSteps] = useState<ProcessStep[] | null>(null);
  const [drafts, setDrafts] = useState<Record<number, ProcessStep>>({});
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
      .from("process_steps")
      .select("*")
      .order("position", { ascending: true });
    if (error) {
      flash("error", error.message);
      return;
    }
    setSteps(data ?? []);
    const next: Record<number, ProcessStep> = {};
    (data ?? []).forEach((s) => {
      next[s.id] = { ...s, details: Array.isArray(s.details) ? s.details : [] };
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
      .from("process_steps")
      .update({
        number: d.number.trim(),
        icon_name: d.icon_name,
        heading: d.heading.trim(),
        description: d.description.trim(),
        details: d.details.map((x) => x.trim()).filter(Boolean),
        badge_label: d.badge_label?.trim() || null,
        badge_icon: d.badge_icon || null,
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
    if (!confirm("Diesen Schritt wirklich löschen?")) return;
    setBusyId(id);
    const { error } = await supabase.from("process_steps").delete().eq("id", id);
    setBusyId(null);
    if (error) {
      flash("error", error.message);
      return;
    }
    flash("success", "Gelöscht");
    await loadList();
  }

  async function move(id: number, direction: "up" | "down") {
    if (!steps) return;
    const idx = steps.findIndex((s) => s.id === id);
    if (idx === -1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= steps.length) return;
    const a = steps[idx];
    const b = steps[targetIdx];
    setBusyId(id);
    await supabase.from("process_steps").update({ position: b.position }).eq("id", a.id);
    await supabase.from("process_steps").update({ position: a.position }).eq("id", b.id);
    setBusyId(null);
    await loadList();
  }

  function startNew() {
    const maxPos = (steps ?? []).reduce((m, x) => Math.max(m, x.position), 0);
    setNewDraft(emptyDraft(maxPos + 1));
  }

  async function saveNew() {
    if (!newDraft) return;
    if (!newDraft.heading.trim()) {
      flash("error", "Überschrift darf nicht leer sein.");
      return;
    }
    setBusyId("new");
    const { error } = await supabase.from("process_steps").insert({
      position: newDraft.position,
      number: newDraft.number.trim(),
      icon_name: newDraft.icon_name,
      heading: newDraft.heading.trim(),
      description: newDraft.description.trim(),
      details: newDraft.details.map((x) => x.trim()).filter(Boolean),
      badge_label: newDraft.badge_label?.trim() || null,
      badge_icon: newDraft.badge_icon || null,
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
    d: Draft | ProcessStep,
    onChange: (next: Draft | ProcessStep) => void
  ) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminLabel label="Nummer">
            <input
              type="text"
              value={d.number}
              onChange={(e) => onChange({ ...d, number: e.target.value })}
              placeholder="z. B. 01"
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Icon">
            <select
              value={d.icon_name}
              onChange={(e) => onChange({ ...d, icon_name: e.target.value })}
              className={inputClass}
            >
              {STEP_ICONS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </AdminLabel>
          <AdminLabel label="Überschrift">
            <input
              type="text"
              value={d.heading}
              onChange={(e) => onChange({ ...d, heading: e.target.value })}
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Beschreibung">
            <textarea
              rows={3}
              value={d.description}
              onChange={(e) => onChange({ ...d, description: e.target.value })}
              className={textareaClass}
            />
          </AdminLabel>
        </div>

        <div className="mt-4">
          <AdminLabel label="Stichpunkte">
            <DetailsEditor
              details={d.details}
              onChange={(next) => onChange({ ...d, details: next })}
            />
          </AdminLabel>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminLabel label="Badge-Text (optional)">
            <input
              type="text"
              value={d.badge_label ?? ""}
              onChange={(e) =>
                onChange({ ...d, badge_label: e.target.value || null })
              }
              placeholder="z. B. Start oder Live"
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Badge-Icon (optional)">
            <select
              value={d.badge_icon ?? ""}
              onChange={(e) =>
                onChange({ ...d, badge_icon: e.target.value || null })
              }
              className={inputClass}
            >
              {BADGE_ICONS.map((i) => (
                <option key={i} value={i}>
                  {i || "(kein Icon)"}
                </option>
              ))}
            </select>
          </AdminLabel>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <AdminHeader
        title="Prozess"
        description="Die vier Schritte der Zusammenarbeit. Reihenfolge per Pfeile, Badges optional."
        onAddClick={startNew}
        addLabel="Neuer Schritt"
        showAdd={!newDraft}
      />

      {newDraft && (
        <AdminCard>
          <p className="text-sm font-semibold text-[#ff5ce0] tracking-wider uppercase mb-4">
            Neuer Schritt
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

      {steps === null ? (
        <p className="text-white/60 text-sm">Wird geladen…</p>
      ) : steps.length === 0 ? (
        <p className="text-white/60 text-sm">Noch keine Schritte angelegt.</p>
      ) : (
        <div className="space-y-4">
          {steps.map((s, idx) => (
            <AdminCard key={s.id}>
              <p className="text-xs font-semibold text-white/55 tracking-wider uppercase mb-4">
                Position {s.position}
              </p>
              {drafts[s.id] &&
                renderForm(drafts[s.id], (next) =>
                  setDrafts((prev) => ({ ...prev, [s.id]: next as ProcessStep }))
                )}
              <AdminRowActions
                onSave={() => saveRow(s.id)}
                onDelete={() => deleteRow(s.id)}
                onMoveUp={() => move(s.id, "up")}
                onMoveDown={() => move(s.id, "down")}
                canMoveUp={idx > 0}
                canMoveDown={idx < steps.length - 1}
                saving={busyId === s.id}
              />
            </AdminCard>
          ))}
        </div>
      )}

      <AdminToast message={toast} />
    </div>
  );
}
