"use client";

import { useEffect, useState } from "react";
import { supabase } from "./client";

export interface HeroSettings {
  tagline: string;
  animated_words: string[];
  button_primary_label: string;
  button_primary_href: string;
  button_secondary_label: string;
  button_secondary_href: string;
}

export interface FooterSettings {
  tagline: string;
  mail: string;
  instagram_url: string;
  copyright_name: string;
}

export interface ContactSettings {
  heading: string;
  tagline: string;
  email: string;
  phone_display: string;
  phone_link: string;
  hours: string;
}

export interface CookieSettings {
  heading: string;
  body: string;
  footnote: string;
  accept_label: string;
  reject_label: string;
}

export interface ImpressumSettings {
  company: string;
  owners: string;
  address: string;
  phone_display: string;
  phone_link: string;
  email: string;
  ust_id: string;
  press_responsible_name: string;
  press_responsible_address: string;
}

export interface ColorSettings {
  accent: string;
}

export interface SectionIntro {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface SectionIntrosSettings {
  team: SectionIntro;
  portfolio: SectionIntro;
  pricing: SectionIntro;
  leistungen: SectionIntro;
  prozess: SectionIntro;
}

export type SettingKey =
  | "hero"
  | "footer"
  | "contact"
  | "cookies"
  | "colors"
  | "impressum"
  | "datenschutz"
  | "section_intros";

export async function fetchSetting<T>(key: SettingKey): Promise<T | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();
  if (error || !data) {
    if (error) {
      // eslint-disable-next-line no-console
      console.warn(`[settings] ${key} konnte nicht geladen werden:`, error.message);
    }
    return null;
  }
  return data.value as T;
}

export function useSetting<T>(key: SettingKey): T | null {
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetchSetting<T>(key).then((v) => {
      if (!cancelled) setValue(v);
    });
    return () => {
      cancelled = true;
    };
  }, [key]);
  return value;
}

export async function saveSetting<T>(key: SettingKey, value: T) {
  const { error } = await supabase
    .from("site_settings")
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
    });
  return error;
}

export function useSectionIntro(
  section: keyof SectionIntrosSettings,
  fallback: SectionIntro
): SectionIntro {
  const intros = useSetting<SectionIntrosSettings>("section_intros");
  return intros?.[section] ?? fallback;
}
