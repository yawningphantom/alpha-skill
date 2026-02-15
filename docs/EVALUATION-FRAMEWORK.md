# Skill Evaluation Framework

**Quality Assessment System for Generated Skills**

---

## What is Skill Evaluation?

Skill evaluation is the process of systematically assessing whether a generated skill meets quality standards. It answers the question: **"Is this skill production-ready?"**

Think of it as a **code review for skills** - catching issues before they reach users.

---

## The Evaluation Architecture

```
┌─────────────────────────────────────┐
│ Input: Generated Skill (SKILL.md)  │
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│ Layer 1: Structural Validation     │
│ (Automated - Fast)                  │
│ - YAML format correct?              │
│ - Required sections present?        │
│ - Template conformance?             │
└───────────────┬─────────────────────┘
                │ Pass ✓
┌───────────────▼─────────────────────┐
│ Layer 2: Content Quality           │
│ (LLM-based - Medium)                │
│ - Descriptions clear?               │
│ - Examples realistic?               │
│ - Constraints specific?             │
└───────────────┬─────────────────────┘
                │ Pass ✓
┌───────────────▼─────────────────────┐
│ Layer 3: Mode Alignment             │
│ (Comparative - Medium)              │
│ - Optimization matches mode?        │
│ - Tool criteria valid?              │
│ - Anti-lazy density appropriate?    │
└───────────────┬─────────────────────┘
                │ Pass ✓
┌───────────────▼─────────────────────┐
│ Output: Quality Score + Report     │
│ - Overall: 85/100                   │
│ - Issues: [list]                    │
│ - Suggestions: [improvements]       │
└─────────────────────────────────────┘
```

---

## Evaluation Dimensions

### 1. Structural Integrity (Automated)

**What it checks:** Format, syntax, required sections

| Check | Weight | Validation Method |
|-------|--------|-------------------|
| YAML frontmatter valid | 10% | YAML parser |
| Required fields present | 10% | Field checker |
| Section headers match template | 10% | Template diff |
| Code blocks properly formatted | 5% | Markdown parser |
| Links are not broken | 5% | Link validator |

**Scoring:**
- 100%: All checks pass
- 80-99%: Minor formatting issues
- 60-79%: Missing non-critical sections
- <60%: Major structural problems

**Tools Needed:**
- YAML validator (Sandbox rule)
- Markdown parser (Sandbox rule)
- Template matcher (Calculator rule)

---

### 2. Content Quality (LLM-based)

**What it checks:** Clarity, specificity, realism

| Check | Weight | Validation Method |
|-------|--------|-------------------|
| Description is action-oriented | 10% | LLM semantic analysis |
| Examples use realistic values | 10% | Anti-pattern detection |
| Constraints are specific (not vague) | 10% | Specificity scoring |
| Prerequisites clearly stated | 5% | Completeness check |
| No placeholder text (TODO, xxx, etc) | 5% | Pattern matching |

**Anti-Pattern Detection:**

```python
# Bad examples detected
bad_patterns = [
    r"foo|bar|baz",           # Generic placeholders
    r"TODO|FIXME|XXX",        # Incomplete markers
    r"example\.com",          # Generic URLs
    r"\[.*\]",                # Unfilled brackets
    r"etc\.|and so on",       # Vague continuations
]

# Vague language detected
vague_patterns = [
    r"may|might|could|should", # Weak modals (in constraints)
    r"better|good|best",       # Subjective without criteria
    r"reasonable|appropriate", # Undefined standards
    r"as needed|if necessary", # Ambiguous conditions
]
```

**Scoring:**
- 100%: No anti-patterns, all specific
- 80-99%: Minor vagueness (1-2 instances)
- 60-79%: Some placeholders or vagueness
- <60%: Pervasive quality issues

---

### 3. Mode Alignment (Comparative)

**What it checks:** Does optimization match selected mode?

| Mode | Expected Characteristics | Validation |
|------|-------------------------|------------|
| **Industrial** | High constraint density, strict schemas, validation gates | Count "DO NOT" vs "DO", check for JSON schema |
| **Muse** | Low constraint density, character profiles, voice guidelines | Check for persona, metaphor sources, style rules |
| **Socratic** | Question loops, hint progression, understanding checks | Check for stages, progressive hints, user interaction |

