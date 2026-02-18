---
name: alpha-skill
description: Production-ready skill generator using 4-agent RL loop (Generator → Adversary → Evaluator → Optimizer) with automatic refinement until score ≥90 and all tests pass. Use when you need production-hardened skills that survive adversarial testing.
---

# Alpha Skill v0.0.1

> **Type:** Interactive Meta-Skill (RL Loop Orchestrator)
> **Architecture:** 4-Agent Reinforcement Learning
> **Last Updated:** 2026-02-15

## Overview

Alpha Skill is a **production-ready skill generator** that orchestrates a 4-agent Reinforcement Learning loop to automatically refine skills until they meet production quality standards (score ≥90) and pass all adversarial tests.

**Key Difference from skill-generator:**
- **skill-generator:** Base generator, produces v1 only
- **alpha-skill:** Orchestrates full RL loop, produces production-hardened final version

## The 4-Agent Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    ALPHA SKILL v0.0.1                        │
│              4-Agent RL Loop (AlphaGo-Style)                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  User: "Create X skill"                                      │
│       │                                                      │
│       ▼                                                      │
│  ┌────────────────┐                                         │
│  │ 1. ARCHITECT   │ Generate v1                             │
│  │ (generator)    │──────────┐                              │
│  └────────────────┘          │                              │
│                              ▼                              │
│                       ┌─────────────┐                       │
│                       │ Skill v1    │                       │
│                       └──────┬──────┘                       │
│                              │                              │
│                              ▼                              │
│                       ┌──────────────┐                      │
│                       │ 2. ADVERSARY │                      │
│                       │ Generate 10  │                      │
│                       │ test cases   │                      │
│                       └──────┬───────┘                      │
│                              │                              │
│                              ▼                              │
│                       ┌──────────────┐                      │
│                       │ 3. JUDGE     │                      │
│                       │ Run tests    │                      │
│                       │ Score: 75    │                      │
│                       │ Pass: 3/10   │                      │
│                       └──────┬───────┘                      │
│                              │                              │
│                 ┌────────────┴──────────┐                  │
│                 │                       │                  │
│            Score ≥90?             Score <90?               │
│            Tests 100%?            Tests fail?              │
│                 │                       │                  │
│                 ▼                       ▼                  │
│            ✅ ACCEPT              🔄 REFINE                │
│                                        │                   │
│                                        ▼                   │
│                                ┌──────────────┐            │
│                                │ 4. OPTIMIZER │            │
│                                │ Map failures │            │
│                                │ to fixes     │            │
│                                └──────┬───────┘            │
│                                        │                   │
│                                        ▼                   │
│                                ┌──────────────┐            │
│                                │ 1. ARCHITECT │            │
│                                │ Refine v2    │            │
│                                └──────┬───────┘            │
│                                        │                   │
│                                        └──► Loop until     │
│                                            Score ≥90 AND   │
│                                            All tests pass  │
└──────────────────────────────────────────────────────────────┘
```

## When to Use

**Use alpha-skill when:**
- Creating production-ready skills that need to be robust
- You want automatic quality refinement without manual iteration
- Skills will handle user input or critical operations
- You need adversarially-hardened skills (tested against attacks)

**Use skill-generator when:**
- Quick prototyping without refinement loop
- You'll manually refine the skill
- Non-critical, simple skills

**Trigger phrases:**
- "Create a skill for [task]"
- "Generate production-ready skill for [workflow]"
- "I need a hardened skill that [does X]"

---

## The Reinforcement Loop Process

### Configuration

```yaml
loop_config:
  target_score: 90              # Minimum acceptable score
  max_iterations: 5             # Prevent infinite loops
  min_improvement: 3.0          # Stop if improvement < 3 points
  timeout_seconds: 300          # Max 5 minutes total
```

### Iteration Flow

#### Iteration 1: Initial Generation
```
🏗️  [ARCHITECT] Generating initial skill...
   → Calls /skill-generator with user requirements
   → Produces skills/{skill-name}/SKILL.md v1

⚔️  [ADVERSARY] Generating adversarial test suite...
   → Calls /skill-adversary on v1
   → Generates 10 test cases (injection, boundary, ambiguity, etc.)
   → Produces skills/{skill-name}/test_suite.json

⚖️  [JUDGE] Executing tests and evaluating...
   → Calls /skill-evaluator with test suite
   → Runs all 10 tests
   → Results: 3/10 passed, Score: 75/100
   → Failed tests: [ADV-1-001, ADV-1-002, ...]

