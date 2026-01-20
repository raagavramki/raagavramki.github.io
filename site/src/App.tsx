import { useEffect, useMemo, useRef, useState } from 'react'

type ProjectCategory = 'all' | 'ml' | 'hw' | 'comm'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

function useTypewriter(words: string[]) {
  const [text, setText] = useState('')
  const iRef = useRef(0)
  const jRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    let t: number | undefined

    const loop = () => {
      const i = iRef.current
      const j = jRef.current
      const deleting = deletingRef.current
      const word = words[i] ?? ''

      setText(word.substring(0, j))

      if (!deleting && j < word.length) {
        jRef.current = j + 1
        t = window.setTimeout(loop, 90)
      } else if (!deleting && j === word.length) {
        deletingRef.current = true
        t = window.setTimeout(loop, 1500)
      } else if (deleting && j > 0) {
        jRef.current = j - 1
        t = window.setTimeout(loop, 40)
      } else {
        deletingRef.current = false
        iRef.current = (i + 1) % words.length
        t = window.setTimeout(loop, 450)
      }
    }

    loop()
    return () => {
      if (t) window.clearTimeout(t)
    }
  }, [words])

  return text
}

export default function App() {
  const typeLine = useTypewriter([
    'ML Systems Engineer',
    'AI for Healthcare',
    'Researcher (HCI × ML)',
    'Debater',
  ])

  const year = useMemo(() => String(new Date().getFullYear()), [])
  const [navOpen, setNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<(typeof SECTIONS)[number]['id']>('about')
  const [progress, setProgress] = useState(0)
  const [showToTop, setShowToTop] = useState(false)
  const [filter, setFilter] = useState<ProjectCategory>('all')

  // scroll progress + to-top
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || document.body.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setProgress(Math.min(1, Math.max(0, p)))
      setShowToTop(scrollTop > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scrollspy
  useEffect(() => {
    const targets = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    if (!('IntersectionObserver' in window) || targets.length === 0) return

    const io = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (visible?.target && (visible.target as HTMLElement).id) {
          setActiveSection((visible.target as HTMLElement).id as typeof activeSection)
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.2, 0.35, 0.5] },
    )

    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])

  const projects = [
    {
      category: 'ml' as const,
      meta: 'Computer Vision',
      title: 'Vision Transformer from Scratch',
      desc: 'Implemented ViT & DiffViT in PyTorch on CIFAR-10; reached 84.38% test accuracy. Benchmarked 11 configs and visualized attention rollout.',
      tags: ['PyTorch', 'Python', 'CIFAR-10'],
      href: 'https://github.com/raagavramki/vision-transformer',
    },
    {
      category: 'ml' as const,
      meta: 'Segmentation',
      title: 'FCNs for Street-Scene Segmentation',
      desc: 'Built FCN-32s/16s/8s with VGG backbone and skip connections; achieved 83.3% mIoU on a 13-class dataset.',
      tags: ['PyTorch', 'VGG', 'mIoU'],
      href: 'https://github.com/raagavramki/FCN',
    },
    {
      category: 'ml' as const,
      meta: 'OCR',
      title: 'CNN-RNN OCR Pipeline',
      desc: 'Hybrid CNN + Bi-LSTM with attention for word-level OCR. Trained on a synthetic dataset; 99.1% character-level accuracy.',
      tags: ['PyTorch', 'Attention', 'OCR'],
      href: 'https://github.com/raagavramki/OCR-CNN-RNN',
    },
    {
      category: 'ml' as const,
      meta: 'Foundations',
      title: 'MLP from Scratch (NumPy)',
      desc: 'Configurable layers, activations, optimizers, and losses to demystify backprop and gradient flow.',
      tags: ['NumPy', 'Python', 'Education'],
      href: 'https://github.com/raagavramki/MLP--from-scratch',
    },
    {
      category: 'comm' as const,
      meta: 'Communications',
      title: 'BPSK Audio Transceiver (MATLAB)',
      desc: 'End-to-end BPSK over AWGN; compared rectangular vs. raised-cosine pulse shaping via BER and constellation analysis.',
      tags: ['MATLAB', 'BPSK', 'BER'],
      href: 'https://github.com/raagavramki/BPSK-Modulation',
    },
    {
      category: 'hw' as const,
      meta: 'Architecture',
      title: 'Y86-64 Pipelined Processor (Verilog)',
      desc: 'Five-stage pipeline with hazard detection and forwarding; validated on iVerilog with custom ISA tests.',
      tags: ['Verilog', 'Pipeline', 'CPU'],
      href: 'https://github.com/raagavramki/Y86-64-ISA-Processor',
    },
    {
      category: 'hw' as const,
      meta: 'VLSI',
      title: 'VLSI Micro-Projects (ALU, Layout, Leakage)',
      desc: 'RTL-to-layout flow (NGSpice, MAGIC) for small blocks incl. a 4-bit ALU; DRC/LVS-clean layouts and leakage analyses.',
      tags: ['Verilog', 'NGSpice', 'MAGIC'],
      href: 'https://github.com/raagavramki/VLSI-Project',
    },
  ]

  const visibleProjects = projects.filter(p => filter === 'all' || p.category === filter)

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <div id="scroll-progress" aria-hidden="true" style={{ width: `${progress * 100}%` }} />

      <header id="top">
        <nav className="nav" aria-label="Primary">
          <div className="nav-inner">
            <a href="#top" className="logo">
              Raagav<span className="dot">.</span>
            </a>

            <button
              className="nav-toggle"
              aria-expanded={navOpen}
              aria-controls="nav-menu"
              aria-label={navOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setNavOpen(v => !v)}
              type="button"
            >
              <span />
            </button>

            <ul id="nav-menu" className={`nav-menu ${navOpen ? 'open' : ''}`}>
              {SECTIONS.map(s => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={activeSection === s.id ? 'active' : ''}
                    onClick={() => setNavOpen(false)}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="nav-cta">
                <a className="btn btn-small" href="./assets/resume.pdf" target="_blank" rel="noreferrer">
                  <span className="btn-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" />
                      <path
                        d="M8 13h8M8 17h8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-text">
              <p className="kicker">ML Systems • AI for Healthcare • Medical Imaging • HCI</p>
              <h1>
                Raagav Ramakrishnan
                <span className="type-line">
                  <span id="type-writer">{typeLine}</span>
                </span>
              </h1>
              <p className="lede">
                B.Tech (Hons.) ECE @ IIIT-H (2022–2026). I build ML systems and research how technology changes people and
                practice.
              </p>

              <div className="hero-cta">
                <a href="#projects" className="btn" onClick={() => setNavOpen(false)}>
                  Explore work
                </a>
                <a href="mailto:raagav.ramakrishnan@students.iiit.ac.in" className="btn btn-ghost">
                  Email me
                </a>
                <a className="btn btn-outline" href="./assets/resume.pdf" target="_blank" rel="noreferrer">
                  Open resume
                </a>
              </div>

              <div className="social-row" aria-label="Social links">
                <a className="icon-link" href="mailto:raagav.ramakrishnan@students.iiit.ac.in" aria-label="Email">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
                    <path
                      d="m4 7 8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a className="icon-link" href="https://github.com/raagavramki" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.17-3.37-1.17-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1.01.07 1.55 1.04 1.55 1.04.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.04-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.1 2.65.65.7 1.04 1.59 1.04 2.68 0 3.85-2.34 4.7-4.58 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </a>
                <a
                  className="icon-link"
                  href="https://www.linkedin.com/in/raagav-ramakrishnan-3905511b2"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6.5 9.5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M6.5 6.5h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
                    <path
                      d="M10.5 19v-5.2c0-1.84 1.16-3.3 3.1-3.3 1.9 0 2.9 1.28 2.9 3.3V19"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M10.5 9.5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="avatar-wrap" aria-hidden="true">
                <img src="./assets/img/profile.jpg" alt="Raagav portrait" />
              </div>
              <div className="hero-badges" aria-hidden="true">
                <span className="badge">GCP • Vertex AI • Kubeflow</span>
                <span className="badge">PyTorch • Transformers</span>
                <span className="badge">Medical Imaging</span>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main id="main">
        <section id="about" className="section" data-reveal>
          <div className="container">
            <div className="section-head">
              <h2>About</h2>
              <p className="muted">A quick snapshot of what I care about and what I build.</p>
            </div>

            <div className="about-grid">
              <div className="prose card lift">
                <p>
                  I’m an undergraduate at IIIT Hyderabad working at the intersection of <strong>ML Systems</strong>,{' '}
                  <strong>AI for healthcare</strong>, and <strong>Human-Computer Interaction</strong>. I like pushing ideas
                  from math → code → real workflows.
                </p>
                <p className="muted">
                  Recently: clinical ML pipelines on GCP, segmentation + transformers in PyTorch, and field research on how
                  young adults use (and resist) fitness tech.
                </p>
              </div>

              <section id="skills" className="card lift">
                <h3>Skills & tooling</h3>
                <div className="pill-grid" aria-label="Skills list">
                  {[
                    'Python',
                    'C/C++',
                    'JavaScript',
                    'R',
                    'Verilog',
                    'MATLAB',
                    'LaTeX',
                    'PyTorch',
                    'HuggingFace',
                    'Transformers',
                    'XGBoost',
                    'scikit-learn',
                    'Pandas/NumPy',
                    'FastAPI',
                    'Docker',
                    'CI/CD',
                    'GCP',
                    'BigQuery',
                    'Vertex AI',
                    'Kubeflow',
                    'MongoDB',
                    'SPICE',
                    'MAGIC',
                  ].map(s => (
                    <span className="pill" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        <section id="projects" className="section" data-reveal>
          <div className="container">
            <div className="section-head">
              <h2>Projects</h2>
              <p className="muted">Selected work across deep learning, systems, and hardware.</p>
            </div>

            <div className="filter-buttons" aria-label="Project filters">
              {(
                [
                  { key: 'all', label: 'All' },
                  { key: 'ml', label: 'Deep Learning' },
                  { key: 'hw', label: 'Hardware' },
                  { key: 'comm', label: 'Communications' },
                ] as const
              ).map(b => (
                <button
                  key={b.key}
                  data-filter={b.key}
                  className={filter === b.key ? 'active' : ''}
                  onClick={() => setFilter(b.key)}
                  type="button"
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div className="project-grid">
              {visibleProjects.map(p => {
                return (
                  <article key={p.title} className="card project-card lift show">
                    <div className="card-body">
                      <div className="card-top">
                        <span className="mini-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M4 12h16"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            <path
                              d="M12 4v16"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <span className="meta">{p.meta}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <div className="tags">
                        {p.tags.map(t => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      <a href={p.href} target="_blank" rel="noreferrer" className="btn-text">
                        Code →
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="research" className="section alt" data-reveal>
          <div className="container">
            <div className="section-head">
              <h2>Research</h2>
              <p className="muted">Work spanning HCI field studies and applied ML.</p>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <time>Jan 2025 – present</time>
                <h3>Undergraduate Researcher · DSAC, IIIT Hyderabad</h3>
                <p>
                  <em>Advised by Dr. Nimmi Rangaswamy</em>
                </p>
                <p>“How do people bricolage Digital and Analog tracking methodologies in Physical Fitness and Wellness?”</p>
                <ul>
                  <li>Conducting ethnographic study with interviews of Indian youth (18–30y), capturing routines and struggles.</li>
                  <li>Literature review across HCI and tracking methods to identify cultural gaps.</li>
                  <li>Affinity mapping to cluster insights into themes.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section" data-reveal>
          <div className="container">
            <div className="section-head">
              <h2>Industry</h2>
              <p className="muted">Production ML + pipelines, with a focus on reliability and shipping.</p>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <time>Dec 2024 – present</time>
                <h3>ML Research Engineer · Cloud Ambassadors (Google Ecosystem Startup)</h3>
                <p>
                  <em>Remote</em>
                </p>
                <ul>
                  <li>Shipped real-time dubbing pipeline using Google + OpenAI + ElevenLabs APIs; built phonetic pre-processor for Hindi/Gujarati.</li>
                  <li>Designed Kubeflow + Vertex AI dynamic-pricing engine pipeline (XGBoost); automated CI/CD via Cloud Build & Pub/Sub.</li>
                  <li>Fine-tuned ProtBert & ESM-1b for mutation-effect prediction; explored Graph Transformers on AlphaFold2 embeddings.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section alt" data-reveal>
          <div className="container">
            <div className="section-head">
              <h2>Let’s connect</h2>
              <p className="muted">Open to research collaborations, open-source work, and speaking/debate invitations.</p>
            </div>
            <div className="contact-grid">
              <button
                className="contact-card"
                id="email-card"
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText('raagav.ramakrishnan@students.iiit.ac.in')
                }}
              >
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
                    <path
                      d="m4 7 8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <strong>Email</strong>
                <small>Click to copy</small>
              </button>

              <a className="contact-card" href="https://github.com/raagavramki" target="_blank" rel="noreferrer">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.17-3.37-1.17-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1.01.07 1.55 1.04 1.55 1.04.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.04-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.1 2.65.65.7 1.04 1.59 1.04 2.68 0 3.85-2.34 4.7-4.58 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </span>
                <strong>GitHub</strong>
                <small>@raagavramki</small>
              </a>

              <a
                className="contact-card"
                href="https://www.linkedin.com/in/raagav-ramakrishnan-3905511b2"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6.5 9.5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M6.5 6.5h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
                    <path
                      d="M10.5 19v-5.2c0-1.84 1.16-3.3 3.1-3.3 1.9 0 2.9 1.28 2.9 3.3V19"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M10.5 9.5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <strong>LinkedIn</strong>
                <small>Profile</small>
              </a>
            </div>

            <p className="footer-note">© {year} Raagav Ramakrishnan · Built with React + TypeScript.</p>
          </div>
        </section>

        <button
          id="to-top"
          className={`to-top ${showToTop ? 'show' : ''}`}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m6 14 6-6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </main>
    </>
  )
}

