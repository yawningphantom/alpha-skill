---
name: skill-evaluator
description: Evaluates generated skills against quality standards using 7-layer analysis (Structure, Content, Mode Alignment, Tools, Anti-Lazy, Performance, Cognitive Architecture). Use when skill-writer produces output, before publishing, or when assessing skill quality.
type: Interactive
optimization: Precision
tools:
  - validate_yaml_format
  - check_structural_integrity
  - calculate_constraint_density
  - detect_anti_patterns
  - analyze_token_efficiency
  - audit_cognitive_techniques
version: 2.0.0
---

# Skill Evaluator v2.0

> **Type:** Interactive Skill (Quality Assessment)
>
> **Optimization:** Precision (Clear quality definitions)
>
> **Last Updated:** 2026-02-14
>
> **Maintainer:** Personal Skills Framework
>
> **Enhancement:** 7-Layer Analysis (Added Performance + Cognitive Architecture)

## Overview

The Skill Evaluator performs systematic quality assessment of generated skills through **7-layer analysis**. It provides an objective quality score (0-100) with detailed feedback on issues, strengths, and improvement suggestions.

Think of it as **code review for skills** - catching issues before they reach users.

**Enhancement in v2.0:**
- Layer 6: Performance (token efficiency, clarity pillars, XML anchoring)
- Layer 7: Cognitive Architecture (technique compliance: Sandwiching, Chain of Density/Thought, Emotional Prompting)

## When to Use

Use this skill when you need to:
- Assess quality of skill-writer output before publishing
- Validate existing skills against current standards
- Benchmark skill quality across repository
- Get specific improvement suggestions

Trigger phrases:
- "Evaluate this skill"
- "Check skill quality"
- "Review [skill-name]"
- "Is this skill production-ready?"

## Prerequisites

**Required Inputs:**
- [ ] `{skill_file_path}`: Path to SKILL.md file to evaluate
- [ ] `{expected_mode}`: Industrial/Muse/Socratic (optional, for mode validation)

**Optional Context:**
- Skill type (Reference/Command/Workflow/Interactive)
- Target use case (helps assess fitness for purpose)

---

## CRITICAL GUIDANCE

⚠️ **Evaluation Principles:**

1. **Objective over Subjective**
   - DO: Use measurable criteria (section count, pattern matching)
   - DO NOT: Make vague assessments like "seems good"

2. **Actionable Feedback**
   - DO: Provide specific location and fix for each issue
   - DO NOT: Say "improve quality" without specifics

3. **Balanced Assessment**
   - DO: Identify both strengths and weaknesses
   - DO NOT: Focus only on problems or only on positives

---

## The 7-Layer Evaluation Process

### Layer 1: Structural Integrity (Automated)

**Purpose:** Validate format, syntax, and required sections

**Execute:**

```python
# Tool: validate_yaml_format(skill_file_path)
# Checks: YAML frontmatter validity
# Returns: {valid: bool, missing_fields: [...], score: 0-100}
```

**Validation Checks:**

| Check | Weight | Pass Criteria |
|-------|--------|---------------|
| YAML frontmatter valid | 10% | Parses without error |
| Required fields present | 10% | name, description exist |
| Section headers match template | 10% | Overview, When to Use, Prerequisites, Examples present |
| Code blocks formatted | 5% | All code blocks have language tags |
| Links not broken | 5% | All [text](link) references resolve |

**Scoring Formula:**
```
structural_score = (passed_checks / total_checks) * 100
```

**Interpretation:**
- **95-100**: Perfect structure, no issues
- **85-94**: Minor formatting problems
- **70-84**: Missing non-critical sections
- **<70**: Major structural problems

**If score < 70** → Report as CRITICAL issue, skip remaining layers

---

### Layer 2: Content Quality (Pattern Detection)

**Purpose:** Detect anti-patterns that reduce quality

**Execute:**

```python
# Tool: detect_anti_patterns(skill_content)
# Checks: Placeholders, vague language, incomplete markers
# Returns: {patterns_found: [...], score: 0-100}
```

**Anti-Pattern Detection:**

#### Placeholder Detection
```python
placeholder_patterns = {
    'generic_vars': r'\bfoo\b|\bbar\b|\bbaz\b',
    'incomplete': r'TODO|FIXME|XXX',
    'generic_urls': r'example\.com|test\.com',
    'unfilled_brackets': r'\[.*?\](?!\()',  # [text] without (link)
    'generic_continuation': r'etc\.|and so on|...'
}

# Penalty: -5 points per occurrence (max -20 per pattern type)
```

#### Vagueness Detection
```python
vague_patterns = {
    'weak_modals': r'\b(may|might|could|should)\b',  # In constraints
    'subjective_unqualified': r'\b(better|good|best)\b(?! than)',
    'undefined_standards': r'\b(reasonable|appropriate|suitable)\b',
    'ambiguous_conditions': r'as needed|if necessary|when appropriate'
}

# Penalty: -3 points per occurrence (max -15 per pattern type)
```

