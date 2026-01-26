"use client"

import { useState } from "react"

type FloatingBubblesProps = {
  items: string[]
}

type Badge = {
  id: string
  label: string
  gradient: string
  size: "sm" | "md" | "lg"
  rotation: number
  zIndex: number
  offsetX: number
  offsetY: number
}

const sizeClasses = {
  sm: "px-6 py-2.5 text-sm",
  md: "px-8 py-3 text-base",
  lg: "px-10 py-3.5 text-lg",
}

// Warm, calm color gradients matching your design system
const gradients = [
  "from-indigo-400 to-indigo-500",    // Medical Imaging AI
  "from-cyan-500 to-teal-600",        // Robust ML Systems
  "from-violet-400 to-purple-500",    // Multimodal AI
  "from-emerald-400 to-green-500",    // HCI
  "from-amber-400 to-orange-500",     // Debate
  "from-rose-400 to-pink-500",        // Calisthenics
  "from-yellow-400 to-amber-500",     // Coffee
  "from-slate-400 to-gray-500",       // Albert Camus
]

const positions = [
  { offsetX: -40, offsetY: -80, rotation: -3, size: "lg" as const, zIndex: 1 },
  { offsetX: 80, offsetY: -50, rotation: 2, size: "md" as const, zIndex: 2 },
  { offsetX: -60, offsetY: -20, rotation: -2, size: "lg" as const, zIndex: 3 },
  { offsetX: 20, offsetY: 20, rotation: 1, size: "md" as const, zIndex: 4 },
  { offsetX: -30, offsetY: 70, rotation: 3, size: "sm" as const, zIndex: 5 },
  { offsetX: 70, offsetY: 100, rotation: -1, size: "sm" as const, zIndex: 6 },
  { offsetX: -80, offsetY: 50, rotation: 2, size: "sm" as const, zIndex: 7 },
  { offsetX: 40, offsetY: -10, rotation: -2, size: "md" as const, zIndex: 8 },
]

export default function FloatingBubbles({ items }: FloatingBubblesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [clickedId, setClickedId] = useState<string | null>(null)

  const badges: Badge[] = items.map((item, i) => ({
    id: item.toLowerCase().replace(/\s+/g, "-"),
    label: item,
    gradient: gradients[i % gradients.length],
    size: positions[i % positions.length].size,
    rotation: positions[i % positions.length].rotation,
    zIndex: positions[i % positions.length].zIndex,
    offsetX: positions[i % positions.length].offsetX,
    offsetY: positions[i % positions.length].offsetY,
  }))

  const handleClick = (id: string) => {
    setClickedId(clickedId === id ? null : id)
  }

  return (
    <div className="relative flex h-[420px] w-full items-center justify-center">
      {badges.map((badge) => {
        const isHovered = hoveredId === badge.id
        const isClicked = clickedId === badge.id
        const isOtherHovered = hoveredId !== null && hoveredId !== badge.id

        return (
          <div
            key={badge.id}
            className={`
              absolute cursor-pointer select-none rounded-full font-semibold transition-all duration-500 ease-out
              bg-gradient-to-b shadow-lg hover:shadow-2xl
              ${badge.gradient}
              ${sizeClasses[badge.size]}
            `}
            style={{
              transform: `
                translate(${badge.offsetX}px, ${badge.offsetY}px)
                rotate(${isHovered ? 0 : badge.rotation}deg)
                scale(${isClicked ? 1.15 : isHovered ? 1.08 : isOtherHovered ? 0.95 : 1})
                translateY(${isHovered ? -8 : 0}px)
              `,
              zIndex: isHovered || isClicked ? 100 : badge.zIndex,
              boxShadow: isHovered
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
                : isClicked
                  ? "0 30px 60px -15px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.4)"
                  : "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
            }}
            onMouseEnter={() => setHoveredId(badge.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleClick(badge.id)}
          >
            <span
              className="relative block transition-transform duration-300 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
              style={{
                transform: isHovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              {badge.label}
            </span>
            {/* Inner highlight effect */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-50"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
