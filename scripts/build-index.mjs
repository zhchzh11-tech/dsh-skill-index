#!/usr/bin/env node
// Builds index.json for the DSH skill index repo.
// Local part: scan skills/<name>/SKILL.md and read frontmatter.
// Optional part (--with-recommended): pull popular skills from skills.sh search API.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SKILLS_DIR = join(ROOT, "skills");

const QUERIES = [
  "react", "nextjs", "typescript", "testing", "playwright", "deploy", "docker",
  "kubernetes", "documentation", "review", "refactor", "design", "ui",
  "accessibility", "git", "python", "go", "rust", "security", "api",
  "database", "sql", "mobile", "ios", "android", "data", "ml", "llm",
  "prompt", "agent",
];

function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) return {};
  const out = {};
  let blockKey = null;
  const blockLines = [];
  const flushBlock = () => {
    if (blockKey) {
      out[blockKey] = blockLines.map((line) => line.trim()).filter(Boolean).join(" ");
      blockKey = null;
      blockLines.length = 0;
    }
  };
  for (const line of match[1].split(/\r?\n/)) {
    if (/^\s+\S/.test(line) && blockKey) {
      blockLines.push(line);
      continue;
    }
    flushBlock();
    const entry = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!entry) continue;
    let value = entry[2].trim();
    if (value === ">" || value === "|" || value === ">-" || value === "|-") {
      blockKey = entry[1];
      continue;
    }
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[entry[1]] = value;
  }
  flushBlock();
  return out;
}

async function buildLocal() {
  const entries = (await readdir(SKILLS_DIR, { withFileTypes: true })).filter((entry) => entry.isDirectory());
  const skills = [];
  for (const entry of entries) {
    const file = join(SKILLS_DIR, entry.name, "SKILL.md");
    let text;
    try {
      text = await readFile(file, "utf8");
    } catch {
      continue;
    }
    const meta = parseFrontmatter(text);
    skills.push({
      name: meta.name || entry.name,
      dir: entry.name,
      description: meta.description || "",
    });
  }
  skills.sort((a, b) => a.dir.localeCompare(b.dir));
  return skills;
}

async function fetchRecommended() {
  const seen = new Map();
  const failures = [];
  for (const query of QUERIES) {
    try {
      const response = await fetch(`https://skills.sh/api/search?q=${encodeURIComponent(query)}`, {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      for (const skill of payload.skills || []) {
        if (!skill || typeof skill.id !== "string" || seen.has(skill.id)) continue;
        seen.set(skill.id, {
          id: skill.id,
          name: skill.name,
          source: skill.source,
          skillId: skill.skillId,
          installs: Number.isFinite(skill.installs) ? skill.installs : 0,
        });
      }
    } catch (error) {
      failures.push(`${query}: ${error.message}`);
    }
  }
  if (failures.length) console.error(`some queries failed:\n${failures.join("\n")}`);
  return [...seen.values()].sort((a, b) => b.installs - a.installs).slice(0, 200);
}

const local = await buildLocal();
const recommended = process.argv.includes("--with-recommended") ? await fetchRecommended() : [];
const output = {
  generatedAt: new Date().toISOString(),
  count: local.length,
  skills: local,
};
if (recommended.length) output.recommended = recommended;
await writeFile(join(ROOT, "index.json"), JSON.stringify(output, null, 2) + "\n", "utf8");
console.log(`index.json written: ${local.length} local skills, ${recommended.length} recommended`);
