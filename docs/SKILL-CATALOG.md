# Skills Catalog

A comprehensive index of all available skills organized by category and type.

**Last Updated:** 2026-02-14

---

## Quick Stats

- **Total Skills:** 3
- **Meta Skills:** 3 (skill-writer, skill-evaluator, skill-adversary)
- **Reference Skills:** 0
- **Command Skills:** 0
- **Workflow Skills:** 0
- **Interactive Skills:** 0

---

## How to Use This Catalog

### Finding Skills
- Browse by **category** for domain-specific skills
- Browse by **type** for structural patterns
- Browse by **optimization** for outcome-focused skills
- Use browser search (Ctrl/Cmd+F) to find keywords

### Invoking Skills
```bash
/skill-name [arguments]
```

### Creating Skills
Use the `/skill-writer` meta-skill to automatically generate optimized skills:
```bash
/skill-writer "Create a skill for [your workflow]"
```

### Understanding Modes & Optimization

Skills use a **3-mode system** that automatically optimizes based on cost of failure:

#### The Three Modes
- **Industrial Mode** (High Strictness): If AI fails, something breaks → Reliability 90%
- **Muse Mode** (High Creativity): If AI fails, just try again → Style 90%
- **Socratic Mode** (Educational): If AI fails, user learns → Learning 90%

Modes are **presets** for the 4 optimization dimensions:
- **Reliability**: Error-proofing, 100% consistency
- **Precision**: Ambiguity reduction
- **Learning**: User growth, understanding
- **Style**: Voice and nuance

See [MODES-GUIDE.md](MODES-GUIDE.md) for mode selection and [OPTIMIZATION-AND-TOOLS.md](OPTIMIZATION-AND-TOOLS.md) for dimension details.

### Tool Integration
Skills can leverage tools for:
- **Calculator**: Deterministic math/logic
- **Library**: External/real-time data
- **Keyboard**: State-changing actions
- **Sandbox**: Output verification

See [TOOLS-GUIDE.md](TOOLS-GUIDE.md) for patterns.

### Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new skills.

---

## Skills by Category

### 🧠 Meta Skills
*Skills that create or optimize other skills*

- **skill-writer** - Transforms vague requirements into production-ready skills using 4-stage compiler pipeline with multi-dimensional optimization
- **skill-evaluator** - Assesses skill quality using 5-layer analysis (Structure, Content, Mode Alignment, Tools, Anti-Lazy) with 0-100 scoring
- **skill-adversary** - Generates adversarial test cases to expose skill weaknesses, maintains regression test suites, and enables empirical validation in the RL loop

### 🚀 Development Workflows
*Skills for common development tasks and workflows*

**Coming Soon:**
- project-setup
- code-review-checklist
- debug-workflow

### 📊 Performance & Optimization
*Skills for analyzing and optimizing performance*

**Coming Soon:**
- performance-analysis

### 🛠 Tools & Utilities
*General-purpose tools and utilities*

**Coming Soon:**
- More skills to be added

### 📚 Reference & Documentation
*Quick reference guides and documentation*

**Coming Soon:**
- More skills to be added

### 🔄 CI/CD & Deployment
*Continuous integration and deployment workflows*

**Coming Soon:**
- deploy-pipeline

### 🐛 Debugging & Troubleshooting
*Skills for identifying and fixing issues*

**Coming Soon:**
- debug-workflow

### 📝 Documentation & Communication
*Skills for creating and managing documentation*

**Coming Soon:**
- meeting-notes-to-tasks

---

## Skills by Type

### Type A: Reference Skills (Knowledge-Based)
*Provide lookup information, documentation, and quick references*

| Skill | Category | Description | Status |
|-------|----------|-------------|--------|
| *No skills yet* | - | - | - |

**Planned:**
- code-review-checklist - PR review guidelines and best practices

### Type B: Command Skills (Execute-Based)
*Execute specific commands or scripts with clear parameters*

| Skill | Category | Description | Status |
|-------|----------|-------------|--------|
| *No skills yet* | - | - | - |

**Planned:**
- project-setup - Initialize new projects with templates and configurations

### Type C: Workflow Skills (Sequential Multi-Step)
*Guide through complex multi-step processes with decision points*

| Skill | Category | Description | Status |
|-------|----------|-------------|--------|
| *No skills yet* | - | - | - |

**Planned:**
- debug-workflow - Step-by-step debugging procedures
- deploy-pipeline - Multi-stage deployment automation

