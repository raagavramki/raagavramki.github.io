import Reveal from "@/components/Reveal"
import { interests } from "@/lib/content"

function Column({ heading, kicker, items }: { heading: string; kicker: string; items: { title: string; text: string }[] }) {
  return (
    <div>
      <p className="label">{kicker}</p>
      <h3 className="mb-6 mt-2 text-xl font-serif">{heading}</h3>
      <ul className="divide-y divide-line border-y border-line">
        {items.map((i) => (
          <li key={i.title} className="py-4">
            <p className="font-semibold text-ink">{i.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{i.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Interests() {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <Reveal>
        <Column kicker="Research" heading="What I think about" items={interests.research} />
      </Reveal>
      <Reveal delay={0.1}>
        <Column kicker="Life" heading="Away from the screen" items={interests.life} />
      </Reveal>
    </div>
  )
}
