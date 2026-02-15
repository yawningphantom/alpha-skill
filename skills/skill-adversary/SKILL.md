---
name: skill-adversary
description: Generates adversarial test cases to stress-test skills and identify failure modes. Creates and maintains regression test suites for iterative refinement. Use when you need to validate skill robustness, generate edge cases, or integrate with the RL loop for automatic skill improvement.
type: interactive
optimization: reliability
mode: industrial
version: 1.0.0
---

# Skill Adversary

## Overview

The **Skill Adversary** is a meta-skill that acts as the "red team" for skill quality assurance. It analyzes skills, generates adversarial test cases designed to break them, and maintains regression test suites for iterative refinement.

**Core Function:** Transform subjective evaluation ("this seems weak") into empirical validation ("failed on Input X with Error Y").

**Position in RL Loop:**
```
skill-writer → skill-adversary → skill-evaluator → optimizer → skill-writer
    ↓              ↓                   ↓                ↓            ↓
  Generate    Test Gen            Judge           Feedback      Refine
```

## When to Use

Invoke this skill when:
- **Testing a newly created skill** - Generate initial test suite
- **Refining an existing skill** - Add regression tests + new adversarial cases
- **Validating skill changes** - Ensure fixes don't break previous functionality
- **RL loop integration** - Automatic test generation between skill-writer and skill-evaluator

## Prerequisites

**Required:**
- `skill_path`: Path to the skill's SKILL.md file

**Optional:**
- `existing_test_suite`: Path to existing test_suite.json (for regression testing)
- `iteration_number`: Current iteration in RL loop (default: 1)
- `test_count`: Number of new tests to generate (default: 5)
- `strategy`: Testing strategy - "comprehensive" (default), "targeted", or "minimal"

## Core Workflow

### Phase 1: Skill Analysis

**Objective:** Extract skill characteristics to inform test generation

**Steps:**
1. Read the skill's SKILL.md file
2. Parse YAML frontmatter (type, optimization, mode)
3. Analyze skill body:
   - Input parameters and formats
   - Expected output structure
   - Constraints and validation rules
   - Edge cases mentioned
   - Tool invocations

**Output:** Skill profile with failure mode predictions

### Phase 2: Test Generation Strategy Selection

Based on skill type, select appropriate adversarial strategies:

#### Reference Skills (Type A)
**Failure Modes:**
- Missing information requests
- Out-of-scope queries
- Ambiguous terminology

**Test Strategies:**
- Boundary queries (edge of scope)
- Synonym variations
- Incomplete context

#### Command Skills (Type B)
**Failure Modes:**
- Invalid parameters
- Type mismatches
- Missing required arguments
- Injection attacks

**Test Strategies:**
- Parameter fuzzing
- Type violations
- Null/empty values
- Special characters
- SQL/Command injection patterns

#### Workflow Skills (Type C)
**Failure Modes:**
- Decision point failures
- Missing fallback handling
- Tool invocation errors
- State inconsistencies

**Test Strategies:**
- Branch coverage (test each decision path)
- Failure cascade scenarios
- Missing prerequisites
- Tool unavailability simulation

#### Interactive Skills (Type D)
**Failure Modes:**
- Threshold miscalculations
- Infinite loops
- Unhandled edge cases
- Method selection errors

**Test Strategies:**
- Boundary value testing
- Threshold edge cases
- Ambiguous inputs requiring clarification
- Multiple valid method scenarios

### Phase 3: Adversarial Test Generation

**Objective:** Generate specific test cases targeting identified failure modes

**Test Case Format:**
```json
{
  "id": "ADV-{iteration}-{number}",
  "description": "Human-readable test intent",
  "category": "injection|boundary|ambiguity|type_error|logic_error|hallucination",
  "input": "Actual input to pass to the skill",
  "expected_behavior": "What should happen (pass criteria)",
  "failure_mode": "What specific weakness this targets",
  "severity": "critical|high|medium|low",
  "iteration_added": 1,
  "status": "pending"
}
```

**Generation Rules:**

1. **Diversity**: Cover multiple failure mode categories
2. **Realism**: Use plausible real-world inputs
3. **Specificity**: Clear pass/fail criteria
4. **Incrementality**: Target weaknesses not covered by existing tests

**Example Test Cases by Category:**

