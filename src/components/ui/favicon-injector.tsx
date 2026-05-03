"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useSetting, type BrandingSettings } from "@/lib/supabase/settings";

export function FaviconInjector() {
  const branding = useSetting<BrandingSettings>("branding");

  useEffect(() => {
    if (!branding?.favicon_path) return;

    const { data } = supabase.storage
      .from("branding")
      .getPublicUrl(branding.favicon_path);
    const url = data.publicUrl;
    if (!url) return;

    // Bestehende Favicon-Tags entfernen, damit unser dynamischer gewinnt
    document
      .querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
      .forEach((el) => el.remove());

    const link = document.createElement("link");
    link.rel = "icon";
    link.href = url;
    document.head.appendChild(link);
  }, [branding?.favicon_path]);

  return null;
}
