export * from "./data/types"
export * from "./data/publications"
export * from "./data/experiences"
export * from "./data/visibility"
export { researchCaseStudies } from "./data/research"
export { engineeringCaseStudies, archiveProjects } from "./data/engineering"

import { engineeringCaseStudies } from "./data/engineering"
import { researchCaseStudies } from "./data/research"
import { getVisible } from "./data/visibility"
import type { ProjectCategory, ProjectFilter } from "./data/types"

export const profile = {
  name: "Raagav Ramakrishnan",
  kicker: ["ML Systems Engineering", "Agentic AI", "HCI"],
  headline: "I study how people interact with technology, and build intelligent systems around those insights.",
  subtitle:
    "Research across Human\u2013Computer Interaction, human\u2013AI interaction and machine learning. Electronics & Communication Engineering (Honors), IIIT Hyderabad.",
  roles: ["HCI & Human-AI Researcher", "ML Research Engineer", "Builder"],
  researchAreas: ["Human-Computer Interaction", "Human-AI interaction", "Social computing", "Digital health", "Adaptive systems", "ML systems"],
  location: "Hyderabad, India & Dubai, UAE",
  email: "raagav.ramakrishnan@students.iiit.ac.in",
  github: "https://github.com/raagavramki",
  linkedin: "https://www.linkedin.com/in/raagav-ramakrishnan-3905511b2",
  /** Single canonical CV. /assets/resume.pdf is a byte-identical legacy copy. */
  cvUrl: "/resume.pdf",
  avatar: "/assets/img/profile.webp",
}

export const researchQuestions = [
  "How do people assemble tools, social media and informal routines into their own self-tracking practices, and how do they adapt them as life changes?",
  "How should tracking and adaptive tools respond when a person's routine, goals and circumstances keep changing?",
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
  skills: [
    { label: "Languages", items: ["Python", "C", "C++", "R", "JavaScript", "HTML", "CSS", "LaTeX"] },
    { label: "ML & AI", items: ["PyTorch", "HuggingFace", "Transformers", "XGBoost", "Model evaluation & optimization"] },
    { label: "Cloud & MLOps", items: ["Google Cloud (BigQuery, Vertex AI, Pub/Sub, Cloud Build)", "Kubeflow", "Docker", "CI/CD", "Containerized deployment"] },
    { label: "Software engineering", items: ["Git", "Linux/Unix", "FastAPI", "REST APIs", "Testing & debugging"] },
    { label: "Data & tools", items: ["Pandas", "NumPy", "scikit-learn", "MongoDB", "Jupyter"] },
    { label: "Research & communication", items: ["Qualitative interviews", "Affinity mapping", "Thematic analysis", "Technical writing", "Public speaking"] },
  ],
}

export const interests = {
  research: [
    { title: "Human\u2013AI interaction", text: "How people trust, adapt to and work around intelligent systems, and what an adaptive tool should know about the person using it." },
    { title: "Everyday technology", text: "Self-tracking, digital health and how people adapt technology to fit their lives. The subject of my CHI EA work." },
    { title: "Medical imaging", text: "A segmentation score only matters if clinicians can inspect and trust the result, so I care about the pipeline around the model as much as the model." },
    { title: "Language beyond English", text: "Small models and tokenizers that give low-resource languages like Mizo a fair share of capacity." },
  ],
  life: [
    { title: "Debate", text: "Where I learned to reason clearly and critique my own arguments. Past president of the IIIT-H Debate Club." },
    { title: "Reading", text: "Psychology and literature, with Camus a constant: meaning, discipline and doing the work anyway." },
    { title: "Calisthenics", text: "Consistency beats intensity. Showing up every day is most of the trick." },
    { title: "Coffee", text: "A daily ritual I am irrationally serious about: grinding, brewing, tasting." },
  ],
}

export const contactCopy = {
  heading: "Get in touch",
  subheading: "I am open to research collaborations, engineering roles and talks.",
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
  { key: "vision", label: "Computer Vision" },
  { key: "nlp", label: "NLP & Agents" },
  { key: "ml", label: "Machine Learning" },
  { key: "systems", label: "Systems & Hardware" },
]

/** Display order and framing for the projects page. */
export const projectGroups: { key: ProjectCategory; title: string; blurb: string }[] = [
  { key: "vision", title: "Computer Vision & Medical Imaging", blurb: "Segmentation and recognition, from brain-tumour MRI to OCR." },
  { key: "nlp", title: "Language Models & Agents", blurb: "Retrieval-augmented agents and multilingual language models." },
  { key: "ml", title: "Machine Learning Foundations", blurb: "Models built from scratch to understand how they learn." },
  { key: "systems", title: "Hardware & Signals", blurb: "Processors, chip design and communication systems." },
]
