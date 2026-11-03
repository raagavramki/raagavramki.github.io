import type { Metadata } from "next"

import ContactSection from "@/components/ContactSection"
import { RichText } from "@/components/Tbd"
import { profile } from "@/lib/content"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Raagav Ramakrishnan for research collaborations, open-source work, and speaking invitations.",
}

export default function ContactPage() {
  return (
    <main id="main">
      <ContactSection />
      <p className="container pb-8 text-center text-sm text-muted">
        <RichText text={profile.emailNote} />
      </p>
    </main>
  )
}
