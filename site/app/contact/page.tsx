import type { Metadata } from "next"

import ContactSection from "@/components/ContactSection"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Raagav Ramakrishnan for research collaborations, open-source work, and speaking invitations.",
}

export default function ContactPage() {
  return (
    <main id="main">
      <ContactSection />
    </main>
  )
}
