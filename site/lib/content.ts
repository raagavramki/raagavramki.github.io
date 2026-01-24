export type ProjectCategory = "all" | "ml" | "hw" | "comm"

export const profile = {
  name: "Raagav Ramakrishnan",
  kicker: "ML Systems - AI for Healthcare - Medical Imaging - HCI",
  summary:
    "B.Tech (Hons.) ECE @ IIIT-H (2022-2026). I build ML systems and research how technology changes people and practice.",
  roles: ["ML Systems Engineer", "AI for Healthcare", "Researcher (HCI x ML)", "Debater"],
  badges: ["GCP - Vertex AI - Kubeflow", "PyTorch - Transformers", "Medical Imaging"],
  email: "raagav.ramakrishnan@students.iiit.ac.in",
  github: "https://github.com/raagavramki",
  linkedin: "https://www.linkedin.com/in/raagav-ramakrishnan-3905511b2",
  resumeUrl: "/assets/resume.pdf",
  avatar: "/assets/img/profile.jpg",
}

export const aboutCopy = {
  heading: "About",
  subheading: "A quick snapshot of what I care about and what I build.",
  paragraphOne:
    "I'm an undergraduate at IIIT Hyderabad working at the intersection of ML Systems, AI for healthcare, and Human-Computer Interaction. I like pushing ideas from math -> code -> real workflows.",
  paragraphTwo:
    "Recently: clinical ML pipelines on GCP, segmentation + transformers in PyTorch, and field research on how young adults use (and resist) fitness tech.",
}

export const skills = [
  "Python",
  "C/C++",
  "JavaScript",
  "R",
  "Verilog",
  "MATLAB",
  "LaTeX",
  "PyTorch",
  "HuggingFace",
  "Transformers",
  "XGBoost",
  "scikit-learn",
  "Pandas/NumPy",
  "FastAPI",
  "Docker",
  "CI/CD",
  "GCP",
  "BigQuery",
  "Vertex AI",
  "Kubeflow",
  "MongoDB",
  "SPICE",
  "MAGIC",
]

export const projects = [
  {
    category: "ml",
    meta: "Computer Vision",
    title: "Vision Transformer from Scratch",
    desc: "Implemented ViT & DiffViT in PyTorch on CIFAR-10; reached 84.38% test accuracy. Benchmarked 11 configs and visualized attention rollout.",
    tags: ["PyTorch", "Python", "CIFAR-10"],
    href: "https://github.com/raagavramki/vision-transformer",
  },
  {
    category: "ml",
    meta: "Segmentation",
    title: "FCNs for Street-Scene Segmentation",
    desc: "Built FCN-32s/16s/8s with VGG backbone and skip connections; achieved 83.3% mIoU on a 13-class dataset.",
    tags: ["PyTorch", "VGG", "mIoU"],
    href: "https://github.com/raagavramki/FCN",
  },
  {
    category: "ml",
    meta: "OCR",
    title: "CNN-RNN OCR Pipeline",
    desc: "Hybrid CNN + Bi-LSTM with attention for word-level OCR. Trained on a synthetic dataset; 99.1% character-level accuracy.",
    tags: ["PyTorch", "Attention", "OCR"],
    href: "https://github.com/raagavramki/OCR-CNN-RNN",
  },
  {
    category: "ml",
    meta: "Foundations",
    title: "MLP from Scratch (NumPy)",
    desc: "Configurable layers, activations, optimizers, and losses to demystify backprop and gradient flow.",
    tags: ["NumPy", "Python", "Education"],
    href: "https://github.com/raagavramki/MLP--from-scratch",
  },
  {
    category: "comm",
    meta: "Communications",
    title: "BPSK Audio Transceiver (MATLAB)",
    desc: "End-to-end BPSK over AWGN; compared rectangular vs. raised-cosine pulse shaping via BER and constellation analysis.",
    tags: ["MATLAB", "BPSK", "BER"],
    href: "https://github.com/raagavramki/BPSK-Modulation",
  },
  {
    category: "hw",
    meta: "Architecture",
    title: "Y86-64 Pipelined Processor (Verilog)",
    desc: "Five-stage pipeline with hazard detection and forwarding; validated on iVerilog with custom ISA tests.",
    tags: ["Verilog", "Pipeline", "CPU"],
    href: "https://github.com/raagavramki/Y86-64-ISA-Processor",
  },
  {
    category: "hw",
    meta: "VLSI",
    title: "VLSI Micro-Projects (ALU, Layout, Leakage)",
    desc: "RTL-to-layout flow (NGSpice, MAGIC) for small blocks incl. a 4-bit ALU; DRC/LVS-clean layouts and leakage analyses.",
    tags: ["Verilog", "NGSpice", "MAGIC"],
    href: "https://github.com/raagavramki/VLSI-Project",
  },
] satisfies Array<{
  category: ProjectCategory
  meta: string
  title: string
  desc: string
  tags: string[]
  href: string
}>

export const projectFilters = [
  { key: "all", label: "All" },
  { key: "ml", label: "Deep Learning" },
  { key: "hw", label: "Hardware" },
  { key: "comm", label: "Communications" },
] satisfies Array<{ key: ProjectCategory; label: string }>

export const resumeCopy = {
  heading: "Resume",
  education: "B.Tech (Hons.) ECE @ IIIT-H (2022-2026).",
  researchHeading: "Research",
  researchSubheading: "Work spanning HCI field studies and applied ML.",
  industryHeading: "Industry",
  industrySubheading: "Production ML + pipelines, with a focus on reliability and shipping.",
  experienceLabel: "Experience",
}

export const research = {
  time: "Jan 2025 - present",
  title: "Undergraduate Researcher - DSAC, IIIT Hyderabad",
  advisor: "Advised by Dr. Nimmi Rangaswamy",
  topic: "How do people bricolage Digital and Analog tracking methodologies in Physical Fitness and Wellness?",
  bullets: [
    "Conducting ethnographic study with interviews of Indian youth (18-30y), capturing routines and struggles.",
    "Literature review across HCI and tracking methods to identify cultural gaps.",
    "Affinity mapping to cluster insights into themes.",
  ],
}

export const industry = {
  time: "Dec 2024 - present",
  title: "ML Research Engineer - Cloud Ambassadors (Google Ecosystem Startup)",
  location: "Remote",
  bullets: [
    "Shipped real-time dubbing pipeline using Google + OpenAI + ElevenLabs APIs; built phonetic pre-processor for Hindi/Gujarati.",
    "Designed Kubeflow + Vertex AI dynamic-pricing engine pipeline (XGBoost); automated CI/CD via Cloud Build & Pub/Sub.",
    "Fine-tuned ProtBert & ESM-1b for mutation-effect prediction; explored Graph Transformers on AlphaFold2 embeddings.",
  ],
}

export const contactCopy = {
  heading: "Let's connect",
  subheading: "Open to research collaborations, open-source work, and speaking/debate invitations.",
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

export const footerNote = "{year} Raagav Ramakrishnan - Built with Next.js + TypeScript."
