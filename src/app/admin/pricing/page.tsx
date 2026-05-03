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
} from "@/components/admin/AdminUI";

interface Plan {
  id: number;
  position: number;
  name: string;
  description: string;
  price_netto: number;
  price_brutto: number;
  features: string[];
  is_featured: boolean;
}

type Draft = Omit<Plan, "id">;

const emptyDraft = (position: number): Draft => ({
  position,
  name: "",
  description: "",
  price_netto: 0,
  price_brutto: 0,
  features: [],
  is_featured: false,
});

function FeaturesEditor({
  features,
  onChange,
}: {
  features: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={f}
            onChange={(e) => {
              const next = [...features];
              next[i] = e.target.value;
              onChange(next);
            }}
            placeholder={`Feature ${i + 1}`}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => onChange(features.filter((_, j) => j !== i))}
            aria-label="Feature entfernen"
            className="flex-shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-xl border border-red-500/30 bg-red-500/5 text-red-300 hover:bg-red-500/15 transition-colors cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...features, ""])}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-white/15 bg-black/30 text-white/85 text-sm hover:bg-black/55 hover:border-[#ff5ce0]/40 transition-colors cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        Feature hinzufügen
      </button>
    </div>
  );
}

export default function PricingAdminPage() {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [drafts, setDrafts] = useState<Record<number, Plan>>({});
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
      .from("pricing_plans")
      .select("*")
      .order("position", { ascending: true });
    if (error) {
      flash("error", error.message);
      return;
    }
    setPlans(data ?? []);
    const next: Record<number, Plan> = {};
    (data ?? []).forEach((p) => {
      next[p.id] = { ...p, features: Array.isArray(p.features) ? p.features : [] };
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
      .from("pricing_plans")
      .update({
        name: d.name.trim(),
        description: d.description.trim(),
        price_netto: Number(d.price_netto) || 0,
        price_brutto: Number(d.price_brutto) || 0,
        features: d.features.map((f) => f.trim()).filter(Boolean),
        is_featured: d.is_featured,
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
    if (!confirm("Dieses Paket wirklich löschen?")) return;
    setBusyId(id);
    const { error } = await supabase.from("pricing_plans").delete().eq("id", id);
    setBusyId(null);
    if (error) {
      flash("error", error.message);
      return;
    }
    flash("success", "Gelöscht");
    await loadList();
  }

  async function move(id: number, direction: "up" | "down") {
    if (!plans) return;
    const idx = plans.findIndex((p) => p.id === id);
    if (idx === -1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= plans.length) return;
    const a = plans[idx];
    const b = plans[targetIdx];
    setBusyId(id);
    await supabase.from("pricing_plans").update({ position: b.position }).eq("id", a.id);
    await supabase.from("pricing_plans").update({ position: a.position }).eq("id", b.id);
    setBusyId(null);
    await loadList();
  }

  function startNew() {
    const maxPos = (plans ?? []).reduce((m, x) => Math.max(m, x.position), 0);
    setNewDraft(emptyDraft(maxPos + 1));
  }

  async function saveNew() {
    if (!newDraft) return;
    if (!newDraft.name.trim()) {
      flash("error", "Name darf nicht leer sein.");
      return;
    }
    setBusyId("new");
    const { error } = await supabase.from("pricing_plans").insert({
      position: newDraft.position,
      name: newDraft.name.trim(),
      description: newDraft.description.trim(),
      price_netto: Number(newDraft.price_netto) || 0,
      price_brutto: Number(newDraft.price_brutto) || 0,
      features: newDraft.features.map((f) => f.trim()).filter(Boolean),
      is_featured: newDraft.is_featured,
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
    d: Draft | Plan,
    onChange: (next: Draft | Plan) => void
  ) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminLabel label="Name">
            <input
              type="text"
              value={d.name}
              onChange={(e) => onChange({ ...d, name: e.target.value })}
              placeholder="z. B. Starter"
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Beschreibung">
            <input
              type="text"
              value={d.description}
              onChange={(e) =>
                onChange({ ...d, description: e.target.value })
              }
              placeholder="Kurzer Untertitel"
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Preis (Netto, in €)">
            <input
              type="number"
              min={0}
              value={d.price_netto}
              onChange={(e) =>
                onChange({ ...d, price_netto: Number(e.target.value) })
              }
              className={inputClass}
            />
          </AdminLabel>
          <AdminLabel label="Preis (Brutto, in €)">
            <input
              type="number"
              min={0}
              value={d.price_brutto}
              onChange={(e) =>
                onChange({ ...d, price_brutto: Number(e.target.value) })
              }
              className={inputClass}
            />
          </AdminLabel>
        </div>

        <div className="mt-4">
          <AdminLabel label="Features">
            <FeaturesEditor
              features={d.features}
              onChange={(next) => onChange({ ...d, features: next })}
            />
          </AdminLabel>
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={d.is_featured}
              onChange={(e) =>
                onChange({ ...d, is_featured: e.target.checked })
              }
              className="h-5 w-5 rounded border-white/30 bg-black/30 text-[#ff5ce0] focus:ring-[#ff5ce0]"
            />
            <span className="text-sm text-white/85">
              Als „Beliebteste"-Paket markieren
            </span>
          </label>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <AdminHeader
        title="Pricing"
        description="Pakete bearbeiten. Preise in Ganzeurobeträgen, Features als einzelne Punkte."
        onAddClick={startNew}
        addLabel="Neues Paket"
        showAdd={!newDraft}
      />

      {newDraft && (
        <AdminCard>
          <p className="text-sm font-semibold text-[#ff5ce0] tracking-wider uppercase mb-4">
            Neues Paket
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

      {plans === null ? (
        <p className="text-white/60 text-sm">Wird geladen…</p>
      ) : plans.length === 0 ? (
        <p className="text-white/60 text-sm">
          Noch keine Pakete angelegt.
        </p>
      ) : (
        <div className="space-y-4">
          {plans.map((p, idx) => (
            <AdminCard key={p.id}>
              <p className="text-xs font-semibold text-white/55 tracking-wider uppercase mb-4">
                Position {p.position} · {p.is_featured ? "Beliebteste" : ""}
              </p>
              {drafts[p.id] &&
                renderForm(drafts[p.id], (next) =>
                  setDrafts((prev) => ({
                    ...prev,
                    [p.id]: next as Plan,
                  }))
                )}
              <AdminRowActions
                onSave={() => saveRow(p.id)}
                onDelete={() => deleteRow(p.id)}
                onMoveUp={() => move(p.id, "up")}
                onMoveDown={() => move(p.id, "down")}
                canMoveUp={idx > 0}
                canMoveDown={idx < plans.length - 1}
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