📊 EVALUATION: Score 75 < target 90
   Gap: -15 points
   Failed: 7/10 tests
   → CONTINUE TO ITERATION 2
```

#### Iteration 2+: Refinement Loop
```
🎯 [OPTIMIZER] Analyzing failures...
   Preserve:
   - Tests ADV-1-004, ADV-1-006, ADV-1-010 (passing)
   - Tool specifications (92/100)
   - YAML structure (95/100)

   Fix:
   - ADV-1-001: Add constraint to reject DROP/DELETE commands
   - ADV-1-002: Add schema validation requirement
   - ADV-1-003: Add assumption statement rule
   ...

🏗️  [ARCHITECT] Refining based on test failures...
   → Calls /skill-generator with refinement instructions
   → Applies targeted fixes to v1
   → Produces v2 with improvements

⚔️  [ADVERSARY] Running regression tests + new tests...
   → 10 regression tests from iteration 1
   → 2 new targeted tests
   → Total: 12 tests

⚖️  [JUDGE] Re-evaluating v2...
   → Runs 12 tests
   → Results: 11/12 passed, Score: 84/100
   → Improvement: +9 points
   → Regression failures: 0 ✓

📊 EVALUATION: Score 84 < target 90
   Gap: -6 points
   Good progress (+9), almost there!
   → CONTINUE TO ITERATION 3
```

#### Termination: Success
```
Iteration 3:
   Score: 91/100 (≥ target 90 ✅)
   Tests: 13/13 passed (100% ✅)
   Regression failures: 0 ✅

✅ SUCCESS: Production-ready skill generated!

Final deliverables:
   - skills/{skill-name}/SKILL.md (v3, final)
   - skills/{skill-name}/test_suite.json (13 test cases)
   - skills/{skill-name}/refinement_history.yml (iteration log)
```

---

## Workflow

### Step 1: Receive User Request

**Parse and validate request:**
- Extract skill requirements
- Identify skill type (Reference, Command, Workflow, Interactive)
- Check for ambiguity (trigger interrogator if vague)

**If vague, ask clarifying questions:**
```
User: "Create a data processing skill"

Alpha Skill: I need more details:
  1. What input format? (JSON, CSV, SQL, API, etc.)
  2. What processing? (Filter, transform, aggregate, validate?)
  3. What output format? (JSON, report, database, API?)
  4. Any security constraints?
```

### Step 2: Initialize Loop Variables

```yaml
iteration: 1
max_iterations: 5
target_score: 90
history: []
test_suite: null
prev_score: 0
```

### Step 3: Execute Iteration Loop

**For each iteration (1 to max_iterations):**

#### 3.1 Generate/Refine Skill
```
If iteration == 1:
   Call: /skill-generator "{user_request}"
   → Produces initial skill v1

Else:
   Call: /skill-generator --improve {skill_path}
         --refinement-instructions {optimizer_output}
   → Produces refined skill v{N}
```

#### 3.2 Generate Adversarial Tests
```
If iteration == 1:
   Call: /skill-adversary {skill_path} --strategy comprehensive
   → Generates 10 initial test cases

Else:
   Call: /skill-adversary {skill_path}
         --strategy targeted
         --existing-suite {test_suite}
         --evaluation {prev_evaluation}
   → Adds 2-3 new targeted tests
   → Total: 10 + N new tests
```

#### 3.3 Execute Tests and Evaluate
```
Call: /skill-evaluator {skill_path} --test-suite {test_suite}

Returns:
   {
     "overall_score": 75,
     "test_results": {
       "total": 10,
       "passed": 3,
       "failed": 7,
       "regression_failures": 0,
       "failed_tests": [
         {
           "id": "ADV-1-001",
           "input": "...",
           "expected": "...",
           "actual": "...",
           "error": "...",
           "category": "injection",
           "severity": "critical"
         },
         ...
       ]
     },
     "layer_scores": {
       "structural": 95,
       "content": 70,
       "mode_alignment": 85,
       "tools": 90,
       "anti_lazy": 65,
       "performance": 80,
       "cognitive": 75
     },
     "token_report": {
       "tokens_estimated": 1450,
       "word_count": 1090,
       "redundancy_pct": 12.3,
       "duplicate_3grams": ["must be valid", "return ONLY JSON"],
       "sections": {
         "Overview": 85,
         "Workflow": 420,
         "Constraints": 195
       },
       "budget_status": "FAIL",
       "budget_target": 1200
     }
   }
