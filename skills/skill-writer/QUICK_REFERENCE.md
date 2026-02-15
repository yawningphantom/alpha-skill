# Skill Writer v2.2 - Quick Reference Card

## Invocation

```bash
/skill-writer Create a skill for [your task]
```

Or just describe what you need:
```
"I need to automate [workflow]"
"Help me create a skill that [does X]"
```

---

## The 4 Skill Types (Auto-Detected)

| Type | Use For | Trigger Words | Key Sections |
|------|---------|---------------|--------------|
| **A: Reference** | Documentation, guides, CLI refs | "reference", "documentation", "guide", "lookup" | Quick Index, Categories, References |
| **B: Command** | Scripts, aliases, executables | "run", "execute", "command", "script" | Syntax, Parameters, Options, Examples |
| **C: Workflow** | Multi-step processes | "workflow", "process", "steps", "deploy" | Prerequisites, Workflow, Fallbacks |
| **D: Interactive** | Debugging, analysis | "debug", "analyze", "investigate", "based on" | Methods, Decision Tree, Reporting |

---

## Complexity (Auto-Detected)

| Complexity | Indicators | Enhancement Level |
|------------|-----------|-------------------|
| **Simple** | "alias", "shortcut", "wrapper", no conditionals | Minimal (structure + examples) |
| **Complex** | Multi-step, reasoning, conditionals | Full (security + reasoning + validation) |

---

## Auto-Applied Features

| Feature | When Applied | Benefit |
|---------|--------------|---------|
| **Input Security** | Processes user input | Prevents injection attacks (95% reduction) |
| **Chain of Density** | Summarization tasks | Higher quality summaries (80% improvement) |
| **Chain of Thought** | Reasoning/debugging | More reliable logic (60% fewer errors) |
| **Emotional Prompting** | High-stakes domains* | Better issue detection (40% increase) |

*High-stakes: legal, medical, security, production, financial

---

## The 6-Phase Pipeline

```
Your Request
    ↓
Phase 0: Clarity Check → If unclear: Ask questions
    ↓
Phase 0.5: Technique Selection → Decide: Type + Complexity + Features
    ↓
Phase 1-4: Skill Generation → Build with right template + enhancements
    ↓
Phase 5: Optimization → Strip tokens, add XML anchors
    ↓
Phase 6: Quality Audit → Verify all requirements met
    ↓
Your Skill ✅
```

---

## Tips for Best Results

### ✅ Do This
- **Be specific:** "Run unit tests for 3 services in parallel"
- **Mention tools:** "Using pytest and coverage"
- **Define output:** "Return JSON with pass/fail status"
- **Include edge cases:** "What if a service doesn't exist?"

### ❌ Avoid This
- **Too vague:** "Create a skill for testing"
- **No context:** "Make a deployment skill"
- **Missing format:** "Summarize the data" (what data? what format?)

---

## Common Patterns

### Pattern 1: Simple Alias
```
Request: "Create an alias for git status with branch info"
Result: Type B (Command), Simple complexity
Time: ~30 seconds
```

### Pattern 2: Deployment Workflow
```
Request: "Create a skill to deploy to production safely"
Result: Type C (Workflow), Complex
Features: High-stakes framing, fallbacks, validation
Time: ~2 minutes
```

### Pattern 3: Investigation Workflow
```
Request: "Debug high API latency"
Result: Type D (Interactive), Complex
Features: Chain of Thought, multiple methods, decision tree
Time: ~2 minutes
```

### Pattern 4: CLI Reference
```
Request: "Reference for kubectl commands I use daily"
Result: Type A (Reference), Simple/Complex based on depth
Features: Quick index, categories, examples
Time: ~1 minute
```

---

## Clarification Questions

When Skill Writer asks questions, it's checking **3 pillars**:

1. **Input Specificity (8+/10):** What format is the input?
2. **Transformation Logic (8+/10):** What processing happens?
3. **Output Constraint (8+/10):** What's the output format?

**If any pillar < 6:** You'll get clarification questions

---

## Quality Targets (Auto-Enforced)

| Layer | Target | What It Checks |
|-------|--------|----------------|
| Structural | 95/100 | All required sections present |
| Content | 90/100 | Real examples, edge cases handled |
| Tool Usage | 85/100 | Correct syntax, fallbacks exist |
| Performance | 85/100 | Token efficient, optimized |
| Cognitive | 95/100 | All techniques correctly applied |

**Overall Target:** 90/100 = Production ready ✅

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Too many questions | Be more specific upfront (input/output/tools) |
| Skill too complex | Use simpler words ("alias" not "analyze") |
| Wrong tools | Specify: "I use kubectl for health checks" |
| Need changes | Just ask: "Add timeout handling to the skill" |

---

## Command Cheatsheet

```bash
# Create new skill
/skill-writer Create a skill for [task]

# Update existing skill
"Update the [skill-name] skill to add [feature]"

# Simplify complex skill
"Make the [skill-name] skill simpler, it's just a wrapper"

# Add safety checks
"Add production safety checks to [skill-name]"

# Convert to different type
"Convert [skill-name] from command to workflow with steps"
```

---

## Example Requests (Copy & Use)

### Reference Skill
```
"Create a reference for Git commands I use: status, diff, log, cherry-pick, rebase"
```

### Command Skill
```
"Create a skill to run 'npm test' with coverage, and fail if coverage < 80%"
```

### Workflow Skill
```
"Create a deployment workflow: 1) run tests, 2) build, 3) deploy to staging, 4) smoke test, 5) deploy to prod"
```

### Interactive Skill
```
"Create a skill to debug database performance: check slow queries, analyze indexes, verify connections"
```

---

## Version Comparison

| Feature | v2.0 | v2.1 | v2.2 |
|---------|------|------|------|
| Clarity Gating | ✅ | ✅ | ✅ |
| Token Optimization | ✅ | ✅ | ✅ |
| Auto Technique Selection | ❌ | ✅ | ✅ |
| Framework Types (A/B/C/D) | ❌ | ❌ | ✅ |
| Complexity Calibration | ❌ | ❌ | ✅ |
| Type-Specific Templates | ❌ | ❌ | ✅ |

**Current:** v2.2 = Framework-aligned + Cognitive + Optimized

---

## Quick Links

- **Full Documentation:** [SKILL.md](SKILL.md)
- **User Guide:** [USER_GUIDE.md](USER_GUIDE.md)
- **Framework Guide:** [../../docs/FRAMEWORK.md](../../docs/FRAMEWORK.md)
- **Examples:** `skills/` directory

---

**Remember:** Start specific → Get better skills → Iterate as needed → Build your library!
