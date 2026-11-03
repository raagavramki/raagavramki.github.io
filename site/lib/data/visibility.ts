import type { CaseStudy } from "./types"

/**
 * Drafts exist in the repo but never ship. Set NEXT_PUBLIC_SHOW_DRAFTS=1 for
 * local preview only; never for a release build.
 */
export const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1"

export const isVisible = <T extends { visibility: CaseStudy["visibility"] }>(item: T) =>
  SHOW_DRAFTS || item.visibility === "public"

export const getVisible = <T extends { visibility: CaseStudy["visibility"] }>(items: T[]) =>
  items.filter(isVisible)
