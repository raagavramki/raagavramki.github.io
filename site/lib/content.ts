export type ProjectCategory = "all" | "ml" | "vision" | "nlp" | "agentic" | "electronics"

export const profile = {
  name: "Raagav Ramakrishnan",
  kicker: ["Computer Vision", "ML Systems", "AI for Healthcare"],
  summary:
    "Undergraduate researcher at IIIT Hyderabad building reliable, clinically grounded AI systems for real-world healthcare environments.",
  roles: [
    "ML Research Engineer",
    "Debater",
    "Builder",
  ],
  location: "Hyderabad, India & Dubai, UAE",
  email: "raagav.ramakrishnan@students.iiit.ac.in",
  github: "https://github.com/raagavramki",
  linkedin: "https://www.linkedin.com/in/raagav-ramakrishnan-3905511b2",
  resumeUrl: "/assets/resume.pdf",
  avatar: "/assets/img/profile.webp",
}

export const aboutCopy = {
  heading: "About",
  subheading: "Computer Vision + ML systems: currently applied to healthcare",
  paragraphs: [
    "I am an undergraduate researcher at IIIT Hyderabad working across computer vision and ML systems. I am currently applying that toolkit to healthcare, influenced by HCI, to build systems that go beyond raw accuracy, to build trustworthy, reliable, and human-centric AI solutions.",
    "Tech matters to me because it changes outcomes when it is built to face reality. That is why I am drawn to healthcare: the stakes are high, the constraints are real, and usefulness depends on how well a system fits clinicians, patients, and infrastructure. Having lived in both Dubai and India, I've seen firsthand how the same problem looks completely different across settings—different access patterns, operational maturity, and resource constraints—which now directly shapes how I design and build: for heterogeneous data, imperfect environments, and tools that integrate into real routines rather than existing as standalone demos.",
    "Currently, I work with Cloud Ambassadors as an ML Research Engineer, where I help establish and run their research efforts. My work focuses on medical imaging AI with an emphasis on end-to-end, deployment-aware systems rather than model-only benchmarks. I am actively working on MRI-based high-grade glioma analysis, covering model development on Google Cloud infrastructure.",
    "Outside of work, I've been a debater for years, and I'm usually reading something-either psychology or literature, or anything I'm drawn to at the moment. I'm also a calisthenics and strength athlete and take coffee a lil too seriously.",
    "Please feel free to review my work or contact me with any questions or collaboation opportunities, I'd love to connect!"
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
  // Agentic AI
  {
    category: "agentic",
    meta: "Agentic AI",
    title: "Neuroanatomy SME Agent",
    desc: "Full embedding and retrieval pipeline with batch ingestion, multi-granularity chunk-graph construction, BioLORD embeddings, and hybrid FAISS/Elasticsearch search with BGE reranking. Custom LangChain-style reasoning and tool-calling with browser UI for chat, QA/quiz, and document export.",
    tags: ["HuggingFace", "PyTorch", "LangChain"],
    href: "https://github.com/raagavramki/Subject-Matter-Expert-Agentic-AI",
    featured: true,
  },
  // NLP
  {
    category: "nlp",
    meta: "NLP",
    title: "Multilingual SLM",
    desc: "Built a 3B-token multilingual corpus (English, Tamil, Mizo) from scratch. Trained 96k-vocab Unigram tokenizer and pretrained 140M-parameter Gemma3 LM achieving 2.74 train perplexity. Fine-tuned with LoRA for FAQ generation (12.7 PPL) and synonym substitution (1.73 PPL).",
    tags: ["HuggingFace", "PyTorch", "LoRA"],
    href: "https://github.com/raagavramki/multilingual-slm",
    featured: true,
  },
  // Vision
  {
    category: "vision",
    meta: "Vision",
    title: "Vision Transformers from Scratch",
    desc: "Implemented ViT and Differential ViT on CIFAR-10 from scratch. Achieved 83.69% accuracy with ViT and 84.38% with DiffViT after benchmarking 11 configurations. Produced DINO attention maps and hyperparameter tuning analysis.",
    tags: ["PyTorch", "Transformers", "CIFAR-10"],
    href: "https://github.com/raagavramki/vision-transformer",
    featured: true,
  },
  {
    category: "vision",
    meta: "Vision",
    title: "FCN Semantic Segmentation",
    desc: "Built FCN-32, 16, 8 with VGG-16 backbone and bilinear upsampling. Achieved 83.3% test mIoU on 13-class dataset with fine-tuned backbone. Optimized data pipelines and batch scheduling for improved GPU utilization.",
    tags: ["PyTorch", "VGG", "Segmentation"],
    href: "https://github.com/raagavramki/FCN",
    featured: false,
  },
  // ML
  {
    category: "ml",
    meta: "ML",
    title: "CNN-RNN OCR Pipeline",
    desc: "Hybrid deep learning pipeline using CNNs for feature extraction and RNNs with integrated attention mechanisms. Achieved 99.1% character-level accuracy (ANCC) on word-level OCR tasks.",
    tags: ["PyTorch", "Attention", "OCR"],
    href: "https://github.com/raagavramki/OCR-CNN-RNN",
    featured: false,
  },
  {
    category: "ml",
    meta: "ML",
    title: "MLP from Scratch",
    desc: "Implemented MLP from scratch supporting customizable hidden layers, activation functions, and optimization methods. Built to develop intuition for gradient flow and model training dynamics.",
    tags: ["NumPy", "Python", "Matplotlib"],
    href: "https://github.com/raagavramki/MLP--from-scratch",
    featured: false,
  },
  // Electronics & Signals
  {
    category: "electronics",
    meta: "Electronics & Signals",
    title: "Y86-64 Pipelined Processor",
    desc: "Pipelined implementation of Y86-64 instruction-level processor with intermediate registers for optimized instruction throughput. Includes hazard detection and solutions, validated through waveform-based testbenches.",
    tags: ["Verilog", "Pipeline", "CPU"],
    href: "https://github.com/raagavramki/Y86-64-ISA-Processor",
    featured: false,
  },
  {
    category: "electronics",
    meta: "Electronics & Signals",
    title: "BPSK Modulation System",
    desc: "Binary Phase Shift Keying system for audio transmission over AWGN and noiseless channels. Implemented rectangular and raised cosine pulse shaping modulation for ISI analysis.",
    tags: ["MATLAB", "DSP", "Communications"],
    href: "https://github.com/raagavramki/BPSK-Modulation",
    featured: false,
  },
  {
    category: "electronics",
    meta: "Electronics & Signals",
    title: "4-bit ALU Design",
    desc: "Complete ALU design flow from Verilog modules through gate-level NGSpice simulations to transistor-level NMOS/PMOS designs. Layout verification using MAGIC with DRC/LVS-clean outputs.",
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
  { key: "ml", label: "ML" },
  { key: "vision", label: "Vision" },
  { key: "nlp", label: "NLP" },
  { key: "agentic", label: "Agentic AI" },
  { key: "electronics", label: "Electronics & Signals" },
] satisfies Array<{ key: ProjectCategory; label: string }>

// Resume page - structured like Eda Aydin's
export const resumeSections = {
  education: [
    {
      degree: "B.Tech (Honors) in Electronics and Communication Engineering",
      institution: "IIIT Hyderabad",
      location: "Hyderabad, India",
      time: "2022 - 2026 (Expected)",
      details: [
        "Focus: Machine Learning, Computer Vision, Signal Processing",
        "Relevant coursework: Deep Learning, Digital Signal Processing, Computer Architecture",
      ],
    },
    {
      degree: "High School Diploma (CBSE)",
      institution: "The Millennium School",
      location: "Dubai, UAE",
      time: "June 2022",
      details: [
        "Grade 10: 93%",
        "Grade 12: 95%",
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
        "Lead AI research directed towards Medical Imaging Pipelines",
        "Fine-tuned ProtBert & ESM-1b for mutation-effect prediction; explored Graph Transformers on AlphaFold2 embeddings",
        "Designed Kubeflow + Vertex AI dynamic-pricing engine end-to-end pipeline; automated CI/CD via Cloud Build and Pub/Sub",
        "Shipped real-time video dubbing pipeline using Google/OpenAI/ElevenLabs APIs to support Hindi/Gujarati subtitles",
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
      topic: "Everyday HCI of Adaptive Fitness: The Bricolage of Self-Tracking in Urban India",
      bullets: [
        "Conduct ethnographic study through interviews and fields visits, to capture routines and struggles of urban Indians (18-28 years)",
        "Literature review across HCI, digital health, and sports science to contextualize hybrid self-tracking ecologies in India",
        "Qualitative Analysis is grounded by bricolage frameworks and emerges through affinity mapping",
        "We construct Design Implications to support hybrid tracking ecologies, and subjective temporal adaptation within socio-material contexts",
      ],
    },
  ],
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
