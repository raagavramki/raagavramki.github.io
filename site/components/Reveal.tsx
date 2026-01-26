"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

type RevealProps = {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
  className?: string
}

const directionOffset = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { y: 0, x: 24 },
  right: { y: 0, x: -24 },
  none: { y: 0, x: 0 },
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
  className = "",
}: RevealProps) {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Defer animations until after first paint
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show content immediately without animation until mounted
  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const offset = directionOffset[direction]

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: offset.y,
        x: offset.x,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
