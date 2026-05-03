import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FaviconInjector } from "@/components/ui/favicon-injector";
import { OrganizationJsonLd } from "@/components/seo/structured-data";

const SITE_URL = "https://webtimez.com";
const SITE_NAME = "Webtimez";
const SITE_TITLE = "Webtimez – Webdesign & Webentwicklung aus Köln";
const SITE_DESCRIPTION =
  "Webtimez ist eine junge Webagentur aus Köln. Wir bauen professionelle Websites für kleine und regionale Unternehmen — von Design über Entwicklung bis Hosting. Persönlich, flexibel, auf Augenhöhe.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Webtimez",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Webtimez GbR", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "Webdesign Köln",
    "Webentwicklung Köln",
    "Webagentur Köln",
    "Website erstellen lassen",
    "Webdesign für kleine Unternehmen",
    "regionale Webagentur",
    "Webtimez",
    "Website Hosting Köln",
    "Webdesign NRW",
    "professionelle Website",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Webtimez GbR",
  publisher: "Webtimez GbR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Webtimez – Webdesign & Webentwicklung aus Köln",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Webtimez",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className="h-full antialiased overflow-x-hidden"
    >
      <body
        className="min-h-full flex flex-col overflow-x-hidden text-white"
        style={{ fontFamily: "'Neue Haas Grotesk Display Pro', 'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <OrganizationJsonLd />
        <FaviconInjector />
        {children}
      </body>
    </html>
  );
}
