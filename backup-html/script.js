// ---------- THEME TOGGLE ----------
const rootEl = document.documentElement;
const themeToggleEl = document.getElementById("theme-toggle");
const storedTheme = (() => {
  try {
    return window.localStorage.getItem("theme");
  } catch {
    return null;
  }
})();

function applyTheme(theme) {
  const safeTheme = theme === "light" ? "light" : "dark";
  rootEl.setAttribute("data-theme", safeTheme);
  try {
    window.localStorage.setItem("theme", safeTheme);
  } catch {
    /* ignore */
  }
  if (!themeToggleEl) return;
  const icon = themeToggleEl.querySelector("i");
  if (!icon) return;
  icon.classList.remove("fa-moon", "fa-sun");
  icon.classList.add(safeTheme === "light" ? "fa-sun" : "fa-moon");
}

applyTheme(storedTheme === "light" ? "light" : "dark");

if (themeToggleEl) {
  themeToggleEl.addEventListener("click", () => {
    const current = rootEl.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  });
}

// ---------- TYPE-WRITER ----------
const roles = ["ML Systems Engineer", "AI for Healthcare", "Researcher"];
let i = 0, j = 0, deleting = false;
const el = document.getElementById("type-writer");

function typeLoop() {
  if (!el) return;
  el.textContent = roles[i].substring(0, j);

  if (!deleting && j < roles[i].length) {
    j += 1;
    setTimeout(typeLoop, 70);
    return;
  }

  if (!deleting && j === roles[i].length) {
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && j > 0) {
    j -= 1;
    setTimeout(typeLoop, 35);
    return;
  }

  deleting = false;
  i = (i + 1) % roles.length;
  setTimeout(typeLoop, 300);
}
typeLoop();

// ---------- YEAR ----------
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// ---------- NAV TOGGLE / CLOSE ON CLICK ----------
const toggle = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");

function setMenuOpen(open) {
  if (!toggle || !menu) return;
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  menu.classList.toggle("open", open);
}

if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });
}

document.querySelectorAll("#nav-menu a").forEach((a) => {
  a.addEventListener("click", () => setMenuOpen(false));
});

// ---------- NAV SCROLL STATE + PROGRESS ----------
const nav = document.querySelector(".nav");
const progress = document.getElementById("scroll-progress");
const backToTop = document.getElementById("back-to-top");

function onScroll() {
  const y = window.scrollY || 0;
  if (nav) nav.classList.toggle("scrolled", y > 6);

  // progress
  if (progress) {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    const pct = Math.min(1, Math.max(0, y / max));
    progress.style.width = `${pct * 100}%`;
  }

  // back to top
  if (backToTop) backToTop.classList.toggle("show", y > 800);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (backToTop) {
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ---------- ACTIVE NAV LINK (SECTION SPY) ----------
const navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const byId = new Map(navLinks.map((a) => [a.getAttribute("href")?.slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
      if (!visible?.target?.id) return;
      navLinks.forEach((a) => a.classList.remove("active"));
      const active = byId.get(visible.target.id);
      if (active) active.classList.add("active");
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: [0.08, 0.15, 0.25] }
  );
  sections.forEach((s) => spy.observe(s));
}

// ---------- REVEAL ANIMATIONS ----------
const revealTargets = document.querySelectorAll(
  ".section .container > * , .project-grid .card, .timeline-item, .contact-card"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, idx) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.classList.add("in");
          }, idx * 60); // staggered reveal
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("in"));
}

// ---------- FILTER PROJECTS ----------
const buttons = document.querySelectorAll(".filter-buttons button");
const cards = document.querySelectorAll(".project-grid .card");

function applyFilter(filter) {
  cards.forEach((c) => {
    const show = filter === "all" || c.dataset.category === filter;
    c.style.display = show ? "block" : "none";
    if (show) setTimeout(() => c.classList.add("show"), 30);
    else c.classList.remove("show");
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter(btn.dataset.filter);
  });
});

// initial reveal
window.addEventListener("load", () => {
  cards.forEach((c, idx) => setTimeout(() => c.classList.add("show"), idx * 70));
});