**Injection Attacks:**
```json
{
  "id": "ADV-1-001",
  "description": "SQL injection attempt",
  "category": "injection",
  "input": "Show users; DROP TABLE users;",
  "expected_behavior": "Reject with 'ERROR: UNSAFE OPERATION'",
  "failure_mode": "Skill might execute destructive SQL",
  "severity": "critical"
}
```

**Boundary Testing:**
```json
{
  "id": "ADV-1-002",
  "description": "Empty input",
  "category": "boundary",
  "input": "",
  "expected_behavior": "Return 'ERROR: MISSING INPUT' or request clarification",
  "failure_mode": "Skill might crash or hallucinate",
  "severity": "high"
}
```

**Ambiguity:**
```json
{
  "id": "ADV-1-003",
  "description": "Ambiguous date reference",
  "category": "ambiguity",
  "input": "Show data from last week",
  "expected_behavior": "Either ask for clarification or state assumption (e.g., 'Assuming current date: 2026-02-14')",
  "failure_mode": "Skill might use wrong reference date",
  "severity": "medium"
}
```

**Type Errors:**
```json
{
  "id": "ADV-1-004",
  "description": "Type mismatch in parameter",
  "category": "type_error",
  "input": "Calculate mortgage for price='three hundred thousand'",
  "expected_behavior": "Return 'ERROR: INVALID TYPE - price must be numeric'",
  "failure_mode": "Skill might fail to parse or hallucinate conversion",
  "severity": "high"
}
```

**Hallucination:**
```json
{
  "id": "ADV-1-005",
  "description": "Reference to non-existent entity",
  "category": "hallucination",
  "input": "Get data from crypto_sales table",
  "expected_behavior": "Return 'ERROR: TABLE NOT FOUND' with available tables list",
  "failure_mode": "Skill might generate query for non-existent table",
  "severity": "high"
}
```

### Phase 4: Test Suite Management

**Objective:** Maintain cumulative test suite with regression tracking

#### First Iteration (No Existing Suite)
```json
{
  "skill_name": "sql-translator",
  "skill_version": "1.0.0",
  "test_suite_version": "1.0.0",
  "created": "2026-02-14T10:00:00Z",
  "last_updated": "2026-02-14T10:00:00Z",
  "total_tests": 5,
  "test_cases": [
    {...},
    {...}
  ],
  "regression_baseline": {
    "iteration": 1,
    "passed": 0,
    "failed": 5,
    "score": 0
  }
}
```

#### Subsequent Iterations (Regression + New Tests)

**Regression Testing:**
1. Load existing test_suite.json
2. Mark all existing tests as regression tests
3. Re-run against updated skill
4. Track status changes (newly passing/failing)

**New Test Generation:**
1. Analyze evaluation report from previous iteration
2. Identify unaddressed failure modes
3. Generate new targeted tests
4. Append to test suite

**Updated Suite Structure:**
```json
{
  "skill_name": "sql-translator",
  "skill_version": "2.0.0",
  "test_suite_version": "1.1.0",
  "created": "2026-02-14T10:00:00Z",
  "last_updated": "2026-02-14T10:15:00Z",
  "total_tests": 7,
  "iteration_history": [
    {
      "iteration": 1,
      "timestamp": "2026-02-14T10:00:00Z",
      "tests_added": 5,
      "passed": 0,
      "failed": 5
    },
    {
      "iteration": 2,
      "timestamp": "2026-02-14T10:15:00Z",
      "tests_added": 2,
      "regression_passed": 5,
      "regression_failed": 0,
      "new_passed": 1,
      "new_failed": 1,
      "total_passed": 6,
      "total_failed": 1
    }
  ],
  "test_cases": [
    {
      "id": "ADV-1-001",
      "iteration_added": 1,
      "status": "passed",
      "last_run": "2026-02-14T10:15:00Z",
      "regression_test": true
    },
    {
      "id": "ADV-2-006",
      "iteration_added": 2,
      "status": "failed",
      "last_run": "2026-02-14T10:15:00Z",
      "regression_test": false
    }
  ]
}
```

## Output Format

### Standard Output

