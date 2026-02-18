---
name: skill-evaluator
description: Evaluates generated skills against quality standards using 7-layer analysis (Structure, Content, Mode Alignment, Tools, Anti-Lazy, Performance, Cognitive Architecture).
---

# Skill Evaluator v0.0.1

> **Type:** Interactive Skill (Quality Assessment)
> **Optimization:** Precision (Clear quality definitions)
> **Last Updated:** 2026-02-15

## Overview

The Skill Evaluator performs systematic quality assessment of generated skills through **7-layer analysis**. It provides an objective quality score (0-100) with detailed feedback on issues, strengths, and improvement suggestions.

## When to Use

Use this skill when you need to:
- Assess quality of skill-generator output before publishing
- Validate existing skills against current standards.
- Benchmark skill quality across repository.

**Trigger phrases:**
- "Evaluate this skill"
- "Check skill quality"
- "Review [skill-name]"

---

## The 7-Layer Evaluation Process

### Layer 1: Structural Integrity (Automated)
**Purpose:** Validate format, syntax, and required sections.
*   **YAML Frontmatter:** Must match framework spec.
*   **Sections:** Overview, When to Use, Prerequisites, Workflow.
*   **Code Blocks:** Must have syntax highlighting tags.

### Layer 2: Content Quality (Pattern Detection)
**Purpose:** Detect anti-patterns that reduce quality.
*   **Placeholders:** No "example.com" or "TODO".
*   **Vagueness:** No "as needed" or "if appropriate".
*   **Realism:** Examples must use realistic data (e.g. valid ISO dates).

### Layer 3: Mode Alignment (Comparative)
**Purpose:** Verify optimization matches selected mode.
*   **Industrial:** High strictness (0.7-0.9 density).
*   **Muse:** Low constraint density (0.1-0.3).
*   **Socratic:** Balanced/Questioning (0.4-0.6).

### Layer 4: Tool Integration (Logical Validation)
**Purpose:** Verify tools are justified and well-specified.
*   **Atomicity:** Tools should do one thing.
*   **Error Handling:** Must have error return schemas.
*   **Type Safety:** Parameters must have types.

### Layer 5: Anti-Lazy Engineering (Prevention)
**Purpose:** Verify skill prevents common LLM failures.
*   **Length Constraints:** "Max 50 words".
*   **Verification:** "Verify before returning".
*   **Format:** "Return ONLY JSON".

### Layer 6: Performance (Token Efficiency) — Tool-Backed

**Purpose:** Verify skill is optimized for speed, cost, and clarity using measured data.

**Step 1 — Run the analyzer:**
```bash
node tools/token-analyzer.js <skill_path>
```
Parse the JSON output. The report contains `tokens_estimated`, `redundancy_pct`, `sections`, and `budget_status`.

**Step 2 — Score each sub-check (0-100):**

| Sub-check | Full marks (100) | Partial | Zero (0) |
|-----------|-----------------|---------|----------|
| Token count | <= 1200 tokens | 1201-1500: scale linearly (100 → 0) | > 1500 |
| Redundancy | < 10% duplicate 3-grams | 10-20%: scale linearly (100 → 0) | > 20% |
| Politeness | No "Please" or "Kindly" | — | Any occurrence found |

```
layer_6_score = token_sub * 0.50 + redundancy_sub * 0.35 + politeness_sub * 0.15
```

**Step 3 — Identify bloat targets:**
From the `sections` field in the tool's JSON report, identify the **2 heaviest sections** by token count. Mention them in the evaluation feedback so the author knows where to compress (e.g. "Heaviest sections: Workflow (420 tokens), Constraints (195 tokens)").

**Step 4 — Include `token_report` in evaluation output:**
Attach the full JSON report from the analyzer as `token_report` in the evaluation results. The `sections` dict inside allows downstream agents (the optimizer) to derive bloat targets directly — do not add a separate `top_bloated_sections` field.

### Layer 7: Cognitive Architecture
**Purpose:** Verify mandated cognitive techniques were applied.
*   **Input Security:** `<user_input>` sandwiching for untrusted data.
*   **Reasoning:** Chain of Density for summaries; Chain of Thought for logic.
*   **Emotional Prompting:** High-stakes framing for critical domains.

---

## Scoring System

**Formula (Weighted):**
```python
overall_score = (
    cognitive * 0.20 +      # Highest weight: How well it thinks
    anti_lazy * 0.18 +      # Reliability
    tools * 0.15 +          # Execution capability
    content * 0.15 +        # Clarity/Correctness
    mode * 0.12 +          
    structural * 0.08 +     # Formatting (lowest weight)
    performance * 0.12
)

# Critical Thresholds (Hard Gates)
# Even if overall_score > 90, fail if these are breached:
if cognitive < 70: return FAIL("Unsafe Cognitive Architecture")
if tools < 60: return FAIL("Broken Tool Logic")
```

**Bands:**
*   **90-100 (Excellent):** Production-ready.
*   **80-89 (Good):** Minor improvements.
*   **70-79 (Acceptable):** Functional but needs refinement.
*   **< 70 (Reject):** Major rework required.

---

## Changelog
*   **v0.0.2:** Layer 6 now uses `tools/token-analyzer.js` for measured token counts, 3-gram redundancy, and section-level breakdown. Adds `token_report` to evaluation output.
*   **v0.0.1:** Initial Alpha Release. Aligned with Framework standards. Added 7-Layer Evaluation.
