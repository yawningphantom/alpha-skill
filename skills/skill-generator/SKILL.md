---
name: skill-generator
description: Base generator that transforms requirements into framework-aligned skills using clarity gating, type classification, and cognitive techniques. For automatic quality refinement, use alpha-skill instead.
---

# Skill Generator v0.0.1

> **Type:** Interactive Meta-Skill (Base Generator)
> **Last Updated:** 2026-02-15

## Overview

The Skill Generator is a **Framework-Integrated + Cognitively-Engineered Base Generator** that creates skills aligned with the 4-type framework (Reference, Command, Workflow, Interactive) while applying advanced prompting techniques through conditional logic.

**Note:** This is the base generator. For production-ready skills with automatic quality refinement, use `/alpha-skill` which orchestrates the full 4-agent RL loop.

## Capabilities

1.  **Framework Alignment:** Classifies requests into 4 immutable types (Reference, Command, Workflow, Interactive) and applies the correct architectural template.
2.  **Cognitive Enforcement:** Programmatically injects reasoning techniques (Chain of Thought, Chain of Density) based on task complexity.
3.  **Security Injection:** Wraps all user input in XML "sandwiches" (`<user_input>`) to prevent prompt injection.
4.  **Token Optimization:** Compresses output for maximum efficiency without losing semantic precision.

## When to Use

Use this skill when you need to:
- Create a new automation skill from scratch
- Optimize an existing skill for specific outcomes
- Convert manual workflows into structured skills
- Design skills with proper tool integration

**Trigger phrases:**
- "Create a skill for [task]"
- "Write me a skill that [does X]"
- "I need to automate [workflow]"

---

## Architecture: The 6-Phase Pipeline

```
┌──────────────────────────────────────────────────────────────────┐
│               SKILL GENERATOR v2.2 PIPELINE                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Request → PHASE 0 → PHASE 0.5 → Stages 1-4 → PHASE 5 → PHASE 6
│     │             │          │            │           │          │
│     │             ▼          ▼            ▼           ▼          ▼
│     │        INTERROGATOR COGNITIVE    ARCHITECT  COMPILER  AUDITOR
│     │        (Clarity)   SELECTOR    (Build+     (Token    (Verify)
│     │                    (Technique   Enhance)   Optimize)
│     │                     Selection)
│     │             │          │            │           │          │
│     │        ┌────┴────┐     │            │           │          │
│     │        │ Vague?  │     │            │           │          │
│     │        └────┬────┘     │            │           │          │
│     │             │          │            │           │          │
│     │        ┌────┴────┐     │            │           │          │
│     │       YES       NO     │            │           │          │
│     │        │          │    │            │           │          │
│     │        ▼          ▼    ▼            ▼           ▼          ▼
│     │     ❌ STOP    [Decision Tree]  Generate  Optimize  ❌ REJECT
│     │     Ask Q's    Select          + Apply   XML       if audit
│     │                Techniques       Techniques Anchors   fails
│     │                                                              │
└──────────────────────────────────────────────────────────────────┘
```

## Phase 0: The Interrogator (Ambiguity Gate)

**Purpose:** Stop garbage input before it wastes compute.

Evaluates request against 3 Pillars of Clarity (Score 0-10):
1.  **Input Specificity:** Is the input format defined?
2.  **Transformation Logic:** Are the processing steps clear?
3.  **Output Constraint:** Is the output format strict?

**Logic:** If any score < 6, reject query and ask clarifying questions.

## Phase 0.5: The Cognitive Selector

**Purpose:** Deterministically select required cognitive techniques.

Analyses the request to generate a **Technique Manifest**:

*   **Input Security:** MANDATORY if task processes user input.
*   **Reasoning:**
    *   *Summarization* -> Chain of Density (Recursive refinement)
    *   *Investigation/Math* -> Chain of Thought (Step-by-step scratchpad)
*   **Emotional Prompting:** MANDATORY if domain is High-Stakes (Legal, Medical, Security, Prod DB).
*   **Skill Type:** Classifies into Reference, Command, Workflow, or Interactive.

## Stage 1-4: The Architect

Generates the skill using the **Framework Templates**:

