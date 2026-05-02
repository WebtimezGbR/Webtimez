"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MoveRight } from "lucide-react";
import { ShaderBackground } from "@/components/ui/hero-shader";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import Feature from "@/components/ui/feature-modern";
import Prozesse from "@/components/ui/prozesse";
import Portfolio from "@/components/ui/portfolio";
import Team from "@/components/ui/team";
import Pricing from "@/components/ui/pricing";
import Contact from "@/components/ui/contact";
import Footer from "@/components/ui/footer";
import CookieConsent from "@/components/ui/cookie-consent";
import { SectionDivider, ScrollProgressBar } from "@/components/ui/section-divider";
import { useSetting, type HeroSettings } from "@/lib/supabase/settings";

const FALLBACK_HERO: HeroSettings = {
  tagline:
    "Von Design bis Umsetzung – wir kümmern uns um alles, was ihr für eine professionelle Website braucht.",
  animated_words: ["Entwicklung", "Design", "Optimierung", "Hosting", "Kontrolle"],
  button_primary_label: "Kostenlose Beratung",
  button_primary_href: "#contact",
  button_secondary_label: "Leistungen",
  button_secondary_href: "#services",
};
const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

export default function Home() {
  const heroFromDb = useSetting<HeroSettings>("hero");
  const hero = heroFromDb ?? FALLBACK_HERO;
  const aiTitles = hero.animated_words?.length ? hero.animated_words : FALLBACK_HERO.animated_words;

  const [titleNumber, setTitleNumber] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.2 });
  const processInView = useInView(processRef, { once: false, amount: 0.2 });

  // Hero: scroll-gekoppeltes Verblassen + 3D-Kipp beim Runterscrollen
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, -260]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.78]);
  const heroRotateX = useTransform(heroProgress, [0, 1], [0, 18]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleNumber((prev) => (prev + 1) % aiTitles.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <ShaderBackground>
      <ScrollProgressBar />
      <AnimatedNavFramer />

      {/* Landing Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative z-20 min-h-screen flex items-end overflow-hidden"
      >
        <motion.main
          className="relative mb-8 sm:mb-10 md:mb-12 mx-auto px-6 sm:px-8 md:px-12 max-w-7xl w-full origin-bottom"
          style={{
            y: heroY,
            opacity: heroOpacity,
            scale: heroScale,
            rotateX: heroRotateX,
            transformPerspective: 1200,
            willChange: "transform, opacity",
          }}
        >
          <div className="text-left">
            <motion.h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.05] text-white mb-3 sm:mb-4 font-extrabold"
              style={{ letterSpacing: "0.02em", textShadow: headingShadow }}
              initial={{ opacity: 0, y: 60 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
              }
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              WEBTIMEZ
            </motion.h1>

            <motion.span
              className="relative flex overflow-hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6 sm:mb-8 h-11 sm:h-14 md:h-16"
              initial={{ opacity: 0, y: 50 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.7, ease, delay: 0.25 }}
            >
              {aiTitles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-light tracking-wide text-white italic"
                  style={{ textShadow: bodyShadow }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: -30, opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </motion.span>

            <motion.p
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-light text-white/85 mb-6 sm:mb-8 leading-snug max-w-4xl tracking-wide"
              style={{ textShadow: bodyShadow }}
              initial={{ opacity: 0, y: 40 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.7, ease, delay: 0.4 }}
            >
              {hero.tagline}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, ease, delay: 0.55 }}
            >
              <a
                href={hero.button_secondary_href}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-normal text-lg sm:text-xl md:text-2xl transition-all duration-200 hover:bg-black/55 hover:border-white/40 cursor-pointer tracking-wide text-center"
              >
                {hero.button_secondary_label}
              </a>
              <a
                href={hero.button_primary_href}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-white text-black font-normal text-lg sm:text-xl md:text-2xl transition-all duration-200 hover:bg-white/90 cursor-pointer tracking-wide flex items-center justify-center gap-2"
              >
                {hero.button_primary_label} <MoveRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </motion.div>
          </div>
        </motion.main>
      </section>

      <SectionDivider />

      {/* Leistungen Section */}
      <section id="services" className="relative z-20">
        <Feature />
      </section>

      <SectionDivider />

      {/* Prozesse Section */}
      <section
        id="process"
        ref={processRef}
        className="relative z-20 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12"
      >
        <motion.div
          className="relative mx-auto max-w-7xl px-6 sm:px-8 md:px-12 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={
            processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
          }
          transition={{ duration: 0.7, ease }}
        >
          <h3
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wide mb-2 sm:mb-3"
            style={{ textShadow: headingShadow }}
          >
            Unser Prozess
          </h3>
          <p
            className="text-base sm:text-lg md:text-xl font-light text-white/85 tracking-wide"
            style={{ textShadow: bodyShadow }}
          >
            In vier Schritten zu eurer Website
          </p>
        </motion.div>

        <div className="relative">
          <Prozesse />
        </div>
      </section>

      <SectionDivider />

      {/* Portfolio Section */}
      <section id="portfolio" className="relative z-20">
        <Portfolio />
      </section>

      <SectionDivider />

      {/* Team Section */}
      <section id="team" className="relative z-20 py-16 sm:py-20 md:py-24">
        <Team />
      </section>

      <SectionDivider />

      {/* Pricing Section */}
      <section id="pricing" className="relative z-20">
        <Pricing />
      </section>

      <SectionDivider />

      {/* Kontakt Section */}
      <section
        id="contact"
        className="relative z-20 py-16 sm:py-20 md:py-24"
      >
        <Contact />
      </section>

      {/* Footer */}
      <Footer />

      <CookieConsent />
    </ShaderBackground>
  );
}
