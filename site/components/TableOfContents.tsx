export default function TableOfContents({ items }: { items: { id: string; title: string }[] }) {
  return (
    <nav aria-label="On this page" className="border-y border-line py-4">
      <p className="label mb-3">On this page</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className="tap link-underline focus-ring text-sm text-muted hover:text-ink">
              {i.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
