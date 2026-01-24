"use client"

import { useRef, useState } from "react"

import { contactCopy, profile } from "@/lib/content"
import Card from "@/components/Card"

export default function ContactSection() {
  const [toast, setToast] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => setToast(null), 2000)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      showToast(contactCopy.emailToast)
    } catch {
      showToast(contactCopy.emailToastError)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <h2>{contactCopy.heading}</h2>
          <p className="muted">{contactCopy.subheading}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-lift flex h-full flex-col gap-2">
            <button className="w-full text-left" type="button" onClick={copyEmail}>
              <strong className="text-base font-semibold text-ink">{contactCopy.emailLabel}</strong>
              <span className="mt-2 block text-sm text-muted">{contactCopy.emailHint}</span>
            </button>
          </Card>
          <Card className="card-lift flex h-full flex-col gap-2">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <strong className="text-base font-semibold text-ink">{contactCopy.githubLabel}</strong>
              <span className="mt-2 block text-sm text-muted">{contactCopy.githubHandle}</span>
            </a>
          </Card>
          <Card className="card-lift flex h-full flex-col gap-2">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <strong className="text-base font-semibold text-ink">{contactCopy.linkedinLabel}</strong>
              <span className="mt-2 block text-sm text-muted">{contactCopy.linkedinHandle}</span>
            </a>
          </Card>
        </div>
        {toast ? (
          <div className="mt-6 rounded-full border border-line bg-white px-4 py-2 text-xs text-muted" role="status">
            {toast}
          </div>
        ) : null}
      </div>
    </section>
  )
}
