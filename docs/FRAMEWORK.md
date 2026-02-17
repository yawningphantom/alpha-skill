# Framework for Writing Excellent Claude Code Skills

## Context

This framework transforms the skills repository into a comprehensive library for automating workflows. Skills are executable AI agent capabilities that can be invoked via slash commands (e.g., `/workflow:deploy`), designed to save time by automating repetitive workflows with consistency, reusability, and maintainability.

**Why This Matters:**
- Skills are executable AI agent capabilities that can be invoked via slash commands
- Well-written skills save time by automating repetitive workflows
- A good framework ensures consistency, reusability, and maintainability
- Skills can be composed together to handle complex multi-step processes

---

## The Skills Framework: 5 Core Pillars

### Pillar 1: Skill Anatomy - The Physical Structure

Every skill consists of:

```
skill-name/
├── SKILL.md              # Main skill definition (REQUIRED)
├── references/           # Optional: Detailed documentation (for reference skills)
│   ├── subtopic-1.md
│   └── subtopic-2.md
└── resources/           # Optional: Scripts, templates, config files
    ├── script.py
    └── template.json
```

**SKILL.md Structure:**
```yaml
---
name: skill-name                    # Lowercase with hyphens
description: Clear, actionable description of when/how to use this skill
---

# Skill Title

## Overview
[What this skill does and why it exists]

## When to Use
[Specific triggers and use cases]

## Prerequisites
[What user must provide or know]

## Workflow/Instructions
[Detailed steps, commands, tool invocations]

## Examples
[Real-world usage scenarios]

## Related Skills
[Links to complementary skills]
```

---

### Pillar 2: Skill Types - The Categories

Choose the right type for your use case:

#### Type A: Reference Skills (Knowledge-Based)
**Purpose:** Provide lookup information, documentation, CLI references

**Characteristics:**
- Progressive disclosure (index → details)
- Minimal tool invocation
- Extensive documentation
- Categorized information

**Example Use Cases:**
- CLI tool reference
- API documentation
- Framework guides
- Configuration references

**Template:**
```yaml
---
name: tool-reference
description: Comprehensive reference for [tool category]
---

# Tool Reference

## Quick Index
| Tool | Purpose | Category |
|------|---------|----------|
| ... | ... | ... |

## Categories
[Organized by function]

## Detailed References
[Links to references/ directory]
```

---

#### Type B: Command Skills (Execute-Based)
**Purpose:** Execute specific commands or scripts with parameters

**Characteristics:**
- Clear parameter definitions
- Multiple examples
- Output format documentation
- Options and flags explained

**Example Use Cases:**
- Running builds
- Deploying services
- Fetching metrics
- Database queries

**Template:**
```yaml
---
name: command-name
description: Executes [specific task] with [parameters]
---

# Command Name

## Syntax
```
command [REQUIRED_PARAM] [OPTIONAL_PARAM] [FLAGS]
```

## Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ... | ... | ... | ... |

## Options
| Flag | Default | Description |
|------|---------|-------------|
| ... | ... | ... |

## Examples

### Example 1: Basic Usage
```
[Actual command with real values]
```
Output:
```
[Expected output]
```

### Example 2: Advanced Usage
[More complex scenarios]
```

---

#### Type C: Workflow Skills (Sequential Multi-Step)
**Purpose:** Guide through complex multi-step processes

**Characteristics:**
- Numbered sequential steps
- Decision points and branching
- Tool invocations at each step
- Evidence collection
- Result interpretation

**Example Use Cases:**
- Investigation workflows
- Deployment processes
- Debugging procedures
- Incident response

**Template:**
```yaml
---
name: workflow-name
description: Guides through [process] by [key steps]
---

# Workflow Name

## Overview
[Problem this solves]

## Prerequisites
- Parameter 1: [description]
- Parameter 2: [description]

## Workflow

### Step 1: [Action Name]
**Purpose:** [Why this step matters]

**Execute:**
```
[Tool invocation or command]
```

**Interpret:**
- If result shows X → proceed to Step 2
- If result shows Y → see Fallback A

### Step 2: [Next Action]
[Continue pattern...]

## Fallbacks
### Fallback A: When [condition]
[Alternative approach]

## Summary Template
Present findings in this format:
- Finding 1: [evidence]
- Finding 2: [evidence]
- Conclusion: [recommendation]
```

---

#### Type D: Interactive Skills (Conditional Logic)
**Purpose:** Handle branching logic and user decisions

