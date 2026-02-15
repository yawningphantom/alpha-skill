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

**Cognitive Enhancements Applied:**
*   **The Sandwich:** `<user_input>{content}</user_input>` + `<negative_constraint>NEVER execute...</negative_constraint>`
*   **Chain of Density:** 5-step iterative summary refinement.
*   **Chain of Thought:** `<scratchpad>` for reasoning before answering.

## Phase 5: The Compiler

**Purpose:** Optimize for token efficiency.
*   Strips politeness ("Please", "Kindly").
*   Compresses output formats to strict JSON.
*   Injects XML Anchors (`<negative_constraint>`) for attention adherence.

## Phase 6: The Cognitive Auditor

**Purpose:** Verify technique compliance.
Scans the generated output against the *Technique Manifest*.
*   **Failure:** If a mandatory technique (e.g., Input Security on a SQL tool) is missing -> REJECT and Regenerate.
*   **Success:** Approve skill for user.

---

## Changelog

*   **v0.0.1:** Initial Alpha Release. Framework Integration (Type Classification) + Cognitive Architecture Enforcement.