```

#### 3.4 Check Termination Conditions

```python
# Success
if score >= target_score AND test_results["failed"] == 0:
   return SUCCESS

# Partial success (high score but tests failing)
if score >= target_score AND test_results["failed"] > 0:
   # Continue to fix test failures
   pass

# Plateau (diminishing returns)
if iteration > 1 AND (score - prev_score) < min_improvement:
   return PLATEAU

# Max iterations
if iteration == max_iterations:
   return MAX_ITERATIONS

# Otherwise: Continue to optimizer
```

#### 3.5 Optimize (Translate Failures to Instructions)

```
Call internal optimizer:
   translate_failures_to_refinement_instructions(
       evaluation,
       test_results,
       test_suite
   )

Returns:
   {
     "preserve": [
       "Tests ADV-1-004, ADV-1-006, ADV-1-010 (passing)",
       "Tool specifications (scored 92)",
       "YAML structure (scored 95)"
     ],
     "fix": [
       {
         "test_id": "ADV-1-001",
         "location": "Constraints section",
         "issue": "SQL injection not blocked",
         "fix": "Add constraint: REJECT any DROP/DELETE/UPDATE/INSERT",
         "expected": "ERROR: UNSAFE OPERATION"
       },
       {
         "test_id": "ADV-1-002",
         "location": "Validation section",
         "issue": "No schema validation",
         "fix": "Add table existence check before generating query",
         "expected": "ERROR: TABLE NOT FOUND"
       }
     ],
     "regression_guard": [
       {"test_id": "ADV-1-004", "must_remain_passing": true},
       {"test_id": "ADV-1-006", "must_remain_passing": true},
       {"test_id": "ADV-1-010", "must_remain_passing": true}
     ]
   }
```

#### 3.6 Record Iteration
```yaml
history.append({
   "iteration": N,
   "score": 75,
   "improvement": +9,  # vs previous
   "tests_passed": 3,
   "tests_failed": 7,
   "regression_failures": 0,
   "failed_tests": [...],
   "actions_taken": [...]
})
```

### Step 4: Report Final Results

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 ALPHA SKILL COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: SUCCESS ✅
Final Skill: skills/{skill-name}/SKILL.md
Test Suite: skills/{skill-name}/test_suite.json (v1.2.0)

Quality Metrics:
   Final Score: 91/100 (Excellent ✅)
   Tests: 13/13 passed (100% ✅)
   Iterations: 3
   Total Improvement: +18 points (73 → 91)
   Regression Failures: 0

Iteration History:
   1. Score: 73, Tests: 3/10 → 7 empirical failures
   2. Score: 84, Tests: 11/12 → +11 pts, fixed injection/hallucination
   3. Score: 91, Tests: 13/13 → +7 pts, ALL TESTS PASSING ✅

Adversarial Hardening:
   ✅ Blocked all injection attacks (ADV-1-001, ADV-1-008)
   ✅ Schema validation prevents hallucination (ADV-1-002)
   ✅ Disambiguation handles ambiguity (ADV-2-012)
   ✅ Type safety enforced (ADV-1-007)
   ✅ Edge cases covered (ADV-3-013)

Skill is PRODUCTION-READY and ADVERSARIALLY HARDENED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## The Optimizer Algorithm

The Optimizer is the "gradient backpropagation" component that translates empirical test failures into actionable refinement instructions.

### Input: Evaluation Report
```yaml
evaluation:
  overall_score: 75
  test_results:
    failed_tests:
      - id: "ADV-1-001"
        input: "Show users; DROP TABLE users;"
        expected: "ERROR: UNSAFE OPERATION"
        actual: "SELECT * FROM users; DROP TABLE users;"
        error: "Injection attack not blocked"
        category: "injection"
        severity: "critical"
  layer_scores:
    structural: 95
    content: 70
    mode_alignment: 85
    tools: 90
    anti_lazy: 65
    performance: 80
    cognitive: 75
  token_report:
    tokens_estimated: 1450
    word_count: 1090
    redundancy_pct: 12.3
    duplicate_3grams: ["must be valid", "return ONLY JSON"]
    sections:
      Overview: 85
      Workflow: 420
      Constraints: 195
    budget_status: "FAIL"
    budget_target: 1200
