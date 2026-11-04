import type { Publication } from "./types"

/**
 * Bibliographic data verified against Crossref (2026-11-02):
 *  - 10.1145/3772363.3798708  (CHI EA '26, published 2026-04-13, pp. 1-5)
 * Latest first. Mark `status: "under-review"` only if current AND disclosable.
 */
export const publications: Publication[] = [
  {
    id: "chi-ea-2026-adaptive-fitness",
    title: "Everyday HCI of Adaptive Fitness: The Bricolage of Self-Tracking in Urban India",
    authors: ["Shivam Singh", "Raagav Ramakrishnan", "Chetan Mahipal", "Nimmi Rangaswamy"],
    year: 2026,
    date: "April 2026",
    venue: "Extended Abstracts of the 2026 CHI Conference on Human Factors in Computing Systems",
    venueShort: "CHI EA 2026",
    pages: "1-5",
    publisher: "ACM",
    doi: "https://doi.org/10.1145/3772363.3798708",
    openAccessUrl: "/papers/chi-ea-2026-adaptive-fitness.pdf",
    status: "published",
    caseStudySlug: "adaptive-fitness-tracking",
  },
]

export const getPublication = (id: string) => publications.find((p) => p.id === id)
