import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { render } from "../dist/ssr/entry-server.js";

const SITE = "https://daryl-md-project.vercel.app";
const OUT_DIR = path.resolve(import.meta.dirname, "../dist/public");

// path      : route servie (URL reelle cote client)
// renderPath: route dont on prend le HTML statique (par defaut = path)
// out       : fichier genere dans dist/public
type R = { path: string; out: string; title: string; desc: string; renderPath?: string };

const routes: R[] = [
  // "/" affiche le Teaser (video, sans texte) cote client. Pour le SEO on
  // injecte le hero de /home en statique -> le crawler voit la proposition de valeur.
  { path: "/", out: "index.html", renderPath: "/home",
    title: "DARYL — Prove what your AI agent did.",
    desc: "Append-only, hash-chained, tamper-evident execution trails. The proof layer you hand to an auditor." },
  { path: "/home", out: "home/index.html",
    title: "DARYL — Prove what your AI agent did.",
    desc: "Append-only, hash-chained, tamper-evident execution trails. The proof layer you hand to an auditor." },
  { path: "/vision", out: "vision/index.html", title: "Vision — DARYL", desc: "Trust should be verifiable, not assumed." },
  { path: "/products", out: "products/index.html", title: "Products — DARYL", desc: "Open core, hosted extensions." },
  { path: "/products/darylab", out: "products/darylab/index.html", title: "DaryLab — DARYL", desc: "Where intelligence meets experimentation." },
  { path: "/lab", out: "lab/index.html", title: "DaryLab — DARYL", desc: "Where intelligence meets experimentation." },
  { path: "/agents", out: "agents/index.html", title: "Agents — DARYL", desc: "Capabilities that extend your reach." },
  { path: "/roadmap", out: "roadmap/index.html", title: "Roadmap — DARYL", desc: "Building toward third-party-verifiable proof." },
  { path: "/universe", out: "universe/index.html", title: "Universe — DARYL", desc: "Where fiction meets function." },
  { path: "/dsm", out: "dsm/index.html", title: "DSM — DARYL", desc: "Daryl Sharding Memory — off-chain trust, memory and audit layer. Append-only, hash-chained, tamper-evident." },
  { path: "/contact", out: "contact/index.html", title: "Contact — DARYL", desc: "Let's connect." },
  { path: "/cookies", out: "cookies/index.html", title: "Cookies — DARYL", desc: "Cookie policy — Daryl." },
  { path: "/privacy", out: "privacy/index.html", title: "Privacy — DARYL", desc: "Privacy policy — Daryl." },
  { path: "/terms", out: "terms/index.html", title: "Terms — DARYL", desc: "Terms of service — Daryl." },
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function applyMeta(html: string, r: R): string {
  const url = SITE + r.path;
  const t = esc(r.title), d = esc(r.desc);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  html = html.replace(/(<meta name="description" content=")[\s\S]*?("\s*\/?>)/, `$1${d}$2`);
  html = html.replace(/(<meta property="og:title" content=")[\s\S]*?("\s*\/?>)/, `$1${t}$2`);
  html = html.replace(/(<meta property="og:description" content=")[\s\S]*?("\s*\/?>)/, `$1${d}$2`);
  // canonical + og:url injectes avant </head>
  const inject = `    <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n`;
  html = html.replace("</head>", inject + "  </head>");
  return html;
}

export async function prerender() {
  const template = await readFile(path.join(OUT_DIR, "index.html"), "utf-8");
  if (!template.includes('<div id="root"></div>'))
    throw new Error('Template: <div id="root"></div> introuvable');

  for (const r of routes) {
    const appHtml = render(r.renderPath ?? r.path);
    let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    html = applyMeta(html, r);
    const dest = path.join(OUT_DIR, r.out);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, html, "utf-8");
    console.log(`prerendered ${r.path.padEnd(20)} -> dist/public/${r.out}  (${(html.length/1024).toFixed(1)} kB)`);
  }
  console.log(`\nDone: ${routes.length} routes prerendered.`);
}

// Execution directe: `tsx script/prerender.ts`
if (import.meta.url === `file://${process.argv[1]}`) {
  prerender().catch((e) => { console.error(e); process.exit(1); });
}
