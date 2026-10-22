// Writes link-preview card templates (1200x630) to a folder: one per project plus default.html.
// Usage: node --experimental-strip-types scripts/ogCards.mjs ./src/data/projects.ts <outDir>
// then screenshot each page at 1200x630 into public/og/<slug>.png (default.html -> public/og-image.png).
import fs from "node:fs";
const { projects } = await import(new URL(process.argv[2], `file://${process.cwd()}/`).href);
const out = process.argv[3];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const page = ({ kicker, title, body, tags, url }) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0f1115;color:#fff;font-family:"Hanken Grotesk";overflow:hidden;position:relative}
.glow{position:absolute;inset:0;background:radial-gradient(circle at 12% 0%,rgba(94,234,212,.16),transparent 55%),radial-gradient(circle at 100% 100%,rgba(94,234,212,.07),transparent 45%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(to bottom,#000 0%,transparent 75%)}
.wrap{position:relative;height:100%;padding:64px 72px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;font-family:"IBM Plex Mono";font-size:22px;color:rgba(255,255,255,.6)}
.top b{color:#fff;font-weight:500}.top i{color:#5eead4;font-style:normal}
.kicker{margin-top:auto;font-family:"IBM Plex Mono";font-size:22px;color:#5eead4;letter-spacing:.02em}
h1{font-family:"Cabinet Grotesk";font-weight:700;font-size:${'${size}'}px;line-height:1;letter-spacing:-.025em;margin-top:18px}
p{margin-top:22px;font-size:29px;line-height:1.4;color:rgba(255,255,255,.66);max-width:960px}
.tags{margin-top:34px;display:flex;gap:10px;flex-wrap:wrap}
.tags span{font-family:"IBM Plex Mono";font-size:19px;color:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);border-radius:8px;padding:6px 12px}
.bar{position:absolute;left:0;top:0;height:6px;width:100%;background:#5eead4}
</style></head><body><div class="bar"></div><div class="glow"></div><div class="grid"></div><div class="wrap">
<div class="top"><span><b>zaid<i>.</i>seta</b></span><span>${esc(url)}</span></div>
<div class="kicker">${esc(kicker)}</div>
<h1>${esc(title)}</h1>
<p>${esc(body)}</p>
${tags.length ? `<div class="tags">${tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
</div></body></html>`;
const fill = (o) => page(o).replace("${size}", o.title.length > 18 ? "76" : "96");
for (const p of projects) {
  fs.writeFileSync(`${out}/${p.slug}.html`, fill({ kicker: `CASE STUDY · ${p.date} · ${p.status.toUpperCase()}`, title: p.title, body: p.hook, tags: p.stack, url: `zaidseta.com/projects/${p.slug}` }));
}
fs.writeFileSync(`${out}/default.html`, fill({ kicker: "OPEN TO WINTER & SUMMER 2027 SWE CO-OP", title: "Zaid Seta", body: "Software developer building tools people actually use. Computer Science (Co-op) at McMaster.", tags: ["Python", "TypeScript", "Go", "React", "PostgreSQL", "Playwright"], url: "zaidseta.com" }));
console.log(fs.readdirSync(out));
