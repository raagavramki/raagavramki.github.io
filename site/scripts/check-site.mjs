// Dependency-free post-build checks for the static export in ./out
//   node scripts/check-site.mjs            -> fail on broken internal links; list TBD markers
//   node scripts/check-site.mjs --release  -> additionally fail if any TBD marker remains
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs"
import { join, dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const out = join(root, "out")
const release = process.argv.includes("--release")

if (!existsSync(out)) {
  console.error("out/ not found. Run `npm run build` first.")
  process.exit(1)
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  )

const files = walk(out)
const pages = files.filter((f) => f.endsWith(".html"))
const errors = []
const tbds = []

const resolves = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split("#")[0].split("?")[0])
  if (clean === "" || clean === "/") return existsSync(join(out, "index.html"))
  const target = join(out, clean)
  if (existsSync(target) && statSync(target).isFile()) return true
  if (existsSync(join(target, "index.html"))) return true
  if (existsSync(target + ".html")) return true
  return false
}

for (const page of pages) {
  const rel = "/" + relative(out, page)
  const html = readFileSync(page, "utf8")

  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1]
    if (/^(https?:|mailto:|tel:|data:|#|javascript:)/.test(url)) continue
    if (url.startsWith("//")) continue
    const abs = url.startsWith("/") ? url : "/" + join(dirname(rel), url).replace(/\\/g, "/").replace(/^\//, "")
    if (!resolves(abs)) errors.push(`${rel}: broken internal link -> ${url}`)
  }

  const text = html.replace(/<script[\s\S]*?<\/script>/g, "")
  const hits = text.match(/TBD/g)
  if (hits) tbds.push(`${rel}: ${hits.length} TBD marker(s)`)
}

// Canonical CV: root copy and legacy /assets copy must stay byte-identical.
const a = join(out, "resume.pdf")
const b = join(out, "assets", "resume.pdf")
if (!existsSync(a)) errors.push("resume.pdf missing from build output")
if (!existsSync(b)) errors.push("assets/resume.pdf missing from build output")
if (existsSync(a) && existsSync(b) && !readFileSync(a).equals(readFileSync(b))) {
  errors.push("resume.pdf and assets/resume.pdf differ (single canonical CV required)")
}

// Existing public routes must keep working.
for (const route of ["/", "/about/", "/projects/", "/resume/", "/contact/", "/404.html"]) {
  if (!resolves(route)) errors.push(`required route missing: ${route}`)
}

console.log(`Checked ${pages.length} HTML pages.`)
if (tbds.length) {
  console.log(`\nTBD markers (${release ? "BLOCKING in --release" : "informational"}):`)
  tbds.forEach((t) => console.log("  - " + t))
  if (release) errors.push(`${tbds.length} page(s) still contain TBD markers`)
}
if (errors.length) {
  console.error("\nFAILED:")
  errors.forEach((e) => console.error("  x " + e))
  process.exit(1)
}
console.log("\nOK: no broken internal links.")
