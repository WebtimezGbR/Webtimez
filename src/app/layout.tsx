import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WEBTIMEZ",
  description: "Von Design bis Umsetzung",
  // PWA: bei „Zum Home-Screen" → echtes Fullscreen ohne Browser-Bars
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
  // Theme-Color = exakt das Dunkel-Indigo aus dem Hero-Shader (mit 50%-Overlay).
  // Browser-Bar blendet sich nahtlos mit dem oberen Bildrand zusammen.
  themeColor: "#0f0a24",
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
        className="min-h-full flex flex-col overflow-x-hidden bg-[#0f0a24] text-white"
        style={{ fontFamily: "'Neue Haas Grotesk Display Pro', 'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
