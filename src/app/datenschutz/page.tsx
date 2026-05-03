"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ShaderBackground } from "@/components/ui/hero-shader";
import Footer from "@/components/ui/footer";
import CookieConsent, {
  setCookieConsent,
} from "@/components/ui/cookie-consent";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";

const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

export default function DatenschutzPage() {
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

      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: "https://webtimez.com" },
          { name: "Datenschutzerklärung", url: "https://webtimez.com/datenschutz" },
        ]}
      />

      {/* Inhalt */}
      <main className="relative z-20 mx-auto max-w-3xl w-full px-6 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20">
        <div className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-6 sm:p-8 md:p-10">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-6 sm:mb-8 break-words hyphens-auto"
            style={{ textShadow: headingShadow }}
            lang="de"
          >
            Datenschutzerklärung
          </h1>

          <section className="space-y-8 text-white/85 leading-relaxed">
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                1. Verantwortlicher
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung
                (DSGVO) und anderer nationaler Datenschutzgesetze sowie
                sonstiger datenschutzrechtlicher Bestimmungen ist:
              </p>
              <p className="mt-2" style={{ textShadow: bodyShadow }}>
                Webtimez GbR
                <br />
                Julius Sturm, Simon Engel
                <br />
                Johann-Reintgen-Straße 19
                <br />
                50999 Köln
                <br />
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
                2. Allgemeines zur Datenverarbeitung
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Wir verarbeiten personenbezogene Daten unserer Nutzer
                grundsätzlich nur, soweit dies zur Bereitstellung einer
                funktionsfähigen Website sowie unserer Inhalte und Leistungen
                erforderlich ist. Die Verarbeitung personenbezogener Daten
                erfolgt regelmäßig nur nach Einwilligung des Nutzers
                (Art. 6 Abs. 1 lit. a DSGVO). Eine Ausnahme gilt in solchen
                Fällen, in denen eine vorherige Einholung einer Einwilligung
                aus tatsächlichen Gründen nicht möglich ist und die
                Verarbeitung der Daten durch gesetzliche Vorschriften gestattet
                ist.
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                3. Bereitstellung der Website und Erstellung von Logfiles
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Bei jedem Aufruf unserer Website erfasst unser System
                automatisiert Daten und Informationen vom Computersystem des
                aufrufenden Rechners. Folgende Daten werden hierbei erhoben:
                IP-Adresse, Datum und Uhrzeit des Zugriffs, übertragene
                Datenmenge, Browser-Typ und Version, Betriebssystem,
                Referrer-URL.
              </p>
              <p className="mt-2" style={{ textShadow: bodyShadow }}>
                Rechtsgrundlage für die vorübergehende Speicherung der Daten
                ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse
                liegt in der Sicherstellung des stabilen und sicheren
                Betriebs der Website.
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                4. Cookies und vergleichbare Technologien
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Wir verwenden auf unserer Website Cookies und vergleichbare
                Technologien wie den localStorage des Browsers. Cookies sind
                kleine Textdateien, die auf deinem Endgerät gespeichert
                werden. Wir setzen technisch notwendige Cookies ein, um die
                Funktionsfähigkeit der Website zu gewährleisten – etwa um
                deine Cookie-Einwilligung zu speichern.
              </p>
              <p className="mt-2" style={{ textShadow: bodyShadow }}>
                Die Speicherung notwendiger Cookies erfolgt auf Grundlage von
                § 25 Abs. 2 Nr. 2 TTDSG, da sie unbedingt erforderlich sind,
                damit der Anbieter eines Telemediendienstes diesen Dienst
                bereitstellen kann. Optionale Cookies setzen wir nur mit
                deiner ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a
                DSGVO und § 25 Abs. 1 TTDSG ein.
              </p>
              <p className="mt-2" style={{ textShadow: bodyShadow }}>
                Du kannst deine Cookie-Einwilligung jederzeit widerrufen oder
                anpassen.{" "}
                <button
                  type="button"
                  onClick={() => setCookieConsent(null)}
                  className="text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors bg-transparent border-0 p-0 cursor-pointer"
                >
                  Cookie-Einstellungen öffnen
                </button>
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                5. Kontaktformular und Kontaktaufnahme per E-Mail
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Auf unserer Website ist ein Kontaktformular vorhanden, das
                für die elektronische Kontaktaufnahme genutzt werden kann.
                Wir verarbeiten dabei folgende personenbezogene Daten: Name,
                E-Mail-Adresse, Inhalt der Nachricht. Zusätzlich werden bei
                der Übermittlung Datum und Uhrzeit sowie die IP-Adresse
                gespeichert.
              </p>
              <p className="mt-2" style={{ textShadow: bodyShadow }}>
                Rechtsgrundlage für die Verarbeitung der Daten ist bei
                Vorliegen einer Einwilligung Art. 6 Abs. 1 lit. a DSGVO.
                Rechtsgrundlage für die Verarbeitung der Daten, die im Zuge
                der Anbahnung eines Vertrags übermittelt werden, ist
                Art. 6 Abs. 1 lit. b DSGVO. Im Übrigen ist Art. 6 Abs. 1
                lit. f DSGVO Rechtsgrundlage; unser berechtigtes Interesse
                liegt in der Bearbeitung deiner Anfrage.
              </p>
              <p className="mt-2" style={{ textShadow: bodyShadow }}>
                <strong className="text-white">
                  Auftragsverarbeitung durch Web3Forms:
                </strong>{" "}
                Zur technischen Verarbeitung des Kontaktformulars setzen wir
                den Dienst Web3Forms (Betreiber: Web3Forms) als
                Auftragsverarbeiter ein. Bei der Übermittlung des Formulars
                werden die im Formular eingegebenen Daten an Web3Forms
                übermittelt und an unsere E-Mail-Adresse weitergeleitet. Die
                Datenübertragung erfolgt verschlüsselt. Eine Übermittlung in
                Drittländer kann nicht ausgeschlossen werden; in diesem Fall
                erfolgt sie auf Basis von Standardvertragsklauseln gemäß
                Art. 46 DSGVO.
              </p>
              <p className="mt-2" style={{ textShadow: bodyShadow }}>
                Die Daten werden gelöscht, sobald sie für die Erreichung des
                Zweckes ihrer Erhebung nicht mehr erforderlich sind und keine
                gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                6. Hosting
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Unsere Website wird bei einem externen Dienstleister
                gehostet. Personenbezogene Daten, die auf dieser Website
                erfasst werden, werden auf den Servern des Hosters
                gespeichert. Hierbei kann es sich u. a. um IP-Adressen,
                Kontaktanfragen, Meta- und Kommunikationsdaten,
                Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und
                sonstige Daten, die über eine Website generiert werden,
                handeln.
              </p>
              <p className="mt-2" style={{ textShadow: bodyShadow }}>
                Die Nutzung des Hosters erfolgt zum Zwecke der Vertrags­
                erfüllung gegenüber unseren potenziellen und bestehenden
                Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer
                sicheren, schnellen und effizienten Bereitstellung unseres
                Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                7. Externe Inhalte und Social Media
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Unsere Website enthält Links zu unserem Profil bei Instagram.
                Beim Klick auf den Link wirst du auf die Plattform
                weitergeleitet, dabei kann der jeweilige Anbieter
                personenbezogene Daten erfassen. Wir haben keinen Einfluss
                auf die durch den Anbieter erhobenen Daten und Verarbeitungs­
                vorgänge. Weitere Informationen findest du in der
                Datenschutzerklärung des jeweiligen Anbieters.
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                8. Rechte der betroffenen Person
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Werden personenbezogene Daten von dir verarbeitet, bist du
                Betroffener i. S. d. DSGVO und es stehen dir folgende Rechte
                gegenüber dem Verantwortlichen zu:
              </p>
              <ul
                className="mt-3 space-y-2 list-disc pl-5"
                style={{ textShadow: bodyShadow }}
              >
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                <li>
                  Recht auf Widerruf der datenschutzrechtlichen
                  Einwilligungserklärung (Art. 7 Abs. 3 DSGVO)
                </li>
              </ul>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                9. Beschwerderecht bei der Aufsichtsbehörde
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Unbeschadet eines anderweitigen verwaltungsrechtlichen oder
                gerichtlichen Rechtsbehelfs steht dir das Recht auf Beschwerde
                bei einer Aufsichtsbehörde zu, wenn du der Ansicht bist, dass
                die Verarbeitung der dich betreffenden personenbezogenen
                Daten gegen die DSGVO verstößt. Zuständige Aufsichtsbehörde
                in Nordrhein-Westfalen ist die Landesbeauftragte für
                Datenschutz und Informationsfreiheit Nordrhein-Westfalen.
              </p>
            </div>

            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                10. Aktualität und Änderung dieser Datenschutzerklärung
              </h2>
              <p style={{ textShadow: bodyShadow }}>
                Diese Datenschutzerklärung ist aktuell gültig. Durch die
                Weiterentwicklung unserer Website und Angebote oder aufgrund
                geänderter gesetzlicher beziehungsweise behördlicher Vorgaben
                kann es notwendig werden, diese Datenschutzerklärung zu
                ändern. Die jeweils aktuelle Datenschutzerklärung kann
                jederzeit auf der Website unter{" "}
                <Link
                  href="/datenschutz"
                  className="text-[#ff5ce0] hover:text-[#ff5ce0]/80 underline underline-offset-4 decoration-[#ff5ce0]/40 transition-colors"
                >
                  /datenschutz
                </Link>{" "}
                abgerufen werden.
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