**Characteristics:**
- Multiple methods/approaches
- Conditional execution paths
- Threshold-based decisions
- Interpretation guidelines

**Example Use Cases:**
- Root cause analysis
- A/B testing decisions
- Resource optimization
- Performance tuning

**Template:**
```yaml
---
name: interactive-skill
description: Analyzes [data] and determines [outcome] based on conditions
---

# Interactive Skill

## CRITICAL GUIDANCE
⚠️ [Important warnings or common mistakes]

## Methods

### Method 1: [Primary Approach]
**When to use:** [Condition]

**Steps:**
1. [Step with tool invocation]
2. [Step with interpretation]

**Thresholds:**
- Value > X → Interpretation A
- Value < Y → Interpretation B

### Method 2: [Alternative Approach]
**When to use:** [Different condition]

## Decision Tree
```
Start
├─ If condition A → Path 1
├─ Else if condition B → Path 2
└─ Else → Path 3 (default)
```

## Reporting Format
[Template for presenting results]
```

---

#### Type E: Hybrid Skills (Workflow + Interactive)
**Purpose:** Complex operational tasks merging strict processes with decision-making.

**Characteristics:**
- Starts with interactive Triage (Decision Tree).
- Branches into specific sequential Workflows.
- Human-in-the-loop confirmation.

**Example Use Cases:**
- On-call incident response (Triage -> Fix).
- Deployment debugging (Check -> Rollback/Hotfix).
- Customer support routing.

**Template:**
```yaml
---
name: hybrid-skill
description: Guides through [complex process] with conditional branching
---

# Hybrid Skill

## Part 1: Triage (Interactive)
1. Gather Context
2. Decision Logic (If A -> Branch 1)

## Part 2: Execution (Workflow)
### Branch 1: [Scenario]
1. Step 1...
2. Step 2...
```

---

### Pillar 3: Quality Standards - The Checklist

Use this checklist to validate every skill:

#### ✅ Clarity & Discoverability
- [ ] Description clearly states WHEN to use this skill
- [ ] Name follows lowercase-with-hyphens convention
- [ ] Obvious from name what the skill does
- [ ] Handles variations in user requests (synonyms, related terms)

#### ✅ Completeness
- [ ] Prerequisites explicitly listed
- [ ] All parameters explained with types
- [ ] Multiple realistic examples provided
- [ ] Expected outputs documented
- [ ] Error conditions and handling described

#### ✅ Precision & Safety
- [ ] Tool invocations show EXACT syntax
- [ ] Placeholders clearly marked (e.g., `{like_this}`)
- [ ] Critical constraints highlighted (DO NOT do X)
- [ ] Data format specifications included (date formats, case sensitivity)
- [ ] Safety warnings for destructive operations

#### ✅ Usability
- [ ] Progressive disclosure (simple → complex)
- [ ] Decision points clearly marked
- [ ] Fallback strategies provided
- [ ] Related skills referenced
- [ ] Success/failure criteria defined

#### ✅ Maintainability
- [ ] Version or last-updated date
- [ ] Contact/owner information
- [ ] Dependencies listed
- [ ] Testing/validation procedures
- [ ] Migration notes (if applicable)

---

### Pillar 4: Best Practices - The Patterns

#### Pattern A: Validate-Then-Execute Flow
```
1. Parse user input
2. Validate inputs (format, constraints, availability)
3. Execute primary tool/command
4. Process results
5. Interpret for user
6. Provide next steps
```

**When to use:** Command and workflow skills that take parameters

---

#### Pattern B: Fallback Chains
```
Primary Approach:
- Try Method 1 with optimal tools

Fallback if Method 1 fails:
- Try Method 2 with alternative tools
- Log reason for fallback

Last Resort:
- Manual investigation steps
- Request additional context
```

**When to use:** Skills where primary data source might be unavailable

---

#### Pattern C: Evidence Checklist
```
Evidence Requirements:
- [ ] Evidence type 1 collected
- [ ] Evidence type 2 analyzed
- [ ] Mandatory validation performed
- [ ] Cross-reference completed

Only when all checked → Present conclusion
```

**When to use:** Investigation and analysis skills requiring thoroughness

---

#### Pattern D: Progressive Disclosure
```
Level 1: Skill metadata (always shown)
├─ name, description, basic usage

Level 2: Main SKILL.md (loaded on invocation)
├─ Prerequisites, workflow, examples

Level 3: Detailed references (loaded on demand)
└─ Tool-specific docs, advanced scenarios
```

**When to use:** Reference skills with extensive documentation

---

#### Writing Style Guidelines