#### Realism Check
```python
# Check examples for realistic values
realistic_indicators = [
    r'https?://[a-z0-9-]+\.[a-z]{2,}',  # Real URLs
    r'\d{4}-\d{2}-\d{2}',               # Real dates
    r'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}',  # Real emails
]

example_section = extract_section(content, "## Examples")
realism_score = count_realistic_values(example_section) / expected_count * 100
```

**Scoring:**
```
content_score = 100 - total_penalties + (realism_score * 0.2)
```

**Interpretation:**
- **90-100**: Excellent content, specific and realistic
- **80-89**: Minor vagueness (1-2 instances)
- **70-79**: Some placeholders or unclear language
- **<70**: Pervasive quality issues

---

### Layer 3: Mode Alignment (Comparative)

**Purpose:** Verify optimization matches selected mode

**Execute:**

```python
# Tool: calculate_constraint_density(skill_content, expected_mode)
# Returns: {
#   strictness: 0.0-1.0,
#   expected_range: [min, max],
#   aligned: bool,
#   score: 0-100
# }
```

**Constraint Density Formula:**

```python
def calculate_constraint_density(content):
    """
    Measures strictness vs. freedom in instructions.

    Returns: 0.0 (very loose) to 1.0 (very strict)
    """
    # Count negative constraints
    dont_patterns = r'\bDO NOT\b|\bDON\'T\b|\bNEVER\b|\bAVOID\b'
    dont_count = len(re.findall(dont_patterns, content, re.I))

    # Count positive directives
    do_patterns = r'\bDO\b(?! NOT)|\bALWAYS\b|\bMUST\b|\bSHALL\b'
    do_count = len(re.findall(do_patterns, content, re.I))

    # Count strict mechanisms (validation, schemas)
    strict_patterns = r'schema|validate|check|verify|ensure|require'
    strict_count = len(re.findall(strict_patterns, content, re.I))

    # Count creative mechanisms (explore, consider, imagine)
    creative_patterns = r'explore|imagine|consider|surprise|novel|unexpected'
    creative_count = len(re.findall(creative_patterns, content, re.I))

    total = dont_count + do_count + strict_count + creative_count + 1
    strictness = (dont_count + strict_count) / total

    return strictness
```

**Expected Ranges by Mode:**

| Mode | Expected Range | Characteristics |
|------|----------------|-----------------|
| **Industrial** | 0.7 - 0.9 | High "DO NOT" density, validation gates, strict schemas |
| **Muse** | 0.1 - 0.3 | Low constraints, character profiles, exploration prompts |
| **Socratic** | 0.4 - 0.6 | Balanced, question patterns, progressive hints |

**Alignment Scoring:**

```python
def score_mode_alignment(actual_strictness, expected_mode):
    mode_ranges = {
        'Industrial': (0.7, 0.9),
        'Muse': (0.1, 0.3),
        'Socratic': (0.4, 0.6)
    }

    expected_min, expected_max = mode_ranges[expected_mode]

    if expected_min <= actual_strictness <= expected_max:
        return 100  # Perfect alignment

    # Calculate distance from range
    if actual_strictness < expected_min:
        distance = expected_min - actual_strictness
    else:
        distance = actual_strictness - expected_max

    # Penalty: -20 points per 0.1 distance
    score = max(0, 100 - (distance * 200))

    return score
```

**Interpretation:**
- **90-100**: Excellent mode alignment
- **80-89**: Slightly outside expected range (±0.05)
- **70-79**: Moderately misaligned (±0.15)
- **<70**: Wrong mode characteristics

---

### Layer 4: Tool Integration (Logical Validation)

**Purpose:** Verify tools are justified and well-specified

**Execute:**

For each tool defined in skill:

```python
# Tool: validate_tool_specification(tool_spec)
# Checks: Matches 4 criteria, atomic, has errors, has triggers
# Returns: {criterion: str, confidence: float, issues: [...]}
```

**Tool Criteria Mapping:**

```python
criteria_indicators = {
    'Calculator': {
        'keywords': ['deterministic', 'calculate', 'compute', 'math',
                     'precise', '100% accurate', 'formula', 'algorithm'],
        'must_have': 'same input = same output'
    },
    'Library': {
        'keywords': ['external', 'database', 'API', 'fetch', 'retrieve',
                     'real-time', 'query', 'private', 'changing'],
        'must_have': 'retrieves data from'
    },
    'Keyboard': {
        'keywords': ['write', 'send', 'create', 'delete', 'update',
                     'side effect', 'state change', 'modify', 'action'],
        'must_have': 'changes state'
    },
    'Sandbox': {
        'keywords': ['execute', 'run', 'validate', 'test', 'verify',
                     'sandbox', 'safe', 'output verification'],
        'must_have': 'verifies before showing'
    }
}
```

