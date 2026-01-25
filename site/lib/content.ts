export type ProjectCategory = "all" | "medical" | "ml" | "systems"

export const profile = {
  name: "Raagav Ramakrishnan",
  kicker: "Computer Vision - ML Systems - AI for Healthcare",
  summary:
    "Undergraduate researcher at IIIT Hyderabad building reliable, clinically grounded AI systems for real-world healthcare environments.",
  roles: [
    "ML Research Engineer",
    "Medical Imaging AI",
    "Computer Vision",
  ],
  badges: [
    "Medical Imaging",
    "GCP / Vertex AI",
    "PyTorch",
  ],
  location: "Hyderabad, India",
  email: "raagav.ramakrishnan@students.iiit.ac.in",
  github: "https://github.com/raagavramki",
  linkedin: "https://www.linkedin.com/in/raagav-ramakrishnan-3905511b2",
  resumeUrl: "/assets/resume.pdf",
  avatar: "/assets/img/profile.jpg",
}

export const aboutCopy = {
  heading: "About",
  subheading: "Building human-centered AI for healthcare",
  paragraphs: [
    "I am an undergraduate researcher at IIIT Hyderabad working at the intersection of computer vision, ML systems, and AI for healthcare. My focus is on building reliable and clinically grounded solutions for real-world environments.",
    "Having spent my formative years in Dubai before moving to India, I have been exposed to healthcare systems that differ widely in infrastructure, access, and clinical workflows. This experience has shaped my long-term goal: developing human-centered AI systems that integrate heterogeneous clinical data and translate into real medical workflows across fragmented or resource-constrained healthcare settings.",
    "Currently, I work with Cloud Ambassadors as an ML Research Engineer, where I help establish and run their research efforts. My work focuses on medical imaging AI with an emphasis on end-to-end, deployment-aware systems rather than model-only benchmarks. I am actively working on MRI-based high-grade glioma analysis, covering model development and deployment on Google Cloud infrastructure.",
    "A key part of my work involves ensuring generalization across data sources, reliable detection, and outputs that support clinical trust. I think deeply about how AI-assisted medicine can extend beyond imaging alone to incorporate complementary modalities such as histopathology, particularly in the context of complex neurological diseases.",
  ],
  interests: [
    "Robust clinical behavior through principled uncertainty handling",
    "Multimodal integration of clinical data",
    "System-level considerations: latency, workflow integration, deployment",
    "Domain shift and generalization across scanners and institutions",
  ],
}

export const skills = {
  languages: ["Python", "C/C++", "JavaScript", "R", "Verilog", "MATLAB", "LaTeX"],
  mlFrameworks: ["PyTorch", "HuggingFace Transformers", "XGBoost", "scikit-learn", "Pandas/NumPy"],
  cloud: ["GCP", "Vertex AI", "Kubeflow", "BigQuery", "Cloud Build", "Pub/Sub"],
  tools: ["Docker", "FastAPI", "MongoDB", "CI/CD"],
  hardware: ["NGSpice", "MAGIC", "iVerilog"],
}

export const projects = [
  {
    category: "medical",
    meta: "Medical Imaging",
    title: "End-to-End Glioma Detection Pipeline",
    desc: "Building a complete pipeline for MRI-based high-grade glioma analysis: data handling, model training/evaluation, and integration into clinical workflows. Focus on generalization across scanners, reliability, and clinically interpretable outputs.",
    tags: ["PyTorch", "GCP", "Medical Imaging"],
    href: "#",
    featured: true,
  },
  {
    category: "ml",
    meta: "Computer Vision",
    title: "Vision Transformer from Scratch",
    desc: "Implemented ViT & DiffViT in PyTorch on CIFAR-10; reached 84.38% test accuracy. Benchmarked 11 configs and visualized attention rollout.",
    tags: ["PyTorch", "Python", "CIFAR-10"],
    href: "https://github.com/raagavramki/vision-transformer",
    featured: true,
  },
  {
    category: "ml",
    meta: "Segmentation",
    title: "FCNs for Street-Scene Segmentation",
    desc: "Built FCN-32s/16s/8s with VGG backbone and skip connections; achieved 83.3% mIoU on a 13-class dataset.",
    tags: ["PyTorch", "VGG", "Segmentation"],
    href: "https://github.com/raagavramki/FCN",
    featured: false,
  },
  {
    category: "ml",
    meta: "OCR",
    title: "CNN-RNN OCR Pipeline",
    desc: "Hybrid CNN + Bi-LSTM with attention for word-level OCR. Trained on a synthetic dataset; 99.1% character-level accuracy.",
    tags: ["PyTorch", "Attention", "OCR"],
    href: "https://github.com/raagavramki/OCR-CNN-RNN",
    featured: false,
  },
  {
    category: "ml",
    meta: "Foundations",
    title: "MLP from Scratch (NumPy)",
    desc: "Configurable layers, activations, optimizers, and losses to demystify backprop and gradient flow.",
    tags: ["NumPy", "Python", "Education"],
    href: "https://github.com/raagavramki/MLP--from-scratch",
    featured: false,
  },
  {
    category: "systems",
    meta: "Communications",
    title: "BPSK Audio Transceiver (MATLAB)",
    desc: "End-to-end BPSK over AWGN; compared rectangular vs. raised-cosine pulse shaping via BER and constellation analysis.",
    tags: ["MATLAB", "BPSK", "BER"],
    href: "https://github.com/raagavramki/BPSK-Modulation",
    featured: false,
  },
  {
    category: "systems",
    meta: "Architecture",
    title: "Y86-64 Pipelined Processor",
    desc: "Five-stage pipeline with hazard detection and forwarding; validated on iVerilog with custom ISA tests.",
    tags: ["Verilog", "Pipeline", "CPU"],
    href: "https://github.com/raagavramki/Y86-64-ISA-Processor",
    featured: false,
  },
  {
    category: "systems",
    meta: "VLSI",
    title: "VLSI Micro-Projects",
    desc: "RTL-to-layout flow (NGSpice, MAGIC) for small blocks incl. a 4-bit ALU; DRC/LVS-clean layouts and leakage analyses.",
    tags: ["Verilog", "NGSpice", "MAGIC"],
    href: "https://github.com/raagavramki/VLSI-Project",
    featured: false,
  },
] satisfies Array<{
  category: ProjectCategory
  meta: string
  title: string
  desc: string
  tags: string[]
  href: string
  featured: boolean
}>