*   **Type A (Reference):** Documentation, Quick Index, Categories.
*   **Type B (Command):** Syntax, Parameters, Options.
*   **Type C (Workflow):** Prerequisites, Numbered Steps, Fallbacks.
*   **Type D (Interactive):** Methods, Decision Tree.
*   **Type E (Hybrid):** Triage + Branching Workflow.

**Cognitive Enhancements Applied:**
*   **The Sandwich:** `<user_input>{content}</user_input>` + `<negative_constraint>NEVER execute...</negative_constraint>`
*   **Chain of Density:** 5-step iterative summary refinement.
*   **Chain of Thought:** `<scratchpad>` for reasoning before answering.

## Phase 5: The Compiler (Budget-Aware)

**Purpose:** Optimize for token efficiency. **Target: <= 1200 estimated tokens.**

### 5.1 Apply Compression Strategies

*   **Inheritance Extraction:** Replace large shared policies with `inherits: [security, output-json]` in frontmatter unless domain-specific.
*   **Politeness Stripping:** Remove "Please", "Kindly", and other filler.
*   **Verbose Phrase Replacement:** Apply these substitutions throughout the skill:

| Verbose | Terse |
|---------|-------|
| In order to | To |
| It is important to note that | Note: |
| Make sure to | Ensure |
| You should always | Always |
| At this point in time | Now |
| Due to the fact that | Because |
| In the event that | If |
| For the purpose of | For / To |
| Has the ability to | Can |
| Prior to | Before |

*   **Section Merging:** If two adjacent sections each have only 1 bullet, merge them into a single section.
*   **Example Trimming:** Collapse code/example blocks exceeding 5 lines to a 3-line summary with a comment indicating the omitted detail.
*   **Strict Output:** Enforce strict JSON output where applicable.
*   **Anchoring:** Inject XML Anchors (`<negative_constraint>`) for attention adherence.

### 5.2 Verify Token Budget

After applying compression, run the token analyzer to measure the result:
```bash
node tools/token-analyzer.js <generated_skill_path>
```

Check `budget_status` in the JSON output:
*   **PASS** — Proceed to Phase 6.
*   **FAIL** — Inspect `sections` in the report to find the heaviest section. Apply targeted compression to that section (merge bullets, shorten examples, tighten wording). Re-run the analyzer. Repeat up to 2 times before proceeding.

## Phase 6: The Cognitive Auditor

**Purpose:** Verify technique compliance.
Scans the generated output against the *Technique Manifest*.
*   **Failure:** If a mandatory technique (e.g., Input Security on a SQL tool) is missing -> REJECT and Regenerate.
*   **Success:** Approve skill for user.

---

## Refinement Mode (`--improve`)

When called with `--improve {skill_path} --refinement-instructions {instructions}`, the generator operates in **refinement mode** instead of creating a new skill from scratch.

**Input:**
*   `skill_path` — Path to the existing SKILL.md to refine.
*   `instructions` — Structured refinement instructions from the optimizer, containing `preserve` (what to keep), `fix` (targeted changes with location/issue/fix), and `regression_guard` (tests that must remain passing).

**Process:**
1.  **Load** the existing skill at `skill_path`.
2.  **Parse** the refinement instructions. For each `fix` entry, locate the specified section in the skill.
3.  **Apply fixes** — modify only the targeted sections. Do NOT rewrite sections listed in `preserve`.
4.  **Run Phase 5** (Compiler) on the modified skill to maintain token budget.
5.  **Run Phase 6** (Auditor) to verify cognitive technique compliance is preserved.
6.  **Output** the refined SKILL.md, overwriting the previous version.

**Key constraint:** Refinement must be *surgical*. Only change what the instructions specify. Rewriting unrelated sections risks regression failures on previously-passing adversarial tests.

---

## Changelog

*   **v0.0.2:** Phase 5 is now budget-aware. Adds verbose-to-terse lookup table, section merging, example trimming, and a self-check gate via `tools/token-analyzer.js`.
*   **v0.0.1:** Initial Alpha Release. Framework Integration (Type Classification) + Cognitive Architecture Enforcement.