**Atomicity Check:**

```python
def check_atomicity(tool_name, tool_description):
    """
    Tools should do ONE thing.
    Bad: process_and_send_data
    Good: process_data, send_data (separate tools)
    """
    # Multiple verbs = not atomic
    action_verbs = r'\b(get|set|create|delete|update|process|send|fetch|validate|transform)\b'
    verb_count = len(re.findall(action_verbs, tool_name + ' ' + tool_description, re.I))

    # Presence of "and" in description
    has_and = ' and ' in tool_description.lower()

    if verb_count > 2 or has_and:
        return {
            'atomic': False,
            'issue': f"Tool appears to do {verb_count} things",
            'suggestion': "Split into multiple tools"
        }

    return {'atomic': True}
```

**Error Handling Check:**

```python
def check_error_handling(tool_spec):
    """
    Tools must return structured errors, not raise exceptions.
    """
    has_error_schema = 'error' in tool_spec.get('returns', {})
    has_error_docs = 'error' in tool_spec.get('description', '').lower()

    if not (has_error_schema or has_error_docs):
        return {
            'has_errors': False,
            'issue': "No error handling documented",
            'suggestion': "Add error return schema"
        }

    return {'has_errors': True}
```

**Trigger Clarity Check:**

```python
def check_trigger_clarity(tool_description):
    """
    Tool descriptions must have "Use when..." guidance.
    """
    has_trigger = bool(re.search(r'use when|use this (when|for)|trigger', tool_description, re.I))

    if not has_trigger:
        return {
            'has_triggers': False,
            'issue': "Unclear when to use this tool",
            'suggestion': "Add 'Use when...' section"
        }

    return {'has_triggers': True}
```

**Tool Scoring:**

```python
tool_score = average([
    criterion_match_score,  # 40% - Matches 1 of 4 criteria
    atomicity_score,        # 20% - Does one thing
    error_handling_score,   # 20% - Has error handling
    trigger_clarity_score   # 20% - Clear usage conditions
])
```

**Interpretation:**
- **90-100**: All tools excellent
- **80-89**: Minor issues (1 tool slightly unclear)
- **70-79**: Some tools need refinement
- **<70**: Multiple tools poorly specified

---

### Layer 5: Anti-Lazy Engineering (Prevention)

**Purpose:** Verify skill prevents common LLM failures

**Execute:**

Check for presence of anti-lazy mechanisms:

```python
anti_lazy_checklist = {
    'length_constraints': r'maximum \d+ (words|characters|lines)',
    'real_values': r'use real values|no placeholders|actual data',
    'explicit_steps': r'show all steps|explicitly state|don\'t skip',
    'format_only': r'return ONLY|no preamble|strictly follow',
    'verification': r'verify|validate|check before returning'
}

score = (checkmarks / len(anti_lazy_checklist)) * 100
```

**Specific Checks:**

#### 1. Verbosity Prevention
```
✓ Found: "Maximum 50 words per bullet"
✗ Missing: No length constraints specified
```

#### 2. Placeholder Prevention
```
✓ Found: "Do NOT use placeholder values like 'TODO' or 'example.com'"
✗ Missing: No guidance on avoiding placeholders
```

#### 3. Step Skipping Prevention
```
✓ Found: "Show all steps explicitly, even if they seem obvious"
✗ Missing: Allows implicit steps
```

#### 4. Format Discipline
```
✓ Found: "Return ONLY the JSON schema, no conversational text"
✗ Missing: No strict format enforcement
```

#### 5. Hallucination Prevention
```
✓ Found: "Verify all facts before including in output"
✗ Missing: No verification requirements
```

**Scoring:**
```
anti_lazy_score = (present_mechanisms / 5) * 100
```

**Interpretation:**
- **90-100**: 5/5 mechanisms present
- **70-89**: 4/5 mechanisms present
- **50-69**: 3/5 mechanisms present
- **<50**: ≤2/5 mechanisms present

---

### Layer 6: Performance (Token Efficiency) **[NEW in v2.0]**

**Purpose:** Verify skill is optimized for speed, cost, and clarity

**Execute:**

```python
# Tool: analyze_token_efficiency(skill_content)
# Returns: {
#   token_count: int,
#   tokens_per_instruction: float,
#   redundancy_index: float,
#   xml_anchors_present: bool,
#   clarity_scores: {input: int, logic: int, output: int},
#   score: 0-100
# }
```

**Token Efficiency Metrics:**

