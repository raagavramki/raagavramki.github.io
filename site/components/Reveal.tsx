"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

type RevealProps = {
  children: ReactNode
  delay?: number
}

export default function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
    >
      {children}
    </motion.div>
  )
}
