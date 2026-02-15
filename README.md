# Alpha Skill

> **Engineering-grade framework for AI automation agents.**

> **Version:** 0.0.1 | **Build:** Framework Integration + Cognitive Enforcement

**Alpha Skill** is a structured framework for defining, generating, and validating executable skills. It treats natural language prompts as software artifacts, enforcing strict architectural patterns for security, determinism, and reliability.

### ⚡ Quick Start

```bash
# Clone → Use (30 seconds)
git clone https://github.com/your-org/skills.git && cd skills
claude
/alpha-skill Create a skill for code reviews
```

### Alpha Skill (`alpha-skill`) 🚀
**Purpose:** Production-ready skill generator with automatic quality refinement using Reinforcement Learning loop.

**Features:**
*   **4-Agent Architecture:** Orchestrates Generator → Adversary → Evaluator → Optimizer loop
*   **Automatic Refinement:** Iterates until score ≥90 and all tests pass
*   **Empirical Testing:** Generates and runs adversarial test cases
*   **Production Hardened:** Survives injection attacks, edge cases, and boundary conditions

```bash
/alpha-skill "Create a skill that audits AWS security groups for open ports"
# → Generates v1 → Tests (7/10 fail) → Refines v2 → Tests (13/13 pass) ✅
```

## Installation

### 🚀 For Claude Code

```bash
# 1. Clone this repository
git clone https://github.com/your-org/skills.git
cd skills

# 2. Start Claude Code
claude

# 3. Use immediately
/alpha-skill Create a skill for code reviews
```

**Want it available in all projects?**

```bash
# One command - installs all skills (alpha, generator, evaluator, adversary)
cp -r skills/skill-* ~/.claude/skills/

# Now use in any project
cd ~/any-project && claude
/alpha-skill Create a deployment skill
```

---

### 💻 For Cursor Editor

#### Option 1: Use as Project Context (Best for single project)

```bash
# 1. Navigate to your project
cd your-project

# 2. Copy alpha-skill to your project
cp -r /path/to/skills/skills/alpha-skill .cursorrules/skills/

# 3. Cursor automatically loads it
# Ask Cursor: "Use alpha-skill to create a review skill"
```

#### Option 2: Add to Global Cursor Rules (Best for all projects)

```bash
# 1. Read the alpha-skill content
cat skills/alpha-skill/SKILL.md

# 2. Copy it to your global Cursor rules
# Mac/Linux:
mkdir -p ~/.cursor/rules
cp skills/alpha-skill/SKILL.md ~/.cursor/rules/alpha-skill.md

# Windows:
mkdir %USERPROFILE%\.cursor\rules
copy skills\alpha-skill\SKILL.md %USERPROFILE%\.cursor\rules\alpha-skill.md

# 3. In Cursor, reference it:
# "@alpha-skill create a skill for API testing"
```

---

## Quick Start

### Try It Immediately (No Installation)

```bash
# Clone and test
git clone https://github.com/your-org/skills.git && cd skills
claude

# Generate your first production-ready skill (automatic RL loop)
/alpha-skill "Create a skill that reviews pull requests for security issues"
# → Generates v1 → Tests → Refines → Tests → Production-ready ✅

### Common Usage Patterns

**Generate production-ready skill (Recommended):**
```bash
/alpha-skill "Create a skill for [task]" --target 90
# Automatic refinement until score ≥90 and all tests pass
```

### Skill Types
The framework defines four immutable patterns:

1.  **Reference:** Static documentation and lookups.
2.  **Command:** Parameterized execution of specific actions.
3.  **Workflow:** Sequential, multi-step procedures with state.
4.  **Interactive:** Complex branching logic and user-guided decision trees.

### Enforcement components
*   **Input Sandwiching:** XML isolation for untrusted user input.
*   **Meta-Structure:** Strict section ordering (Overview -> Input -> Process -> Output).
*   **Cognitive Manifest:** Runtime selection of required reasoning models (CoT, CoD).

## Documentation

### Core Guides
*   [Framework Specification](docs/FRAMEWORK.md) - Architecture and patterns
*   [Tooling Guide](docs/TOOLS-GUIDE.md) - CLI and automation
*   [Optimization Techniques](docs/OPTIMIZATION-AND-TOOLS.md) - Performance tuning

### Distribution & Sharing
*   **[Skill Distribution Guide](docs/SKILL-DISTRIBUTION-GUIDE.md)** - Complete guide to sharing skills (project/team/enterprise)
*   **[Distribution Quick Reference](docs/DISTRIBUTION-QUICK-REF.md)** - Fast lookup for distribution commands
*   [Contribution Guidelines](docs/CONTRIBUTING.md) - How to contribute

## License

MIT License
