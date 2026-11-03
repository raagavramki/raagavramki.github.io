export * from "./data/types"
export * from "./data/publications"
export * from "./data/experiences"
export * from "./data/visibility"
export { researchCaseStudies } from "./data/research"
export { engineeringCaseStudies, archiveProjects } from "./data/engineering"

import { engineeringCaseStudies } from "./data/engineering"
import { researchCaseStudies } from "./data/research"
import { getVisible } from "./data/visibility"
import type { ProjectFilter } from "./data/types"

export const profile = {
  name: "Raagav Ramakrishnan",
  kicker: ["ML Systems Engineering", "Agentic AI", "HCI"],
  headline: "I study how people interact with technology\u2014and build intelligent systems around those insights.",
  subtitle:
    "Research across Human\u2013Computer Interaction, human\u2013AI interaction and machine learning. Electronics & Communication Engineering (Honors), IIIT Hyderabad.",
  roles: ["HCI & Human-AI Researcher", "ML Research Engineer", "Builder"],
  researchAreas: ["Human-Computer Interaction", "Human-AI interaction", "Social computing", "Digital health", "Adaptive systems", "ML systems"],
  location: "Hyderabad, India & Dubai, UAE",
  email: "raagav.ramakrishnan@students.iiit.ac.in",
  emailNote: "{{TBD: confirm institutional email remains valid after graduation; add a durable alternative}}",
  github: "https://github.com/raagavramki",
  linkedin: "https://www.linkedin.com/in/raagav-ramakrishnan-3905511b2",
  /** Single canonical CV. /assets/resume.pdf is a byte-identical legacy copy. */
  cvUrl: "/resume.pdf",
  avatar: "/assets/img/profile.webp",
}

export const researchQuestions = [
  "How do people assemble tools, social media and informal routines into their own self-tracking practices, and how do they adapt them as life changes?",
  "What should an adaptive system know about whose routine it is adapting to, measured by what, and on whose terms?",
  "How does AI change social interaction in settings such as dating and the workplace? (ongoing)",
  "What does it take to build technically capable ML systems that are shaped by these everyday insights?",
]

export const aboutCopy = {
  heading: "About",
  subheading: "From ML engineering to human-centred research",
  paragraphs: [
    "I started in Electronics and Communication Engineering at IIIT Hyderabad, and machine learning engineering became my technical foundation: computer vision, language models and the cloud systems that make them run.",
    "Over time I became more interested in how technologies are actually used in everyday life than in how they perform on a benchmark. Having lived in both Dubai and India, I have seen the same technology take very different shapes in different settings.",
    "I found HCI through qualitative research: field visits, interviews and careful analysis of how young adults in urban India combine apps, wearables and social media into their own fitness practices. That work was published at CHI EA 2026.",
    "Today I want to build intelligent systems that are technically capable and informed by that kind of evidence: adaptive personal informatics that supports approximate logging, routine breaks and private accountability, and human-centred AI that fits how people actually live.",
    "Outside work I have been a debater for years, I am usually reading psychology or literature, and I take coffee a little too seriously.",
  ],
}

export const skills = {
  languages: ["Python", "C/C++", "JavaScript", "R", "Verilog", "MATLAB", "LaTeX"],
  mlFrameworks: ["PyTorch", "HuggingFace Transformers", "XGBoost", "scikit-learn", "Pandas/NumPy"],
  cloud: ["GCP", "Vertex AI", "Kubeflow", "BigQuery", "Cloud Build", "Pub/Sub"],
  tools: ["Docker", "FastAPI", "MongoDB", "CI/CD"],
  hardware: ["NGSpice", "MAGIC", "iVerilog"],
}

export const resumeSections = {
  skills: {
    languages: ["Python", "C/C++", "MATLAB", "Verilog", "JavaScript", "R", "LaTeX"],
    mlAndAI: ["PyTorch", "HuggingFace", "NumPy"],
    cloudAndMLOps: ["GCP", "Vertex AI", "Kubeflow", "Cloud Build", "Docker", "CI/CD"],
    tools: ["FastAPI", "MongoDB", "Git"],
    hardware: ["NGSpice", "MAGIC", "Verilog"],
  },
  interests: [
    "Medical Imaging AI",
    "Robust ML Systems",
    "Multimodal AI",
    "Human-Computer Interaction",
    "Debate",
    "Calisthenics",
    "Coffee",
    "Albert Camus",
  ],
}

export const contactCopy = {
  heading: "Let's connect",
  subheading: "I am always open to research collaborations, job opportunities, and talks worldwide",
  emailLabel: "Email",
  emailHint: "Click to copy",
  githubLabel: "GitHub",
  githubHandle: "@raagavramki",
  linkedinLabel: "LinkedIn",
  linkedinHandle: "Profile",
  emailToast: "Email copied to clipboard",
  emailToastError: "Unable to copy email on this browser",
  emailCta: "Email me",
}
export const footerNote = "{year} Raagav Ramakrishnan"

export const publicResearch = () => getVisible(researchCaseStudies)
export const publicEngineering = () => getVisible(engineeringCaseStudies)
export const featuredWork = () =>
  [...publicResearch(), ...publicEngineering()]
    .filter((c) => c.featuredOrder !== undefined)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))
    .slice(0, 4)

export const projectFilters: { key: ProjectFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "ml", label: "Machine Learning" },
  { key: "nlp", label: "NLP & Agents" },
  { key: "vision", label: "Computer Vision" },
  { key: "systems", label: "Systems & Hardware" },
]
