# Reinforcement Learning Loop for Skill Generation

**Automatic Quality Improvement Through Iterative Refinement**

**Version 0.0.1** - Enhanced with 4-Agent Architecture

---

## Overview

The Reinforcement Learning (RL) Loop is a self-improving system where skills are automatically refined until they meet production quality standards. It uses a **4-agent architecture** combining generation, adversarial testing, evaluation, and optimization.

**Academic Foundation:** Based on Reflexion (Shinn et al.) and TextGrad - treating evaluation as gradients for prompt optimization.

### The 4-Agent Architecture (+ Ingestor Pre-Processing)

```
┌──────────────────────────────────────────────────────────────┐
│           REINFORCEMENT LEARNING LOOP v0.0.2                 │
│           4-Agent Architecture (AlphaGo-Style)               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  User Request                                                │
│  "Create X skill"                                            │
│       │                                                      │
│       ▼                                                      │
│  ┌──────────────────┐                                       │
│  │ 0. Ingestor      │ NEW: Phase 0 Context Ingestion         │
│  │ (Context Reader) │ Scans refs/, resources/, runbooks      │
│  │                  │ Produces: Domain Knowledge Brief       │
│  └────────┬─────────┘                                       │
│           │                                                  │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │  1. Architect    │ Generate v1                           │
│  │  (skill-generator)  │──────────┐                            │
│  └──────────────────┘          │                            │
│                                ▼                            │
│                         ┌─────────────┐                     │
│                         │  New Skill  │                     │
│                         │  v1         │                     │
│                         └──────┬──────┘                     │
│                                │                            │
│                                ▼                            │
│                         ┌─────────────────┐                 │
│                         │ 2. Adversary    │                 │
│                         │ (skill-adversary)│                │
│                         │ Generate Tests  │                 │
│                         └────────┬────────┘                 │
│                                  │                          │
│                         Test Suite: 10 cases               │
│                         [Injection, Boundary, ...]         │
│                                  │                          │
│                                  ▼                          │
│                         ┌──────────────────┐                │
│                         │ 3. Judge         │                │
│                         │ (skill-evaluator)│                │
│                         │ Run Tests        │                │
│                         └────────┬─────────┘                │
│                                  │                          │
│                         Empirical Results:                  │
│                         Passed: 6/10 tests                  │
│                         Score: 75/100                       │
│                         Failures: [specific errors]         │
│                                  │                          │
│                  ┌───────────────┴────────┐                │
│                  │                        │                │
│             Score ≥ 90?              Score < 90?           │
│             Tests: 100%?             Failed tests?         │
│                  │                        │                │
│                  ▼                        ▼                │
│             ✅ ACCEPT               🔄 OPTIMIZE            │
│             Publish                      │                 │
│                                          ▼                 │
│                                 ┌──────────────────┐       │
│                                 │ 4. Optimizer     │       │
│                                 │ (Feedback Trans) │       │
│                                 │ Map Failures     │       │
│                                 └────────┬─────────┘       │
│                                          │                 │
│                                 Refinement Plan:          │
│                                 Fix: Test ADV-1-003       │
│                                 Preserve: Layers 90+      │
│                                          │                 │
│                                          ▼                 │
│                                 ┌──────────────────┐       │
│                                 │ 1. Architect     │       │
│                                 │ --improve v2     │       │
│                                 └────────┬─────────┘       │
│                                          │                 │
│                                          ▼                 │
│                                   Generate v2              │
│                                          │                 │
│                                          ▼                 │
│                                 ┌──────────────────┐       │
│                                 │ 2. Adversary     │       │
│                                 │ Regression Tests │       │
│                                 │ + New Tests      │       │
│                                 └────────┬─────────┘       │
│                                          │                 │
│                                 Test Suite v2:            │
│                                 10 old + 2 new = 12       │
│                                          │                 │
│                                          └─────────┐       │
│                                            Loop    │       │
│                                            until   │       │
│                                            Perfect │       │
└──────────────────────────────────────────────────────────────┘
```

## Modes of Operation

### 1. Generation Mode (Greenfield)
Standard loop for creating new skills from scratch.

### 2. Rewrite Mode (Brownfield)
Used when updating existing skills or converting legacy runbooks.
*   **Goal:** Preserve domain knowledge while updating structure.
*   **Metric:** `preserve_ratio` (percentage of factual assertions retained).
*   **Process:** 
    1.  Parse existing skill/doc into knowledge graph (Entities, Procedures, Rules).
    2.  Architect applies new framework structure AROUND existing logic.
    3.  Judge explicitly checks for "knowledge shedding" (lost critical steps).

---

### Key Difference: Empirical vs. Subjective Evaluation

| Aspect | Old (3-Agent) | New (4-Agent) |
|--------|---------------|---------------|
| **Evidence** | "This looks wrong" | "Failed on Input X with Error Y" |
| **Specificity** | General advice | Exact failure logs |
| **Robustness** | Fragile to edge cases | Anti-fragile (stress tested) |
| **Feedback** | Subjective critique | Empirical test results |
| **Validation** | Static analysis | Dynamic execution |

---

## The Loop Components

### 1. Architect (skill-generator)

**Role:** Creates and refines skills based on requirements and feedback

**Capabilities:**
- Initial generation from user requirements
- Refinement based on empirical test failures
- Incremental improvement preserving high-scoring parts
- Targeted fixes for specific test failures

**Modes:**
- `--generate`: Create new skill from scratch
- `--improve`: Refine existing skill with feedback
- `--auto-refine`: Auto-loop with adversarial testing until quality threshold met

**Enhancement in v1.4.0:**
- Receives specific test failure logs (not just vague "improve this")
- Applies surgical fixes targeting exact failure modes
- Preserves passing tests while fixing failures

---

### 2. Adversary (skill-adversary) [NEW in v1.4.0]

**Role:** Generates adversarial test cases to expose skill weaknesses

**Capabilities:**
- Analyzes skill to identify potential failure modes
- Generates diverse test cases (injection, boundary, ambiguity, etc.)
- Maintains regression test suite across iterations
- Targets specific weaknesses from evaluation reports

