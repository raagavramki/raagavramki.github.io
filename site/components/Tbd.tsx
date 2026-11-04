import type { ReactNode } from "react"

/** Visible marker for anything unverified. Blocks a --release check until removed. */
export function Tbd({ note }: { note?: string }) {
  return (
    <span className="tbd" role="note">
      TBD{note ? `: ${note}` : " - verify before publishing"}
    </span>
  )
}

const TOKEN = /\{\{TBD:\s*([^}]*?)\s*\}\}/g

/** Renders a string, turning each {{TBD: note}} token into a <Tbd> badge. */
export function RichText({ text }: { text: string }): ReactNode {
  const out: ReactNode[] = []
  let last = 0
  let i = 0
  for (const m of text.matchAll(TOKEN)) {
    const idx = m.index ?? 0
    if (idx > last) out.push(text.slice(last, idx))
    out.push(<Tbd key={`tbd-${i++}`} note={m[1]} />)
    last = idx + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

export const hasTbd = (text: string) => /\{\{TBD:/.test(text)
