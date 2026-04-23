import recipe from "#recipki";
import { file, write } from "bun";
import { readdir } from "node:fs/promises";
import { createHighlighter } from "shiki";

const OUT_FILE = file(`${import.meta.dir}/output.html`);
const FIXTURES_DIR = `${import.meta.dir}/fixtures`;
const THEME = "vitesse-dark";

const highlighter = await createHighlighter({
	themes: [THEME],
	langs: [recipe],
});

const entries = await readdir(FIXTURES_DIR);
const files = entries.filter((f: string) => f.endsWith(".recipe")).sort();

const sections: string[] = [];

for (const f of files) {
	const source = await file(`${FIXTURES_DIR}/${f}`).text();
	const html = highlighter.codeToHtml(source, { lang: "recipe", theme: THEME });
	sections.push(`<section>\n\t\t<h2>${f}</h2>\n\t\t${html}\n\t</section>`);
}

highlighter.dispose();

const page = `\
<!doctype html>
<html lang="en">
<head>
\t<meta charset="utf-8" />
\t<title>recipe-shiki demo</title>
\t<style>
\t\tbody {
\t\t\tfont-family: system-ui, sans-serif;
\t\t\tmax-width: 80ch; margin: 2rem auto;
\t\t\tbackground: #1e1e1e;
\t\t\tcolor: #ddd;
\t\t}
\t\th1 {
\t\t\tborder-bottom: 1px solid #444;
\t\t\tpadding-bottom: .5rem;
\t\t}
\t\th2 {
\t\t\tfont-size: 1rem;
\t\t\tcolor: #888;
\t\t\tmargin-top: 2rem;
\t\t}
\t\tpre.shiki {
\t\t\tpadding: 1.5rem;
\t\t\tborder-radius: 8px;
\t\t\toverflow-x: auto;
\t\t}
\t</style>
</head>
<body>
\t<h1>recipe-shiki — grammar demo</h1>
\t${sections.join("\n\t")}
</body>
</html>`;

if (import.meta.main) {
	await write(OUT_FILE, page);
	console.log(`Wrote ${OUT_FILE.name}`);
}
