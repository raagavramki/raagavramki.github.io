import type { MetadataRoute } from "next"

import { publicEngineering, publicResearch } from "@/lib/content"

export const dynamic = "force-static"

const BASE = "https://raagavramki.github.io"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/research/", "/projects/", "/about/", "/resume/", "/contact/"]
  const research = publicResearch().map((c) => `/research/${c.slug}/`)
  const projects = publicEngineering().map((c) => `/projects/${c.slug}/`)
  return [...pages, ...research, ...projects].map((p) => ({ url: `${BASE}${p}` }))
}
