"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { useSectionIntro } from "@/lib/supabase/settings";

const TEAM_INTRO_FALLBACK = {
  eyebrow: "U N S E R",
  heading: "Team",
  subheading:
    "Drei Gründer, eine Vision — wir bringen eure Website von der ersten Idee bis zum Live-Gang.",
};

const ease = [0.22, 1, 0.36, 1] as const;
const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

interface TeamMember {
  name: string;
  designation: string;
  imageSrc?: string;
  socialLinks?: SocialLink[];
}

type IconProps = { className?: string };

const LinkedinIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
);

function Avatar({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc?: string;
}) {
  const [errored, setErrored] = React.useState(false);
  React.useEffect(() => {
    setErrored(false);
  }, [imageSrc]);

  if (!imageSrc || errored) {
    return <PersonPlaceholder name={name} />;
  }

  return (
    <img
      src={imageSrc}
      alt={name}
      onError={() => setErrored(true)}
      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
    />
  );
}

function PersonPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="relative h-full w-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: "#0f0c29",
        backgroundImage:
          "linear-gradient(135deg, #ff5ce0 0%, #7b3aed 55%, #1e1b4b 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute -top-1/4 -left-1/4 h-3/4 w-3/4 rounded-full opacity-50 blur-3xl"
        style={{ background: "rgba(255,255,255,0.2)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-1/4 -right-1/4 h-3/4 w-3/4 rounded-full opacity-50 blur-3xl"
        style={{ background: "rgba(255,92,224,0.35)" }}
      />
      <span className="relative text-3xl sm:text-4xl font-extrabold text-white/40 select-none tracking-wider">
        {initials}
      </span>
    </div>
  );
}

interface TeamMemberRow {
  id: number;
  position: number;
  name: string;
  designation: string;
  image_path: string | null;
  linkedin_url: string | null;
}

function rowToMember(row: TeamMemberRow): TeamMember {
  let imageSrc: string | undefined;
  if (row.image_path) {
    const { data } = supabase.storage
      .from("Team")
      .getPublicUrl(row.image_path);
    imageSrc = data.publicUrl;
    // eslint-disable-next-line no-console
    console.log("[Team-Image]", row.name, "→", imageSrc);
  }
  return {
    name: row.name,
    designation: row.designation,
    imageSrc,
    socialLinks: row.linkedin_url
      ? [{ icon: LinkedinIcon, href: row.linkedin_url, label: "LinkedIn" }]
      : undefined,
  };
}

export default function Team() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const intro = useSectionIntro("team", TEAM_INTRO_FALLBACK);

  const [members, setMembers] = React.useState<TeamMember[] | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    supabase
      .from("team_members")
      .select("*")
      .order("position", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Team-Daten konnten nicht geladen werden:", error);
          setMembers([]);
          return;
        }
        setMembers((data as TeamMemberRow[]).map(rowToMember));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative mx-auto max-w-7xl w-full px-6 sm:px-8 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease }}
          className="relative z-10 flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          {intro.eyebrow && (
            <span
              className="text-xs sm:text-sm font-semibold text-[#ff5ce0] tracking-[0.4em] uppercase mb-3 sm:mb-4"
              style={{ textShadow: bodyShadow }}
            >
              {intro.eyebrow}
            </span>
          )}
          <h3
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white tracking-wide mb-4 sm:mb-5"
            style={{ textShadow: headingShadow }}
          >
            {intro.heading}
          </h3>
          <p
            className="text-base sm:text-lg md:text-xl font-light text-white/85 tracking-wide max-w-2xl"
            style={{ textShadow: bodyShadow }}
          >
            {intro.subheading}
          </p>
        </motion.div>

        {/* Member Cards */}
        <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 lg:gap-10">
          {members === null
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 sm:p-8 flex flex-col items-center"
                >
                  <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-full bg-white/5 animate-pulse" />
                  <div className="mt-4 sm:mt-5 h-6 w-32 rounded bg-white/10 animate-pulse" />
                  <div className="mt-2 h-4 w-40 rounded bg-white/5 animate-pulse" />
                </div>
              ))
            : members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease, delay: 0.2 + index * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-6 sm:p-8 text-center transition-all duration-500 hover:border-[#ff5ce0]/40 hover:shadow-[0_0_40px_rgba(255,92,224,0.18)]"
            >
              {/* Pink Wave-Overlay — wächst beim Hover hoch */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full transition-transform duration-700 ease-out group-hover:scale-y-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(255,92,224,0.28) 0%, rgba(255,92,224,0) 100%)",
                  transitionDelay: `${index * 50}ms`,
                }}
              />

              {/* Avatar */}
              <div
                className="relative z-10 h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full border-4 border-white/15 transition-all duration-500 ease-out group-hover:border-[#ff5ce0] group-hover:scale-105"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <Avatar name={member.name} imageSrc={member.imageSrc} />
              </div>

              {/* Name + Rolle */}
              <h4
                className="relative z-10 mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide"
                style={{ textShadow: headingShadow }}
              >
                {member.name}
              </h4>
              <p
                className="relative z-10 mt-1 text-sm sm:text-base text-white/70 tracking-wide"
                style={{ textShadow: bodyShadow }}
              >
                {member.designation}
              </p>

              {/* Social Links — auf Mobile immer sichtbar, auf Desktop bei Hover */}
              {member.socialLinks && member.socialLinks.length > 0 ? (
                <div className="relative z-10 mt-4 sm:mt-5 flex gap-3 opacity-100 md:opacity-0 transition-opacity duration-300 ease-in-out md:group-hover:opacity-100">
                  {member.socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/85 hover:text-[#ff5ce0] hover:border-[#ff5ce0]/50 transition-all"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div
                  className="relative z-10 mt-4 sm:mt-5 h-10"
                  aria-hidden
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
