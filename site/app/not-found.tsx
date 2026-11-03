import Link from "next/link"

export default function NotFound() {
  return (
    <main id="main">
      <section className="section-hero">
        <div className="container max-w-2xl">
          <span className="label">404</span>
          <h1 className="mb-6 mt-6 text-3xl font-serif md:text-4xl">That page does not exist</h1>
          <p className="mb-8 text-muted">It may have moved. These are good places to start:</p>
          <ul className="flex flex-wrap gap-4">
            {[
              ["/", "Home"],
              ["/research/", "Research"],
              ["/projects/", "Projects"],
              ["/resume/", "CV"],
              ["/contact/", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="btn btn-outline focus-ring">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