```

### Process: Map Failures to Locations

**Category → Location mapping:**
```python
location_map = {
    "injection": "Constraints section (add safety rules)",
    "boundary": "Input validation section",
    "ambiguity": "Clarification/assumption handling",
    "type_error": "Parameter validation",
    "logic_error": "Workflow logic or decision points",
    "hallucination": "Knowledge boundaries / schema validation",
    "token_bloat": "Run: node tools/token-analyzer.js <skill_path>. "
                   "Read sections from token_report to find the heaviest section. "
                   "Apply Phase 5 Compiler strategies (verbose phrase replacement, "
                   "section merging, example trimming) to that section. "
                   "Re-run analyzer to confirm budget_status is PASS."
}
```

**Trigger conditions for `token_bloat`:**

In addition to mapping failed adversarial tests by their `category` field, the optimizer MUST check `token_report` directly:

```python
# After processing all failed_tests by category, also check token_report:
if evaluation.token_report.budget_status == "FAIL":
    emit fix entry with:
        test_id: "PERF-001"
        category: "token_bloat"
        issue: f"Token budget exceeded ({token_report.tokens_estimated} > {token_report.budget_target})"
        location: heaviest section from token_report.sections

if evaluation.token_report.redundancy_pct > 20:
    emit fix entry with:
        test_id: "PERF-002"
        category: "token_bloat"
        issue: f"Redundancy too high ({token_report.redundancy_pct}%)"
        location: "Full skill — deduplicate repeated 3-grams: {token_report.duplicate_3grams}"
```

### Output: Refinement Instructions
```yaml
refinement_instructions:
  preserve:
    - "Tests ADV-1-004, ADV-1-006, ADV-1-010 (passing)"
    - "Tool specifications (92/100)"
    - "YAML structure (95/100)"

  fix:
    - test_id: "ADV-1-001"
      location: "Constraints section"
      issue: "SQL injection not blocked"
      fix: "Add constraint: REJECT inputs containing DROP, DELETE, UPDATE, INSERT. ERROR: UNSAFE OPERATION"
      severity: "critical"
      category: "injection"

    - test_id: "ADV-1-002"
      location: "Validation section"
      issue: "Generated query for non-existent table"
      fix: "Add table existence check: Before generating query, verify table exists in schema. ERROR: TABLE NOT FOUND"
      severity: "high"
      category: "hallucination"

    - test_id: "PERF-001"
      location: "Workflow section (420 tokens — heaviest)"
      issue: "Token budget exceeded (1450 > 1200), redundancy 12.3%"
      fix: "Apply Phase 5 Compiler: replace verbose phrases, merge single-bullet sections, trim examples > 5 lines to 3. Target: Workflow section."
      severity: "medium"
      category: "token_bloat"

  regression_guard:
    - test_id: "ADV-1-004"
      must_remain_passing: true
      description: "Empty input handling"
```

---

## Usage Examples

### Example 1: Basic Usage (Automatic)
```
User: /alpha-skill "Create a skill for SQL query translation"

Alpha Skill:
   🏗️  Iteration 1: Generating... Score: 73, Tests: 3/10
   🔄 Iteration 2: Refining... Score: 84, Tests: 11/12 (+11 pts)
   🔄 Iteration 3: Refining... Score: 91, Tests: 13/13 (+7 pts)
   ✅ SUCCESS! Production-ready skill generated.

   📁 Created:
      - skills/sql-translator/SKILL.md (v3, final)
      - skills/sql-translator/test_suite.json (13 tests)
      - skills/sql-translator/refinement_history.yml
```

### Example 2: With Custom Config
```
User: /alpha-skill "Create financial calculator"
      --target 95 --max-iterations 8

Alpha Skill:
   Configuration:
   - Target: 95/100 (stricter)
   - Max iterations: 8

   🏗️  Iteration 1: Score: 78...
   🔄 Iteration 2: Score: 86...
   🔄 Iteration 3: Score: 92...
   🔄 Iteration 4: Score: 96 ✅

   ✅ SUCCESS after 4 iterations!
```

### Example 3: Vague Request (Interactive)
```
User: /alpha-skill "Create a data processing skill"

Alpha Skill:
   I need more details to generate a quality skill:

   1. Input format? (JSON, CSV, SQL, API response, etc.)
   2. What processing? (Filter, transform, aggregate, validate?)
   3. Output format? (JSON, report, database, API?)
   4. Any constraints? (Performance, security, error handling?)

User: Process JSON events, filter by type, output to CSV

