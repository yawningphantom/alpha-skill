---
name: [skill-name]
description: Guides through [process description] by [key steps]. Use when user says "[trigger phrase 1]" or needs to "[action]".
---

# [Skill Title]

> **Type:** Workflow Skill (Sequential Multi-Step)
>
> **Last Updated:** [YYYY-MM-DD]
>
> **Maintainer:** [Your Name/GitHub Handle]

## Overview

[Brief description of what problem this workflow solves and why it's structured as a multi-step process. 2-3 sentences explaining the value and when to use it.]

## When to Use

Use this skill when you need to:
- [Specific scenario 1]
- [Specific scenario 2]
- [Specific scenario 3]

Trigger phrases:
- "[phrase 1]"
- "[phrase 2]"
- "[phrase 3]"

## Prerequisites

**Required Information:**
- [ ] `{[parameter_1]}` - [Description and format]
- [ ] `{[parameter_2]}` - [Description and format]
- [ ] `{[parameter_3]}` - [Description and format]

**Required Tools:**
- [ ] [Tool 1] (version X.X+)
- [ ] [Tool 2] with [specific configuration]

**Required Access:**
- [ ] [Permission 1]
- [ ] [Permission 2]

---

## Workflow Overview

```
┌─────────────────┐
│ Step 1: [Name]  │
│ [Brief desc]    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Step 2: [Name]  │
│ [Brief desc]    │
└────────┬────────┘
         │
         ├──→ [Decision Point] ──→ [Fallback A]
         │
         ▼
┌─────────────────┐
│ Step 3: [Name]  │
│ [Brief desc]    │
└────────┬────────┘
         │
         ▼
    [Complete]
```

**Estimated Duration:** [X-Y minutes typical, Z minutes for complex cases]

---

## Workflow Steps

### Step 1: [Action Name]

**Purpose:** [Why this step is necessary and what it accomplishes]

**Execute:**

```bash
[exact-command-or-tool-invocation] \
  --param1 "{[parameter_from_prerequisites]}" \
  --param2 "[literal_value]"
```

**Expected Output:**

```
[Show realistic output example]
```

**Interpret:**

- ✅ If output shows `[success_indicator]` → Proceed to Step 2
- ⚠️ If output shows `[warning_indicator]` → Review [specific thing] but can continue
- ❌ If output shows `[error_indicator]` → See [Fallback A](#fallback-a)

**Success Criteria:**
- [ ] [Specific condition 1 met]
- [ ] [Specific condition 2 met]

---

### Step 2: [Action Name]

**Purpose:** [Why this step is necessary]

**Prerequisites from Step 1:**
- [What you need from previous step]

**Execute:**

```bash
# [Brief explanation of what this does]
[command] [params]
```

**Expected Output:**

```
[Show realistic output]
```

**Interpret:**

- ✅ If `[condition]` → Proceed to Step 3
- ⚠️ If `[condition]` → [Alternative action] then proceed
- ❌ If `[condition]` → See [Fallback B](#fallback-b)

**Validation Commands:**

```bash
# Verify the result
[verification-command]

# Expected: [what you should see]
```

---

### Step 3: [Action Name]

**Purpose:** [Why this step is necessary]

**Execute:**

[Continue the same pattern as Steps 1 and 2]

---

### Step 4: [Action Name]

[Continue pattern for all workflow steps]

---

### Step N: [Final Action]

**Purpose:** [Finalize and verify the workflow]

**Execute:**

```bash
[final-command]
```

**Final Verification:**

```bash
# Comprehensive check
[verification-commands]
```

**Success Indicators:**
- [ ] [Indicator 1]
- [ ] [Indicator 2]
- [ ] [Indicator 3]

---

## Decision Points

### Decision Point 1: [Name]

**When:** After Step [X]

**Question:** [What needs to be decided?]

**Options:**

#### Option A: [Name]
- **When to choose:** [Condition]
- **Action:** Proceed to [Step Y]
- **Trade-offs:** [Pros and cons]

#### Option B: [Name]
- **When to choose:** [Condition]
- **Action:** Skip to [Step Z]
- **Trade-offs:** [Pros and cons]

---

## Fallbacks

### Fallback A: [When primary approach fails at Step X]

**Trigger:** [What condition triggers this fallback]

**Alternative Approach:**

1. [Alternative step 1]
   ```bash
   [alternative-command]
   ```

2. [Alternative step 2]
   ```bash
   [alternative-command]
   ```

3. Return to [Step X+1] once resolved

**If this fallback also fails:**
→ See [Manual Resolution](#manual-resolution)

---

### Fallback B: [When primary approach fails at Step Y]

[Follow same pattern as Fallback A]

---

## Manual Resolution

If automated fallbacks don't work:

### Issue: [Specific problem]

**Investigation:**
```bash
# Gather diagnostic information
[diagnostic-commands]
```

**Common Causes:**
1. [Cause 1] → [Solution]
2. [Cause 2] → [Solution]
3. [Cause 3] → [Solution]

**Manual Steps:**
1. [Manual step 1]
2. [Manual step 2]
3. Verify with: `[verification-command]`

---

## Evidence Collection

Throughout the workflow, collect:

### Evidence Type 1: [Name]
- **Source:** [Where to get this]
- **Command:** `[command-to-collect]`
- **Save as:** `[filename]`
- **Why needed:** [Purpose]

### Evidence Type 2: [Name]
[Follow same pattern]

---

## Summary Template

After completing the workflow, present findings in this format:

```markdown
## [Workflow Name] Summary

**Executed:** [Date/Time]
**Duration:** [X minutes]
**Status:** [Success/Partial/Failed]

### Parameters Used
- [Parameter 1]: [Value]
- [Parameter 2]: [Value]

### Steps Completed
- [x] Step 1: [Name] - [Result]
- [x] Step 2: [Name] - [Result]
- [ ] Step 3: [Name] - [Skipped/Failed because...]

### Key Findings
1. [Finding 1 with evidence]
2. [Finding 2 with evidence]
3. [Finding 3 with evidence]

### Recommendations
- [Recommendation 1]
- [Recommendation 2]

### Next Steps
- [ ] [Action item 1]
- [ ] [Action item 2]
```

---

## Examples

### Example 1: [Simple Scenario]

**Context:** [Describe the situation]

**Parameters:**
- `{[param1]}` = `[realistic_value]`
- `{[param2]}` = `[realistic_value]`

**Execution:**

```bash
# Step 1
[command] [params]
# Output: [show output]

# Step 2
[command] [params]
# Output: [show output]

# Continue through workflow...
```

**Result:** [What was accomplished]

**Duration:** [X minutes]

---

### Example 2: [Complex Scenario with Fallback]

**Context:** [Describe a scenario where fallback is needed]

**Execution:**

```bash
# Step 1: Success
[command]

# Step 2: Failure - trigger Fallback A
[command]
# Error: [error message]

# Fallback A executed
[fallback-command]
# Success: [output]

# Continue from Step 3...
```

**Result:** [What was accomplished despite the issue]

**Duration:** [Y minutes due to fallback]

---

## Verification & Testing

### Pre-flight Checks

Before starting the workflow:

```bash
# Check prerequisites
[check-command-1]
[check-command-2]
[check-command-3]

# Expected: All checks should pass
```

### Post-workflow Validation

After completing all steps:

```bash
# Comprehensive validation
[validation-command-1]
[validation-command-2]

# Smoke tests
[smoke-test-command]
```

**Expected Results:**
- [What success looks like]
- [Specific metrics or indicators]

---

## Rollback Procedure

If you need to undo the workflow:

### Emergency Rollback

```bash
# Stop active processes
[stop-command]

# Revert changes
[revert-command-1]
[revert-command-2]

# Verify rollback
[verify-command]
```

### Partial Rollback

To undo only certain steps:

- **Rollback Step N:** `[command]`
- **Rollback Step M:** `[command]`

---

## Performance & Optimization

### Typical Performance

| Scale | Duration | Notes |
|-------|----------|-------|
| Small | [X mins] | [Conditions] |
| Medium | [Y mins] | [Conditions] |
| Large | [Z mins] | [Conditions] |

### Optimization Tips

- [Tip 1 for faster execution]
- [Tip 2 for resource efficiency]
- [Tip 3 for reliability]

### Parallel Execution

Steps that can run in parallel:
- Steps [X] and [Y] if [condition]
- Steps [A] and [B] when [condition]

```bash
# Example parallel execution
([command-1]) & ([command-2]) & wait
```

---

## Troubleshooting

### Common Issues

#### Issue 1: [Problem description]

**Symptoms:**
- [What the user sees]

**Likely Causes:**
1. [Cause 1]
2. [Cause 2]

**Solutions:**
1. Try: `[solution-command-1]`
2. If that fails: `[solution-command-2]`

#### Issue 2: [Problem description]

[Follow same pattern as Issue 1]

---

## Best Practices

### ✅ Do

- [Best practice 1 specific to this workflow]
- [Best practice 2]
- [Best practice 3]

### ❌ Don't

- [Anti-pattern 1]
- [Anti-pattern 2]
- [Anti-pattern 3]

---

## Related Skills

| Skill | Relationship | When to Use |
|-------|--------------|-------------|
| [skill-name] | Prerequisite | Run before this workflow |
| [skill-name] | Follow-up | Run after this workflow |
| [skill-name] | Alternative | Use instead when [condition] |
| [skill-name] | Complementary | Use together for [purpose] |

---

## Resources

### Scripts & Tools

- [Script Name](resources/script.sh) - [Description]
- [Tool Name](resources/tool.py) - [Description]

### External References

- [Documentation](url)
- [Tutorial](url)
- [Troubleshooting Guide](url)

---

## Changelog

### [Version] - [Date]
- [Change description]

### 1.0.0 - [Initial Date]
- Initial workflow created

---

**Need help?** Open an issue or see [CONTRIBUTING.md](../docs/CONTRIBUTING.md)
