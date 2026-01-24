import Link from "next/link"
import type { ReactNode } from "react"

const variants = {
  primary: "btn btn-primary",
  outline: "btn btn-outline",
  ghost: "btn btn-ghost",
}

type CTAProps = {
  href: string
  children: ReactNode
  variant?: keyof typeof variants
  external?: boolean
  className?: string
}

export default function CTA({ href, children, variant = "primary", external, className }: CTAProps) {
  const isExternal = external || href.startsWith("http") || href.startsWith("mailto")
  const classes = `${variants[variant]} ${className ?? ""}`

  if (isExternal) {
    const rel = href.startsWith("mailto") ? undefined : "noreferrer"
    const target = href.startsWith("mailto") ? undefined : "_blank"

    return (
      <a className={classes} href={href} rel={rel} target={target}>
        {children}
      </a>
    )
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  )
}
