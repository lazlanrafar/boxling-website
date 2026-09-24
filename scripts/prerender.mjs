// Writes dist/<route>/index.html for each legal route so the policy text is in the HTML response
// (link previews, crawlers, store URL checks) before any JavaScript runs.
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");
const manifestPath = join(dist, ".vite", "manifest.json");
const LEGAL_SOURCE = "src/legal/LegalPage.jsx";

const escapeHtml = value => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = await readFile(join(dist, "index.html"), "utf8");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const chunk = manifest[LEGAL_SOURCE];
if (!chunk) throw new Error(`prerender: ${LEGAL_SOURCE} missing from the Vite manifest`);

const entryFile = ["prerender-entry.js", "prerender-entry.mjs"].map(name => join(ssrDir, name)).find(existsSync);
if (!entryFile) throw new Error("prerender: server bundle not found in dist-ssr/");
const { legalRoutes, renderLegal } = await import(pathToFileURL(entryFile).href);

const headAssets = [
  ...(chunk.css || []).map(file => `<link rel="stylesheet" href="/${file}" />`),
  `<link rel="modulepreload" href="/${chunk.file}" />`,
].join("\n    ");

const SHELL = /<!--app-shell-->[\s\S]*?<!--\/app-shell-->/;
if (!SHELL.test(template)) throw new Error("prerender: <!--app-shell--> marker missing from dist/index.html");

for (const [path, docKey] of Object.entries(legalRoutes)) {
  const { html, title, description } = renderLegal(docKey, "id");
  if (html.includes("{{")) throw new Error(`prerender: unreplaced {{ token in ${path}`);

  const page = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, [
      `<meta name="description" content="${escapeHtml(description)}" />`,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
      `<meta property="og:type" content="article" />`,
    ].join("\n    "))
    .replace("</head>", `  ${headAssets}\n  </head>`)
    .replace(SHELL, () => html)
    // The prerendered page is readable without JavaScript, so the landing page's notice does not apply.
    .replace(/\s*<noscript>[\s\S]*?<\/noscript>/, "");

  const outFile = join(dist, path.slice(1), "index.html");
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, page);
  console.log(`prerender: ${path} -> ${outFile.slice(root.length + 1)}`);
}

await rm(ssrDir, { recursive: true, force: true });
await rm(join(dist, ".vite"), { recursive: true, force: true });
