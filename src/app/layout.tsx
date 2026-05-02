import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WEBTIMEZ",
  description: "Von Design bis Umsetzung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased overflow-x-hidden"
    >
      <body
        className="min-h-full flex flex-col overflow-x-hidden"
        style={{ fontFamily: "'Neue Haas Grotesk Display Pro', 'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
