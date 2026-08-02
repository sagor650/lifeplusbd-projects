import { copyFile, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const source = await readFile(resolve(projectRoot, "src/data.ts"), "utf8");
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const builtIndex = resolve(projectRoot, "dist/index.html");

for (const slug of slugs) {
  const routeDirectory = resolve(projectRoot, "dist/kpi", slug);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(builtIndex, resolve(routeDirectory, "index.html"));
}

await copyFile(builtIndex, resolve(projectRoot, "dist/404.html"));

console.log(`Generated ${slugs.length} KPI routes.`);