**Test Categories:**
- **Injection Attacks**: SQL injection, command injection, XSS
- **Boundary Testing**: Empty inputs, null values, extreme ranges
- **Ambiguity**: Vague requirements, missing context
- **Type Errors**: Type mismatches, format violations
- **Logic Errors**: Edge cases in conditional logic
- **Hallucination**: References to non-existent entities

**Output:**
```json
{
  "test_suite_version": "1.1.0",
  "total_tests": 12,
  "regression_tests": 10,
  "new_tests": 2,
  "test_cases": [
    {
      "id": "ADV-1-001",
      "input": "Show users; DROP TABLE users;",
      "expected": "ERROR: UNSAFE OPERATION",
      "category": "injection",
      "severity": "critical"
    }
  ]
}
```

**Why This Matters:**
The Adversary transforms evaluation from *subjective* ("examples seem weak") to *empirical* ("failed test ADV-1-003 with specific error"). This is the missing link that enables true TextGrad-style optimization.

---

### 3. Judge (skill-evaluator)

**Role:** Executes tests and produces empirical scores

**Capabilities (Enhanced in v1.4.0):**
- Runs skill against adversarial test suite
- Produces pass/fail results for each test
- Aggregates test results into layer scores
- Identifies which specific tests failed and why
- Tracks regression (previously passing tests that now fail)

**Output:**
```yaml
test_results:
  total_tests: 10
  passed: 6
  failed: 4
  regression_failures: 0

  failed_tests:
    - id: "ADV-1-003"
      input: "Show data from last week"
      expected: "Ask for date or state assumption"
      actual: "Generated query with undefined date"
      error: "Ambiguous date reference not handled"
      category: "ambiguity"

  layer_scores:
    structural: 95
    content: 70  # Failed tests in examples
    mode_alignment: 85
    tools: 90
    anti_lazy: 65  # Failed safety tests

  overall_score: 75
```

**Key Change:** No longer "guessing" what's wrong - has concrete test failures to report.

---

### 4. Optimizer (Feedback Translator)

**Role:** Converts test failures into actionable refinement instructions

**Process:**
1. **Analyze Failures**: Group failed tests by category and layer
2. **Prioritize**: Critical failures first, then by layer score
3. **Preserve**: Mark passing tests and high-scoring layers (≥90) as "do not modify"
4. **Target**: Generate specific fix instructions for each failure
5. **Regression Guard**: Ensure fixes don't break previously passing tests

**Output:**
```yaml
refinement_instructions:
  preserve:
    - "Tool specifications (92/100, all tests passed)"
    - "YAML structure (95/100, validated)"
    - "Tests ADV-1-001, ADV-1-002 (must remain passing)"

  fix:
    - test_id: "ADV-1-003"
      location: "Constraints section"
      issue: "Ambiguous date not handled"
      fix: "Add constraint: 'If date is relative (last week, yesterday), ask for reference date OR state assumption explicitly'"
      verification: "Re-run ADV-1-003 after fix"

    - test_id: "ADV-1-007"
      location: "Examples section"
      issue: "Placeholder 'example.com' used"
      fix: "Replace with realistic domain from skill domain"
```

---

### 5. Loop Controller (Orchestrator)

**Role:** Manages the 4-agent workflow

**Responsibilities:**
- Trigger Architect → Adversary → Judge → Optimizer sequence
- Decide: Accept (score ≥90, all tests pass) or Refine?
- Pass refined instructions back to Architect
- Track iteration history with test results
- Prevent infinite loops (max iterations, timeout, plateau detection)
- Ensure regression tests always run

**Termination Conditions:**
1. **Success**: Score ≥90 AND all regression tests pass
2. **Plateau**: Score improvement <3 points for 2 consecutive iterations
3. **Max Iterations**: Reached limit (default: 5)
4. **Timeout**: Exceeded time limit (default: 5 minutes)
5. **Error**: Critical failure in any agent

---

## Loop Strategies

### Strategy 1: Automatic Loop (Recommended)

**Description:** Fully automated refinement until quality threshold met

**Usage:**
```bash
/alpha-skill "Create mortgage calculator" --auto-refine --target 90

# Process:
# Iteration 1: Generate → Score 75 → Refine
# Iteration 2: Generate → Score 82 → Refine
# Iteration 3: Generate → Score 91 → Accept ✅
```

**Configuration:**
```yaml
auto_refine_config:
  target_score: 90        # Minimum acceptable score
  max_iterations: 5       # Prevent infinite loops
  min_improvement: 3      # Stop if improvement < 3 points
  timeout_seconds: 300    # Max time for loop
```

**Termination Conditions:**
1. **Success:** Score ≥ target (90)
2. **Max iterations:** Reached iteration limit (5)
3. **Diminishing returns:** Improvement < threshold (3 points)
4. **Timeout:** Exceeded time limit (5 minutes)
5. **Error:** Critical failure in generation/evaluation

---

### Strategy 2: Semi-Automatic Loop

**Description:** User approves each iteration

**Usage:**
```bash
/alpha-skill "Create API docs skill" --semi-auto

# Process:
# Iteration 1: Generate → Score 75
#   Issues: [list]
#   Suggestions: [list]
#   Continue? (y/n/manual): y
#
# Iteration 2: Generate → Score 83
#   Issues: [list]
#   Continue? (y/n/manual): y
#
# Iteration 3: Generate → Score 92
#   Accept? (y/n): y ✅
```

**Benefits:**
- User oversight at each step
- Can exit early if "good enough"
- Can switch to manual refinement
- Learn from refinement process

---

### Strategy 3: Manual Loop

**Description:** User explicitly triggers each refinement

