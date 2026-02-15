# Alpha Skill

> **Engineering-grade framework for AI automation agents.**

> **Version:** 2.2.0
> **Build:** Framework Integration + Cognitive Enforcement

**Alpha Skill** is a structured framework for defining, generating, and validating executable skills. It treats natural language prompts as software artifacts, enforcing strict architectural patterns for security, determinism, and reliability.

## Core Tools

This repository provides two primary utilities for managing the skill lifecycle:

### 1. Skill Writer (`skill-writer`)
**Purpose:** Generates compliant skill definitions from natural language requirements.

**Features:**
*   **Static Analysis:** Selects the correct template (Command, Workflow, Reference, Interactive).
*   **Security Injection:** Automatically wraps user input in XML tags to prevent prompt injection.
*   **Reasoning Enforcement:** injects mandatory cognitive steps (e.g., Chain of Density) based on task type.

```bash
/skill-writer "Create a skill that audits AWS security groups for open ports"
```

### 2. Skill Evaluator (`skill-evaluator`)
**Purpose:** Validates skill quality against the specification.

**Features:**
*   **7-Point Inspection:** Checks structure, content, mode, tools, anti-patterns, performance, and cognitive compliance.
*   **Deterministic Scoring:** Returns a 0-100 score based on objective criteria.
*   **Linting:** Identifies missing sections or weak constraints.

```bash
/skill-evaluator skills/my-skill/SKILL.md
```

## Quick Start

### Generate a Skill
To create a new skill, use the writer. It will handle the boilerplate and architectural decisions.

```bash
/skill-writer "Create a skill that helps me review pull requests"
```

### Validate a Skill
Ensure your skill adheres to the framework standards before committing.

```bash
/skill-evaluator skills/my-skill/SKILL.md
```

### Loop Mode (Writer + Evaluator)
Run the generation and evaluation in a closed loop until the skill passes all checks.

```bash
/skill-writer "Create legal contract analyzer" --auto-refine
```

## Architecture

### Directory Structure
```
skills/
├── .claude-plugin/     # Plugin configuration
├── skills/             # Source code for skills
│   └── skill-name/
│       ├── SKILL.md    # Entry point
│       └── resources/  # Python scripts/JSON templates
├── templates/          # Standardized architectural patterns
└── docs/               # Technical specifications
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

*   [Framework Specification](docs/FRAMEWORK.md)
*   [Tooling Guide](docs/TOOLS-GUIDE.md)
*   [Optimization Techniques](docs/OPTIMIZATION-AND-TOOLS.md)
*   [Contribution Guidelines](docs/CONTRIBUTING.md)

## License

MIT License
