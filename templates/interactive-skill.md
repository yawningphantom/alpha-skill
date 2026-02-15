---
name: [skill-name]
description: Analyzes [data/system] and determines [outcome] based on [conditions/thresholds]. Use when user needs to "[action]" or "[investigate something]".
---

# [Skill Title]

> **Type:** Interactive Skill (Conditional Logic)
>
> **Last Updated:** [YYYY-MM-DD]
>
> **Maintainer:** [Your Name/GitHub Handle]

## Overview

[Brief description of what this skill analyzes and what decisions it helps make. 2-3 sentences explaining the value of conditional logic approach.]

## When to Use

Use this skill when you need to:
- [Scenario requiring analysis and decision 1]
- [Scenario requiring analysis and decision 2]
- [Scenario with multiple possible paths 3]

Trigger phrases:
- "[phrase 1]"
- "[phrase 2]"
- "[phrase 3]"

## Prerequisites

**Required Inputs:**
- [ ] `{[input_1]}` - [Description, format, and constraints]
- [ ] `{[input_2]}` - [Description, format, and constraints]

**Required Tools:**
- [ ] [Tool 1] (version X.X+)
- [ ] [Tool 2] for [specific capability]

**Required Access:**
- [ ] [Permission or access needed]

---

## CRITICAL GUIDANCE

⚠️ **Common Mistakes to Avoid:**

1. **[Mistake 1]**
   - DO NOT: [What not to do]
   - INSTEAD: [What to do]
   - WHY: [Explanation]

2. **[Mistake 2]**
   - DO NOT: [What not to do]
   - INSTEAD: [What to do]
   - WHY: [Explanation]

3. **[Mistake 3]**
   - DO NOT: [What not to do]
   - INSTEAD: [What to do]
   - WHY: [Explanation]

---

## Analysis Methods

### Method 1: [Primary Approach]

**When to use:**
- [Condition 1 where this method is optimal]
- [Condition 2 where this method is optimal]
- [Data/access requirement for this method]

#### Step 1: [Gather Data]

**Purpose:** [Why this data is needed]

**Execute:**
```bash
[tool-invocation-with-exact-syntax] \
  --param1 "{[user_input]}" \
  --param2 "[value]"
```

**Expected Output:**
```
[realistic example output]
```

**What to collect:**
- `[field_1]` - [What this represents]
- `[field_2]` - [What this represents]
- `[field_3]` - [What this represents]

---

#### Step 2: [Analyze Data]

**Purpose:** [What analysis is performed]

**Analysis Logic:**

```python
# Pseudocode for analysis
if [field_1] > [threshold_1]:
    classification = "[result_A]"
    confidence = "HIGH"
elif [field_2] > [threshold_2]:
    classification = "[result_B]"
    confidence = "MEDIUM"
else:
    classification = "[result_C]"
    confidence = "LOW"
```

**Thresholds & Interpretation:**

| Condition | Threshold | Interpretation | Confidence | Next Action |
|-----------|-----------|----------------|------------|-------------|
| `[field] > X` | `[value]` | [Meaning A] | HIGH | → [Action A] |
| `[field] > Y` | `[value]` | [Meaning B] | MEDIUM | → [Action B] |
| `[field] < Z` | `[value]` | [Meaning C] | LOW | → [Action C] |

**Confidence Levels:**
- **HIGH (>90%)** - [What this means, proceed with action]
- **MEDIUM (50-90%)** - [What this means, verify before action]
- **LOW (<50%)** - [What this means, gather more data]

---

#### Step 3: [Make Recommendation]

**Purpose:** [What decision is being made]

**Decision Matrix:**

```
┌─────────────┬──────────────┬──────────────┐
│ Scenario    │ Indicators   │ Recommendation│
├─────────────┼──────────────┼──────────────┤
│ [Case A]    │ [indicator1] │ [action1]    │
│             │ [indicator2] │              │
├─────────────┼──────────────┼──────────────┤
│ [Case B]    │ [indicator3] │ [action2]    │
│             │ [indicator4] │              │
└─────────────┴──────────────┴──────────────┘
```

**Output Format:**
```markdown
## Analysis Result

**Classification:** [result]
**Confidence:** [HIGH/MEDIUM/LOW]

**Key Findings:**
1. [Finding 1 with metric]
2. [Finding 2 with metric]
3. [Finding 3 with metric]

**Recommendation:** [specific action]

**Rationale:** [why this is recommended]
```

