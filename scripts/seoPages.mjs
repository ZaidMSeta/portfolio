// Vite plugin: link-preview crawlers (LinkedIn, iMessage, Slack, Discord) don't run
// JavaScript, so every route gets its own copy of index.html with the right title,
// description, and preview image baked in. Also writes 404.html, sitemap.xml, and robots.txt.
import fs from "node:fs";
import path from "node:path";
import { projects } from "../src/data/projects.ts";
import { site } from "../src/data/site.ts";

const pages = [
  { path: "/about", title: "About", description: "Computer Science (Co-op) student at McMaster: what I build, and what I do off the clock." },
  {
    path: "/projects",
    title: "Projects",
    description:
      "Case studies for MacTrack, RoomRadar, and tools built for a youth soccer club, a nonprofit, and a memory care community.",
  },
  {
    path: "/experience",
    title: "Experience",
    description: "Software work for clients, a nonprofit, a startup, and a local soccer club.",
  },
  {
    path: "/resume",
    title: "Resume",
    description: "Zaid Seta's resume. Computer Science (Co-op) at McMaster, open to a Winter or Summer 2027 software co-op.",
  },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.summary,
    image: `/og/${project.slug}.png`,
  })),
];

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function setMeta(html, attr, key, value) {
  const pattern = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`index.html is missing <meta ${attr}="${key}">`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

function renderPage(template, page) {
  const title = page.title ? `${page.title} · ${site.name}` : null;
  const url = `${site.url}${page.path}`;
  let html = template;

  if (title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
    html = setMeta(html, "property", "og:title", title);
    html = setMeta(html, "name", "twitter:title", title);
  }
  if (page.description) {
    html = setMeta(html, "name", "description", page.description);
    html = setMeta(html, "property", "og:description", page.description);
    html = setMeta(html, "name", "twitter:description", page.description);
  }
  if (page.image) {
    html = setMeta(html, "property", "og:image", `${site.url}${page.image}`);
    html = setMeta(html, "name", "twitter:image", `${site.url}${page.image}`);
  }

  html = setMeta(html, "property", "og:url", url);
  return html.replace("</head>", `  <link rel="canonical" href="${url}" />\n  </head>`);
}

export function seoPages() {
  let outDir = "dist";

  return {
    name: "seo-pages",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      const template = fs.readFileSync(indexPath, "utf8");

      fs.writeFileSync(indexPath, renderPage(template, { path: "/" }));

      // /projects/mactrack -> projects/mactrack.html; Vercel's cleanUrls serves it without the extension
      for (const page of pages) {
        const file = path.join(outDir, `${page.path.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, renderPage(template, page));
      }

      // Any path without its own file gets 404.html: the same app shell, which renders the
      // not-found page client-side, served with a real 404 status
      const notFound = renderPage(template, {
        path: "/404",
        title: "Not found",
        description: "This page doesn't exist.",
      }).replace("</head>", `  <meta name="robots" content="noindex" />\n  </head>`);
      fs.writeFileSync(path.join(outDir, "404.html"), notFound.replace(/\s*<link rel="canonical"[^>]*>/, ""));

      const today = new Date().toISOString().slice(0, 10);
      const urls = [{ path: "/" }, ...pages]
        .map(
          (page) =>
            `  <url><loc>${site.url}${page.path === "/" ? "/" : page.path}</loc><lastmod>${today}</lastmod></url>`,
        )
        .join("\n");

      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
      fs.writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
    },
  };
}
