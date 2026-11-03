import Link from "next/link"

const items = [
  { label: "Peer-reviewed", text: "CHI EA 2026 publication", href: "/research/adaptive-fitness-tracking/" },
  { label: "HCI research", text: "Under Prof. Nimmi Rangaswamy, IIIT Hyderabad", href: "/research/" },
  { label: "Medical imaging ML", text: "Glioma MRI segmentation research at Cloud Ambassadors", href: "/projects/glioma-mri-pipeline/" },
  { label: "ML & vision projects", text: "Vision Transformers, FCN segmentation, CNN-RNN OCR, MLP from scratch", href: "/projects/" },
]

export default function ProofStrip() {
  return (
    <section aria-label="Highlights" className="border-y border-line bg-white/50">
      <div className="container">
        <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <li key={i.label}>
              <Link href={i.href} className="focus-ring block py-4 pr-4 hover:opacity-70">
                <span className="label block">{i.label}</span>
                <span className="mt-1 block text-sm text-ink">{i.text} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