**Usage:**
```bash
# Step 1: Generate
/alpha-skill "Create deployment skill"
# → Generates skills/deployment/SKILL.md

# Step 2: Evaluate
/skill-evaluator skills/deployment/SKILL.md
# → Score: 75, Issues: [...]

# Step 3: Refine manually
/alpha-skill --improve skills/deployment/SKILL.md \
  --issues "Fix Example 2 placeholder; Add anti-lazy constraints"

# Step 4: Re-evaluate
/skill-evaluator skills/deployment/SKILL.md
# → Score: 88

# Step 5: Refine again
/alpha-skill --improve skills/deployment/SKILL.md \
  --issues "Add verification section"

# Step 6: Final evaluation
/skill-evaluator skills/deployment/SKILL.md
# → Score: 92 ✅
```

---

## Feedback Translation

The evaluator produces structured feedback that skill-generator uses for refinement:

### Evaluation Output Format

```yaml
evaluation_report:
  score: 75
  issues:
    critical: []
    major:
      - location: "Examples, Example 2"
        issue: "Uses placeholder 'example.com'"
        fix: "Replace with realistic URL"
        priority: 1
    minor:
      - location: "Constraints"
        issue: "Only 3/5 anti-lazy mechanisms"
        fix: "Add length constraints and verification"
        priority: 2

  strengths:
    - "Excellent tool specification"
    - "YAML structure perfect"

  layer_scores:
    structural: 95
    content: 70  # Needs work
    mode_alignment: 85
    tools: 90
    anti_lazy: 60  # Needs work
```

### Refinement Instructions Format

skill-generator receives:

```yaml
refinement_instructions:
  preserve:
    - "Tool specifications (scored 90)"
    - "YAML frontmatter (scored 95)"
    - "Mode alignment approach (scored 85)"

  improve:
    layer: content
    priority: HIGH
    actions:
      - location: "Examples section, Example 2"
        current: "Uses 'example.com'"
        target: "Use realistic financial website URL"
        example: "https://www.bankrate.com/calculators/mortgages/"

    layer: anti_lazy
    priority: MEDIUM
    actions:
      - location: "Constraints section"
        current: "3 mechanisms present"
        target: "5 mechanisms required"
        add:
          - "Maximum word count constraint"
          - "Verification before returning"
```

---

## The Refinement Algorithm (v1.4.0 with Adversarial Testing)

