import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der Webtimez GbR — Pflichtangaben nach § 5 TMG. Kontaktdaten, Vertretungsberechtigte und rechtliche Hinweise.",
  robots: { index: true, follow: false },
  alternates: { canonical: "https://webtimez.com/impressum" },
  openGraph: {
    title: "Impressum | Webtimez",
    description: "Pflichtangaben der Webtimez GbR.",
    url: "https://webtimez.com/impressum",
  },
};

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
