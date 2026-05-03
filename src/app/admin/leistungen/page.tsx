"use client";

import { useEffect, useState } from "react";
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

const SERVICE_ICONS = [
  "Code",
  "Palette",
  "BarChart3",
  "Server",
  "ShieldCheck",
  "TrendingUp",
];

const GRAPHIC_TYPES = [
  "entwicklung",
  "design",
  "optimierung",
  "hosting",
  "kontrolle",
];

interface Service {
  id: number;
  position: number;
  number: string;
  title: string;
  description: string;
  icon_name: string;
  graphic_type: string;
}

type Draft = Omit<Service, "id">;

const emptyDraft = (position: number): Draft => ({
  position,
  number: String(position).padStart(2, "0"),
  title: "",
  description: "",
  icon_name: "Code",
  graphic_type: "entwicklung",
});

export default function LeistungenAdminPage() {
  const [services, setServices] = useState<Service[] | null>(null);
  const [drafts, setDrafts] = useState<Record<number, Service>>({});
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
      .from("services")
      .select("*")
      .order("position", { ascending: true });
    if (error) {
      flash("error", error.message);
      return;
    }
    setServices(data ?? []);
    const next: Record<number, Service> = {};
    (data ?? []).forEach((s) => {
      next[s.id] = s;
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
      .from("services")
      .update({
        number: d.number.trim(),
        title: d.title.trim(),
        description: d.description.trim(),
        icon_name: d.icon_name,
        graphic_type: d.graphic_type,
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
    if (!confirm("Diese Leistung wirklich löschen?")) return;
    setBusyId(id);
    const { error } = await supabase.from("services").delete().eq("id", id);
    setBusyId(null);
    if (error) {
      flash("error", error.message);
      return;
    }
    flash("success", "Gelöscht");
    await loadList();
  }

  async function move(id: number, direction: "up" | "down") {
    if (!services) return;
    const idx = services.findIndex((s) => s.id === id);
    if (idx === -1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= services.length) return;
    const a = services[idx];
    const b = services[targetIdx];
    setBusyId(id);
    await supabase.from("services").update({ position: b.position }).eq("id", a.id);
    await supabase.from("services").update({ position: a.position }).eq("id", b.id);
    setBusyId(null);
    await loadList();
  }

  function startNew() {
    const maxPos = (services ?? []).reduce((m, x) => Math.max(m, x.position), 0);
    setNewDraft(emptyDraft(maxPos + 1));
  }

  async function saveNew() {
    if (!newDraft) return;
    if (!newDraft.title.trim()) {
      flash("error", "Titel darf nicht leer sein.");
      return;
    }
    setBusyId("new");
    const { error } = await supabase.from("services").insert({
      position: newDraft.position,
      number: newDraft.number.trim(),
      title: newDraft.title.trim(),
      description: newDraft.description.trim(),
      icon_name: newDraft.icon_name,
      graphic_type: newDraft.graphic_type,
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
    d: Draft | Service,
    onChange: (next: Draft | Service) => void
  ) {
    return (
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
        <AdminLabel label="Titel">
          <input
            type="text"
            value={d.title}
            onChange={(e) => onChange({ ...d, title: e.target.value })}
            placeholder="z. B. Entwicklung"
            className={inputClass}
          />
        </AdminLabel>
        <div className="sm:col-span-2">
          <AdminLabel label="Beschreibung">
            <textarea
              rows={3}
              value={d.description}
              onChange={(e) => onChange({ ...d, description: e.target.value })}
              placeholder="Was bietet die Leistung?"
              className={textareaClass}
            />
          </AdminLabel>
        </div>
        <AdminLabel label="Icon (in der Karten-Ecke)">
          <select
            value={d.icon_name}
            onChange={(e) => onChange({ ...d, icon_name: e.target.value })}
            className={inputClass}
          >
            {SERVICE_ICONS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </AdminLabel>
        <AdminLabel label="Grafik-Stil (mittlere Illustration)">
          <select
            value={d.graphic_type}
            onChange={(e) => onChange({ ...d, graphic_type: e.target.value })}
            className={inputClass}
          >
            {GRAPHIC_TYPES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </AdminLabel>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AdminHeader
        title="Leistungen"
        description="Service-Karten verwalten. Icon und Grafik-Stil aus der Liste auswählen."
        onAddClick={startNew}
        addLabel="Neue Leistung"
        showAdd={!newDraft}
      />

      {newDraft && (
        <AdminCard>
          <p className="text-sm font-semibold text-[#ff5ce0] tracking-wider uppercase mb-4">
            Neue Leistung
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

      {services === null ? (
        <p className="text-white/60 text-sm">Wird geladen…</p>
      ) : services.length === 0 ? (
        <p className="text-white/60 text-sm">Noch keine Leistungen angelegt.</p>
      ) : (
        <div className="space-y-4">
          {services.map((s, idx) => (
            <AdminCard key={s.id}>
              <p className="text-xs font-semibold text-white/55 tracking-wider uppercase mb-4">
                Position {s.position}
              </p>
              {drafts[s.id] &&
                renderForm(drafts[s.id], (next) =>
                  setDrafts((prev) => ({ ...prev, [s.id]: next as Service }))
                )}
              <AdminRowActions
                onSave={() => saveRow(s.id)}
                onDelete={() => deleteRow(s.id)}
                onMoveUp={() => move(s.id, "up")}
                onMoveDown={() => move(s.id, "down")}
                canMoveUp={idx > 0}
                canMoveDown={idx < services.length - 1}
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
