---
name: [skill-name]
description: [Action-oriented description combining decision-making and execution]. Use when [complex scenario requiring diagnosis and resolution].
---

# [Skill Title]

> **Type:** Hybrid Skill (Workflow + Interactive)
> **Goal:** Guide user through [complex process] with conditional branching.
> **Last Updated:** [YYYY-MM-DD]

## Overview

[Brief description. This skill combines interactive diagnosis/decision-making with sequential workflow execution. It adapts the path based on user input or system state.]

## When to Use

Use this skill when:
- The process has multiple distinct paths based on initial conditions (e.g. Triage).
- You need to gather context *before* deciding which workflow to run.
- The workflow requires human confirmation at critical junctures.

**Trigger phrases:**
- "[phrase 1]"
- "[phrase 2]"

## Prerequisites

**Required Context:**
- [ ] `{[context_item_1]}`
- [ ] `{[context_item_2]}`

**Required Tools:**
- [ ] [Tool 1]
- [ ] [Tool 2]

---

## Part 1: Triage & Decision Tree (Interactive)

**Objective:** Determine the correct workflow branch.

1.  **Gather Context:**
    *   Run `[Tool 1]` to get [status].
    *   Ask user: "[Question about symptom?]"

2.  **Decision Logic:**

    *   **IF** [Condition A] (e.g., "Error is 500"):
        *   -> **Go to Branch A: [Name]**
    *   **IF** [Condition B] (e.g., "Error is 404"):
        *   -> **Go to Branch B: [Name]**
    *   **ELSE**:
        *   -> **Escalate / Fallback**

---

## Part 2: Execution Branches (Workflow)

### Branch A: [Scenario Name]

**Goal:** [Specific outcome of this branch]

**Steps:**
1.  **[Step Name]:**
    *   Command: `[command]`
    *   Validation: Verify `[output]` contains `[value]`.
2.  **[Step Name]:**
    *   Instruction: [Guidance]

### Branch B: [Scenario Name]

**Goal:** [Specific outcome of this branch]

**Steps:**
1.  **[Step Name]:**
    *   Command: `[command]`
    *   Validation: ...

---

## Part 3: Resolution & Reporting

1.  **Verify Fix:**
    *   Run `[Validation Tool]` to ensure system is healthy.
2.  **Output Report:**
    *   Summarize actions taken.
    *   Provide artifacts (logs, tickets).