#### Metric 1: Total Token Count
```python
def count_tokens(skill_content):
    """
    Approximate token count (1 token ≈ 4 characters)
    """
    token_estimate = len(skill_content) / 4

    # Target: < 1500 tokens for main skill definition
    # (Excludes examples, which can be longer)

    if token_estimate < 1200:
        return 100  # Excellent
    elif token_estimate < 1500:
        return 90   # Good
    elif token_estimate < 1800:
        return 75   # Acceptable
    else:
        penalty = (token_estimate - 1800) / 100  # -1 per 100 tokens over
        return max(0, 75 - penalty)
```

#### Metric 2: Redundancy Index
```python
def calculate_redundancy(skill_content):
    """
    Detects duplicate phrases that inflate token count
    """
    sentences = skill_content.split('.')
    unique_sentences = set(sentences)

    redundancy = 1 - (len(unique_sentences) / len(sentences))

    # Target: < 10% redundancy
    if redundancy < 0.10:
        return 100
    elif redundancy < 0.20:
        return 80
    elif redundancy < 0.30:
        return 60
    else:
        return 40
```

#### Metric 3: Politeness Bloat Detection
```python
def detect_politeness_bloat(skill_content):
    """
    Counts unnecessary polite phrases that add tokens
    """
    politeness_patterns = [
        r'\bplease\b',
        r'\bmake sure to\b',
        r'\bkindly\b',
        r'\btry to\b',
        r'\bremember to\b'
    ]

    bloat_count = sum(
        len(re.findall(pattern, skill_content, re.I))
        for pattern in politeness_patterns
    )

    # Penalty: -5 points per instance (max -20)
    penalty = min(20, bloat_count * 5)
    return 100 - penalty
```

#### Metric 4: XML Anchoring (Attention Optimization)
```python
def check_xml_anchors(skill_content):
    """
    Verifies critical constraints use XML tags for attention focus
    """
    has_negative_constraints = '<negative_constraint>' in skill_content
    has_reference_constraints = '<reference_constraint>' in skill_content
    has_scratchpad = '<scratchpad>' in skill_content or '<chain_of_density>' in skill_content

    anchor_score = 0
    if has_negative_constraints:
        anchor_score += 50  # Most critical
    if has_reference_constraints or has_scratchpad:
        anchor_score += 30  # Important for reliability
    if '<high_stakes_context>' in skill_content:
        anchor_score += 20  # Context-dependent

    return min(100, anchor_score)
```

#### Metric 5: Clarity Pillar Scores
```python
def evaluate_clarity_retrospectively(skill_content):
    """
    Check if skill demonstrates high clarity on 3 pillars
    (Should have been checked during generation, this verifies)
    """
    # Input Specificity: Check if input format is specified
    has_input_spec = bool(re.search(r'input.*?(\{.*?\}|format|type)', skill_content, re.I))
    input_score = 10 if has_input_spec else 5

    # Logic Clarity: Check if steps are numbered and explicit
    has_numbered_steps = bool(re.search(r'###? Step \d+', skill_content))
    logic_score = 10 if has_numbered_steps else 5

    # Output Constraint: Check if output format is exact
    has_output_schema = bool(re.search(r'return.*?(\{.*?\}|json|format)', skill_content, re.I))
    output_score = 10 if has_output_schema else 5

    avg_clarity = (input_score + logic_score + output_score) / 3

    # Target: All pillars > 8
    if avg_clarity >= 9:
        return 100
    elif avg_clarity >= 8:
        return 85
    elif avg_clarity >= 7:
        return 70
    else:
        return 50
```

**Performance Scoring:**

```python
performance_score = average([
    token_count_score,          # 30% - Total efficiency
    redundancy_score,           # 20% - No duplication
    politeness_bloat_score,     # 15% - Conciseness
    xml_anchor_score,           # 20% - Attention optimization
    clarity_pillar_score        # 15% - Foundational clarity
])
```

**Interpretation:**
- **90-100**: Excellently optimized (< 1200 tokens, minimal bloat, XML anchored)
- **80-89**: Well optimized (< 1500 tokens, some improvements possible)
- **70-79**: Acceptable efficiency (< 1800 tokens, needs tightening)
- **<70**: Inefficient (> 1800 tokens or high redundancy)

---

### Layer 7: Cognitive Architecture **[NEW in v2.1]**

**Purpose:** Verify mandated cognitive techniques were applied based on task type

**Execute:**

```python
# Tool: audit_cognitive_techniques(skill_content)
# Returns: {
#   technique_manifest: {...},
#   compliance: {...},
#   score: 0-100
# }
```

**Cognitive Technique Auditing:**

#### Audit 1: Input Security (The Sandwich Technique)

**Check:** If skill processes user input, verify `<user_input>` tags present