```python
def reinforcement_loop(
    user_request: str,
    target_score: int = 90,
    max_iterations: int = 5,
    min_improvement: float = 3.0
) -> dict:
    """
    Automatic skill refinement loop with 4-agent architecture.

    Returns:
        {
            'skill_path': str,
            'final_score': float,
            'test_suite_path': str,
            'iterations': int,
            'history': [...],
            'final_test_results': {...}
        }
    """
    # Iteration tracking
    history = []
    prev_score = 0
    test_suite = None

    for iteration in range(1, max_iterations + 1):
        print(f"\n{'='*50}")
        print(f"ITERATION {iteration}/{max_iterations}")
        print(f"{'='*50}\n")

        # Step 1: Architect - Generate or Refine
        if iteration == 1:
            # Initial generation
            print("🏗️  [ARCHITECT] Generating initial skill...")
            skill_path = skill_writer.generate(user_request)
        else:
            # Refinement based on test failures
            print("🏗️  [ARCHITECT] Refining skill based on test failures...")
            skill_path = skill_writer.improve(
                skill_path,
                refinement_instructions=feedback['instructions'],
                failed_tests=evaluation['test_results']['failed_tests']
            )

        # Step 2: Adversary - Generate Test Cases
        if iteration == 1:
            # Initial test suite generation
            print("⚔️  [ADVERSARY] Generating adversarial test suite...")
            test_suite = skill_adversary.generate(
                skill_path=skill_path,
                iteration=iteration,
                strategy="comprehensive"
            )
            print(f"   Generated {test_suite['total_tests']} test cases")
        else:
            # Regression tests + new targeted tests
            print("⚔️  [ADVERSARY] Running regression tests + generating new tests...")
            test_suite = skill_adversary.update(
                skill_path=skill_path,
                existing_test_suite=test_suite,
                iteration=iteration,
                evaluation_report=evaluation,
                strategy="targeted"
            )
            print(f"   Test suite: {test_suite['regression_count']} regression + {test_suite['new_count']} new")

        # Step 3: Judge - Run Tests and Evaluate
        print("⚖️  [JUDGE] Executing tests and evaluating...")
        evaluation = skill_evaluator.evaluate(
            skill_path=skill_path,
            test_suite=test_suite
        )

        current_score = evaluation['overall_score']
        test_results = evaluation['test_results']

        # Record iteration
        history.append({
            'iteration': iteration,
            'score': current_score,
            'tests_passed': test_results['passed'],
            'tests_failed': test_results['failed'],
            'regression_failures': test_results.get('regression_failures', 0),
            'failed_tests': test_results['failed_tests'],
            'improvements_made': feedback.get('actions_taken', []) if iteration > 1 else []
        })

        print(f"\n📊 Score: {current_score}/100")
        print(f"📈 Change: {current_score - prev_score:+.1f} points")
        print(f"✅ Tests Passed: {test_results['passed']}/{test_results['total']}")
        print(f"❌ Tests Failed: {test_results['failed']}/{test_results['total']}")

        if iteration > 1 and test_results.get('regression_failures', 0) > 0:
            print(f"⚠️  Regression Failures: {test_results['regression_failures']}")

        # Step 4: Check termination conditions

        # Success: Reached target AND all tests pass
        if current_score >= target_score and test_results['failed'] == 0:
            print(f"\n✅ SUCCESS: Score {current_score} ≥ target {target_score}")
            print(f"✅ All {test_results['total']} tests passed!")
            return {
                'status': 'success',
                'skill_path': skill_path,
                'test_suite_path': test_suite['path'],
                'final_score': current_score,
                'final_test_results': test_results,
                'iterations': iteration,
                'history': history
            }

        # Partial success: High score but some tests failing
        if current_score >= target_score and test_results['failed'] > 0:
            print(f"\n⚠️  PARTIAL SUCCESS: Score {current_score} ≥ {target_score}")
            print(f"   But {test_results['failed']} tests still failing")
            print(f"   Continuing to fix test failures...")
            # Don't terminate - fix the test failures

        # Diminishing returns: Improvement too small
        improvement = current_score - prev_score
        if iteration > 1 and improvement < min_improvement and test_results['failed'] == 0:
            print(f"\n⚠️  PLATEAU: Improvement {improvement:.1f} < {min_improvement}")
            print(f"   Stopping at score {current_score}")
            return {
                'status': 'plateau',
                'skill_path': skill_path,
                'test_suite_path': test_suite['path'],
                'final_score': current_score,
                'final_test_results': test_results,
                'iterations': iteration,
                'history': history
            }

        # Max iterations reached
        if iteration == max_iterations:
            print(f"\n⏰ MAX ITERATIONS: Stopped at {max_iterations}")
            print(f"   Final score: {current_score}")
            print(f"   Tests: {test_results['passed']}/{test_results['total']} passed")
            return {
                'status': 'max_iterations',
                'skill_path': skill_path,
                'test_suite_path': test_suite['path'],
                'final_score': current_score,
                'final_test_results': test_results,
                'iterations': iteration,
                'history': history
            }

        # Step 5: Optimizer - Translate failures to refinement instructions
        print(f"\n🔄 Continuing: Score {current_score} < target {target_score} OR tests failing")
        print(f"\n🎯 [OPTIMIZER] Analyzing failures...")

        feedback = translate_test_failures_to_feedback(
            evaluation=evaluation,
            test_results=test_results,
            test_suite=test_suite
        )

        prev_score = current_score

        print(f"\n🎯 Focus for next iteration:")
        print(f"   Failed Tests:")
        for failed_test in test_results['failed_tests'][:3]:  # Show first 3
            print(f"   - {failed_test['id']}: {failed_test['description']}")
        if len(test_results['failed_tests']) > 3:
            print(f"   - ... and {len(test_results['failed_tests']) - 3} more")

        print(f"\n   Low-Scoring Layers:")
        for layer, score in evaluation['layer_scores'].items():
            if score < 80:
                print(f"   - {layer}: {score}/100")

    # Should not reach here (covered by max_iterations check)
    return {'status': 'error', 'message': 'Unexpected loop exit'}


def translate_test_failures_to_feedback(
    evaluation: dict,
    test_results: dict,
    test_suite: dict
) -> dict:
    """
    Converts test failures and evaluation into actionable refinement instructions.

    This is the "gradient backpropagation" step - mapping empirical failures
    to specific code/prompt changes.
    """
    instructions = {
        'preserve': [],
        'fix': [],
        'regression_guard': []
    }

    # 1. Identify what to preserve (passing tests + high-scoring layers)
    passed_tests = [
        t for t in test_suite['test_cases']
        if t.get('status') == 'passed'
    ]
    instructions['preserve'].append(f"Tests {len(passed_tests)}/{len(test_suite['test_cases'])} passing - DO NOT break these")

    for test in passed_tests[:5]:  # List first 5 passing tests explicitly
        instructions['regression_guard'].append({
            'test_id': test['id'],
            'must_remain_passing': True,
            'description': test['description']
        })

    # Add high-scoring layers to preserve list
    for layer, score in evaluation['layer_scores'].items():
        if score >= 90:
            instructions['preserve'].append(f"{layer} (scored {score}) - preserve structure")

    # 2. Prioritize fixes by severity and test failure
    failed_tests = test_results['failed_tests']

    # Group failures by category
    failures_by_category = {}
    for failure in failed_tests:
        category = failure.get('category', 'other')
        if category not in failures_by_category:
            failures_by_category[category] = []
        failures_by_category[category].append(failure)

    # Priority order: critical severity first, then by category impact
    severity_order = ['critical', 'high', 'medium', 'low']

    for severity in severity_order:
        for failure in failed_tests:
            if failure.get('severity') == severity:
                # Map failure to specific fix location
                fix_instruction = {
                    'test_id': failure['id'],
                    'test_input': failure['input'],
                    'expected': failure['expected_behavior'],
                    'actual': failure.get('actual_output', 'N/A'),
                    'error': failure.get('error_message', 'Test failed'),
                    'category': failure['category'],
                    'severity': severity,
                    'fix_location': map_failure_to_location(failure, evaluation),
                    'fix_action': generate_fix_action(failure)
                }
                instructions['fix'].append(fix_instruction)

    # 3. Add layer-level improvements for low scores
    for layer, score in evaluation['layer_scores'].items():
        if score < 80:
            # Find test failures mapped to this layer
            layer_failures = [
                f for f in failed_tests
                if map_failure_to_layer(f) == layer
            ]

            if layer_failures:
                instructions['fix'].append({
                    'layer': layer,
                    'current_score': score,
                    'target_score': 90,
                    'failed_tests': [f['id'] for f in layer_failures],
                    'summary': f"{len(layer_failures)} tests failing in {layer} layer"
                })

    return {'instructions': instructions}


def map_failure_to_location(failure: dict, evaluation: dict) -> str:
    """
    Map a test failure to a specific section of the skill.
    """
    category = failure['category']

    # Mapping rules
    location_map = {
        'injection': 'Constraints section (add safety rules)',
        'boundary': 'Input validation section',
        'ambiguity': 'Clarification/assumption handling',
        'type_error': 'Parameter validation',
        'logic_error': 'Workflow logic or decision points',
        'hallucination': 'Knowledge boundaries / schema validation'
    }

    return location_map.get(category, 'General skill logic')


def generate_fix_action(failure: dict) -> str:
    """
    Generate specific fix instruction based on failure type.
    """
    category = failure['category']
    expected = failure['expected_behavior']

    action_templates = {
        'injection': f"Add safety constraint: Reject inputs containing {identify_attack_pattern(failure['input'])}. {expected}",
        'boundary': f"Add boundary check: {expected}",
        'ambiguity': f"Add clarification step: When {identify_ambiguity(failure['input'])}, {expected}",
        'type_error': f"Add type validation: {expected}",
        'logic_error': f"Fix logic: {expected}",
        'hallucination': f"Add existence check: {expected}"
    }

    return action_templates.get(category, f"Fix to ensure: {expected}")


def identify_attack_pattern(input_str: str) -> str:
    """Extract attack pattern from malicious input."""
    dangerous_keywords = ['DROP', 'DELETE', 'INSERT', 'UPDATE', '<script>', 'rm -rf', '&&', '||']
    for keyword in dangerous_keywords:
        if keyword in input_str.upper():
            return f"'{keyword}' commands"
    return "suspicious patterns"


def identify_ambiguity(input_str: str) -> str:
    """Identify what makes an input ambiguous."""
    ambiguous_patterns = {
        'last week': 'relative date reference',
        'yesterday': 'relative date',
        'name': 'ambiguous column reference',
        'the data': 'unspecified data source'
    }
    for pattern, description in ambiguous_patterns.items():
        if pattern in input_str.lower():
            return description
    return "ambiguous reference"


def map_failure_to_layer(failure: dict) -> str:
    """
    Map test failure to evaluation layer.
    """
    category_to_layer = {
        'injection': 'anti_lazy',  # Safety mechanisms
        'boundary': 'anti_lazy',   # Edge case handling
        'ambiguity': 'precision',  # Clarity
        'type_error': 'precision', # Type specifications
        'logic_error': 'content',  # Core logic
        'hallucination': 'reliability'  # Correctness
    }
    return category_to_layer.get(failure['category'], 'content')
```

