"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { ShaderBackground } from "@/components/ui/hero-shader";
import { supabase } from "@/lib/supabase/client";

const headingShadow =
  "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";
const bodyShadow = "0 1px 8px rgba(0,0,0,0.5)";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/admin");
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus("error");
      setErrorMessage(
        error.message === "Invalid login credentials"
          ? "E-Mail oder Passwort falsch."
          : error.message
      );
      return;
    }

    router.replace("/admin");
  }

  return (
    <ShaderBackground>
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

      <main className="relative z-20 mx-auto flex w-full max-w-md flex-col px-6 sm:px-8 py-16 sm:py-24 md:py-32">
        <div className="text-center mb-8">
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide mb-3"
            style={{ textShadow: headingShadow }}
          >
            Admin-Login
          </h1>
          <p
            className="text-base text-white/75 tracking-wide"
            style={{ textShadow: bodyShadow }}
          >
            Melde dich an, um die Website-Inhalte zu verwalten.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md p-6 sm:p-8 flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/90 mb-2 tracking-wide"
              style={{ textShadow: bodyShadow }}
            >
              E-Mail
            </label>
            <div className="flex items-center h-12 px-4 rounded-full border border-white/15 bg-black/30 focus-within:border-[#ff5ce0]/50 focus-within:ring-2 focus-within:ring-[#ff5ce0]/30 transition-all">
              <Mail className="h-5 w-5 text-white/50 flex-shrink-0" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dein@webtimez.com"
                className="h-full px-3 w-full outline-none bg-transparent text-white placeholder-white/40"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/90 mb-2 tracking-wide"
              style={{ textShadow: bodyShadow }}
            >
              Passwort
            </label>
            <div className="flex items-center h-12 px-4 rounded-full border border-white/15 bg-black/30 focus-within:border-[#ff5ce0]/50 focus-within:ring-2 focus-within:ring-[#ff5ce0]/30 transition-all">
              <Lock className="h-5 w-5 text-white/50 flex-shrink-0" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-full px-3 w-full outline-none bg-transparent text-white placeholder-white/40"
                autoComplete="current-password"
              />
            </div>
          </div>

          {status === "error" && (
            <p
              className="text-sm text-red-400 font-medium text-center"
              style={{ textShadow: bodyShadow }}
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 inline-flex items-center justify-center gap-2 h-12 w-full px-8 rounded-full bg-[#ff5ce0] hover:bg-[#ff5ce0]/90 text-black font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,92,224,0.5)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Wird angemeldet…
              </>
            ) : (
              "Anmelden"
            )}
          </button>
        </form>
      </main>
    </ShaderBackground>
  );
}
