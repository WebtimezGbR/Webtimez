"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

export function AdminHeader({
  title,
  description,
  onAddClick,
  addLabel = "Neuer Eintrag",
  showAdd = true,
}: {
  title: string;
  description: string;
  onAddClick?: () => void;
  addLabel?: string;
  showAdd?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide mb-2"
          style={{ textShadow: headingShadow }}
        >
          {title}
        </h1>
        <p
          className="text-sm sm:text-base text-white/75 tracking-wide"
          style={{ textShadow: bodyShadow }}
        >
          {description}
        </p>
      </div>
      {showAdd && onAddClick && (
        <button
          type="button"
          onClick={onAddClick}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-[#ff5ce0] hover:bg-[#ff5ce0]/90 text-black font-semibold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,92,224,0.5)] cursor-pointer flex-shrink-0"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      )}
    </div>
  );
}

export function AdminCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-5 sm:p-6">
      {children}
    </div>
  );
}

export function AdminToast({
  message,
}: {
  message: { kind: "success" | "error"; text: string } | null;
}) {
  if (!message) return null;
  const isError = message.kind === "error";
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full border backdrop-blur-md text-sm font-medium tracking-wide shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${
        isError
          ? "bg-red-500/15 border-red-500/40 text-red-100"
          : "bg-[#ff5ce0]/15 border-[#ff5ce0]/40 text-white"
      }`}
      style={{ textShadow: bodyShadow }}
    >
      {message.text}
    </div>
  );
}

export function AdminLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="block text-xs font-medium text-white/65 tracking-wider uppercase mb-1.5"
        style={{ textShadow: bodyShadow }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full h-11 px-4 rounded-xl border border-white/15 bg-black/30 text-white placeholder-white/40 outline-none focus:border-[#ff5ce0]/50 focus:ring-2 focus:ring-[#ff5ce0]/30 transition-all";

export const textareaClass =
  "w-full px-4 py-3 rounded-xl border border-white/15 bg-black/30 text-white placeholder-white/40 outline-none focus:border-[#ff5ce0]/50 focus:ring-2 focus:ring-[#ff5ce0]/30 transition-all resize-y";

export function AdminRowActions({
  onSave,
  onDelete,
  onCancel,
  onMoveUp,
  onMoveDown,
  saving,
  canMoveUp = false,
  canMoveDown = false,
  saveLabel = "Speichern",
  showCancel = false,
}: {
  onSave: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  saving: boolean;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  saveLabel?: string;
  showCancel?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-[#ff5ce0] hover:bg-[#ff5ce0]/90 text-black font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(255,92,224,0.5)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {saveLabel}
      </button>

      {onMoveUp && (
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!canMoveUp || saving}
          aria-label="Nach oben"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/15 bg-black/30 text-white/85 hover:bg-black/55 hover:border-white/40 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      {onMoveDown && (
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!canMoveDown || saving}
          aria-label="Nach unten"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/15 bg-black/30 text-white/85 hover:bg-black/55 hover:border-white/40 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}

      <div className="ml-auto flex items-center gap-2">
        {showCancel && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="inline-flex items-center gap-1.5 h-10 px-3 rounded-full text-sm text-white/65 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
            Abbrechen
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={saving}
            className="inline-flex items-center gap-1.5 h-10 px-3 rounded-full border border-red-500/30 bg-red-500/5 text-red-300 hover:bg-red-500/15 hover:border-red-500/60 transition-colors cursor-pointer text-sm disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            Löschen
          </button>
        )}
      </div>
    </div>
  );
}