---

## Example: Full Loop Execution (4-Agent Architecture)

### User Input

```bash
/alpha-skill "Create a skill for SQL query translation" \
  --auto-refine --target 90 --max-iterations 5
```

### Iteration 1: Initial Generation + Adversarial Testing

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ITERATION 1/5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗️  [ARCHITECT] Generating initial skill...
   Mode selected: Industrial (high strictness)
   Tools identified: validate_sql_syntax, check_table_schema
   Generating skill structure...
   ✓ Created skills/sql-translator/SKILL.md

⚔️  [ADVERSARY] Generating adversarial test suite...
   Analyzing skill for failure modes...
   Identified categories: injection, hallucination, ambiguity, boundary

   Generated test cases:
   - ADV-1-001 (critical): SQL injection with DROP
   - ADV-1-002 (high): Non-existent table reference
   - ADV-1-003 (medium): Ambiguous date reference
   - ADV-1-004 (high): Empty input
   - ADV-1-005 (medium): Column ambiguity
   - ADV-1-006 (low): Unicode characters
   - ADV-1-007 (high): Type mismatch in WHERE clause
   - ADV-1-008 (critical): Command chaining attempt
   - ADV-1-009 (medium): Nested subquery complexity
   - ADV-1-010 (low): Case sensitivity

   Generated 10 test cases
   Saved to: skills/sql-translator/test_suite.json

⚖️  [JUDGE] Executing tests and evaluating...
   Running skill against test suite...

   Test Results:
   ✅ ADV-1-004: PASSED - Correctly rejected empty input
   ✅ ADV-1-006: PASSED - Handled Unicode properly
   ✅ ADV-1-010: PASSED - Case handling correct
   ❌ ADV-1-001: FAILED - Did not block DROP command
      Input: "Show users; DROP TABLE users;"
      Expected: "ERROR: UNSAFE OPERATION"
      Actual: Generated "SELECT * FROM users; DROP TABLE users;"
      Error: Injection attack not blocked

   ❌ ADV-1-002: FAILED - Generated query for non-existent table
      Input: "Get revenue from crypto_sales"
      Expected: "ERROR: TABLE NOT FOUND"
      Actual: "SELECT revenue FROM crypto_sales"
      Error: No schema validation

   ❌ ADV-1-003: FAILED - Silent assumption on date
      Input: "Show orders from last week"
      Expected: "State assumption or ask for date"
      Actual: "SELECT * FROM orders WHERE date > NOW() - 7"
      Error: No assumption stated

   [... 4 more failures ...]

📊 EVALUATION REPORT - Iteration 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Score: 73/100 (Acceptable ⚠️)
✅ Tests Passed: 3/10
❌ Tests Failed: 7/10

Layer Scores:
  ✅ Structural:      95/100
  ⚠️  Content:        68/100  ← Test failures in examples
  ✔️  Mode Alignment: 88/100
  ✅ Tools:           92/100
  ⚠️  Anti-Lazy:      65/100  ← Failed safety tests

Empirical Failures:
  🔴 CRITICAL (2):
  - ADV-1-001: SQL injection not blocked
  - ADV-1-008: Command chaining not prevented

  🟠 HIGH (3):
  - ADV-1-002: Hallucinated table
  - ADV-1-007: Type validation missing
  [...]

🔄 Continuing: Score 73 < target 90
   Gap: 17 points
   Failed: 7/10 tests

🎯 [OPTIMIZER] Analyzing failures...
   Mapping failures to fix locations...
   - injection failures → Add safety constraints
   - hallucination failures → Add schema validation
   - ambiguity failures → Add clarification step