```python
def audit_input_security(skill_content):
    """
    Verifies user input is wrapped in XML delimiters
    """
    # Detect if skill processes user input
    has_user_input = bool(re.search(
        r'user (provides|input|query|command|data)',
        skill_content,
        re.I
    ))

    if not has_user_input:
        return {'required': False, 'present': 'N/A', 'score': 100}

    # If required, check for sandwich tags
    has_sandwich = '<user_input>' in skill_content
    has_injection_warning = bool(re.search(
        r'<negative_constraint>.*?(instruction|injection|execute).*?</negative_constraint>',
        skill_content,
        re.DOTALL
    ))

    if has_sandwich and has_injection_warning:
        return {'required': True, 'present': True, 'score': 100}
    elif has_sandwich:
        return {'required': True, 'present': 'Partial', 'score': 70,
                'issue': 'Has tags but missing injection prevention constraint'}
    else:
        return {'required': True, 'present': False, 'score': 0,
                'issue': 'CRITICAL: User input not secured with XML tags'}
```

#### Audit 2: Reasoning Technique Selection

**Check:** If task requires reasoning, verify appropriate technique applied

```python
def audit_reasoning_technique(skill_content):
    """
    Verifies Chain of Density or Chain of Thought present if needed
    """
    # Detect if task is summarization
    is_summarization = bool(re.search(
        r'summariz|extract|distill|condense|key points',
        skill_content,
        re.I
    ))

    # Detect if task is reasoning/investigation
    is_reasoning = bool(re.search(
        r'analyz|investigat|debug|diagnos|root cause',
        skill_content,
        re.I
    ))

    # Detect if task is mathematical
    is_math = bool(re.search(
        r'calculat|comput|math|equation|formula',
        skill_content,
        re.I
    ))

    required_technique = None
    if is_summarization:
        required_technique = 'chain_of_density'
    elif is_reasoning or is_math:
        required_technique = 'chain_of_thought'

    if not required_technique:
        return {'required': False, 'present': 'N/A', 'score': 100}

    # Check for presence
    has_cod = '<chain_of_density>' in skill_content
    has_cot = '<scratchpad>' in skill_content

    if required_technique == 'chain_of_density' and has_cod:
        # Verify 5 iterations present
        iterations = len(re.findall(r'\*\*Iteration \d+', skill_content))
        if iterations >= 5:
            return {'required': True, 'present': True, 'technique': 'CoD', 'score': 100}
        else:
            return {'required': True, 'present': 'Partial', 'technique': 'CoD',
                    'score': 60, 'issue': f'Only {iterations} iterations, need 5'}

    elif required_technique == 'chain_of_thought' and has_cot:
        return {'required': True, 'present': True, 'technique': 'CoT', 'score': 100}

    else:
        return {'required': True, 'present': False,
                'technique': required_technique, 'score': 0,
                'issue': f'HIGH: {required_technique.replace("_", " ").title()} required but missing'}
```

#### Audit 3: Emotional Prompting (High-Stakes Tasks)

**Check:** If task is high-stakes, verify emotional framing present

```python
def audit_emotional_prompting(skill_content):
    """
    Verifies high-stakes framing for critical domains
    """
    high_stakes_domains = [
        'legal', 'medical', 'security', 'production',
        'deployment', 'financial', 'patient', 'contract'
    ]

    is_high_stakes = any(
        domain in skill_content.lower()
        for domain in high_stakes_domains
    )

    if not is_high_stakes:
        return {'required': False, 'present': 'N/A', 'score': 100}

    has_stakes_context = '<high_stakes_context>' in skill_content
    has_critical_marker = bool(re.search(
        r'⚠️|CRITICAL|WARNING|high.?stakes',
        skill_content
    ))

    if has_stakes_context and has_critical_marker:
        return {'required': True, 'present': True, 'score': 100}
    elif has_critical_marker:
        return {'required': True, 'present': 'Partial', 'score': 70,
                'issue': 'Has warning but missing <high_stakes_context> tag'}
    else:
        return {'required': True, 'present': False, 'score': 0,
                'issue': 'MEDIUM: High-stakes domain but no emotional framing'}
```

#### Audit 4: Meta-Structure Compliance

**Check:** Verify required structural elements present (Always required)

```python
def audit_meta_structure(skill_content):
    """
    Validates presence of required sections
    """
    required_elements = {
        'YAML frontmatter': r'^---\n.*?\n---',
        'Title': r'^# ',
        'Overview': r'## Overview',
        'Process/Workflow': r'## (Process|Workflow)',
        'Constraints (XML)': r'<negative_constraint>',
        'Examples': r'## Examples'
    }

    missing = []
    for name, pattern in required_elements.items():
        if not re.search(pattern, skill_content, re.MULTILINE):
            missing.append(name)

    if not missing:
        return {'score': 100, 'missing': []}
    else:
        penalty = len(missing) * 15
        return {'score': max(0, 100 - penalty), 'missing': missing,
                'issue': f'Missing: {", ".join(missing)}'}
```

