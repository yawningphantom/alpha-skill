# RL Loop Quick Start Guide

**Get production-ready, adversarially-hardened skills in 3-5 minutes with automatic refinement**

**Version 1.4.0** - Now with 4-Agent Architecture

---

## One Command to Rule Them All

```bash
/skill-writer "Create [your skill]" --auto-refine
```

That's it! The system will:
1. **Architect**: Generate initial skill
2. **Adversary**: Generate adversarial test cases
3. **Judge**: Run tests and evaluate quality
4. **Optimizer**: Translate failures to fixes
5. **Repeat**: Until score ≥ 90 AND all tests pass
6. **Return**: Production-ready, battle-tested skill

---

## Quick Examples

### Example 1: Simple Use Case

```bash
/skill-writer "Create a mortgage calculator skill" --auto-refine

# Output (condensed):
Iteration 1: Score 75, Tests 4/10 passed → Refining...
Iteration 2: Score 84, Tests 9/12 passed → Refining...
Iteration 3: Score 91, Tests 13/13 passed → Success! ✅

Skill ready at: skills/mortgage-calculator/SKILL.md
Test suite: skills/mortgage-calculator/test_suite.json (13 tests, 100% passing)
```

### Example 2: Custom Target

```bash
# High-stakes skill needs 95+ score
/skill-writer "Create security audit skill" \
  --auto-refine --target 95

# Lower target for creative work
/skill-writer "Create brainstorming skill" \
  --auto-refine --target 80
```

### Example 3: Semi-Automatic (Your Oversight)

```bash
/skill-writer "Create API docs skill" --semi-auto

# You approve each iteration:
# Iteration 1: Score 75
#   Continue? (y/n): y
# Iteration 2: Score 84
#   Continue? (y/n): y
# Iteration 3: Score 91
#   Accept? (y): y ✅
```

---

## The Three Strategies

| Strategy | Command | When to Use |
|----------|---------|-------------|
| **Automatic** | `--auto-refine` | Trust the system, want fast results |
| **Semi-Automatic** | `--semi-auto` | Want oversight at each step |
| **Manual** | `--improve` | Full control, iterative learning |

---

## Configuration Options

```bash
/skill-writer "..." --auto-refine \
  --target 90 \           # Minimum score (default: 90)
  --max-iterations 5 \    # Max loops (default: 5)
  --min-improvement 3 \   # Stop if gain < 3pts (default: 3.0)
  --timeout 300           # Max seconds (default: 300)
```

---

## What Happens in Each Iteration? (4-Agent Flow)

```
┌──────────────────────────────────────────────┐
│ Iteration N (v1.4.0 - 4 Agents)              │
├──────────────────────────────────────────────┤
│ 1. 🏗️  ARCHITECT (35-45s)                    │
│    Generate/refine skill based on test fails │
│    ↓                                         │
│ 2. ⚔️  ADVERSARY (5-10s)                     │
│    Generate adversarial tests                │
│    (Iteration 1: 10 new tests)               │
│    (Iteration 2+: regression + 2 new tests)  │
│    ↓                                         │
│ 3. ⚖️  JUDGE (10-15s)                        │
│    Run tests, evaluate quality               │
│    Report: Score + Test Pass/Fail            │
│    ↓                                         │
│ 4. 🎯 OPTIMIZER (5s)                         │
│    Map failures → fix instructions           │
│    ↓                                         │
│ 5. ✅ CHECK CONDITIONS                        │
│    ├─ Score ≥90 AND tests 100%? → Accept ✅  │
│    └─ Otherwise? → Continue to N+1           │
└──────────────────────────────────────────────┘

Total: ~60-70s per iteration
Target reached: Usually 3-5 iterations
Total time: ~3-5 minutes
Bonus: Skill is adversarially hardened!
```

---

## Stopping Conditions

The loop stops when:

| Condition | Symbol | Meaning |
|-----------|--------|---------|
| **Success** | ✅ | Score ≥ target |
| **Plateau** | ⚠️ | Improvement < 3 points |
| **Max Iterations** | ⏰ | Reached iteration limit |
| **Timeout** | ⏱️ | Exceeded time limit |
| **Error** | ❌ | Critical failure |

---

## Reading the Output

### Progress Indicator (v1.4.0 with Tests)

```
Iteration 2/5
[████████░░░░░░░░] 40%
Current: 84/100
Gap: -6 points
Last: +11 points
Tests: 11/12 passed (91%)
Failed: ADV-2-012 (table ambiguity)
```

### Layer Breakdown

```
Layer Scores:
  Structural:      95 ✅  (excellent)
  Content:         82 ✔️   (good, was 68)
  Mode Alignment:  88 ✔️   (good)
  Tools:           92 ✅  (excellent)
  Anti-Lazy:       80 ✔️   (good, was 65)

Test Results:
  ✅ Passed: 11/12 (91%)
  ❌ Failed: 1/12
  ⚠️  Regression: 0 (excellent!)
```

### Next Focus

```
Next Focus:
  - Fix test ADV-2-012: Table disambiguation
  - Preserve: 11 passing tests (regression guard)

Estimated: 1 more iteration
```

---

## Common Patterns

### Pattern 1: Steady Improvement (Good!)

```
Iteration 1: 73, Tests 3/10 (30%) → Major failures
Iteration 2: 84, Tests 11/12 (91%) → +11 pts, fixed injections
Iteration 3: 91, Tests 13/13 (100%) → +7 pts, all pass → Success ✅
```

### Pattern 2: Plateau (Acceptable)

```
Iteration 1: 73, Tests 4/10
Iteration 2: 84, Tests 9/12 → +11 pts
Iteration 3: 86, Tests 10/13 → +2 pts → Plateau ⚠️
Accept at 86 or manual refinement
(Note: Some tests still failing - needs attention)
```

