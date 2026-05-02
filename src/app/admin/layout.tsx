"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Tag,
  ListChecks,
  Sparkles,
  LogOut,
  Loader2,
  Star,
  Phone,
  Cookie,
  FileText,
  Footprints,
} from "lucide-react";
import { ShaderBackground } from "@/components/ui/hero-shader";
import { supabase } from "@/lib/supabase/client";

const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

const navItems = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard, exact: true },
  { href: "/admin/hero", label: "Hero", icon: Star },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/pricing", label: "Pricing", icon: Tag },
  { href: "/admin/prozess", label: "Prozess", icon: ListChecks },
  { href: "/admin/leistungen", label: "Leistungen", icon: Sparkles },
  { href: "/admin/kontakt", label: "Kontakt", icon: Phone },
  { href: "/admin/footer", label: "Footer", icon: Footprints },
  { href: "/admin/cookies", label: "Cookies", icon: Cookie },
  { href: "/admin/impressum", label: "Impressum", icon: FileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authState, setAuthState] = useState<
    "checking" | "authed" | "unauthed"
  >("checking");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (!data.session) {
        setAuthState("unauthed");
        router.replace("/login");
        return;
      }
      setUserEmail(data.session.user.email ?? null);
      setAuthState("authed");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      if (!session) {
        setAuthState("unauthed");
        router.replace("/login");
      } else {
        setUserEmail(session.user.email ?? null);
        setAuthState("authed");
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (authState !== "authed") {
    return (
      <ShaderBackground>
        <div className="relative z-20 flex min-h-screen items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-[#ff5ce0]" />
            <span style={{ textShadow: bodyShadow }}>
              {authState === "checking"
                ? "Anmeldung wird geprüft…"
                : "Weiterleitung zum Login…"}
            </span>
          </div>
        </div>
      </ShaderBackground>
    );
  }

  return (
    <ShaderBackground>
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="md:w-64 md:flex-shrink-0">
          <div className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-4 sm:p-5 md:sticky md:top-6">
            <Link
              href="/"
              className="block text-2xl font-extrabold text-white tracking-wide mb-2 hover:text-[#ff5ce0] transition-colors"
              style={{ textShadow: headingShadow, letterSpacing: "0.02em" }}
            >
              WEBTIMEZ
            </Link>
            <p
              className="text-xs text-white/55 tracking-widest uppercase mb-4"
              style={{ textShadow: bodyShadow }}
            >
              Admin
            </p>

            <nav className="flex md:flex-col flex-row gap-1 overflow-x-auto md:overflow-visible">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-[#ff5ce0]/15 text-[#ff5ce0] border border-[#ff5ce0]/30"
                        : "text-white/75 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10">
              {userEmail && (
                <p
                  className="text-xs text-white/55 mb-2 break-all"
                  style={{ textShadow: bodyShadow }}
                >
                  {userEmail}
                </p>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Abmelden
              </button>
            </div>
          </div>
        </aside>

        {/* Hauptbereich */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </ShaderBackground>
  );
}
