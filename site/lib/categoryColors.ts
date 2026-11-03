import type { ProjectCategory } from "./data/types"

export const researchColor = "rgb(44, 62, 80)"

export const categoryColors: Record<ProjectCategory, string> = {
  ml: "rgb(79, 70, 229)",
  nlp: "rgb(124, 58, 237)",
  vision: "rgb(8, 145, 178)",
  systems: "rgb(220, 38, 38)",
}

export const filterColors: Record<ProjectCategory | "all", string> = {
  all: "rgb(26, 29, 33)",
  ...categoryColors,
}