**Constraint Density Formula:**
```python
def calculate_constraint_density(skill_text):
    """
    Measures strictness vs. freedom in skill instructions.

    Returns: 0.0 (very loose) to 1.0 (very strict)
    """
    dont_count = len(re.findall(r'\bDO NOT\b|\bDON\'T\b|\bNEVER\b', skill_text))
    do_count = len(re.findall(r'\bDO\b(?! NOT)|\bALWAYS\b|\bMUST\b', skill_text))

    # Strict patterns (schemas, validation)
    strict_count = len(re.findall(r'schema|validate|check|verify|ensure', skill_text, re.I))

    # Creative patterns (explore, imagine, consider)
    creative_count = len(re.findall(r'explore|imagine|consider|surprise|novel', skill_text, re.I))

    strictness_score = (dont_count + strict_count) / (do_count + dont_count + strict_count + creative_count + 1)

    return strictness_score
```

**Expected Ranges:**
- **Industrial Mode**: 0.7 - 0.9 (high strictness)
- **Muse Mode**: 0.1 - 0.3 (low strictness)
- **Socratic Mode**: 0.4 - 0.6 (balanced)

**Scoring:**
- 100%: Within expected range for mode
- 80-99%: Slightly outside range (±0.1)
- 60-79%: Moderately misaligned (±0.2)
- <60%: Wrong mode characteristics

---

### 4. Tool Integration (Logical)

**What it checks:** Are tool decisions justified?

For each tool defined, validate:

| Check | Validation |
|-------|------------|
| Tool matches one of 4 criteria | Map to Calculator/Library/Keyboard/Sandbox |
| Tool is atomic (one responsibility) | Check function signature complexity |
| Tool has error handling | Check for error return schema |
| Tool description has triggers | Check for "Use when..." language |

**Tool Criteria Validator:**

```python
def validate_tool_criteria(tool_spec):
    """
    Checks if tool meets one of the 4 criteria.
    """
    criteria_indicators = {
        'Calculator': [
            'deterministic', 'calculate', 'compute', 'math',
            'precise', '100% accurate', 'formula'
        ],
        'Library': [
            'external', 'database', 'API', 'fetch', 'retrieve',
            'real-time', 'query', 'private data'
        ],
        'Keyboard': [
            'write', 'send', 'create', 'delete', 'update',
            'side effect', 'state change', 'modify'
        ],
        'Sandbox': [
            'execute', 'run', 'validate', 'test', 'verify',
            'sandbox', 'safe execution', 'output verification'
        ]
    }

    tool_desc = tool_spec.get('description', '').lower()

    matches = {}
    for criterion, indicators in criteria_indicators.items():
        match_count = sum(1 for indicator in indicators if indicator in tool_desc)
        matches[criterion] = match_count

    best_match = max(matches, key=matches.get)
    confidence = matches[best_match] / len(criteria_indicators[best_match])

    return {
        'criterion': best_match if confidence > 0.3 else 'UNCLEAR',
        'confidence': confidence,
        'matches': matches
    }
```

**Scoring:**
- 100%: All tools clearly match criteria
- 80-99%: Minor ambiguity in 1 tool
- 60-79%: Multiple tools unclear
- <60%: Tools don't match any criteria

---

### 5. Anti-Lazy Engineering (Detection)

**What it checks:** Does skill prevent common LLM failures?

| Failure Mode | Detection Method | Weight |
|--------------|------------------|--------|
| Verbosity (rambling) | Check for length constraints | 5% |
| Placeholders (TODO, example) | Pattern matching | 5% |
| Skip steps (implied actions) | Check for explicit step markers | 5% |
| Format violations | Check for strict format specs | 5% |
| Hallucination risk | Check for verification steps | 5% |

**Anti-Lazy Checklist:**

```markdown
For generated skill, verify presence of:

- [ ] Maximum word/length constraints specified
- [ ] "Use real values from input" instruction present
- [ ] "Show all steps explicitly" guidance included
- [ ] "Return ONLY specified format" constraint present
- [ ] Verification/validation section included

Score: (Checkmarks / 5) * 100
```

---

## Overall Scoring Formula

```python
def calculate_overall_score(dimension_scores):
    """
    Weighted average of all dimension scores.
    """
    weights = {
        'structural': 0.20,     # 20% - Must be valid
        'content': 0.25,        # 25% - Quality matters most
        'mode_alignment': 0.25, # 25% - Must match intent
        'tool_integration': 0.15, # 15% - Logical soundness
        'anti_lazy': 0.15       # 15% - Failure prevention
    }

    overall = sum(
        dimension_scores[dim] * weight
        for dim, weight in weights.items()
    )

    return overall
```

**Quality Bands:**

| Score | Band | Interpretation |
|-------|------|----------------|
| 90-100 | **Excellent** | Production-ready, no changes needed |
| 80-89 | **Good** | Minor improvements suggested |
| 70-79 | **Acceptable** | Functional but needs refinement |
| 60-69 | **Needs Work** | Significant issues to address |
| <60 | **Reject** | Major rework required |