### Pattern 3: Quick Win (Best!)

```
Iteration 1: 88, Tests 8/10 → Minor issues only
Iteration 2: 93, Tests 12/12 (100%) → +5 pts → Success ✅
Only 2 iterations needed!
```

---

## What's New in v1.4.0? The Adversary Agent

### Before (v1.3.0): Subjective Evaluation

```
Evaluator: "Your examples are weak."
Writer: "Okay, I'll... make them better?" (guessing)
Result: Score improves, but real robustness unknown
```

### After (v1.4.0): Empirical Validation

```
Adversary: "Testing SQL injection: 'DROP TABLE users'"
Judge: "FAILED test ADV-1-001: Skill generated dangerous query"
Optimizer: "Add safety constraint: REJECT DROP commands"
Writer: "Fixed. Re-testing..."
Judge: "Test ADV-1-001 NOW PASSING ✓"
Result: Score improves AND proven against attacks
```

### Benefits

- **Concrete Evidence**: Not "looks good" - "survived 13 attacks"
- **Regression Tracking**: Previously passing tests must stay passing
- **Real Robustness**: Tested against injection, boundary, ambiguity, etc.
- **Actionable Fixes**: "Failed test #003" vs. "improve quality"

### Test Categories

The Adversary generates tests in these categories:
- **Injection**: SQL injection, command injection, XSS
- **Boundary**: Empty inputs, null values, extreme ranges
- **Ambiguity**: Vague requirements, missing context
- **Type Errors**: Type mismatches, format violations
- **Logic Errors**: Edge cases in conditional logic
- **Hallucination**: References to non-existent entities

---

## Troubleshooting

### Problem: Stuck at 75-80

**Solution 1:** Check if target is realistic
```bash
# Lower target temporarily
--target 80
```

**Solution 2:** Switch to semi-auto for insight
```bash
--semi-auto  # See what's being changed
```

**Solution 3:** Manual intervention
```bash
# After iteration N:
/skill-writer --improve skills/X/SKILL.md \
  --issues "Specific fix X"
```

---

### Problem: Score Goes Down

**Solution:** Revert and preserve more
```bash
# The system should auto-preserve, but if issues:
# 1. Check refinement_history.yml
# 2. Revert to previous iteration
# 3. Add preservation rules
```

---

### Problem: Takes Too Long

**Solution 1:** Reduce max iterations
```bash
--max-iterations 3
```

**Solution 2:** Lower target
```bash
--target 85
```

**Solution 3:** Use quick mode
```bash
/skill-evaluator --mode quick  # Faster evaluation
```

---

## Viewing History

After loop completes:

```bash
# View detailed history
cat skills/[skill-name]/refinement_history.yml

# Summary:
#   - Total iterations
#   - Score progression
#   - Issues resolved
#   - Actions taken
```

---

## Integration with Existing Workflow

### Step 1: Generate with RL

```bash
/skill-writer "Create X" --auto-refine
# → skills/X/SKILL.md (score 91)
```

### Step 2: Test the Skill

```bash
# Use the skill in practice
/X [arguments]
```

### Step 3: Further Refinement (if needed)

```bash
# Manual tweaks based on real usage
/skill-writer --improve skills/X/SKILL.md \
  --issues "[feedback from usage]"
```

### Step 4: Publish

```bash
# Add to catalog
# Create PR
# Share with team
```

---

## Best Practices

### ✅ DO

- Use `--auto-refine` for first pass
- Set realistic targets (90 for most, 95 for critical)
- Review history to understand improvements
- Preserve high-scoring layers

### ❌ DON'T

- Set target > 95 (diminishing returns)
- Skip max_iterations (can loop forever)
- Ignore plateau warnings (accept good enough)
- Manually edit during auto-refine (let it finish)

---

## Cheat Sheet

```bash
# Standard: Auto-refine to 90
/skill-writer "..." --auto-refine

# High quality: Target 95
/skill-writer "..." --auto-refine --target 95

# Quick iteration: Max 3 loops
/skill-writer "..." --auto-refine --max-iterations 3

# With oversight: Semi-auto
/skill-writer "..." --semi-auto

# Resume previous: Continue loop
/skill-writer --resume-loop skills/X/SKILL.md

# Manual single: One refinement
/skill-writer --improve skills/X/SKILL.md --issues "..."
```

---

## Expected Results

### Typical Success Rates

| Target | Success Rate | Avg Iterations |
|--------|--------------|----------------|
| 80 | 98% | 2-3 |
| 85 | 95% | 2-4 |
| 90 | 90% | 3-5 |
| 95 | 70% | 4-6 |

### Time Expectations

- **Iteration:** ~60 seconds
- **Target 90:** ~3-5 minutes (3-5 iterations)
- **Target 95:** ~4-6 minutes (4-6 iterations)

---

## Summary

The RL Loop v1.4.0 gives you:

✅ **Automatic refinement** - No manual work
✅ **Consistent quality** - All skills reach target score
✅ **Adversarial hardening** - Tested against real attacks (NEW!)
✅ **Empirical validation** - Concrete test pass/fail results (NEW!)
✅ **Regression tracking** - Fixes don't break previous tests (NEW!)
✅ **Fast results** - 3-5 minutes to production
✅ **Full transparency** - See every improvement and test result
✅ **Safety nets** - Won't loop forever

**Bottom line:** Run `--auto-refine` and get coffee. Come back to a production-ready, battle-tested skill!

---

**For details:** See [REINFORCEMENT-LOOP.md](REINFORCEMENT-LOOP.md)
