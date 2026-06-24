import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ACADEMY_AUTHORITY_ALLOWLIST,
  ACADEMY_AUTHORITY_SCAN_PATHS,
  ACADEMY_AUTHORITY_TEST_ALLOW_END,
  ACADEMY_AUTHORITY_TEST_ALLOW_START,
  ACADEMY_PROHIBITED_AUTHORITY_TERMS
} from "./academy-authority-policy.mjs";

const SCANNED_EXTENSIONS = new Set([".js", ".mjs", ".ts", ".tsx"]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const authorityPattern = new RegExp(
  ACADEMY_PROHIBITED_AUTHORITY_TERMS
    .toSorted((left, right) => right.length - left.length)
    .map(escapeRegExp)
    .join("|"),
  "gi"
);

function normalizePath(value) {
  return value.split(path.sep).join("/");
}

function getLineDetails(text, offset) {
  const before = text.slice(0, offset);
  const line = before.split("\n").length;
  const lineStart = before.lastIndexOf("\n") + 1;
  const lineEnd = text.indexOf("\n", offset);

  return {
    line,
    column: offset - lineStart + 1,
    excerpt: text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd).trim()
  };
}

function collectPatternSpans(text, patterns) {
  return patterns.flatMap((pattern) => {
    const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
    const matcher = new RegExp(pattern.source, flags);
    const spans = [];
    let match;

    while ((match = matcher.exec(text)) !== null) {
      spans.push({ start: match.index, end: match.index + match[0].length });
      if (match[0].length === 0) matcher.lastIndex += 1;
    }

    return spans;
  });
}

function collectNegativeTestRegions(relativePath, text) {
  if (!relativePath.startsWith("tests/")) return { regions: [], errors: [] };

  const regions = [];
  const errors = [];
  let openOffset = null;
  let cursor = 0;

  for (const line of text.split("\n")) {
    if (line.includes(ACADEMY_AUTHORITY_TEST_ALLOW_START)) {
      if (openOffset !== null) errors.push(`${relativePath}: nested negative-test allow marker`);
      openOffset = cursor;
    }

    if (line.includes(ACADEMY_AUTHORITY_TEST_ALLOW_END)) {
      if (openOffset === null) {
        errors.push(`${relativePath}: negative-test allow-end without allow-start`);
      } else {
        regions.push({ start: openOffset, end: cursor + line.length });
        openOffset = null;
      }
    }

    cursor += line.length + 1;
  }

  if (openOffset !== null) errors.push(`${relativePath}: unclosed negative-test allow marker`);
  return { regions, errors };
}

function containsOffset(span, offset) {
  return offset >= span.start && offset < span.end;
}

export function scanAcademyAuthorityText(relativePath, text, { trackAllowlistUsage } = {}) {
  const normalizedPath = normalizePath(relativePath);
  const markerResult = collectNegativeTestRegions(normalizedPath, text);
  const fileAllowlist = ACADEMY_AUTHORITY_ALLOWLIST.filter((entry) => entry.path === normalizedPath).map((entry) => ({
    entry,
    spans: collectPatternSpans(text, entry.patterns)
  }));
  const violations = [];
  const allowedMatches = [];
  const matcher = new RegExp(authorityPattern.source, authorityPattern.flags);
  let match;

  while ((match = matcher.exec(text)) !== null) {
    const offset = match.index;
    const term = ACADEMY_PROHIBITED_AUTHORITY_TERMS.find((candidate) => candidate.toLowerCase() === match[0].toLowerCase()) ?? match[0];
    const details = getLineDetails(text, offset);
    const inNegativeTest = markerResult.regions.some((region) => containsOffset(region, offset));
    const allowlistMatch = fileAllowlist.find(({ entry, spans }) => entry.term.toLowerCase() === term.toLowerCase() && spans.some((span) => containsOffset(span, offset)));

    if (inNegativeTest) {
      allowedMatches.push({ path: normalizedPath, term, ...details, classification: "negative-test" });
    } else if (allowlistMatch) {
      allowedMatches.push({ path: normalizedPath, term, ...details, classification: allowlistMatch.entry.classification });
      trackAllowlistUsage?.set(allowlistMatch.entry, (trackAllowlistUsage.get(allowlistMatch.entry) ?? 0) + 1);
    } else {
      violations.push({ path: normalizedPath, term, ...details });
    }
  }

  return { violations, allowedMatches, configurationErrors: markerResult.errors };
}

async function collectFiles(entryPath) {
  const entryStat = await stat(entryPath);
  if (entryStat.isFile()) return SCANNED_EXTENSIONS.has(path.extname(entryPath)) ? [entryPath] : [];

  const entries = await readdir(entryPath, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => collectFiles(path.join(entryPath, entry.name))));
  return nested.flat();
}

export async function scanAcademyAuthority({ cwd = process.cwd() } = {}) {
  const files = (await Promise.all(ACADEMY_AUTHORITY_SCAN_PATHS.map((entry) => collectFiles(path.resolve(cwd, entry))))).flat().toSorted();
  const allowlistUsage = new Map(ACADEMY_AUTHORITY_ALLOWLIST.map((entry) => [entry, 0]));
  const results = await Promise.all(files.map(async (file) => {
    const relativePath = normalizePath(path.relative(cwd, file));
    const text = await readFile(file, "utf8");
    return scanAcademyAuthorityText(relativePath, text, { trackAllowlistUsage: allowlistUsage });
  }));
  const configurationErrors = results.flatMap((result) => result.configurationErrors);

  for (const [entry, uses] of allowlistUsage) {
    if (uses === 0) configurationErrors.push(`${entry.path}: stale allowlist entry for ${entry.term} (${entry.classification})`);
  }

  return {
    files,
    scannedPaths: ACADEMY_AUTHORITY_SCAN_PATHS,
    prohibitedTerms: ACADEMY_PROHIBITED_AUTHORITY_TERMS,
    allowlist: ACADEMY_AUTHORITY_ALLOWLIST,
    violations: results.flatMap((result) => result.violations),
    allowedMatches: results.flatMap((result) => result.allowedMatches),
    configurationErrors
  };
}

function printFailure(result) {
  for (const error of result.configurationErrors) console.error(`CONFIG: ${error}`);
  for (const violation of result.violations) {
    console.error(`${violation.path}:${violation.line}:${violation.column} prohibited term "${violation.term}" -> ${violation.excerpt}`);
  }
}

async function main() {
  const result = await scanAcademyAuthority();
  const failed = result.violations.length > 0 || result.configurationErrors.length > 0;

  if (failed) {
    console.error("Academy authority static check: FAIL");
    printFailure(result);
    process.exitCode = 1;
    return;
  }

  console.log("Academy authority static check: PASS");
  console.log(`Scanned files: ${result.files.length}`);
  console.log(`Prohibited terms: ${result.prohibitedTerms.length}`);
  console.log(`Reviewed allowlist entries: ${result.allowlist.length}`);
  console.log(`Allowed matches: ${result.allowedMatches.length}`);
  console.log(`Scanned paths: ${result.scannedPaths.join(", ")}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