---

## The Evaluation Report Format

```yaml
skill_evaluation_report:
  skill_name: "mortgage-calculator"
  evaluated_at: "2026-02-14T10:30:00Z"
  evaluator_version: "1.0.0"

  overall_score: 85
  overall_band: "Good"

  dimension_scores:
    structural_integrity: 95
    content_quality: 82
    mode_alignment: 88
    tool_integration: 90
    anti_lazy_engineering: 70

  issues:
    critical: []

    major:
      - location: "Examples section"
        issue: "Example 2 uses placeholder 'example.com'"
        impact: "Reduces example realism"
        fix: "Replace with actual financial website"

    minor:
      - location: "Constraints section"
        issue: "Only 3 anti-lazy constraints (expected 5+)"
        impact: "May allow placeholder usage"
        fix: "Add constraint: 'Use real values from input'"

  strengths:
    - "Excellent tool specification with all 4 criteria"
    - "YAML frontmatter perfect"
    - "Mode alignment excellent (Industrial: 0.82 strictness)"

  suggestions:
    - "Add more negative examples (only 1, need 2-3)"
    - "Include rollback procedure for Keyboard tools"
    - "Add validation section with specific checkpoints"

  pass_criteria:
    production_ready: false  # Score < 90
    publishable: true       # Score >= 70
    needs_revision: false   # Score >= 60
```

---

## Building the Evaluator

### Option 1: Automated Script (Baseline)

**Pros:** Fast, consistent, objective
**Cons:** Can't assess semantic quality

```python
#!/usr/bin/env python3
"""
Skill Evaluator - Automated structural validation
"""

import yaml
import re
from pathlib import Path

def evaluate_skill(skill_path: Path) -> dict:
    """
    Performs automated evaluation of skill file.
    """
    with open(skill_path) as f:
        content = f.read()

    # Layer 1: Structural validation
    structural_score = validate_structure(content)

    # Layer 2: Anti-pattern detection
    content_score = check_anti_patterns(content)

    # Layer 3: Mode alignment (basic)
    mode_score = check_constraint_density(content)

    overall = (structural_score * 0.4 +
               content_score * 0.4 +
               mode_score * 0.2)

    return {
        'overall_score': overall,
        'structural': structural_score,
        'content': content_score,
        'mode_alignment': mode_score
    }

def validate_structure(content: str) -> float:
    """Check YAML and required sections."""
    score = 100.0

    # Extract YAML frontmatter
    yaml_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not yaml_match:
        return 0.0

    try:
        yaml_data = yaml.safe_load(yaml_match.group(1))
    except yaml.YAMLError:
        return 0.0

    # Check required fields
    required = ['name', 'description']
    for field in required:
        if field not in yaml_data:
            score -= 20

    # Check required sections
    required_sections = [
        'Overview', 'When to Use', 'Prerequisites',
        'Examples', 'Related Skills'
    ]
    for section in required_sections:
        if f'## {section}' not in content:
            score -= 10

    return max(0, score)

def check_anti_patterns(content: str) -> float:
    """Detect quality anti-patterns."""
    score = 100.0

    # Check for placeholders
    bad_patterns = [
        (r'\bfoo\b|\bbar\b|\bbaz\b', 15, "Generic placeholders"),
        (r'TODO|FIXME|XXX', 20, "Incomplete markers"),
        (r'example\.com', 10, "Generic URLs"),
        (r'\[.*?\](?!\()', 10, "Unfilled brackets"),
    ]

    for pattern, penalty, name in bad_patterns:
        matches = re.findall(pattern, content, re.I)
        if matches:
            score -= min(penalty, penalty * len(matches) / 5)

    return max(0, score)

def check_constraint_density(content: str) -> float:
    """Check if constraints match expected mode."""
    dont_count = len(re.findall(r'\bDO NOT\b|\bDON\'T\b', content))
    do_count = len(re.findall(r'\bDO\b(?! NOT)', content))

    strictness = dont_count / (do_count + dont_count + 1)

    # Assume Industrial mode (target: 0.7-0.9)
    if 0.7 <= strictness <= 0.9:
        return 100.0
    elif 0.6 <= strictness <= 1.0:
        return 80.0
    else:
        return 60.0

if __name__ == '__main__':
    import sys
    result = evaluate_skill(Path(sys.argv[1]))
    print(f"Overall Score: {result['overall_score']:.1f}/100")
```

---

### Option 2: LLM-Based Evaluator (Advanced)

**Pros:** Can assess semantic quality, context-aware
**Cons:** Slower, requires LLM access