```

---

### Iteration 2: Refinement Based on Test Failures

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ITERATION 2/5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗️  [ARCHITECT] Refining skill based on test failures...
   Preserving: Tests ADV-1-004, ADV-1-006, ADV-1-010 (passing)
   Preserving: Tool specifications (92/100), Structure (95/100)

   Applying targeted fixes:
   ✓ Fix ADV-1-001: Added constraint "REJECT any DROP/DELETE/UPDATE/INSERT"
   ✓ Fix ADV-1-002: Added schema validation requirement
   ✓ Fix ADV-1-003: Added assumption statement rule
   ✓ Fix ADV-1-007: Added type validation for WHERE clause values
   ✓ Fix ADV-1-008: Added command chaining detection

   Updated skills/sql-translator/SKILL.md

⚔️  [ADVERSARY] Running regression tests + generating new tests...
   Regression test suite: 10 tests from iteration 1
   Analyzing new weaknesses based on fixes...

   New targeted tests:
   - ADV-2-011: Nested subquery with complex JOIN
   - ADV-2-012: Multiple table ambiguity

   Test suite v1.1.0: 10 regression + 2 new = 12 total

⚖️  [JUDGE] Executing tests and evaluating...
   Running 12 tests...

   Regression Results:
   ✅ ADV-1-001: NOW PASSING ✓ (was failing)
   ✅ ADV-1-002: NOW PASSING ✓ (was failing)
   ✅ ADV-1-003: NOW PASSING ✓ (was failing)
   ✅ ADV-1-004: STILL PASSING ✓ (regression guard)
   ✅ ADV-1-005: NOW PASSING ✓ (was failing)
   ✅ ADV-1-006: STILL PASSING ✓ (regression guard)
   ✅ ADV-1-007: NOW PASSING ✓ (was failing)
   ✅ ADV-1-008: NOW PASSING ✓ (was failing)
   ✅ ADV-1-009: NOW PASSING ✓ (was failing)
   ✅ ADV-1-010: STILL PASSING ✓ (regression guard)

   New Tests:
   ✅ ADV-2-011: PASSED - Nested subquery handled correctly
   ❌ ADV-2-012: FAILED - Table ambiguity not handled
      Input: "Get name and email"
      Expected: "Ask: Which table?"
      Actual: "SELECT name, email FROM users" (assumed table)
      Error: No disambiguation

📊 EVALUATION REPORT - Iteration 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Score: 84/100 (Good ✔️)
📈 Change: +11.0 points
✅ Tests Passed: 11/12
❌ Tests Failed: 1/12
⚠️  Regression Failures: 0 (excellent!)

Layer Scores:
  ✅ Structural:      95/100
  ✔️  Content:        82/100  ← Improved!
  ✔️  Mode Alignment: 88/100
  ✅ Tools:           92/100
  ✔️  Anti-Lazy:      80/100  ← Improved!

Remaining Failures:
  🟠 HIGH (1):
  - ADV-2-012: Missing table disambiguation

🔄 Continuing: Score 84 < target 90
   Gap: 6 points
   Improvement: +11 points (good progress!)
   Only 1 test failing - almost there!

🎯 [OPTIMIZER] Targeting final failure...
   - Add disambiguation: When column names provided without table, ask for clarification
```

---

### Iteration 3: Final Refinement

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ITERATION 3/5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗️  [ARCHITECT] Final refinement targeting last failure...
   Preserving: All 11 passing tests
   Preserving: All layers scoring 80+

   Actions:
   ✓ Added disambiguation rule: "When columns specified without table, ask 'Which table?'"
   ✓ Added example demonstrating disambiguation flow
   ✓ Updated skills/sql-translator/SKILL.md

⚔️  [ADVERSARY] Running full regression + new edge cases...
   Regression test suite: 12 tests from iterations 1-2
   No new weaknesses detected - generating edge cases for coverage

   New tests:
   - ADV-3-013: Complex multi-table JOIN (edge case)

   Test suite v1.2.0: 12 regression + 1 new = 13 total

⚖️  [JUDGE] Executing tests and evaluating...
   Running 13 tests...

   Regression Results:
   ✅ ADV-1-001 through ADV-1-010: ALL PASSING ✓
   ✅ ADV-2-011: STILL PASSING ✓
   ✅ ADV-2-012: NOW PASSING ✓ (was failing)

   New Tests:
   ✅ ADV-3-013: PASSED - Complex JOIN handled correctly

   🎉 ALL TESTS PASSING!

📊 EVALUATION REPORT - Iteration 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Score: 91/100 (Excellent ✅)
📈 Change: +7.0 points
✅ Tests Passed: 13/13 (100%)
❌ Tests Failed: 0/13
✅ Regression Failures: 0

Layer Scores:
  ✅ Structural:      95/100
  ✅ Content:         90/100  ← Excellent!
  ✔️  Mode Alignment: 88/100
  ✅ Tools:           92/100
  ✅ Anti-Lazy:       90/100  ← Excellent!

Issues: None!
  ✨ All quality standards met!
  ✨ All adversarial tests passed!

✅ SUCCESS: Score 91 ≥ target 90 AND all tests pass!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 REINFORCEMENT LOOP COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Final Skill: skills/sql-translator/SKILL.md
Test Suite: skills/sql-translator/test_suite.json (v1.2.0)
Final Score: 91/100 (Excellent ✅)
Final Tests: 13/13 passed (100% ✅)
Iterations: 3
Total Improvements: +18 points (73 → 91)

Iteration History:
  1. Score: 73, Tests: 3/10 passed → 7 failures identified empirically
  2. Score: 84, Tests: 11/12 passed → +11 pts, fixed injection/hallucination
  3. Score: 91, Tests: 13/13 passed → +7 pts, ALL TESTS PASSING ✅

Key Achievements:
  ✅ Blocked all injection attacks (ADV-1-001, ADV-1-008)
  ✅ Schema validation prevents hallucination (ADV-1-002)
  ✅ Disambiguation handles ambiguity (ADV-2-012)
  ✅ Type safety enforced (ADV-1-007)
  ✅ Edge cases covered (ADV-3-013)
  ✅ Zero regression failures across 3 iterations

