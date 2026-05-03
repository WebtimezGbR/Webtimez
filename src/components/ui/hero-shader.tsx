"use client"

import type React from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div className="w-full relative">
      {/* Background Shader (einer reicht – zwei übereinander killt FPS) */}
      <div className="fixed inset-0 w-full h-full bg-black">
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
