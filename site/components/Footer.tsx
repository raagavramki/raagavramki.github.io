import { contactCopy, footerNote, profile } from "@/lib/content"

export default function Footer() {
  const year = new Date().getFullYear()
  const note = footerNote.replace("{year}", String(year))

  return (
    <footer className="border-t border-line">
      <div className="container flex flex-col gap-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>{note}</p>
        <div className="flex flex-wrap gap-4">
          <a className="transition-colors hover:text-ink" href={`mailto:${profile.email}`}>
            {contactCopy.emailLabel}
          </a>
          <a className="transition-colors hover:text-ink" href={profile.github} target="_blank" rel="noreferrer">
            {contactCopy.githubLabel}
          </a>
          <a className="transition-colors hover:text-ink" href={profile.linkedin} target="_blank" rel="noreferrer">
            {contactCopy.linkedinLabel}
          </a>
        </div>
      </div>
    </footer>
  )
}