**Cognitive Architecture Scoring:**

```python
cognitive_score = average([
    input_security_score,       # 30% - CRITICAL for user input
    reasoning_technique_score,  # 30% - Essential for quality
    emotional_prompting_score,  # 20% - Domain-dependent
    meta_structure_score        # 20% - Always required
])

# IMPORTANT: If any CRITICAL audit fails, override to max 50
if any(audit['issue'].startswith('CRITICAL') for audit in audits):
    cognitive_score = min(cognitive_score, 50)
```

**Interpretation:**
- **95-100**: Perfect cognitive compliance, all techniques present
- **85-94**: Good compliance, minor improvements
- **70-84**: Acceptable, missing some non-critical techniques
- **<70**: Poor compliance, critical techniques missing

**Special Rule:**
If the task did NOT require any special techniques (simple command skill with no user input, no reasoning, non-critical domain), this layer automatically scores 100 as "N/A - Not Applicable".

---

## Overall Scoring

### Weighted Average Formula

```python
def calculate_overall_score(layer_scores):
    """
    Combines all layer scores with weights.

    v2.0: Added Layer 6 (Performance)
    v2.1: Added Layer 7 (Cognitive Architecture)
    """
    weights = {
        'structural': 0.15,           # Must be valid (reduced from 0.20)
        'content': 0.20,              # Quality important (reduced from 0.25)
        'mode_alignment': 0.15,       # Must match intent (reduced from 0.25)
        'tool_integration': 0.10,     # Logical soundness (reduced from 0.15)
        'anti_lazy': 0.10,            # Failure prevention (reduced from 0.15)
        'performance': 0.15,          # NEW: Token efficiency, clarity
        'cognitive_architecture': 0.15 # NEW: Technique compliance
    }

    overall = sum(
        layer_scores[layer] * weight
        for layer, weight in weights.items()
    )

    return round(overall, 1)
```

### Quality Bands

| Score | Band | Symbol | Interpretation |
|-------|------|--------|----------------|
| 90-100 | **Excellent** | ✅ | Production-ready, publish immediately |
| 80-89 | **Good** | ✔️ | Minor improvements suggested, publishable |
| 70-79 | **Acceptable** | ⚠️ | Functional but needs refinement before publish |
| 60-69 | **Needs Work** | ❌ | Significant issues, requires revision |
| <60 | **Reject** | 🚫 | Major rework required, do not publish |

---

## Evaluation Report Format

### Standard Report Structure

```yaml
skill_evaluation_report:
  # Metadata
  skill_name: "mortgage-calculator"
  skill_type: "Command"
  expected_mode: "Industrial"
  evaluated_at: "2026-02-14T10:30:00Z"
  evaluator_version: "1.0.0"

  # Overall Assessment
  overall_score: 85
  overall_band: "Good"
  production_ready: false  # Threshold: 90
  publishable: true        # Threshold: 70

  # Layer Scores
  layer_scores:
    structural_integrity: 95
    content_quality: 82
    mode_alignment: 88
    tool_integration: 90
    anti_lazy_engineering: 70

  # Issues (Prioritized)
  issues:
    critical:
      - layer: "structural"
        location: "YAML frontmatter"
        issue: "Invalid YAML syntax on line 3"
        impact: "Skill cannot be parsed"
        fix: "Close quote on line 3"
        urgency: "BLOCKER"

    major:
      - layer: "content"
        location: "Examples section, Example 2"
        issue: "Uses placeholder 'example.com'"
        impact: "Reduces realism and credibility"
        fix: "Replace with actual financial website URL"
        urgency: "HIGH"

      - layer: "anti_lazy"
        location: "Constraints section"
        issue: "Only 3/5 anti-lazy mechanisms present"
        impact: "May allow placeholder usage and verbosity"
        fix: "Add: 'Use real values' and 'Maximum N words'"
        urgency: "MEDIUM"

    minor:
      - layer: "mode_alignment"
        location: "Overall strictness"
        issue: "Strictness 0.82, expected 0.70-0.90 (Industrial)"
        impact: "Slightly overly strict for some use cases"
        fix: "Consider reducing negative constraints by 2-3"
        urgency: "LOW"

  # Strengths (Positive Feedback)
  strengths:
    - "Excellent tool specification - all 4 criteria clearly met"
    - "YAML frontmatter structure perfect"
    - "Mode alignment strong (0.82 vs expected 0.70-0.90)"
    - "Examples demonstrate progressive complexity"

  # Actionable Suggestions
  suggestions:
    priority_1:
      - "Add 2 more anti-lazy constraints (currently 3, target 5)"
      - "Replace 'example.com' in Example 2 with realistic URL"

    priority_2:
      - "Add negative example (currently 2 positive, 0 negative)"
      - "Include rollback procedure for Keyboard tools"

    priority_3:
      - "Add validation section with specific checkpoints"
      - "Cross-reference related skills in catalog"

  # Comparison to Template
  template_conformance:
    skill_type: "Command"
    required_sections:
      present: ["Overview", "When to Use", "Prerequisites", "Examples"]
      missing: []
    optional_sections:
      present: ["Troubleshooting", "Performance"]
      missing: ["Related Skills"]

  # Improvement Path
  path_to_production:
    current_score: 85
    target_score: 90
    gap: 5
    estimated_effort: "15 minutes"
    key_actions:
      - "Fix placeholder in Example 2 (+2 points)"
      - "Add 2 anti-lazy constraints (+3 points)"
```

