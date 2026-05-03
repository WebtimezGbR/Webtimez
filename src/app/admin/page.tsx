"use client";

import Link from "next/link";
import {
  Users,
  Briefcase,
  Tag,
  ListChecks,
  Sparkles,
  ExternalLink,
  Star,
  Phone,
  Cookie,
  FileText,
  Footprints,
  Type,
  Image as ImageIcon,
} from "lucide-react";

const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

const sections = [
  {
    href: "/admin/branding",
    label: "Branding",
    description: "Favicon (Browser-Tab-Icon) hochladen oder zurücksetzen.",
    icon: ImageIcon,
  },
  {
    href: "/admin/hero",
    label: "Hero",
    description: "Tagline, animierte Wörter und die beiden Hero-Buttons.",
    icon: Star,
  },
  {
    href: "/admin/sektionen",
    label: "Sektions-Texte",
    description:
      "Überschriften und Untertitel über jeder Sektion (Team, Portfolio, Pricing …).",
    icon: Type,
  },
  {
    href: "/admin/team",
    label: "Team",
    description: "Gründer, Rollen und LinkedIn-Profile verwalten.",
    icon: Users,
  },
  {
    href: "/admin/portfolio",
    label: "Portfolio",
    description: "Projekte, Beschreibungen, Bilder und Live-URLs.",
    icon: Briefcase,
  },
  {
    href: "/admin/pricing",
    label: "Pricing",
    description: "Pakete, Preise (Netto/Brutto) und Features.",
    icon: Tag,
  },
  {
    href: "/admin/prozess",
    label: "Prozess",
    description: "Die vier Schritte mit Beschreibungen und Stichpunkten.",
    icon: ListChecks,
  },
  {
    href: "/admin/leistungen",
    label: "Leistungen",
    description: "Service-Karten mit Icons und Grafik-Stilen.",
    icon: Sparkles,
  },
  {
    href: "/admin/kontakt",
    label: "Kontakt",
    description: "Telefon, E-Mail, Öffnungszeiten und Überschriften.",
    icon: Phone,
  },
  {
    href: "/admin/footer",
    label: "Footer",
    description: "Tagline, Kontakt-E-Mail, Instagram und Copyright.",
    icon: Footprints,
  },
  {
    href: "/admin/cookies",
    label: "Cookie-Banner",
    description: "Banner-Text und Buttons für die Datenschutz-Einwilligung.",
    icon: Cookie,
  },
  {
    href: "/admin/impressum",
    label: "Impressum",
    description: "Pflichtangaben nach § 5 TMG.",
    icon: FileText,
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-6 sm:p-8 mb-6">
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide mb-2"
          style={{ textShadow: headingShadow }}
        >
          Willkommen im Admin-Bereich
        </h1>
        <p
          className="text-base sm:text-lg text-white/80 tracking-wide"
          style={{ textShadow: bodyShadow }}
        >
          Hier kannst du alle Inhalte eurer Website bearbeiten. Wähle links
          eine Sektion aus, oder klick auf eine Karte unten.
        </p>
        <div className="mt-4">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors"
          >
            Live-Website öffnen
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-5 sm:p-6 transition-all hover:border-[#ff5ce0]/40 hover:bg-black/60 hover:shadow-[0_0_30px_rgba(255,92,224,0.15)]"
            >
              <div className="flex items-start gap-4">
                <div className="text-[#ff5ce0] p-3 rounded-xl bg-white/10 group-hover:bg-[#ff5ce0]/20 transition-colors">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg sm:text-xl font-bold text-white tracking-wide mb-1"
                    style={{ textShadow: headingShadow }}
                  >
                    {section.label}
                  </h3>
                  <p
                    className="text-sm text-white/70 leading-relaxed"
                    style={{ textShadow: bodyShadow }}
                  >
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
