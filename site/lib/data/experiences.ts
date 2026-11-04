import type { Experience } from "./types"

/**
 * Single source for the homepage, CV page and About. Bullets follow the
 * deployed CV PDF (resume.pdf). End dates / "Present" and education status
 * must be re-verified because it is now November 2026.
 */
export const experiences: Experience[] = [
  {
    id: "dsac-research",
    kind: "research",
    title: "Undergraduate Researcher",
    unit: "Data Sciences and Analytics Center (DSAC)",
    org: "IIIT Hyderabad",
    advisor: "Prof. Nimmi Rangaswamy",
    time: "Jan 2025 – Present",
    topic: "Everyday HCI of Adaptive Fitness: The Bricolage of Self-Tracking in Urban India",
    bullets: [
      "Investigating how young adults in urban India assemble hybrid fitness-tracking ecologies across wearables, apps, gym routines, social media, trainer feedback, and embodied self-knowledge.",
      "Conducted field visits and semi-structured interviews with gym-goers to study motivation, identity formation, progress validation, and well-being grounded against Indian socio-material contexts.",
      "Used affinity mapping, thematic clustering, and HCI literature synthesis to analyze how users negotiate between quantified self-tracking, social influence, routine disruption, and intuitive/embodied judgement.",
      "Contributed to framing design implications for adaptive personal informatics systems that support approximate logging, routine breaks, private accountability, and culturally situated fitness practices.",
    ],
    archivedBullets: [
      "Studying how young adults bricolage fitness tools and social media practices to form identity, sustain motivation, and protect their well-being in gym cultures.",
      "Conducting field visits to local gyms and training spaces, supported by qualitative interviews and situated conversations with practitioners and regular gym-goers.",
      "Using affinity mapping and thematic clustering to identify patterns in self-tracking, progress validation, bodily discipline, and the negotiation of external influence (friends, influencers, community).",
      "Conduct ethnographic study through interviews and fields visits, to capture routines and struggles of urban Indians (18-28 years)",
      "Literature review across HCI, digital health, and sports science to contextualize hybrid self-tracking ecologies in India",
      "Qualitative Analysis is grounded by bricolage frameworks and emerges through affinity mapping",
      "We construct Design Implications to support hybrid tracking ecologies, and subjective temporal adaptation within socio-material contexts"
    ],
  },
  {
    id: "cloud-ambassadors",
    kind: "industry",
    title: "ML Research Engineer",
    org: "Cloud Ambassadors",
    orgNote: "Startup within the Google Ecosystem",
    location: "Remote",
    time: "Dec 2024 – Present",
    bullets: [
      "Built a glioma segmentation pipeline for 3D brain MRI on Google Cloud, connected to a clinical image viewer (PACS) so predictions can be reviewed the way radiologists work.",
      "Developed a dynamic pricing engine and automated its training, deployment and versioning on Google Cloud.",
      "Fine-tuned protein language models (ProtBERT, ESM-1b) with graph neural networks to predict the effect of mutations.",
    ],
    archivedBullets: [

      "Implemented continuous training and automated inference workflows using Vertex AI, Pub/Sub triggers, and Cloud Build CI/CD, with emphasis on reproducibility and rollout readiness.",
      "Developed a dynamic pricing engine using XGBoost, FastAPI, Docker, BigQuery, Kubeflow, and GCP services for training, inference, and model versioning.",
      "Built a glioma detection and segmentation pipeline for 3D-MRI workflows on GCP, with native PACS to connect model inference with clinical deployment considerations.",
      "Fine-tuned ProtBERT and ESM-1b models for mutation effect prediction; integrated Graph Neural Networks (Graphormer/MPNN) using protein contact maps to model structural dependencies.",
      "Building a glioma detection and segmentation pipeline for clinical workflows on GCP.",
      "Developed and deployed a production-grade Dynamic Pricing Engine using FastAPI and containerized services; built end-to-end pipelines on GCP using Kubeflow, BigQuery, and XGBoost.",
      "Shipped real-time video dubbing pipeline using Google/OpenAI/ElevenLabs APIs to support Hindi/Gujarati subtitles",
    ],
  },
  {
    id: "debate-club",
    kind: "leadership",
    title: "President, Debate Club",
    org: "IIIT Hyderabad",
    time: "Oct 2023 – Oct 2025",
    bullets: [
      "Grew the club to 50+ active members, with weekly debates and theory sessions.",
      "Built specialized teams for logistics, marketing, and design to handle the increased participation; tournament training for national competitions.",
    ],
    archivedBullets: ["Organized flagship Debate and MUN tournaments every year with 100+ participants."],
  },
]

export const education = [
  {
    degree: "B.Tech (Honors) in Electronics and Communication Engineering",
    institution: "IIIT Hyderabad",
    location: "Hyderabad, India",
    time: "2022 – 2026",
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
    details: ["Grade 10: 93%", "Grade 12: 95%"],
  },
]

/** From the CV's "Additional Experience" block. */
export const additional = [
  { title: "IDEOU Foundations in Design Thinking, with applied user research projects", time: "Aug 2021" },
  { title: 'TEDx Talk: "Clarity in a Changing World"', time: "Mar 2022" },
]

export const experienceByKind = (kind: Experience["kind"]) => experiences.filter((e) => e.kind === kind)