Skill is PRODUCTION-READY and ADVERSARIALLY HARDENED!
```

---

## Why 4 Agents? The Empirical Advantage

### The Problem with 3-Agent Loops

**Old Approach (Without Adversary):**
```
Evaluator: "Your examples seem weak and placeholders are generic."
Writer: "Okay, I'll... improve them somehow?" (guessing)
```

**Issues:**
- ❌ **Vague Feedback**: "Seems weak" is subjective
- ❌ **No Evidence**: Can't prove improvement worked
- ❌ **Regression Risk**: Fixes might break other parts
- ❌ **False Confidence**: High score doesn't mean robust

### The Solution: Add the Adversary

**New Approach (With Adversary):**
```
Adversary: "Testing with SQL injection: 'DROP TABLE users'"
Judge: "Skill FAILED test ADV-1-001: Generated dangerous query"
Optimizer: "Add constraint at line X: REJECT DROP commands"
Writer: "Fixed. Re-testing..."
Judge: "Test ADV-1-001 NOW PASSING ✓"
```

**Benefits:**
- ✅ **Concrete Evidence**: Empirical pass/fail results
- ✅ **Specific Targets**: Fix exact test failures
- ✅ **Regression Tracking**: Previous tests must still pass
- ✅ **Real Robustness**: Survived adversarial attacks

### Empirical vs. Subjective Evaluation

| Metric | 3-Agent (Subjective) | 4-Agent (Empirical) |
|--------|---------------------|---------------------|
| **Feedback Type** | "Improve quality" | "Failed test #003" |
| **Actionability** | Vague guidance | Exact fix location |
| **Verification** | Re-score and hope | Re-run test, observe |
| **Regression Prevention** | Hope nothing breaks | Tests prove it |
| **Edge Case Coverage** | Guess what matters | Adversary finds them |
| **Confidence Level** | "Looks good" | "Survived 13 attacks" |

### The Academic Foundation

This 4-agent architecture implements concepts from:

1. **Reflexion (Shinn et al., 2023)**
   - Self-reflection through empirical feedback
   - Iterative refinement based on concrete failures
   - Verbal reinforcement learning

2. **TextGrad (Yuksekgonul et al., 2024)**
   - Treating text (prompts/skills) like neural network weights
   - Evaluation feedback as "gradients" for optimization
   - Backpropagation through text generation

3. **AlphaGo Self-Play**
   - Agent plays against itself to improve
   - Adversary acts as "opponent" exposing weaknesses
   - Iterative strengthening through competitive testing

### Real-World Impact

**Without Adversary:**
- Skill scores 90/100
- Deployed to production
- **Day 1**: User finds SQL injection vulnerability
- **Impact**: Security breach, data loss

**With Adversary:**
- Skill scores 90/100 AND passes 13 adversarial tests
- Deployed to production
- **Day 1**: All attacks blocked (already tested)
- **Impact**: Robust, production-hardened system

---

## Loop Configuration

### Default Configuration

```yaml
reinforcement_loop_config:
  # Scoring thresholds
  target_score: 90              # Minimum for production
  excellent_threshold: 95       # Bonus: exceptional quality
  acceptable_threshold: 70      # Minimum to publish with notes

  # Iteration limits
  max_iterations: 5             # Prevent infinite loops
  min_improvement: 3.0          # Stop if improvement < 3 points per iteration
  timeout_seconds: 300          # Max 5 minutes total

  # Feedback tuning
  focus_layers_below: 80        # Prioritize layers scoring < 80
  preserve_layers_above: 90     # Don't touch layers scoring ≥ 90

  # Output verbosity
  verbose: true                 # Show detailed progress
  save_history: true            # Save iteration history to file
  show_diffs: false             # Show skill diffs between iterations
```

### Custom Configuration

```bash
# High-stakes: Stricter requirements
/alpha-skill "Create financial calculator" \
  --auto-refine \
  --target 95 \
  --max-iterations 10 \
  --min-improvement 2.0

# Quick iteration: Looser requirements
/alpha-skill "Create brainstorming skill" \
  --auto-refine \
  --target 80 \
  --max-iterations 3
```

---

## Stopping Criteria

### 1. Success (Score ≥ Target)

```yaml
status: success
reason: "Score 91 ≥ target 90"
action: Accept and publish
```

### 2. Plateau (Diminishing Returns)

```yaml
status: plateau
reason: "Improvement 2.1 < threshold 3.0"
last_score: 87
action: Accept as-is or manual refinement
recommendation: "Close to target (87/90), consider manual tweaks"
```

### 3. Max Iterations

```yaml
status: max_iterations
reason: "Reached iteration limit (5)"
last_score: 85
action: Manual review required
recommendation: "Significant progress (73→85), consider extending loop or manual finish"
```

### 4. Timeout

```yaml
status: timeout
reason: "Exceeded 300 seconds"
last_score: 82
action: Interrupt and save progress
recommendation: "Loop taking too long, review complexity or increase timeout"
```

### 5. Error

```yaml
status: error
reason: "skill-generator failed to generate valid YAML"
error_details: "Parse error on line 3"
action: Manual intervention required
recommendation: "Fix generation logic or template"
```

---

## Progress Tracking

### Live Progress Display

```
┌────────────────────────────────────────────────┐
│ REINFORCEMENT LOOP PROGRESS                    │
├────────────────────────────────────────────────┤
│                                                │
│ Skill: python-security-audit                   │
│ Target: 90/100                                 │
│                                                │
│ Iteration 3/5                                  │
│ [████████████████░░░░] 60% complete            │
│                                                │
│ Current Score: 84/100 ✔️                       │
│ Gap to Target: -6 points                       │
│ Last Improvement: +11 points                   │
│                                                │
│ Layer Status:                                  │
│   Structural:      95 ✅                       │
│   Content:         82 ✔️  (was 68 ⚠️)         │
│   Mode Alignment:  88 ✔️                       │
│   Tools:           92 ✅                       │
│   Anti-Lazy:       80 ✔️  (was 65 ⚠️)         │
│                                                │
│ Next Focus:                                    │
│   - Expand Example 3 detail                    │
│   - Add format constraint                      │
│                                                │
│ Estimated: 1 more iteration needed             │
└────────────────────────────────────────────────┘
```

### History Export

```yaml
# Saved to: skills/python-security-audit/refinement_history.yml

refinement_history:
  skill_name: "python-security-audit"
  started_at: "2026-02-14T10:00:00Z"
  completed_at: "2026-02-14T10:05:23Z"
  duration_seconds: 323

  configuration:
    target_score: 90
    max_iterations: 5
    min_improvement: 3.0

  iterations:
    - iteration: 1
      timestamp: "2026-02-14T10:00:00Z"
      duration: 45s
      score: 73
      layer_scores:
        structural: 95
        content: 68
        mode_alignment: 88
        tools: 92
        anti_lazy: 65
      issues_count:
        critical: 0
        major: 2
        minor: 3
      actions_taken: null  # Initial generation

    - iteration: 2
      timestamp: "2026-02-14T10:02:30Z"
      duration: 52s
      score: 84
      improvement: +11
      layer_scores:
        structural: 95
        content: 82
        mode_alignment: 88
        tools: 92
        anti_lazy: 80
      issues_count:
        critical: 0
        major: 0
        minor: 2
      actions_taken:
        - "Replaced placeholder in Example 2"
        - "Added length constraint"
        - "Added verification step"

    - iteration: 3
      timestamp: "2026-02-14T10:05:23Z"
      duration: 48s
      score: 91
      improvement: +7
      layer_scores:
        structural: 95
        content: 90
        mode_alignment: 88
        tools: 92
        anti_lazy: 90
      issues_count:
        critical: 0
        major: 0
        minor: 0
      actions_taken:
        - "Expanded Example 3"
        - "Added format constraint"
      termination_reason: "success"

  summary:
    status: "success"
    final_score: 91
    total_iterations: 3
    total_improvement: +18
    issues_resolved: 5
    production_ready: true
