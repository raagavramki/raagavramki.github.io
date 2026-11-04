import type { CaseStudy } from "./types"

export const researchCaseStudies: CaseStudy[] = [
  {
    slug: "adaptive-fitness-tracking",
    kind: "research",
    visibility: "public",
    title: "Everyday HCI of Adaptive Fitness: The Bricolage of Self-Tracking in Urban India",
    problem: "How do young fitness practitioners in urban India adopt, negotiate and repurpose self-tracking technologies built around global assumptions?",
    methodLine: "24 semi-structured interviews + gym observation; inductive coding, affinity mapping; bricolage as analytical lens",
    statusLabel: "Published, CHI EA 2026",
    summary:
      "Digital fitness technologies assume stable users, universal meanings of fitness and access to advanced tools. In urban India, infrastructure limits and local context complicate those assumptions. Using bricolage as an analytical lens, this study draws on literature and qualitative fieldwork with 24 young fitness practitioners to show three themes: the creation of hybrid self-tracking ecologies, technology domestication through selective appropriation, and adaptation of tracking to local socio-material contexts. Fitness emerges as a situated, relational practice shaped by resource constraints and interpretive self-tracking.",
    seoDescription:
      "CHI EA 2026 qualitative study of how young practitioners in urban India repurpose fitness trackers through bricolage: hybrid ecologies, selective appropriation and local adaptation.",
    meta: [
      { label: "Venue", value: "CHI EA '26, Barcelona, 13-17 April 2026 (5 pages)" },
      { label: "Affiliation", value: "IIIT Hyderabad" },
      { label: "Period", value: "Jan 2025 – Apr 2026" },
      { label: "Collaborators", value: "Shivam Singh, Chetan Mahipal, Prof. Nimmi Rangaswamy" },
      {
        label: "My role",
        value:
          "Fieldwork (interviews and participant observation, with the first two co-authors), joint analysis and findings with all four authors, and contributing to the design implications.",
      },
    ],
    sections: [
      {
        id: "context",
        title: "Context and motivation",
        paragraphs: [
          "Dominant fitness-tracking research and products come from Global North contexts and emphasise individualised goals, numerical precision and performance optimisation. They assume stable users, universal meanings of fitness and access to advanced technology.",
          "Practice in urban India looks different. The 2018 India Report Card found that nearly half of Indian children and youth do not meet activity guidelines, partly because of limited and restrictive infrastructure. Existing Indian studies rely largely on surveys and gym logs, leaving open how practitioners actually adopt, interpret and repurpose technology in context.",
        ],
      },
      {
        id: "research-questions",
        title: "Research questions",
        bullets: [
          "How do young fitness practitioners in urban India adopt and negotiate self-tracking technologies?",
          "How do they combine digital and analogue tools into workable systems under resource and infrastructure constraints?",
          "What should designers take from these adaptive practices?",
        ],
      },
      {
        id: "methods",
        title: "Methods",
        bullets: [
          "Participants: 24 (P1-P24), aged 18-28, students and early-career professionals (gym-goers, bodybuilders, runners and newcomers to structured fitness); 12% women.",
          "Recruitment: gyms, running groups and snowball sampling in Hyderabad and Gwalior, where the authors had access.",
          "Data: 24 semi-structured interviews of 60-90 minutes (English, audio-recorded, transcribed manually) and in-situ observation across diverse gyms, with field notes on equipment use, peer dynamics and atmosphere.",
          "Analysis: inductive coding of transcripts and notes, then affinity mapping on digital sticky notes (Canva) with hierarchical clustering. Bricolage was an interpretive lens for refining themes, not a pre-defined coding framework.",
          "Ethics: informed consent, the right to withdraw, and removal of identifying details.",
        ],
      },
      {
        id: "contribution",
        title: "My contribution",
        paragraphs: [
          "The first three authors conducted the fieldwork; I took part in interviews and participant observation. Interview analysis and the development of findings were done collaboratively by all four authors. I also contributed to framing the design implications for adaptive personal informatics systems.",
        ],
      },
      {
        id: "findings",
        title: "Findings",
        paragraphs: [
          "Over time, participants became less dependent on digital metrics and prioritised an intuitive, body-led approach. Quotes below are from the paper, with participants identified only by code.",
        ],
        bullets: [
          "Hybrid self-tracking ecologies and everyday innovation: digital tools (apps, wearables) combined with analogue ones (journals, mirrors, memory). \"Before I could afford a Garmin, I made an Excel file with tabs for each muscle group.\" (P12) Participants showed everyday design literacy, repurposing tools and writing scripts.",
          "Embodied and affective feedback over metrics: sustained motivation came from bodily sensations, visual cues and social affirmation more than from numbers. \"Seeing yourself in the mirror after a workout, that's what motivates me.\" (P8)",
          "Localised, culturally embedded practice: platforms assume global lifestyles, so participants adapted them to Indian food, work, climate and family life. \"Most apps are Western-based. They assume you eat at 6 p.m.\" (P12)",
          "Adaptive engagement and goal setting: use moved in cycles with work pressure, injury, fatigue and life stage. \"When deadlines come up, I skip the gym.\" (P14)",
        ],
      },
      {
        id: "implications",
        title: "Design implications",
        bullets: [
          "Interoperable, user-extensible systems: data import and export, portability across platforms, template-based customisation for locally meaningful categories, and features that can be adopted, ignored or replaced without penalty.",
          "Subjective and temporal adaptation: treat breaks as normal rather than failure, pair numerical metrics with subjective markers, and offer phase-based templates for intensive tracking, maintenance and recovery.",
          "Socially situated goals: flexible goals and custom categories, and accountability as a negotiated social practice, with bounded audiences and user-mediated sharing instead of rank and exposure.",
        ],
        paragraphs: [
          "Taken together, the paper argues that long-term engagement depends less on metrics alone than on people's ability to recognise and act on subjective signals such as tiredness, recovery and energy.",
        ],
      },
      {
        id: "limitations",
        title: "Limitations and future work",
        paragraphs: [
          "The paper is an interpretive account bound to the scope of its qualitative dataset and settings (two cities, a young and mostly male sample), not a standardised model of fitness practice. The authors propose extending it to a full paper with a longer literature review and more diverse qualitative data. The findings on this page come from the CHI EA dataset only.",
        ],
      },
    ],
    artifacts: [
      { label: "Paper (DOI)", href: "https://doi.org/10.1145/3772363.3798708", kind: "paper" },
      { label: "Paper (PDF, CC BY 4.0)", href: "/papers/chi-ea-2026-adaptive-fitness.pdf", kind: "pdf" },
    ],
    publicationId: "chi-ea-2026-adaptive-fitness",
    featuredOrder: 1,
  },
  {
    slug: "ai-mediated-social-interaction",
    kind: "research",
    visibility: "draft",
    title: "AI-Mediated Social Interaction: Dating and Workplace Settings",
    problem: "{{TBD: research question}}",
    methodLine: "{{TBD: methods}}",
    statusLabel: "Ongoing research",
    summary:
      "Ongoing research on how AI mediates social interaction in dating and workplace settings. {{TBD: public-safe summary; no transcripts, participant details or supervisor-confidential material}}",
    seoDescription: "Ongoing research on AI-mediated social interaction in dating and workplace settings.",
    meta: [
      { label: "Status", value: "Ongoing research" },
      { label: "Period", value: "{{TBD}}" },
      { label: "My role", value: "{{TBD}}" },
    ],
    sections: [
      { id: "questions", title: "Research questions", paragraphs: ["{{TBD}}"] },
      { id: "methods", title: "Methods", paragraphs: ["{{TBD}}"] },
      { id: "progress", title: "Done so far versus planned", paragraphs: ["{{TBD}}"] },
    ],
    artifacts: [],
  },
]