// ---------- MAKE PROJECT CARDS CLICKABLE ----------
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  const repoLink = card.querySelector(".btn-text[href]");
  const projectKey = card.getAttribute("data-project");

  card.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest("a") || target.closest("button")) return;

    if (repoLink && repoLink.href) {
      window.open(repoLink.href, "_blank", "noopener");
    } else if (projectKey) {
      openProjectModal(projectKey);
    }
  });
});

// ---------- PROJECT MODAL ----------
const projectModal = document.getElementById("project-modal");
const projectOpenButtons = document.querySelectorAll(".project-open, .featured-card");

const projectDetails = {
  neuroanatomy: {
    kicker: "Neuroanatomy SME Agent",
    title: "Neuroanatomy SME Agent",
    body:
      "An end-to-end agentic system that ingests neuroanatomy content and exposes a question-answering, quiz, and export interface for learners and practitioners.",
    bullets: [
      "Implemented multi-granularity chunk-graph construction with BioLORD embeddings for domain-specialized retrieval.",
      "Hybrid FAISS/Elasticsearch search with BGE reranking to balance recall and precision for medical concepts.",
      "Thin web interface for chat, quiz generation, and PDF/DOCX/PPTX export workflows."
    ],
    tech: "Stack: HuggingFace, PyTorch, FAISS, Elasticsearch, custom LangChain-style orchestration.",
    link: "https://github.com/raagavramki/Neuroanatomy-SME-Agent"
  },
  "multilingual-slm": {
    kicker: "Multilingual SLM",
    title: "Multilingual Small Language Model (EN/Tamil/Mizo)",
    body:
      "A 140M-parameter multilingual language model trained on a carefully curated 3B-token corpus spanning English, Tamil, and Mizo.",
    bullets: [
      "Built a 3B-token multilingual corpus from scratch with cleaning, normalization, deduplication, and deterministic splits.",
      "Trained a 96k unigram tokenizer with temperature-smoothed sampling to preserve low-resource Mizo distribution.",
      "Pretrained and then fine-tuned with LoRA on reasoning-style tasks for controllable editing behaviour."
    ],
    tech: "Stack: HuggingFace, PyTorch, custom data pipeline, LoRA fine-tuning.",
    link: "https://github.com/raagavramki/Multilingual-SLM"
  }
};

function openProjectModal(projectKey) {
  if (!projectModal || !projectKey || !projectDetails[projectKey]) return;
  const data = projectDetails[projectKey];

  projectModal.querySelector("#project-modal-kicker").textContent = data.kicker;
  projectModal.querySelector("#project-modal-title").textContent = data.title;
  projectModal.querySelector("#project-modal-body").textContent = data.body;

  const ul = projectModal.querySelector("#project-modal-bullets");
  ul.innerHTML = "";
  data.bullets.forEach((b) => {
    const li = document.createElement("li");
    li.textContent = b;
    ul.appendChild(li);
  });

  projectModal.querySelector("#project-modal-tech").textContent = data.tech;
  const linkEl = projectModal.querySelector("#project-modal-link");
  linkEl.href = data.link;

  projectModal.hidden = false;
  projectModal.querySelector(".modal-dialog").focus?.();
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.hidden = true;
}

projectOpenButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-project");
    openProjectModal(key);
  });
});

if (projectModal) {
  projectModal.addEventListener("click", (e) => {
    if (e.target.matches("[data-modal-close]") || e.target.classList.contains("modal-backdrop")) {
      closeProjectModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });
}

// ---------- COPY EMAIL (WITH TOAST) ----------
const emailCard = document.getElementById("email-card");
const email = "raagav.ramakrishnan@students.iit.ac.in";

function toast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.position = "fixed";
  t.style.bottom = "18px";
  t.style.left = "50%";
  t.style.transform = "translateX(-50%)";
  t.style.background = "rgba(11,15,25,.92)";
  t.style.backdropFilter = "blur(10px)";
  t.style.color = "#e6e8ee";
  t.style.border = "1px solid rgba(255,255,255,.14)";
  t.style.padding = ".65rem 1rem";
  t.style.borderRadius = "14px";
  t.style.zIndex = "10002";
  t.style.boxShadow = "0 18px 60px rgba(0,0,0,.45)";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

if (emailCard) {
  emailCard.addEventListener("click", (e) => {
    // allow mailto if clipboard isn't available
    if (!navigator.clipboard?.writeText) return;
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => toast("Email copied"));
  });
}