---

### Method 2: [Alternative Approach]

**When to use:**
- [Condition where Method 1 won't work]
- [Data availability constraint]
- [Time/resource constraint]

#### Step 1: [Different Data Collection]

[Follow similar structure as Method 1, but with different approach]

---

### Method 3: [Fallback/Manual Approach]

**When to use:**
- [When automated methods insufficient]
- [When data is incomplete]
- [When human judgment needed]

**Manual Analysis Steps:**

1. **[Step 1]**
   - Check: `[what to check]`
   - Look for: [specific indicators]
   - Document: [what to record]

2. **[Step 2]**
   [Continue pattern]

---

## Decision Tree

```
Start: Analyze {[input]}
│
├─ [Condition A]?
│  ├─ YES → Check [Sub-condition A1]
│  │        ├─ [Threshold met] → Result: [Outcome 1]
│  │        └─ [Threshold not met] → Result: [Outcome 2]
│  │
│  └─ NO → Check [Condition B]
│           ├─ YES → Check [Sub-condition B1]
│           │        ├─ [High value] → Result: [Outcome 3]
│           │        └─ [Low value] → Result: [Outcome 4]
│           │
│           └─ NO → Check [Condition C]
│                    └─ Result: [Default Outcome]
```

---

## Thresholds & Criteria

### Critical Thresholds

| Metric | Critical | Warning | Normal | Unit | Description |
|--------|----------|---------|--------|------|-------------|
| [Metric 1] | > [X] | > [Y] | < [Z] | [unit] | [What this measures] |
| [Metric 2] | > [X] | > [Y] | < [Z] | [unit] | [What this measures] |
| [Metric 3] | > [X] | > [Y] | < [Z] | [unit] | [What this measures] |

### Evaluation Criteria

#### Criterion 1: [Name]

**Definition:** [What this criterion measures]

**Calculation:**
```
[formula or method]
```

**Interpretation:**
- **Score > [X]:** [Meaning and action]
- **Score [Y-X]:** [Meaning and action]
- **Score < [Y]:** [Meaning and action]

---

## Conditional Paths

### Path A: [When Condition X is Met]

**Triggers:**
- [Specific condition 1]
- [Specific condition 2]

**Actions:**

1. [Action 1]
   ```bash
   [command-with-params-specific-to-this-path]
   ```

2. [Action 2]
   ```bash
   [command]
   ```

3. Validate result:
   - Expected: [specific outcome]
   - If different: See [Alternative Path]

**Success Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

---

### Path B: [When Condition Y is Met]

[Follow same pattern as Path A]

---

### Path C: [Default/Catch-all Path]

[Follow same pattern as Path A]

---

## Examples

### Example 1: [Simple Case - Clear Winner]

**Scenario:** [Describe straightforward situation]

**Inputs:**
- `{[input1]}` = `[value]`
- `{[input2]}` = `[value]`

**Method 1 Execution:**

```bash
# Step 1: Gather data
[command]

# Output:
# [show realistic output]
```

**Analysis:**
- [Metric 1]: [value] → [interpretation]
- [Metric 2]: [value] → [interpretation]

**Decision:**
```
Classification: [result]
Confidence: HIGH (95%)
Recommendation: [action]
Rationale: [field1] = [value] which is [comparison to threshold]
```

**Duration:** [X seconds/minutes]

---

### Example 2: [Ambiguous Case - Requires Method 2]

**Scenario:** [Describe situation where primary method insufficient]

**Inputs:**
- `{[input1]}` = `[value]`
- `{[input2]}` = `[value]`

**Method 1 Attempt:**
```bash
[command]
# Output: Insufficient data
```

**Fallback to Method 2:**
```bash
[alternative-command]
# Output: [show output]
```

**Analysis:**
- Method 1 yielded: [incomplete result]
- Method 2 provided: [additional data]
- Combined analysis: [synthesis]

**Decision:**
```
Classification: [result]
Confidence: MEDIUM (75%)
Recommendation: [action] with caveat [condition]
Rationale: [explanation considering both methods]
```

**Duration:** [Y minutes due to fallback]

---

### Example 3: [Complex Case - Manual Judgment Required]

**Scenario:** [Describe edge case or conflicting signals]

**Automated Analysis:**
- Method 1: Suggests [outcome A]
- Method 2: Suggests [outcome B]
- Confidence: LOW (45%)

**Manual Investigation:**
1. Reviewed [additional context]
2. Checked [external factors]
3. Consulted [reference data]

**Final Decision:**
```
Classification: [result]
Confidence: MEDIUM (70% with manual review)
Recommendation: [action] based on [human judgment factor]
Rationale: Automated methods conflicted due to [reason],
           manual analysis revealed [key insight]
```

---

## Reporting Format

### Standard Report

```markdown
# [Skill Name] Analysis Report

**Generated:** [Timestamp]
**Analyst:** [Name/System]

## Input Parameters
- [Parameter 1]: [Value]
- [Parameter 2]: [Value]

## Analysis Method Used
[Method 1/2/3] - [Reason for selection]

## Key Metrics
| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| [Metric 1] | [value] | [threshold] | ✅/⚠️/❌ |
| [Metric 2] | [value] | [threshold] | ✅/⚠️/❌ |

## Findings
1. **[Finding 1]** - [Evidence and significance]
2. **[Finding 2]** - [Evidence and significance]
3. **[Finding 3]** - [Evidence and significance]

## Classification
- **Result:** [Classification/Category]
- **Confidence:** [HIGH/MEDIUM/LOW] ([percentage]%)
- **Method:** [Which analysis method]

## Recommendation
[Specific recommended action]

### Rationale
[Detailed explanation of why this recommendation]

### Next Steps
- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Action item 3]

## Supporting Evidence
[Links to data, charts, logs, or other evidence]
```

---

## Validation

### Self-Verification

After analysis, verify:
- [ ] All required data points collected
- [ ] Thresholds applied correctly
- [ ] Confidence level appropriate
- [ ] Recommendation follows from analysis
- [ ] Alternative paths considered

### Cross-Check

```bash
# Validate analysis with alternative method
[cross-check-command]

# Compare results
# Expected: Results should align within [X]% tolerance
```

---

## Calibration

### Threshold Tuning

If results seem incorrect:

1. **Review recent cases**
   - Analyze last [N] executions
   - Compare predicted vs. actual outcomes
   - Calculate accuracy rate

2. **Adjust thresholds if needed**
   ```
   Current: [metric] > [threshold]
   Proposed: [metric] > [new_threshold]
   Reasoning: [data-driven justification]
   ```

3. **Test calibration**
   ```bash
   [test-with-known-cases]
   ```

---

## Troubleshooting

### Issue 1: [Ambiguous Results]

**Symptoms:**
- Low confidence scores
- Conflicting indicators
- Multiple possible classifications

**Resolution:**
1. Gather more data: `[additional-data-command]`
2. Try alternative method: See [Method 2]
3. If still unclear: Escalate to [manual analysis or expert]

---

### Issue 2: [Unexpected Classification]

**Symptoms:**
- Result doesn't match expectations
- Confidence is high but outcome seems wrong

**Resolution:**
1. Verify input data: `[verification-command]`
2. Check for outliers: [analysis-command]
3. Review threshold applicability
4. Consider external factors

---

## Best Practices

### ✅ Do

- Always check confidence levels before acting on recommendations
- Use multiple methods when confidence is below [threshold]%
- Document reasoning for decisions, especially in edge cases
- Regularly calibrate thresholds based on outcomes
- [Additional best practice specific to this skill]

### ❌ Don't

- Don't ignore low confidence scores
- Don't skip fallback methods when primary fails
- Don't apply thresholds from different contexts
- Don't trust single-metric decisions in complex scenarios
- [Additional anti-pattern specific to this skill]

---

## Related Skills

| Skill | Relationship | When to Use |
|-------|--------------|-------------|
| [skill-name] | Prerequisite | Gather data before analysis |
| [skill-name] | Follow-up | Execute recommendation |
| [skill-name] | Alternative | Use when [different condition] |
| [skill-name] | Validation | Verify analysis results |

---

## External Resources

- [Statistical Methods](url)
- [Domain Expertise](url)
- [Threshold Research](url)

---

## Changelog

### [Version] - [Date]
- [Threshold adjustment or methodology change]

### 1.0.0 - [Initial Date]
- Initial interactive skill created
- Initial thresholds defined

---

**Need help?** Open an issue or see [CONTRIBUTING.md](../docs/CONTRIBUTING.md)