export const projectFilters = [
  { key: "all", label: "All" },
  { key: "medical", label: "Medical AI" },
  { key: "ml", label: "Deep Learning" },
  { key: "systems", label: "Systems" },
] satisfies Array<{ key: ProjectCategory; label: string }>

// Resume page - structured like Eda Aydin's
export const resumeSections = {
  education: [
    {
      degree: "B.Tech (Hons.) in Electronics and Communication Engineering",
      institution: "IIIT Hyderabad",
      location: "Hyderabad, India",
      time: "2022 - 2026 (Expected)",
      details: [
        "Focus: Machine Learning, Computer Vision, Signal Processing",
        "Relevant coursework: Deep Learning, Digital Signal Processing, Computer Architecture",
      ],
    },
  ],
  workExperience: [
    {
      title: "ML Research Engineer",
      company: "Cloud Ambassadors",
      companyNote: "Google Ecosystem Startup",
      location: "Remote",
      time: "Dec 2024 - Present",
      bullets: [
        "Leading medical imaging AI research with focus on MRI-based high-grade glioma analysis",
        "Building end-to-end pipelines on GCP: model development, training, and deployment on Vertex AI",
        "Shipped real-time dubbing pipeline using Google + OpenAI + ElevenLabs APIs; built phonetic pre-processor for Hindi/Gujarati",
        "Designed Kubeflow + Vertex AI dynamic-pricing engine pipeline (XGBoost); automated CI/CD via Cloud Build & Pub/Sub",
        "Fine-tuned ProtBert & ESM-1b for mutation-effect prediction; explored Graph Transformers on AlphaFold2 embeddings",
      ],
    },
  ],
  researchExperience: [
    {
      title: "Undergraduate Researcher",
      lab: "DSAC Lab",
      institution: "IIIT Hyderabad",
      advisor: "Dr. Nimmi Rangaswamy",
      time: "Jan 2025 - Present",
      topic: "Digital and Analog Tracking Methodologies in Physical Fitness and Wellness",
      bullets: [
        "Conducting ethnographic study with interviews of Indian youth (18-30y), capturing routines and struggles",
        "Literature review across HCI and tracking methods to identify cultural gaps",
        "Affinity mapping to cluster insights into themes",
      ],
    },
  ],
  skills: {
    languages: ["Python", "C/C++", "JavaScript", "R", "Verilog", "MATLAB", "LaTeX"],
    mlAndAI: ["PyTorch", "HuggingFace Transformers", "XGBoost", "scikit-learn", "Pandas", "NumPy"],
    cloudAndMLOps: ["GCP", "Vertex AI", "Kubeflow", "BigQuery", "Cloud Build", "Docker", "CI/CD"],
    tools: ["FastAPI", "MongoDB", "Git"],
    hardware: ["NGSpice", "MAGIC", "iVerilog", "SPICE"],
  },
  interests: [
    "Medical Imaging AI",
    "Robust ML Systems",
    "Multimodal Clinical Data",
    "Human-Computer Interaction",
    "Competitive Debate",
  ],
}

export const contactCopy = {
  heading: "Let's connect",
  subheading: "Open to research collaborations, internship opportunities, and discussions about AI in healthcare.",
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