---

## Examples

### Example 1: Evaluating High-Quality Skill

**Input:**
```bash
/skill-evaluator skills/data-transformer/SKILL.md --mode Industrial
```

**Process:**

**Layer 1: Structural**
- ✅ YAML valid
- ✅ All required fields
- ✅ All sections present
- ✅ Code blocks formatted
- ✅ Links resolve
- **Score: 100/100**

**Layer 2: Content**
- ✅ No placeholders found
- ✅ Examples use realistic values
- ✅ Constraints specific
- ✅ No vague language
- **Score: 98/100** (minor: 1 "may" in non-constraint context)

**Layer 3: Mode Alignment**
- Expected: Industrial (0.7-0.9)
- Actual: 0.85
- ✅ Within range
- **Score: 100/100**

**Layer 4: Tools**
- Tool 1: `validate_json_schema` → Calculator ✅
- Tool 2: `fetch_schema_registry` → Library ✅
- All atomic ✅
- All have error handling ✅
- All have triggers ✅
- **Score: 100/100**

**Layer 5: Anti-Lazy**
- ✅ Length constraints: "Maximum 1000 lines output"
- ✅ Real values: "Use actual field names from input"
- ✅ Explicit steps: "Show all transformation steps"
- ✅ Format only: "Return ONLY transformed JSON"
- ✅ Verification: "Validate output schema before returning"
- **Score: 100/100**

**Layer 6: Performance**
- ✅ Token count: 1,342 tokens (excellent, < 1500)
- ✅ Redundancy: 5% (excellent, < 10%)
- ✅ Politeness bloat: 0 instances
- ✅ XML anchors: 3 `<negative_constraint>` tags present
- ✅ Clarity pillars: Input=10, Logic=10, Output=10 (perfect)
- **Score: 98/100**

**Layer 7: Cognitive Architecture**
- ❌ Input security: Not required (no user input processing)
- ❌ Reasoning technique: Not required (transformation task, not reasoning)
- ❌ Emotional prompting: Not required (non-critical domain)
- ✅ Meta-structure: Perfect (all sections present)
- **Score: 100/100** (N/A techniques properly skipped)

**Output:**
```yaml
overall_score: 99
overall_band: "Excellent"
production_ready: true

layer_scores:
  structural_integrity: 100
  content_quality: 98
  mode_alignment: 100
  tool_integration: 100
  anti_lazy_engineering: 100
  performance: 98
  cognitive_architecture: 100

issues:
  critical: []
  major: []
  minor:
    - location: "Prerequisites section"
      issue: "Uses 'may' (weak modal)"
      fix: "Change to 'can' or 'will'"

strengths:
  - "Perfect structural integrity"
  - "Exemplary anti-lazy engineering"
  - "All tools excellently specified"
  - "Mode alignment perfect"
  - "Excellent token efficiency (1,342 tokens)"
  - "Proper cognitive technique selection (N/A correctly applied)"

suggestions: []

path_to_production: "Already production-ready! ✅"
```

---

### Example 2: Evaluating Low-Quality Skill

**Input:**
```bash
/skill-evaluator skills/poor-example/SKILL.md
```

**Process:**

**Layer 1: Structural**
- ❌ YAML has syntax error
- ❌ Missing 'description' field
- ❌ Missing 'Examples' section
- ✅ Code blocks formatted
- ❌ 2 broken links
- **Score: 40/100** → CRITICAL

**Output (Early Termination):**
```yaml
overall_score: 40
overall_band: "Reject"
production_ready: false
publishable: false

issues:
  critical:
    - layer: "structural"
      issue: "YAML syntax error: unclosed quote line 2"
      fix: "Add closing quote on line 2"
      urgency: "BLOCKER"

    - layer: "structural"
      issue: "Missing required field: description"
      fix: "Add description to YAML frontmatter"
      urgency: "BLOCKER"

    - layer: "structural"
      issue: "Missing required section: Examples"
      fix: "Add ## Examples section with 2-3 examples"
      urgency: "BLOCKER"

evaluation_status: "TERMINATED_EARLY"
reason: "Structural score < 70, remaining layers skipped"

path_to_production:
  gap: 50 points
  estimated_effort: "2 hours"
  recommendation: "Fix all BLOCKER issues, then re-evaluate"
```