### Type D: Interactive Skills (Conditional Logic)
*Handle branching logic and conditional execution based on inputs*

| Skill | Category | Description | Status |
|-------|----------|-------------|--------|
| skill-writer | Meta Skills | Creates production-ready skills using 4-stage compiler pipeline (Interrogation → Architecture → Tools → Generation) | ✅ Active |
| skill-evaluator | Meta Skills | Assesses skill quality using 5-layer analysis (Structure, Content, Mode, Tools, Anti-Lazy) with 0-100 scoring system | ✅ Active |
| skill-adversary | Meta Skills | Generates adversarial test cases, maintains regression suites, enables empirical validation through attack simulation (injection, boundary, ambiguity, etc.) | ✅ Active |

**Planned:**
- performance-analysis - Analyze metrics and identify bottlenecks

---

## Skill Status Definitions

- **✅ Active** - Fully functional and tested
- **🚧 Beta** - Functional but may have rough edges
- **📝 Planned** - Designed but not yet implemented
- **🔄 Deprecated** - Being replaced or discontinued
- **⚠️ Experimental** - Early stage, use with caution

---

## Recently Added

### Version 0.0.1 - 2026-02-15
- 🎉 Initial Alpha Release.

---

## Popular Skills

*This section will be updated based on usage metrics*

Once skills are added, we'll track:
1. Most frequently used
2. Highest time savings
3. Best user ratings

---

## Skill Relationships

### Skill Chains
*Skills that are commonly used together in sequence*

**Coming Soon:**
- Workflows will be documented here

### Skill Dependencies
*Skills that require or complement each other*

**Coming Soon:**
- Dependencies will be mapped here

---

## Contributing New Skills

We're actively looking for contributions in these areas:

### High Priority
- [ ] project-setup - Automate project initialization
- [ ] debug-workflow - Systematic debugging procedures
- [ ] code-review-checklist - PR review best practices

### Medium Priority
- [ ] performance-analysis - Performance troubleshooting
- [ ] deploy-pipeline - Deployment automation
- [ ] refactoring-guide - Code refactoring patterns

### Low Priority (Nice to Have)
- [ ] meeting-notes-to-tasks - Convert notes to action items
- [ ] documentation-generator - Auto-generate docs from code
- [ ] test-coverage-analyzer - Analyze test coverage gaps

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.

---

## Feedback

### Rate Skills
Help us improve by rating skills you use:
- Open an issue with skill name and rating (1-5 stars)
- Suggest improvements or additional examples

### Request Skills
Need a skill that doesn't exist?
- Open an issue with the "skill-request" label
- Describe the workflow you want to automate
- We'll prioritize based on community interest

### Report Issues
Found a bug or error in a skill?
- Open an issue with:
  - Skill name and version
  - What went wrong
  - How to reproduce

---

## Changelog

### Upcoming

#### v1.1.0 (Planned)
- First set of starter skills
- Automated validation workflows

#### v1.0.0 (2026-02-14)
- Initial repository setup
- Framework documentation
- Skill templates
- Contribution guidelines

---

## Resources

### Core Framework
- [Framework Documentation](FRAMEWORK.md) - 5-pillar foundation
- [Contributing Guidelines](CONTRIBUTING.md) - How to add skills
- [Skill Templates](../templates/) - Templates for each skill type

### Advanced Techniques
- [Modes Guide](MODES-GUIDE.md) - 3-mode system (Industrial/Muse/Socratic)
- [Optimization & Tools](OPTIMIZATION-AND-TOOLS.md) - Multi-dimensional optimization
- [Tools Guide](TOOLS-GUIDE.md) - Tool design patterns
- [Evaluation Framework](EVALUATION-FRAMEWORK.md) - Quality assessment methodology
- [Reinforcement Loop](REINFORCEMENT-LOOP.md) - 4-agent automatic quality improvement system
- [RL Loop Quick Start](RL-LOOP-QUICKSTART.md) - Quick guide for --auto-refine
- [skill-writer Skill](../skills/skill-writer/SKILL.md) - Meta-skill for creating skills
- [skill-evaluator Skill](../skills/skill-evaluator/SKILL.md) - Meta-skill for evaluating skills
- [skill-adversary Skill](../skills/skill-adversary/SKILL.md) - Meta-skill for adversarial testing

### Repository
- [GitHub Repository](https://github.com/yawningphantom/skills)

---

*This catalog is automatically maintained. Last generated: 2026-02-14*
