/**
 * i18n key linter — guards against orphaned and missing translation keys.
 *
 * Checks three directions, deliberately conservatively to avoid false positives:
 *   1. Orphan keys  — defined in en.ts/fr.ts but referenced nowhere in client/src.
 *   2. Missing keys — used as a static t("...") literal but absent from a locale.
 *   3. EN/FR parity — keys present in one locale but not the other.
 *
 * Reference detection supports the three real call shapes in this codebase:
 *   - static literal:   t("home.hero.title")
 *   - interpolated:     t(`home.problem.${k}.title`)   → matched as a pattern
 *   - key held in a config array/object (e.g. navItems[].key = "nav.home")
 *     → matched because the key appears verbatim as a string literal.
 *
 * It does NOT resolve runtime logic: interpolated keys are matched by pattern
 * only, and never produce a "missing" report (would be a false positive).
 *
 * Run: npm run check:i18n   (exits non-zero on any violation)
 */
import { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve, extname, basename } from "path";
import en from "../client/src/lib/translations/en";
import fr from "../client/src/lib/translations/fr";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLIENT_SRC = resolve(__dirname, "../client/src");
const LOCALE_FILES = new Set(["en.ts", "fr.ts"]); // excluded from the source scan

/**
 * Allowlist for pre-existing orphan keys (translation debt). Currently empty:
 * the original baseline of 9 keys has been cleaned up. Add a key here only as a
 * temporary, documented exception — the goal is to keep this set empty so any
 * orphan fails the lint. Stale entries are reported as a non-failing warning.
 */
const KNOWN_ORPHAN_KEYS = new Set<string>([]);

// --- gather all client source (excluding the locale files themselves) ---
function collectSources(root: string): string[] {
  const rels = readdirSync(root, { recursive: true }) as string[];
  const texts: string[] = [];
  for (const rel of rels) {
    const ext = extname(rel);
    if (ext !== ".ts" && ext !== ".tsx") continue;
    if (LOCALE_FILES.has(basename(rel))) continue;
    texts.push(readFileSync(join(root, rel), "utf8"));
  }
  return texts;
}

const blob = collectSources(CLIENT_SRC).join("\n");

// --- (a) keys used as a static literal argument to t(): t("k") / t('k') / t(`k`) ---
const staticTKeys = new Set<string>();
for (const m of blob.matchAll(/\bt\(\s*[`'"]([^`'"${}]+)[`'"]\s*\)/g)) {
  staticTKeys.add(m[1]);
}

// --- (b) interpolated calls t(`...${...}...`) → anchored regex patterns ---
// each ${...} becomes one key segment (letters/digits/underscore, no dot)
function templateToRegex(tpl: string): RegExp {
  const literals = tpl
    .split(/\$\{[^}]*\}/g)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp("^" + literals.join("[A-Za-z0-9_]+") + "$");
}
const templatePatterns: RegExp[] = [];
for (const m of blob.matchAll(/\bt\(\s*`([^`]*\$\{[^`]*)`\s*\)/g)) {
  templatePatterns.push(templateToRegex(m[1]));
}

// a key counts as referenced if it appears verbatim as a literal anywhere
// (covers static t(), config arrays/objects), or matches an interpolation pattern.
function isReferenced(key: string): boolean {
  if (
    blob.includes(`"${key}"`) ||
    blob.includes(`'${key}'`) ||
    blob.includes("`" + key + "`")
  ) {
    return true;
  }
  return templatePatterns.some((re) => re.test(key));
}

const enKeys = Object.keys(en);
const frKeys = Object.keys(fr);
const allKeys = [...new Set([...enKeys, ...frKeys])].sort();
const enSet = new Set(enKeys);
const frSet = new Set(frKeys);

// 1) orphans: defined but never referenced (minus the allowlisted pre-existing debt)
const allOrphans = allKeys.filter((k) => !isReferenced(k));
const orphans = allOrphans.filter((k) => !KNOWN_ORPHAN_KEYS.has(k));
// allowlist entries that are no longer orphan (referenced now, or deleted) → prune them
const orphanSet = new Set(allOrphans);
const staleAllowlist = [...KNOWN_ORPHAN_KEYS].filter((k) => !orphanSet.has(k)).sort();

// 2) missing: used as a static t() literal but absent from a locale
const missing = [...staticTKeys]
  .filter((k) => !enSet.has(k) || !frSet.has(k))
  .sort()
  .map((k) => ({
    key: k,
    locales: [!enSet.has(k) ? "en" : null, !frSet.has(k) ? "fr" : null]
      .filter(Boolean)
      .join(", "),
  }));

// 3) parity
const onlyInEn = enKeys.filter((k) => !frSet.has(k)).sort();
const onlyInFr = frKeys.filter((k) => !enSet.has(k)).sort();

// --- report ---
console.log("i18n key lint");
console.log(`  locales: en=${enKeys.length}  fr=${frKeys.length}`);
console.log(
  `  static t() literals: ${staticTKeys.size}  interpolation patterns: ${templatePatterns.length}`,
);
console.log(`  allowlisted pre-existing orphans: ${KNOWN_ORPHAN_KEYS.size}`);
console.log("");

let failed = false;

if (onlyInEn.length || onlyInFr.length) {
  failed = true;
  console.log(`✖ EN/FR parity: ${onlyInEn.length + onlyInFr.length} mismatch(es)`);
  for (const k of onlyInEn) console.log(`    only in en: ${k}`);
  for (const k of onlyInFr) console.log(`    only in fr: ${k}`);
  console.log("");
}

if (orphans.length) {
  failed = true;
  console.log(`✖ Orphan keys (defined, referenced nowhere): ${orphans.length}`);
  for (const k of orphans) console.log(`    ${k}`);
  console.log("");
}

if (staleAllowlist.length) {
  // non-failing: helps the cleanup PR keep KNOWN_ORPHAN_KEYS accurate
  console.log(
    `⚠ Stale allowlist entries (no longer orphan — remove from KNOWN_ORPHAN_KEYS): ${staleAllowlist.length}`,
  );
  for (const k of staleAllowlist) console.log(`    ${k}`);
  console.log("");
}

if (missing.length) {
  failed = true;
  console.log(`✖ Missing keys (used as static t("...") but absent): ${missing.length}`);
  for (const m of missing) console.log(`    ${m.key}  (missing in: ${m.locales})`);
  console.log("");
}

if (failed) {
  console.log("i18n key lint FAILED");
  process.exit(1);
}
console.log("✓ i18n keys OK");
