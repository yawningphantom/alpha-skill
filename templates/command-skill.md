---
name: [skill-name]
description: Executes [specific task] with [parameters]. Use when user says "[trigger phrase 1]" or "[trigger phrase 2]".
---

# [Skill Title]

> **Type:** Command Skill (Execute-Based)
>
> **Last Updated:** [YYYY-MM-DD]
>
> **Maintainer:** [Your Name/GitHub Handle]

## Overview

[Brief description of what this command does and why it's useful. 2-3 sentences explaining the purpose and benefits.]

## When to Use

Use this skill when you need to:
- [Specific use case 1]
- [Specific use case 2]
- [Specific use case 3]

Trigger phrases:
- "[phrase 1]"
- "[phrase 2]"
- "[phrase 3]"

## Prerequisites

- [ ] [Tool or dependency required with version]
- [ ] [Environment setup requirement]
- [ ] [Permission or access requirement]

---

## Syntax

```bash
[command-name] [REQUIRED_PARAM] [OPTIONAL_PARAM] [FLAGS]
```

### Alternative Invocation

```bash
# Can also be called as:
[alternative-syntax]
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `[PARAM_1]` | string | Yes | - | [Clear description with constraints] |
| `[PARAM_2]` | number | No | `[value]` | [Clear description with range/limits] |
| `[PARAM_3]` | enum | No | `[value]` | [Description with allowed values: value1, value2, value3] |

### Parameter Details

#### `[PARAM_1]`
- **Format:** [Specific format like "alphanumeric-with-hyphens"]
- **Constraints:** [Any validation rules]
- **Example:** `[realistic-value]`

#### `[PARAM_2]`
[Continue pattern for complex parameters]

---

## Options

| Flag | Short | Type | Default | Description |
|------|-------|------|---------|-------------|
| `--option-1` | `-o` | boolean | `false` | [What this option does] |
| `--option-2` | `-v` | string | `[value]` | [What this option controls] |
| `--option-3` | `-f` | path | `[path]` | [Where to find/save something] |

### Common Flag Combinations

```bash
# Verbose output with custom config
[command] [PARAM] --verbose --config custom.yml

# Dry run mode
[command] [PARAM] --dry-run --no-color

# Production mode with logging
[command] [PARAM] --prod --log-level info
```

---

## Examples

### Example 1: Basic Usage

**Scenario:** [Describe the most common, simple use case]

**Command:**
```bash
[command] [realistic-param-value]
```

**Output:**
```
[Expected output with realistic values]
```

**What happens:**
[Explain the result and any side effects]

---

### Example 2: With Optional Parameters

**Scenario:** [Describe a more specific use case]

**Command:**
```bash
[command] [param1] [param2] --option1 --option2=value
```

**Output:**
```
[Expected output]
```

**What happens:**
[Explain the result]

---

### Example 3: Advanced Usage

**Scenario:** [Describe a complex or power-user scenario]

**Command:**
```bash
[command] [params] \
  --option1 \
  --option2=value \
  --option3=/path/to/file
```

**Output:**
```
[Expected output]
```

**What happens:**
[Explain the result and why this is useful]

---

## Output Format

### Success Output

```
[Show exact format of successful output]
```

**Fields:**
- `[field1]`: [What this means]
- `[field2]`: [What this means]
- `[field3]`: [What this means]

### Error Output

```
[Show format of error messages]
```

**Common Errors:**
- `[Error Code]`: [What it means and how to fix]
- `[Error Code]`: [What it means and how to fix]

---

## Exit Codes

| Code | Meaning | Action |
|------|---------|--------|
| `0` | Success | Operation completed successfully |
| `1` | General error | Check error message for details |
| `2` | Invalid parameters | Verify parameter format and values |
| `3` | [Specific error] | [How to resolve] |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `[VAR_NAME]` | No | `[value]` | [What this controls] |
| `[VAR_NAME_2]` | Yes | - | [What this is used for] |

**Example:**
```bash
export [VAR_NAME]=[value]
[command] [params]
```

---

## Validation & Safety

### Pre-execution Checks

Before running, verify:
- [ ] [Prerequisite check 1]
- [ ] [Prerequisite check 2]
- [ ] [Safety check - e.g., backup exists]

### Dry Run

Test without making changes:
```bash
[command] [params] --dry-run
```

### Rollback

If something goes wrong:
```bash
[rollback-command or manual steps]
```

---

## Common Use Cases

### Use Case 1: [Name]

**Goal:** [What you're trying to achieve]

**Commands:**
```bash
# Step 1: [Preparation]
[prep-command]

# Step 2: [Execute main command]
[command] [params] [flags]

# Step 3: [Verification]
[verify-command]
```

**Expected Result:** [What success looks like]

### Use Case 2: [Name]

[Follow same pattern as Use Case 1]

---

## Troubleshooting

### Problem 1: [Common issue]

**Symptoms:**
```
[Error message or behavior]
```

**Cause:**
[Why this happens]

**Solution:**
```bash
[command or steps to fix]
```

### Problem 2: [Common issue]

[Follow same pattern as Problem 1]

---

## Performance

### Execution Time
- **Typical:** [time range]
- **Large datasets:** [time range]
- **Factors:** [What affects performance]

### Resource Usage
- **Memory:** [typical usage]
- **CPU:** [typical usage]
- **Disk I/O:** [if significant]

### Optimization Tips
- [Tip 1 for better performance]
- [Tip 2 for better performance]
- [Tip 3 for better performance]

---

## Integration

### CI/CD Usage

```yaml
# Example GitHub Actions workflow
- name: [Step name]
  run: |
    [command] [params] [flags]
```

### Scripting

```bash
#!/bin/bash
# Example script integration

set -e  # Exit on error

# Configuration
[VAR]="[value]"

# Execute
[command] "${[VAR]}" --option
```

---

## Best Practices

### ✅ Do

- [Best practice 1]
- [Best practice 2]
- [Best practice 3]

### ❌ Don't

- [Anti-pattern 1]
- [Anti-pattern 2]
- [Anti-pattern 3]

---

## Related Skills

| Skill | Relationship | Description |
|-------|--------------|-------------|
| [skill-name] | Prerequisite | [Run this first] |
| [skill-name] | Complementary | [Run this next] |
| [skill-name] | Alternative | [Use instead when...] |

---

## External Resources

- [Tool Documentation](url)
- [GitHub Repository](url)
- [Tutorial](url)

---

## Changelog

### [Version] - [Date]
- [Change description]

### 1.0.0 - [Initial Date]
- Initial command skill created

---

**Need help?** Open an issue or see [CONTRIBUTING.md](../docs/CONTRIBUTING.md)