This becomes a **skill itself** - the `skill-evaluator` skill!

#### Skill Type: Interactive (Conditional Logic)
#### Mode: Precision (need clear quality definitions)

**Why this approach:**
- Uses LLM to understand semantic quality
- Can provide nuanced feedback
- Can suggest specific improvements
- Follows the framework itself

---

## The Skill-Evaluator Skill Spec

```yaml
---
name: skill-evaluator
description: Evaluates generated skills against quality standards using 5-layer analysis. Use when skill-writer produces output or user requests quality assessment.
type: Interactive
optimization: Precision
tools:
  - validate_yaml
  - check_structure
  - calculate_constraint_density
---

# Skill Evaluator

## Overview
Systematically assess whether a generated skill meets production quality standards through 5-layer evaluation.

## When to Use
- After skill-writer generates a new skill
- Before publishing skill to repository
- When refining existing skills
- For quality benchmarking

## Prerequisites
- `{skill_file_path}`: Path to SKILL.md file
- `{expected_mode}`: Industrial/Muse/Socratic (if known)

## Workflow

### Step 1: Structural Validation
Execute: `validate_yaml(skill_file_path)`
...

[Full workflow following the evaluation framework]
```

---

## Using the Evaluator

### Manual Invocation

```bash
# After generating a skill
/skill-writer "Create mortgage calculator"
# → Generates skills/mortgage-calculator/SKILL.md

/skill-evaluator skills/mortgage-calculator/SKILL.md

# Output:
# ✓ Structural: 95/100
# ✓ Content: 82/100
# ⚠ Mode Alignment: 88/100
# ✓ Tools: 90/100
# ⚠ Anti-Lazy: 70/100
#
# Overall: 85/100 (Good - Minor improvements suggested)
#
# Issues:
# - Example 2 uses "example.com" (replace with real URL)
# - Only 3 anti-lazy constraints (add 2 more)
```

### Automated Pipeline

```bash
# In CI/CD workflow
.github/workflows/validate-skills.yml:

name: Validate Skills
on: [pull_request]

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Evaluate skills
        run: |
          for skill in skills/*/SKILL.md; do
            python3 tools/evaluate_skill.py "$skill" || exit 1
          done
```

---

## Evaluation Modes

### Mode 1: Quick Check (Structural Only)
```bash
/skill-evaluator --mode quick skills/my-skill/SKILL.md
# ~5 seconds, automated checks only
```

### Mode 2: Standard (Structural + Content)
```bash
/skill-evaluator skills/my-skill/SKILL.md
# ~30 seconds, includes LLM analysis
```

### Mode 3: Comprehensive (All Layers)
```bash
/skill-evaluator --mode comprehensive skills/my-skill/SKILL.md
# ~60 seconds, full evaluation with suggestions
```

---

## Continuous Improvement Loop

```
┌─────────────────────────────────────┐
│ User Request: "Create X skill"     │
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│ skill-writer generates skill        │
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│ skill-evaluator assesses quality    │
│ Score: 75/100 (Needs work)          │
└───────────────┬─────────────────────┘
                │
        ┌───────┴───────┐
        │               │
     < 80?           ≥ 80?
        │               │
        ▼               ▼
┌───────────────┐  ┌──────────────┐
│ Refinement    │  │ Accept &     │
│ Loop          │  │ Publish      │
│               │  └──────────────┘
│ skill-writer  │
│ --improve     │
│ [issues]      │
└───────┬───────┘
        │
        └─────────> Regenerate skill
                    (with fixes)
```

---

## Next Steps

1. **Build Automated Script** (Option 1)
   - Structural validation
   - Anti-pattern detection
   - Basic scoring

2. **Create skill-evaluator Skill** (Option 2)
   - Full Interactive skill following framework
   - LLM-based quality assessment
   - Detailed feedback generation

3. **Add to CI/CD Pipeline**
   - Automated validation on PR
   - Block merge if score < 70
   - Generate quality reports

4. **Iterative Refinement**
   - Track evaluation accuracy
   - Tune scoring weights
   - Add new quality checks

---

## Summary

The evaluator ensures skills meet quality standards through:

✅ **5 Evaluation Layers** (Structure, Content, Mode, Tools, Anti-Lazy)
✅ **Weighted Scoring** (100-point scale with quality bands)
✅ **Detailed Reports** (Issues, strengths, suggestions)
✅ **Multiple Modes** (Quick, Standard, Comprehensive)
✅ **Automation-Ready** (CI/CD integration, scripting)

**Result:** Consistent, high-quality skills that meet production standards.

---

*The evaluator itself should be a skill - practice what you preach!*
