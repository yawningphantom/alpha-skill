# Contributing to Personal Skills Repository

Thank you for your interest in contributing! This guide will help you create high-quality skills that follow our framework and best practices.

## Table of Contents

1. [When to Create a New Skill](#when-to-create-a-new-skill)
2. [How to Choose Skill Type](#how-to-choose-skill-type)
3. [Getting Started](#getting-started)
4. [Development Process](#development-process)
5. [Quality Checklist](#quality-checklist)
6. [Testing Requirements](#testing-requirements)
7. [Submission Process](#submission-process)
8. [Style Guidelines](#style-guidelines)

---

## When to Create a New Skill

### Create a New Skill When:
- You find yourself repeating a workflow more than twice
- A task requires multiple manual steps that can be automated
- You need to document a complex process with decision points
- A reference guide would save lookup time

### Extend an Existing Skill When:
- The workflow is a variation of an existing skill
- You're adding a new method/approach to existing functionality
- The skill just needs updated examples or documentation

### Ask First If:
- The workflow is very similar to an existing skill
- You're unsure whether it should be its own skill or part of another
- The automation would require significant external dependencies

---

## How to Choose Skill Type

Use this decision tree to select the right skill type:

```
Is this primarily reference information?
├─ YES → Reference Skill (Type A)
│   Examples: CLI tools, API docs, cheatsheets
│
└─ NO → Does it execute a single command/script?
    ├─ YES → Command Skill (Type B)
    │   Examples: Build scripts, deployment commands
    │
    └─ NO → Does it have sequential steps?
        ├─ YES → Workflow Skill (Type C)
        │   Examples: Investigation procedures, setup workflows
        │
        └─ NO → Does it have conditional branching?
            └─ YES → Interactive Skill (Type D)
                Examples: Root cause analysis, optimization decisions
```

### Quick Reference Table

| Skill Type | Primary Purpose | Key Feature | Example |
|------------|----------------|-------------|---------|
| Reference | Lookup information | Progressive disclosure | Git commands reference |
| Command | Execute task | Clear parameters | Run tests with coverage |
| Workflow | Multi-step process | Sequential steps | Deploy to production |
| Interactive | Conditional logic | Decision branches | Performance troubleshooting |

---

## Getting Started

### Prerequisites
- Git installed and configured
- Access to this repository
- Familiarity with Markdown and YAML
- Understanding of the [framework](FRAMEWORK.md)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yawningphantom/skills.git
cd skills
```

2. Review the framework:
```bash
open docs/FRAMEWORK.md
```

3. Choose a template:
```bash
ls templates/
# reference-skill.md
# command-skill.md
# workflow-skill.md
# interactive-skill.md
```

---

## Development Process

### Phase 1: Planning (10 minutes)

1. **Identify the pain point**
   - What workflow is tedious or error-prone?
   - How much time does it currently take?
   - How often is it performed?

2. **Define the automation**
   - What should the skill do?
   - What inputs does it need?
   - What outputs should it produce?

3. **Choose skill type**
   - Use the decision tree above
   - Review similar existing skills
   - Select the appropriate template

4. **Sketch the workflow**
   - List main steps
   - Identify decision points
   - Note required tools/commands
   - Plan fallback strategies

### Phase 2: Implementation (15-20 minutes)

1. **Create skill directory**
```bash
mkdir -p skills/your-skill-name
cd skills/your-skill-name
```

2. **Copy template**
```bash
cp ../../templates/[skill-type]-skill.md SKILL.md
```

3. **Fill in the template**
   - Replace all `[placeholders]` with actual content
   - Add 2-3 realistic examples
   - Include expected outputs
   - Document prerequisites clearly
   - Add fallback strategies where applicable

4. **Create supporting files (if needed)**
```bash
# For scripts
mkdir resources
touch resources/script.sh

# For detailed documentation
mkdir references
touch references/detailed-guide.md
```

### Phase 3: Validation (5-10 minutes)

1. **Self-review** - Run through the [quality checklist](#quality-checklist)
2. **Test locally** - Try using the skill yourself
3. **Check formatting** - Ensure YAML frontmatter is valid
4. **Verify links** - All references to other files/skills work

### Phase 4: Documentation (5 minutes)

1. **Update SKILL-CATALOG.md**
```markdown
### [Category]
- **your-skill-name** - Brief description
```

2. **Update README.md** if adding a new category

3. **Create/update CHANGELOG.md entry**
```markdown
## [Date]
### Added
- **your-skill-name**: Description of what it does
```

---

## Quality Checklist

Before submitting, ensure your skill meets ALL these criteria:

### ✅ Clarity & Discoverability
- [ ] Skill name is lowercase-with-hyphens
- [ ] Name clearly indicates what the skill does
- [ ] Description is action-oriented ("Deploys X by doing Y")
- [ ] Description includes trigger phrases ("Use when...")
- [ ] Handles common variations in user requests

### ✅ Completeness
- [ ] All prerequisites are explicitly listed
- [ ] Every parameter is explained with type
- [ ] At least 2-3 realistic examples provided
- [ ] Expected outputs are documented
- [ ] Error conditions and handling described
- [ ] Related skills are referenced

### ✅ Precision & Safety
- [ ] Tool invocations show EXACT syntax
- [ ] Placeholders are clearly marked (`{like_this}`)
- [ ] Critical constraints are highlighted
- [ ] Date/time formats specified where applicable
- [ ] Safety warnings for destructive operations
- [ ] No hardcoded credentials or sensitive data

### ✅ Usability
- [ ] Follows progressive disclosure (simple → complex)
- [ ] Decision points are clearly marked
- [ ] Fallback strategies are provided
- [ ] Success/failure criteria are defined
- [ ] Examples use realistic values (not "foo", "bar")

### ✅ Maintainability
- [ ] Last-updated date is current
- [ ] Dependencies are listed
- [ ] Contact/owner information included
- [ ] Testing procedures documented
- [ ] YAML frontmatter is valid

### ✅ Format & Style
- [ ] Markdown syntax is correct
- [ ] Code blocks have language hints
- [ ] Tables are properly formatted
- [ ] Headers follow hierarchy (H2, H3, etc.)
- [ ] No broken links

---

## Testing Requirements

### Manual Testing

1. **Functionality Test**
   - Run through the skill yourself
   - Verify all commands work as documented
   - Check that examples produce expected outputs

2. **Variation Test**
   - Try different parameter values
   - Test edge cases
   - Verify error handling

3. **Discovery Test**
   - Ask someone unfamiliar with the skill to use it
   - Can they understand when to use it?
   - Can they execute it without questions?

### Automated Validation (if applicable)

For skills with scripts or executables:
```bash
# Run syntax checks
shellcheck resources/script.sh

# Run linters
markdownlint SKILL.md

# Validate YAML
yamllint SKILL.md
```

---

## Submission Process

### 1. Create a Branch
```bash
git checkout -b add-skill-your-skill-name
```

### 2. Commit Your Changes
```bash
git add skills/your-skill-name/
git add docs/SKILL-CATALOG.md
git commit -m "Add your-skill-name skill

- Brief description of what it does
- Key features or benefits
"
```

### 3. Push to GitHub
```bash
git push origin add-skill-your-skill-name
```

### 4. Create a Pull Request

**PR Title Format:**
```
Add [skill-name] skill
```

**PR Description Template:**
```markdown
## What does this skill do?
[Brief description]

## Skill Type
- [ ] Reference Skill
- [ ] Command Skill
- [ ] Workflow Skill
- [ ] Interactive Skill

## Checklist
- [ ] All quality checklist items completed
- [ ] Manual testing performed
- [ ] Documentation updated (SKILL-CATALOG.md)
- [ ] Examples are realistic and tested
- [ ] YAML frontmatter is valid

## Testing Notes
[How you tested this skill, what works, any edge cases]

## Related Skills
[List any skills this relates to or depends on]
```

### 5. Review Process

- A maintainer will review your skill within 48 hours
- Address any feedback or requested changes
- Once approved, your skill will be merged

---

## Style Guidelines

### Naming Conventions

**Skill Names:**
- Lowercase with hyphens: `project-setup`
- Action-oriented: `debug-workflow` not `debugger`
- Concise: 2-3 words maximum

**File Names:**
- Main file: `SKILL.md` (uppercase)
- References: `lowercase-with-hyphens.md`
- Resources: Use appropriate extensions

**Directory Names:**
- Match skill name exactly: `skills/project-setup/`

### Writing Style

**Voice:**
- Imperative: "Execute this command"
- Not: "You should execute" or "The user could execute"

**Clarity:**
- Short sentences (< 25 words)
- Active voice
- Concrete examples
- Avoid jargon unless necessary

**Formatting:**
```markdown
# Use proper heading hierarchy
## Main sections as H2
### Subsections as H3

Use `code` for commands, parameters, and file names

Use **bold** for important warnings

Use *italics* for emphasis (sparingly)

Use > blockquotes for notes or tips
```

### Code Examples

**DO:**
```bash
# Show actual commands with real values
git clone https://github.com/user/repo.git
cd repo
npm install
```

**DON'T:**
```bash
# Vague or placeholder examples
git clone <repository>
cd <directory>
npm install
```

### Parameter Documentation

**Good:**
```markdown
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| project_name | string | Yes | Name for the new project (alphanumeric, hyphens) |
| template | string | No | Template to use (default: "basic") |
```

**Bad:**
```markdown
Parameters: project_name (required), template (optional)
```

---

## Common Mistakes to Avoid

1. **Vague descriptions** - "This skill helps with deployment"
   - ✅ Better: "Deploys services to production with blue-green strategy and automatic rollback"

2. **Missing prerequisites** - Assumes tools are installed
   - ✅ Better: Explicitly list required tools and versions

3. **Complex examples** - First example is advanced use case
   - ✅ Better: Start with simplest case, then show advanced usage

4. **No error handling** - Doesn't explain what to do when things fail
   - ✅ Better: Include "Fallbacks" section with alternative approaches

5. **Hardcoded values** - Examples have fake/placeholder data
   - ✅ Better: Use realistic values that user can adapt

---

## Getting Help

### Questions?
- Open a discussion on GitHub
- Review existing skills for examples
- Check the [framework documentation](FRAMEWORK.md)

### Feedback?
- Open an issue for framework improvements
- Suggest new skill types or patterns
- Share your use cases

### Found a Bug?
- Open an issue with:
  - Skill name and version
  - What you expected
  - What actually happened
  - Steps to reproduce

---

## Recognition

Contributors will be:
- Listed in the repository contributors
- Credited in the skill's metadata
- Mentioned in release notes

Thank you for helping build an awesome skills library!

---

**Questions?** Open an issue or discussion on [GitHub](https://github.com/yawningphantom/skills).