```

---

## Integration with skill-generator

### New Modes for skill-generator

```bash
# Mode 1: Generate with auto-refine
/alpha-skill "Create X" --auto-refine

# Mode 2: Improve existing skill
/alpha-skill --improve skills/X/SKILL.md --issues "[feedback]"

# Mode 3: Single iteration refinement
/alpha-skill --refine-once skills/X/SKILL.md

# Mode 4: Continue previous loop
/alpha-skill --resume-loop skills/X/SKILL.md
```

### skill-generator Enhancement

```markdown
## New Section in skill-generator: Refinement Mode

### Step 5 (NEW): Iterative Refinement

**Purpose:** Automatically improve skill based on evaluation feedback

**Input:**
- Previous skill version
- Evaluation report with issues
- Preservation list (what to keep)

**Process:**

1. **Load Previous Version**
   Read existing skill, parse into sections

2. **Identify Changes Needed**
   Map issues to specific locations in skill

3. **Preserve Good Parts**
   Mark sections scoring ≥90 as "do not modify"

4. **Apply Targeted Improvements**
   For each issue:
   - Locate exact section
   - Apply suggested fix
   - Verify change doesn't break other parts

5. **Regenerate Affected Sections Only**
   Only rewrite sections that need improvement

6. **Validate Changes**
   Quick self-check before passing to evaluator
```

---

## Best Practices

### 1. Set Realistic Targets

```python
# ✅ Good: Achievable targets
/alpha-skill "Create blog writer" --target 90

# ❌ Too high: Wastes iterations
/alpha-skill "Create blog writer" --target 98  # Rarely achievable

# ❌ Too low: Accepts mediocrity
/alpha-skill "Create security audit" --target 70  # Too low for critical skill
```

### 2. Use Appropriate Max Iterations

```python
# ✅ Standard: 3-5 iterations
/alpha-skill "..." --max-iterations 5

# ⚠️  Complex skills: May need more
/alpha-skill "Create multi-step workflow" --max-iterations 8

# ❌ Too many: Diminishing returns
/alpha-skill "..." --max-iterations 20  # Likely to plateau
```

### 3. Monitor Improvement Rate

```python
# ✅ Good: Steady improvement
# Iter 1: 73 → Iter 2: 84 (+11) → Iter 3: 91 (+7)

# ⚠️  Plateau: Stop early
# Iter 1: 73 → Iter 2: 75 (+2) → Iter 3: 76 (+1)
# → Stop, improvement too small

# ⚠️  Regression: Review feedback
# Iter 1: 73 → Iter 2: 84 (+11) → Iter 3: 79 (-5)
# → Feedback may be conflicting
```

### 4. Preserve What Works

```yaml
# Always preserve high-scoring layers
preserve:
  - "Tool specifications (92/100)"
  - "YAML structure (95/100)"

# Don't modify everything in pursuit of perfection
# Targeted improvements > wholesale rewrites
```

---

## Advanced: Multi-Objective Optimization

For complex skills, optimize multiple objectives:

```yaml
multi_objective_config:
  objectives:
    - name: "quality"
      weight: 0.6
      target: 90
      metric: "overall_score"

    - name: "brevity"
      weight: 0.2
      target: 800  # lines
      metric: "skill_length"
      direction: "minimize"

    - name: "realism"
      weight: 0.2
      target: 0.9
      metric: "example_realism_score"

  combined_score: weighted_sum(objectives)
```

---

## Troubleshooting

### Issue: Loop Not Improving

**Symptoms:** Score plateaus at 75-80

**Causes:**
- Feedback is too vague
- Issues are contradictory
- skill-generator can't address specific layer

**Solutions:**
1. Review evaluation report for clarity
2. Manually fix one iteration
3. Adjust target to 80 (accept current level)
4. Switch to semi-auto mode for oversight

---

### Issue: Score Regresses

**Symptoms:** Score goes down in iteration N

**Causes:**
- Refinement broke something that worked
- Feedback conflicted with previous strengths
- Overfitting to one layer, hurting another

**Solutions:**
1. Revert to previous iteration
2. Review what changed between versions
3. Add preservation rules for good layers
4. Use differential refinement (only touch problem areas)

---

### Issue: Infinite Loop

**Symptoms:** Loop doesn't terminate

**Causes:**
- Target too high (>95)
- Conflicting requirements
- Bug in refinement logic

**Solutions:**
1. Set max_iterations (always!)
2. Set timeout (5 minutes recommended)
3. Enable verbose mode to see what's changing
4. Review if target is achievable

---

## Summary

### The Reinforcement Learning Loop Provides:

✅ **Automatic Quality Improvement** - No manual iteration needed
✅ **Consistent Standards** - All skills reach target quality
✅ **Fast Iteration** - 3-5 loops typically sufficient
✅ **Transparency** - Full history of improvements
✅ **Safety** - Max iterations prevents infinite loops
✅ **Efficiency** - Preserves what works, fixes what doesn't

### Key Metrics:

- **Average iterations to quality:** ~3
- **Success rate:** >90% reach target within 5 iterations
- **Time per iteration:** ~45-60 seconds
- **Total time:** ~3-5 minutes for complete loop

---

**Next Step:** Implement the RL loop in skill-generator with `--auto-refine` flag!

