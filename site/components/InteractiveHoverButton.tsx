"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface InteractiveHoverButtonProps {
  text?: string
  idleText?: string
  hoverText?: string
  href?: string
  className?: string
  showArrow?: boolean
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  InteractiveHoverButtonProps
>(({ text, idleText, hoverText, href, className = "", showArrow = true }, ref) => {
  // Support both old (text) and new (idleText/hoverText) API
  const displayIdleText = idleText ?? text ?? "Button"
  const displayHoverText = hoverText ?? text ?? "Button"

  // Check if hover text is longer than idle text (needs expansion)
  const needsExpansion = displayHoverText.length > displayIdleText.length

  const baseClasses = `group relative inline-flex cursor-pointer overflow-hidden rounded-full border border-line bg-card py-3 text-center text-sm font-medium whitespace-nowrap ${className}`

  const content = (
    <>
      {/* Invisible spacer to set minimum width based on longer text */}
      <span className="invisible px-8">
        {needsExpansion ? displayHoverText : displayIdleText}
        {showArrow && needsExpansion && <span className="ml-2">→</span>}
      </span>
      {/* Idle text - visible by default, fades out on hover */}
      <span className="absolute inset-0 flex items-center justify-center px-8 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {displayIdleText}
      </span>
      {/* Hover text - hidden by default, fades in on hover */}
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 px-8 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span>{displayHoverText}</span>
        {showArrow && <ArrowRight className="h-4 w-4" />}
      </div>
      {/* Background fill animation */}
      <div className="absolute -left-full top-0 h-full w-full rounded-full bg-ink transition-all duration-300 ease-out group-hover:left-0" />
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={baseClasses}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={baseClasses}
    >
      {content}
    </button>
  )
})

InteractiveHoverButton.displayName = "InteractiveHoverButton"

export { InteractiveHoverButton }