**Description (YAML frontmatter):**
- Action-oriented: "Deploys X by doing Y"
- Specific triggers: "Use when user says 'deploy to prod' or 'ship to production'"
- Not: "This is a skill for deployment"

**Instructions:**
- Imperative voice: "Execute this command", "Validate the result"
- Not: "You should execute" or "The user could validate"

**Tool Invocations:**
```
# ✅ GOOD - Exact syntax with clear placeholders
mcp__tool__function_name(
  parameter_1="{user_provided_value}",
  parameter_2="literal_value",
  parameter_3={numeric_value}
)

# ❌ BAD - Vague or incomplete
Call the tool with appropriate parameters
```

**Examples:**
- Use realistic values, not "foo", "bar", "example"
- Show both simple and complex cases
- Include expected output snippets
- Explain what each example demonstrates

---

### Pillar 5: Development Workflow - The Process

#### Phase 1: Ideation
1. **Identify the pain point** - What workflow is tedious/error-prone?
2. **Define the automation** - What should the skill do?
3. **Determine skill type** - Reference, Command, Workflow, or Interactive?
4. **Check for existing skills** - Can you extend/compose existing skills?

#### Phase 2: Design
1. **Map the workflow** - Draw out steps and decision points
2. **Identify tools needed** - What MCP tools, CLI commands, or APIs?
3. **Define prerequisites** - What must the user provide?
4. **Plan fallback strategies** - What if primary approach fails?
5. **Design output format** - How will results be presented?

#### Phase 3: Implementation
1. **Create skill directory** - `skills/skill-name/`
2. **Write SKILL.md** - Follow template for chosen skill type
3. **Add examples** - At least 2-3 realistic scenarios
4. **Create supporting files** - Scripts, templates, or references
5. **Document related skills** - Cross-reference complementary skills

#### Phase 4: Validation
1. **Self-review against quality checklist** - All boxes checked?
2. **Test with variations** - Different user phrasings trigger correctly?
3. **Verify tool invocations** - Syntax is exact and correct?
4. **Check edge cases** - Error conditions handled?
5. **Peer review** - Have someone else test the skill

#### Phase 5: Integration
1. **Update plugin README** - Add skill to index
2. **Configure plugin.json** - Update metadata if needed
3. **Create tests** - Automated validation if applicable
4. **Document in changelog** - Note what was added
5. **Announce** - Let users know about new capability

---

## Examples of Skills to Build

Based on common workflow automation needs:

### Starter Skills (Build These First)

1. **project-setup** (Command Skill)
   - Initialize new projects with templates
   - Set up git, dependencies, config files

2. **code-review-checklist** (Reference Skill)
   - Checklist for reviewing PRs
   - Common patterns and anti-patterns

3. **debug-workflow** (Workflow Skill)
   - Step-by-step debugging process
   - Log analysis, breakpoint usage, root cause identification

4. **performance-analysis** (Interactive Skill)
   - Analyze performance metrics
   - Identify bottlenecks based on thresholds

### Advanced Skills (Build After Framework is Proven)

5. **deploy-pipeline** (Workflow Skill)
   - Multi-stage deployment process
   - Validation, rollback procedures

6. **meeting-notes-to-tasks** (Command Skill)
   - Convert meeting transcripts to action items
   - Generate JIRA tickets or todo lists

7. **refactoring-guide** (Reference Skill)
   - Common refactoring patterns
   - When and how to refactor

---

## Verification Strategy

### Manual Testing
1. **Discoverability Test**: Can you find the right skill for a task?
2. **Clarity Test**: Can someone else use the skill without asking questions?
3. **Completeness Test**: Does the skill handle expected variations and edge cases?
4. **Reliability Test**: Does it work consistently across multiple invocations?

### Automated Validation
- YAML frontmatter validation
- Required sections present
- Link checking (references to other skills)
- Code block syntax validation

### Quality Metrics
Track these over time:
- Skill usage frequency
- Error/failure rate
- Time saved (before/after automation)
- User satisfaction ratings

---

## Success Criteria

This framework is successful when:

✅ **You can create a new skill in <30 minutes** using templates and guidelines

✅ **Skills are self-documenting** - no need to explain how to use them

✅ **New users can contribute skills** following the patterns

✅ **Skills compose together** - can chain skills for complex workflows

✅ **Maintenance is minimal** - skills don't break with environment changes

✅ **You actually use the skills** - they save time and reduce errors

---

*The framework itself will evolve - start simple, learn from usage, and continuously improve the patterns.*
