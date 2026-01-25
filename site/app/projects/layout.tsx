import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work by Raagav Ramakrishnan across deep learning, computer vision, hardware design, and communications.",
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
