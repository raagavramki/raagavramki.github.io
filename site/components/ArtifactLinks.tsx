import type { ArtifactLink } from "@/lib/data/types"

export default function ArtifactLinks({ links }: { links: ArtifactLink[] }) {
  if (links.length === 0) return null
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline focus-ring"
            aria-label={`${l.label} (opens in a new tab)`}
          >
            {l.label} ↗
          </a>
        </li>
      ))}
    </ul>
  )
}
