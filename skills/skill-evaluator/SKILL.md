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
- Assess quality of skill-writer output before publishing
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

### Layer 6: Performance (Token Efficiency)
**Purpose:** Verify skill is optimized for speed, cost, and clarity.
*   **Token Count:** Target < 1200 base tokens.
*   **Redundancy:** < 10% duplicate phrases.
*   **Politeness Stripping:** No "Please" or "Kindly".

### Layer 7: Cognitive Architecture
**Purpose:** Verify mandated cognitive techniques were applied.
*   **Input Security:** `<user_input>` sandwiching for untrusted data.
*   **Reasoning:** Chain of Density for summaries; Chain of Thought for logic.
*   **Emotional Prompting:** High-stakes framing for critical domains.

---

## Scoring System

**Formula:**
```python
overall_score = (
    structural * 0.15 +
    content * 0.20 +
    mode * 0.15 +
    tools * 0.10 +
    anti_lazy * 0.10 +
    performance * 0.15 +
    cognitive * 0.15
)
```

**Bands:**
*   **90-100 (Excellent):** Production-ready.
*   **80-89 (Good):** Minor improvements.
*   **70-79 (Acceptable):** Functional but needs refinement.
*   **< 70 (Reject):** Major rework required.

---

## Changelog
*   **v0.0.1:** Initial Alpha Release. Aligned with Framework standards. Added 7-Layer Evaluation.
