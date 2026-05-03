"use client"

import type React from "react"
import dynamic from "next/dynamic"

// MeshGradient lazy laden: WebGL-Bundle blockiert sonst das First Paint.
// Bis der Shader hydriert, sieht der User den CSS-Gradient unten — visuell
// nahe am Resting-State des Shaders.
const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false, loading: () => null }
)

interface ShaderBackgroundProps {
  children: React.ReactNode
}

const SHADER_FALLBACK_BG = `
  radial-gradient(ellipse at 25% 25%, rgba(255,92,224,0.55) 0%, transparent 50%),
  radial-gradient(ellipse at 75% 75%, rgba(30,27,75,0.85) 0%, transparent 60%),
  radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 80%),
  #000000
`

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div className="w-full relative">
      <div
        className="fixed inset-0 w-full h-full"
        style={{ background: SHADER_FALLBACK_BG }}
      >
        <MeshGradient
          className="w-full h-full"
          colors={["#000000", "#ff5ce0", "#ffffff", "#1e1b4b", "#ff5ce0"]}
          speed={0.25}
        />
      </div>

      {/* Einheitlicher Dunkel-Tint über die gesamte Seite für konsistente Lesbarkeit */}
      <div className="fixed inset-0 w-full h-full bg-black/50 pointer-events-none" />

      {children}
    </div>
  )
}
