# Alpha Skill

> **Engineering-grade framework for AI automation agents.**

> **Version:** 0.0.1 | **Build:** Framework Integration + Cognitive Enforcement

**Alpha Skill** is a structured framework for defining, generating, and validating executable skills. It treats natural language prompts as software artifacts, enforcing strict architectural patterns for security, determinism, and reliability.

### ⚡ Quick Start

```bash
# Install via npm (auto-installs to Claude Code, Cursor, and OpenCode)
npm install alpha-skill

# Or clone and use directly
git clone https://github.com/yawningphantom/alpha-skill.git && cd alpha-skill
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

### Automatic (Recommended)

```bash
npm install alpha-skill
```

This automatically installs all skills to:
- **Claude Code:** `~/.claude/skills/`
- **Cursor:** `~/.cursor/rules/`
- **OpenCode:** `~/.opencode/commands/`

### Manual

```bash
git clone https://github.com/yawningphantom/alpha-skill.git
cd alpha-skill

# Claude Code
cp -r skills/skill-* ~/.claude/skills/

# Cursor
mkdir -p ~/.cursor/rules
cp skills/skill-*/SKILL.md ~/.cursor/rules/

# OpenCode
mkdir -p ~/.opencode/commands
cp skills/skill-*/SKILL.md ~/.opencode/commands/
```

---

### 🚀 Claude Code

```bash
claude
/alpha-skill Create a skill for code reviews
```

### 💻 Cursor Editor

```bash
# Reference in Cursor:
@alpha-skill create a skill for API testing
```

### 🖥️ OpenCode

```bash
# Use as a custom command:
/alpha-skill "Create a skill for code reviews"
```

---

## Quick Start

```bash
# Generate your first production-ready skill (automatic RL loop)
/alpha-skill "Create a skill that reviews pull requests for security issues"
# → Generates v1 → Tests → Refines → Tests → Production-ready ✅
```

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
*   [Contribution Guidelines](docs/CONTRIBUTING.md) - How to contribute

## License

MIT License