---

## Decision Tree: When to Accept

```
Score ≥ 90?
├─ YES → ✅ ACCEPT & PUBLISH
│         (Excellent, production-ready)
│
└─ NO → Score ≥ 80?
        ├─ YES → ✔️ ACCEPT with minor fixes
        │         (Good, publishable with notes)
        │
        └─ NO → Score ≥ 70?
                ├─ YES → ⚠️ CONDITIONAL ACCEPT
                │         (Acceptable, needs refinement)
                │         → Request fixes before publish
                │
                └─ NO → Score ≥ 60?
                        ├─ YES → ❌ REJECT (Needs Work)
                        │         → Significant revision required
                        │
                        └─ NO → 🚫 REJECT (Major Rework)
                                  → Start over or substantial changes
```

---

## Usage Modes

### Mode 1: Quick Check (5 seconds)
```bash
/skill-evaluator --mode quick skills/my-skill/SKILL.md

# Runs: Layer 1 only (Structural)
# Output: Pass/Fail + structural score
```

### Mode 2: Standard (30 seconds)
```bash
/skill-evaluator skills/my-skill/SKILL.md

# Runs: All 5 layers
# Output: Full report with issues and suggestions
```

### Mode 3: Comprehensive (60 seconds)
```bash
/skill-evaluator --mode comprehensive skills/my-skill/SKILL.md

# Runs: All 5 layers + comparative analysis
# Output: Full report + comparison to best-in-class examples
```

### Mode 4: Batch Evaluation
```bash
/skill-evaluator --batch skills/*/SKILL.md

# Evaluates all skills in repository
# Output: Summary report with quality distribution
```

---

## Integration with skill-writer

### Automatic Evaluation (Recommended)

```bash
# skill-writer automatically invokes evaluator
/skill-writer "Create mortgage calculator" --evaluate

# Pipeline:
# 1. skill-writer generates skill
# 2. skill-evaluator assesses quality
# 3. If score < 80: skill-writer refines automatically
# 4. Returns final skill with quality report
```

### Manual Refinement Loop

```bash
# Generate skill
/skill-writer "Create API documentation skill"

# Evaluate
/skill-evaluator skills/api-docs/SKILL.md

# Output: Score 75 (Needs work)
#   Issue: Missing 2 anti-lazy constraints
#   Issue: Example 3 uses placeholder

# Refine
/skill-writer --improve skills/api-docs/SKILL.md \
  --issues "Add anti-lazy constraints, fix Example 3"

# Re-evaluate
/skill-evaluator skills/api-docs/SKILL.md

# Output: Score 88 (Good) ✔️
```

---

## Continuous Improvement

### Track Quality Metrics Over Time

```yaml
quality_metrics:
  2026-02-14:
    skills_evaluated: 10
    avg_score: 82.5
    excellent: 3
    good: 5
    acceptable: 2
    rejected: 0

  2026-02-21:
    skills_evaluated: 15
    avg_score: 86.3  # Improving!
    excellent: 6
    good: 7
    acceptable: 2
    rejected: 0
```

### Calibrate Scoring Weights

```python
# Periodically review if weights still make sense
current_weights = {
    'structural': 0.20,
    'content': 0.25,
    'mode_alignment': 0.25,
    'tool_integration': 0.15,
    'anti_lazy': 0.15
}

# Analyze which layers correlate most with user satisfaction
# Adjust weights accordingly
```

---

## Related Skills

| Skill | Relationship | When to Use |
|-------|--------------|-------------|
| skill-writer | Generates | Use before evaluation |
| skill-optimizer | Improves | Use after evaluation shows issues |
| skill-tester | Validates | Use to test skill execution (not just structure) |

---

## Validation

After evaluation, verify:
- [ ] Overall score calculated correctly (weighted average)
- [ ] All critical issues would actually block usage
- [ ] Major issues significantly impact quality
- [ ] Minor issues are truly optional improvements
- [ ] Suggestions are actionable and specific

---

## Meta-Notes

This skill evaluates other skills, including itself. To evaluate the evaluator:

```bash
/skill-evaluator skills/skill-evaluator/SKILL.md --mode comprehensive

# Expected: Score 90+ (it should meet its own standards!)
```

**Version History:**
- 2.0.0 (2026-02-14) - Added Layer 6 (Performance) and Layer 7 (Cognitive Architecture) for v2.1 compatibility
- 1.0.0 (2026-02-14) - Initial skill-evaluator with 5-layer analysis

---

**Need help?** See [docs/EVALUATION-FRAMEWORK.md](../../docs/EVALUATION-FRAMEWORK.md) for complete evaluation methodology.
