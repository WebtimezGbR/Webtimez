import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der Webtimez GbR — Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO und TTDSG.",
  robots: { index: true, follow: false },
  alternates: { canonical: "https://webtimez.com/datenschutz" },
  openGraph: {
    title: "Datenschutzerklärung | Webtimez",
    description: "Wie wir mit deinen Daten umgehen — DSGVO-konform.",
    url: "https://webtimez.com/datenschutz",
  },
};

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
