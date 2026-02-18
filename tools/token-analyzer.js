#!/usr/bin/env node

/**
 * token-analyzer.js — Zero-dependency CLI for measuring SKILL.md token efficiency.
 *
 * Usage:
 *   node tools/token-analyzer.js <path-to-skill.md> [--baseline <path>] [--budget <number>]
 *
 * Output: JSON to stdout with token count, redundancy %, section breakdown, and optional baseline diff.
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);
  const parsed = { file: null, baseline: null, budget: 1200 };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--baseline' && args[i + 1]) {
      parsed.baseline = args[++i];
    } else if (args[i] === '--budget' && args[i + 1]) {
      parsed.budget = parseInt(args[++i], 10);
    } else if (!args[i].startsWith('--')) {
      parsed.file = args[i];
    }
  }

  return parsed;
}

// ---------------------------------------------------------------------------
// Core analysis
// ---------------------------------------------------------------------------

const CODE_FENCE_RE = /^```/;

/**
 * Split markdown into prose lines (outside code fences) and return the raw text too.
 */
function extractProse(text) {
  const lines = text.split('\n');
  const prose = [];
  let inCode = false;

  for (const line of lines) {
    if (CODE_FENCE_RE.test(line.trim())) {
      inCode = !inCode;
      continue;
    }
    if (!inCode) {
      prose.push(line);
    }
  }

  return prose.join('\n');
}

/**
 * Estimate token count from text.
 * Heuristic: word count * 1.33 (accounts for sub-word tokenisation).
 * Accurate within ~10 % of cl100k_base for English markdown.
 */
function estimateTokens(text) {
  const words = text.split(/\s+/).filter(Boolean);
  return {
    wordCount: words.length,
    tokensEstimated: Math.round(words.length * 1.33),
  };
}

/**
 * Build n-gram frequency map from prose text. Returns duplicate n-grams and
 * a redundancy percentage.
 */
function measureRedundancy(proseText, n = 3) {
  const words = proseText
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  if (words.length < n) {
    return { redundancyPct: 0, duplicateNgrams: [], totalNgrams: 0 };
  }

  const freq = {};
  const totalNgrams = words.length - n + 1;

  for (let i = 0; i <= words.length - n; i++) {
    const gram = words.slice(i, i + n).join(' ');
    freq[gram] = (freq[gram] || 0) + 1;
  }

  const duplicates = [];
  let duplicateCount = 0;

  for (const [gram, count] of Object.entries(freq)) {
    if (count > 1) {
      duplicates.push(gram);
      duplicateCount += count - 1; // excess occurrences
    }
  }

  const redundancyPct = totalNgrams > 0
    ? parseFloat(((duplicateCount / totalNgrams) * 100).toFixed(1))
    : 0;

  return { redundancyPct, duplicateNgrams: duplicates, totalNgrams };
}

/**
 * Parse markdown by ## headers and return per-section token estimates.
 * Content before the first header is filed under "(preamble)".
 */
function sectionBreakdown(text) {
  const lines = text.split('\n');
  const sections = {};
  let currentSection = '(preamble)';
  let buffer = [];

  function flush() {
    const content = buffer.join('\n');
    const { tokensEstimated } = estimateTokens(content);
    if (tokensEstimated > 0) {
      sections[currentSection] = (sections[currentSection] || 0) + tokensEstimated;
    }
    buffer = [];
  }

  for (const line of lines) {
    const headerMatch = line.match(/^#{1,3}\s+(.+)/);
    if (headerMatch) {
      flush();
      currentSection = headerMatch[1].trim();
    } else {
      buffer.push(line);
    }
  }
  flush();

  return sections;
}

/**
 * Analyse a single SKILL.md file and return a report object.
 */
function analyse(filePath, budget) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const prose = extractProse(raw);

  const { wordCount, tokensEstimated } = estimateTokens(raw);
  const { redundancyPct, duplicateNgrams } = measureRedundancy(prose);
  const sections = sectionBreakdown(raw);

  const budgetStatus = tokensEstimated <= budget ? 'PASS' : 'FAIL';

  return {
    file: filePath,
    tokens_estimated: tokensEstimated,
    word_count: wordCount,
    redundancy_pct: redundancyPct,
    duplicate_3grams: duplicateNgrams.slice(0, 20), // cap output noise
    sections,
    budget_status: budgetStatus,
    budget_target: budget,
    baseline_comparison: null,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const { file, baseline, budget } = parseArgs(process.argv);

  if (!file) {
    console.error('Usage: node tools/token-analyzer.js <skill.md> [--baseline <path>] [--budget <n>]');
    process.exit(1);
  }

  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    process.exit(1);
  }

  const report = analyse(file, budget);

  if (baseline) {
    if (!fs.existsSync(baseline)) {
      console.error(`Baseline file not found: ${baseline}`);
      process.exit(1);
    }
    const baseReport = analyse(baseline, budget);
    const delta = report.tokens_estimated - baseReport.tokens_estimated;
    const deltaPct = baseReport.tokens_estimated > 0
      ? parseFloat(((delta / baseReport.tokens_estimated) * 100).toFixed(1))
      : 0;

    report.baseline_comparison = {
      baseline_file: baseline,
      baseline_tokens: baseReport.tokens_estimated,
      current_tokens: report.tokens_estimated,
      delta,
      delta_pct: deltaPct,
      summary: `${baseReport.tokens_estimated} -> ${report.tokens_estimated} (${delta >= 0 ? '+' : ''}${deltaPct}%)`,
    };
  }

  console.log(JSON.stringify(report, null, 2));
}

main();
