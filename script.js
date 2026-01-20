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
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
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