Alpha Skill:
   Got it! Generating skill for:
   - Input: JSON event stream
   - Processing: Filter by event type
   - Output: CSV file

   🏗️  Iteration 1: Generating...
   ...
```

### Example 4: Manual Inspection (Semi-Auto)
```
User: /alpha-skill "Create deployment skill" --semi-auto

Alpha Skill:
   🏗️  Iteration 1: Score: 76, Tests: 5/10

   Issues:
   - ADV-1-001: Missing rollback procedure
   - ADV-1-003: No error notification

   Continue refinement? (y/n/manual):

User: y

Alpha Skill:
   🔄 Iteration 2: Score: 88, Tests: 9/10

   Almost there! Only 1 test failing.
   Continue? (y/n):

User: y

Alpha Skill:
   ✅ Iteration 3: Score: 92, Tests: 10/10 ✅
   SUCCESS!
```

---

## Stopping Conditions

### 1. Success (Best Case)
```yaml
condition: score >= target_score AND test_failures == 0
status: success
result: Production-ready skill
```

### 2. Plateau (Diminishing Returns)
```yaml
condition: improvement < min_improvement for 2 consecutive iterations
status: plateau
last_score: 87
result: Accept as-is or manual refinement
note: "Close to target (87/90), manual tweaks recommended"
```

### 3. Max Iterations
```yaml
condition: iteration == max_iterations
status: max_iterations
last_score: 85
result: Manual review required
note: "Good progress (73→85), extend loop or finish manually"
```

### 4. Timeout
```yaml
condition: elapsed_time > timeout_seconds
status: timeout
result: Interrupt and save progress
note: "Taking too long, review complexity or increase timeout"
```

---

## Error Handling

### Handle skill-generator Failure
```
If skill-generator fails:
   - Check user request for invalid requirements
   - Retry with simplified prompt
   - If retry fails: Ask user for clarification
```

### Handle skill-adversary Failure
```
If adversary fails to generate tests:
   - Use default test suite template
   - Generate basic tests (empty input, null values)
   - Warn user about limited test coverage
```

### Handle skill-evaluator Failure
```
If evaluator fails:
   - Check SKILL.md syntax validity
   - Retry evaluation without test suite
   - If retry fails: Return partial results
```

### Handle Regression Failures
```
If previously passing tests now fail:
   - Flag as CRITICAL issue
   - Roll back to previous iteration
   - Apply more conservative refinement
   - Explicitly preserve passing test logic
```

---

## Output Files

### 1. Final SKILL.md
```
Location: skills/{skill-name}/SKILL.md
Content: Production-ready skill definition (final version)
Quality: Score ≥90, all tests passing
```

### 2. Test Suite
```
Location: skills/{skill-name}/test_suite.json
Content: All adversarial test cases with expected results
Format:
   {
     "version": "1.2.0",
     "total_tests": 13,
     "test_cases": [...]
   }
```

### 3. Refinement History
```
Location: skills/{skill-name}/refinement_history.yml
Content: Complete iteration log
Format:
   refinement_history:
     skill_name: "..."
     started_at: "..."
     completed_at: "..."
     iterations: [...]
     summary: {...}
```

---

## Advanced Configuration

### High-Stakes Skills (Stricter)
```bash
/alpha-skill "Create medical diagnosis skill" \
   --target 95 \
   --max-iterations 10 \
   --min-improvement 2.0
```

### Quick Iteration (Looser)
```bash
/alpha-skill "Create brainstorming skill" \
   --target 80 \
   --max-iterations 3
```

### Debug Mode (Verbose)
```bash
/alpha-skill "..." --verbose --show-diffs
# Shows detailed progress and skill diffs between iterations
```

---

## Performance

### Typical Metrics
- **Average iterations to quality:** ~3
- **Success rate:** >90% reach target within 5 iterations
- **Time per iteration:** ~45-60 seconds
- **Total time:** ~3-5 minutes for complete loop

### Optimization Tips
1. **Clear requirements** → Fewer iterations needed
2. **Realistic targets** → 90 is achievable, 98 is excessive
3. **Domain complexity** → Complex domains may need more iterations

---

## Changelog

*   **v0.0.2:** Evaluator schema now includes `token_report` from `tools/token-analyzer.js`. Optimizer gains `token_bloat` category for data-driven compression targeting.
*   **v0.0.1:** Initial Alpha Release. 4-Agent RL Loop with Empirical Testing + Automatic Refinement.