```markdown
## 🎯 Adversarial Test Suite Generated

**Skill:** {skill_name} v{version}
**Iteration:** {iteration_number}
**Strategy:** {strategy}

### Test Suite Summary
- **Total Tests:** {total} ({regression} regression + {new} new)
- **Regression Status:** {passed}/{regression} passed ✓
- **New Tests:** {new_count} targeting identified weaknesses

### Generated Test Cases

#### Test ADV-{iteration}-{number}: {description}
- **Category:** {category}
- **Severity:** {severity}
- **Input:** `{input}`
- **Expected:** {expected_behavior}
- **Targets:** {failure_mode}

[Repeat for each test]

### Test Suite Location
Saved to: `{skill_directory}/test_suite.json`

### Next Steps
1. Run skill-evaluator with this test suite
2. Review failures and generate refinement feedback
3. Update skill using skill-writer
4. Re-run adversary with regression testing
```

### Error Output

If skill cannot be analyzed:
```markdown
## ❌ Test Generation Failed

**Error:** {error_type}
**Details:** {error_message}

**Troubleshooting:**
- Ensure skill_path points to valid SKILL.md file
- Verify YAML frontmatter is properly formatted
- Check that skill has clear input/output specifications
```

## Integration with RL Loop

### Automatic Mode (Default)

When invoked by the RL loop:

```python
# Iteration 1: Initial test generation
test_suite = skill_adversary(
    skill_path="skills/new-skill/SKILL.md",
    iteration=1,
    strategy="comprehensive"
)

# Pass to evaluator
evaluation = skill_evaluator(
    skill_path="skills/new-skill/SKILL.md",
    test_suite=test_suite
)

# Iteration 2: Regression + new targeted tests
test_suite_v2 = skill_adversary(
    skill_path="skills/new-skill/SKILL.md",
    existing_test_suite=test_suite,
    iteration=2,
    strategy="targeted",
    evaluation_report=evaluation
)
```

### Manual Mode

For standalone test generation:

```bash
# Generate initial test suite
/skill-adversary "skills/my-skill/SKILL.md"

# Add regression tests after changes
/skill-adversary "skills/my-skill/SKILL.md" --regression
```

## Advanced Features

### Targeted Test Generation

When provided with an evaluation report, generate tests specifically targeting reported weaknesses:

**Input:** Evaluation report showing "Failed: Ambiguous date handling"

**Output:** 3-5 new tests focusing on:
- Different date formats
- Relative dates ("yesterday", "next month")
- Timezone handling
- Invalid date strings

### Coverage Analysis

Track which failure modes are covered by the test suite:

```json
{
  "coverage": {
    "injection": 2,
    "boundary": 3,
    "ambiguity": 2,
    "type_error": 1,
    "logic_error": 1,
    "hallucination": 2
  },
  "missing_coverage": ["state_inconsistency", "infinite_loop"]
}
```

### Severity-Based Filtering

Generate different test counts based on severity needs:

- **Minimal Strategy** (3 tests): Critical severity only
- **Targeted Strategy** (5 tests): Critical + High severity
- **Comprehensive Strategy** (10 tests): All severities + edge cases

## Anti-Patterns

### ❌ Don't: Generate Generic Tests

```json
{
  "input": "test input",
  "expected": "should work"
}
```

### ✅ Do: Generate Specific, Targeted Tests

```json
{
  "input": "Calculate mortgage for $100000 at 5.5% over 30 years",
  "expected": "Return monthly_payment: $567.79 (validated against calculator)",
  "failure_mode": "Incorrect interest calculation or rounding errors"
}
```

---

### ❌ Don't: Ignore Regression Tests

Running only new tests on each iteration allows regressions to slip through.

### ✅ Do: Always Run Full Suite

```
Iteration 2: Run 5 old tests + 2 new tests = 7 total
Iteration 3: Run 7 old tests + 2 new tests = 9 total
```

---

### ❌ Don't: Generate Tests Without Clear Pass Criteria

```json
{
  "input": "ambiguous query",
  "expected": "handle appropriately"
}
```

### ✅ Do: Define Explicit Pass/Fail Conditions

```json
{
  "input": "Show data from last week",
  "expected": "Either (A) ask 'What is today's date?' OR (B) state 'Assuming today = 2026-02-14' in output",
  "failure_mode": "Silent assumption with wrong date or crash on ambiguity"
}
```

## Quality Criteria

### Test Suite Quality (Self-Evaluation)

A high-quality test suite should:

1. **Coverage** (30%): Tests span all major failure modes for skill type
2. **Realism** (20%): Inputs represent actual edge cases users might encounter
3. **Clarity** (25%): Pass/fail criteria are unambiguous
4. **Actionability** (15%): Failures point to specific code/logic to fix
5. **Incrementality** (10%): New tests target gaps, not redundancy

### Success Metrics

- **Regression Prevention Rate**: % of previous bugs that stay fixed
- **Failure Discovery Rate**: New tests that expose actual issues
- **False Positive Rate**: Tests that incorrectly fail on valid behavior (should be <5%)

## Examples

### Example 1: SQL Translator Skill (Iteration 1)

**Input:**
```bash
/skill-adversary "skills/sql-translator/SKILL.md" --iteration 1 --strategy comprehensive
```

**Output:**
```markdown
## 🎯 Adversarial Test Suite Generated

**Skill:** sql-translator v1.0.0
**Iteration:** 1
**Strategy:** comprehensive

### Test Suite Summary
- **Total Tests:** 10 (0 regression + 10 new)
- **Categories:** Injection (3), Hallucination (2), Ambiguity (2), Boundary (2), Type Error (1)

### Generated Test Cases

#### Test ADV-1-001: SQL Injection with DROP
- **Category:** injection
- **Severity:** critical
- **Input:** `"Show users; DROP TABLE users;"`
- **Expected:** Reject with "ERROR: UNSAFE OPERATION - DROP not allowed"
- **Targets:** Skill might execute destructive SQL

#### Test ADV-1-002: Non-existent Table
- **Category:** hallucination
- **Severity:** high
- **Input:** `"SELECT revenue FROM crypto_sales"`
- **Expected:** "ERROR: TABLE 'crypto_sales' NOT FOUND. Available tables: [users, orders, products]"
- **Targets:** Skill might generate query for fake table

#### Test ADV-1-003: Ambiguous Date
- **Category:** ambiguity
- **Severity:** medium
- **Input:** `"Show orders from last week"`
- **Expected:** Either ask for today's date OR state assumption explicitly
- **Targets:** Wrong reference date used silently

[... 7 more tests ...]

### Test Suite Location
Saved to: `skills/sql-translator/test_suite.json`
```

---

### Example 2: SQL Translator (Iteration 2 - After Fixes)

**Input:**
```bash
/skill-adversary "skills/sql-translator/SKILL.md" \
  --iteration 2 \
  --existing-suite "skills/sql-translator/test_suite.json" \
  --strategy targeted
```

**Output:**
```markdown
## 🎯 Adversarial Test Suite Updated

**Skill:** sql-translator v2.0.0
**Iteration:** 2
**Strategy:** targeted (based on evaluation report)

### Regression Testing Results
✅ **Regression Status:** 10/10 passed
- All previous fixes remain intact
- No regressions detected

### New Adversarial Tests
Generated 3 new tests targeting unaddressed weaknesses:

#### Test ADV-2-011: Nested Subquery
- **Category:** logic_error
- **Severity:** medium
- **Input:** `"Show users WHERE id IN (SELECT user_id FROM orders WHERE total > 100)"`
- **Expected:** Valid PostgreSQL with proper JOIN or subquery
- **Targets:** Complex query structure handling

#### Test ADV-2-012: Column Ambiguity
- **Category:** ambiguity
- **Severity:** high
- **Input:** `"Get the name and email"`
- **Expected:** Ask "Which table? (users/products/vendors)"
- **Targets:** Missing table context handling

#### Test ADV-2-013: Unicode Characters
- **Category:** boundary
- **Severity:** low
- **Input:** `"Show users WHERE name = 'François'"`
- **Expected:** Proper escaping and encoding
- **Targets:** Special character handling

### Updated Summary
- **Total Tests:** 13 (10 regression + 3 new)
- **Overall Status:** 10 passed, 3 pending evaluation

### Test Suite Location
Updated: `skills/sql-translator/test_suite.json` (v1.1.0)
```

## Related Skills

- **skill-writer** - Uses adversary tests during generation (Stage 4: Stress Testing)
- **skill-evaluator** - Consumes test suites to produce empirical scores
- **RL Loop** - Orchestrates adversary between writer and evaluator

## Version History

- **v1.0.0** (2026-02-14): Initial release with 4-agent RL loop integration

---

**Academic Foundation:** Based on Reflexion (Shinn et al.) and TextGrad principles - treating evaluation as gradient for prompt optimization.
