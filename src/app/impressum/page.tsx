"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ShaderBackground } from "@/components/ui/hero-shader";
import Footer from "@/components/ui/footer";
import CookieConsent from "@/components/ui/cookie-consent";

const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

export default function ImpressumPage() {
  return (
    <ShaderBackground>
      {/* Top-Bar */}
      <header className="relative z-30 mx-auto max-w-7xl w-full px-6 sm:px-8 md:px-12 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide hover:text-[#ff5ce0] transition-colors"
          style={{ textShadow: headingShadow, letterSpacing: "0.02em" }}
        >
          WEBTIMEZ
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-sm sm:text-base text-white/85 hover:bg-black/55 hover:border-[#ff5ce0]/40 hover:text-white transition-colors"
          style={{ textShadow: bodyShadow }}
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück
        </Link>
      </header>

      {/* Inhalt */}
      <main className="relative z-20 mx-auto max-w-3xl w-full px-6 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20">
        <div className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-6 sm:p-8 md:p-10">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wide mb-6 sm:mb-8"
            style={{ textShadow: headingShadow }}
          >
            Impressum
          </h1>

          <section className="space-y-6 text-white/85 leading-relaxed">
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                Angaben gemäß § 5 TMG
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Webtimez GbR
                <br />
                Johann-Reintgen-Straße 19
                <br />
                50999 Köln
                <br />
                Deutschland
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                Vertreten durch
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Julius Sturm
                <br />
                Simon Engel
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                Kontakt
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Telefon:{" "}
                <a
                  href="tel:+4915259529994"
                  className="text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors"
                >
                  +49 152 59529994
                </a>
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:team@webtimez.com"
                  className="text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors"
                >
                  team@webtimez.com
                </a>
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                Umsatzsteuer-ID
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz:
                <br />
                <span className="text-white/60">
                  [USt-ID einfügen, sobald vorhanden]
                </span>
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Julius Sturm
                <br />
                Johann-Reintgen-Straße 19
                <br />
                50999 Köln
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                Haftung für Inhalte
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
              </p>
              <p className="mt-2" style={{ textShadow: bodyShadow }}>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                Informationen nach den allgemeinen Gesetzen bleiben hiervon
                unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                möglich. Bei Bekanntwerden von entsprechenden Rechts­
                verletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                Haftung für Links
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Unser Angebot enthält Links zu externen Websites Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich. Die
                verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
                mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
                waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                Urheberrecht
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechts bedürfen
                der schriftlichen Zustimmung des jeweiligen Autors bzw.
                Erstellers. Downloads und Kopien dieser Seite sind nur für
                den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <CookieConsent />
    </ShaderBackground>
  );
}
