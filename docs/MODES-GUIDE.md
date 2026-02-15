# Skill Modes: The Three-Mode System

**Quick Reference for Mode Selection in Skill Creation**

---

## What Are Modes?

Modes are **optimization presets** that automatically tune the 4-dimensional mixing console based on the **cost of failure**. Instead of manually adjusting Reliability, Precision, Learning, and Style sliders, you select a mode, and the framework optimizes accordingly.

Think of modes as the difference between:
- **Industrial Mode**: Building a bridge (failure = catastrophe)
- **Muse Mode**: Writing poetry (failure = try again)
- **Socratic Mode**: Teaching math (failure = learning opportunity)

---

## The Three-Mode System

### Mode A: Industrial (High Strictness)

**Goal:** Zero hallucinations. Perfect syntax. Deterministic output.

**When to Use:**
- If the AI makes a mistake, **something breaks**
- Output feeds directly into production systems
- Compliance, legal, or financial consequences
- No room for interpretation or creativity

**Examples:**
- Code generation for production
- Legal contract review
- Financial calculations
- Data extraction and transformation
- Security audits

**Optimization Preset:**

| Dimension | Setting | Rationale |
|-----------|---------|-----------|
| Reliability | 90% | Output must be consistent and correct |
| Precision | 80% | Terminology must be unambiguous |
| Learning | 20% | User doesn't need explanation, just results |
| Style | 10% | Voice doesn't matter, correctness does |

**Technical Tuning:**
- **Constraint Density:** Very High (80% of prompt is "Do NOT" rules)
- **Output Format:** Strict JSON/XML schemas, no conversational fluff
- **Thinking Style:** Convergent (narrow down to single correct answer)
- **Examples:** Emphasize negative cases (what NOT to do)
- **Validation:** Multiple checkpoints, fail-fast on errors

**Characteristic Prompt Elements:**

```markdown
# CRITICAL CONSTRAINTS (Industrial Mode)
Execute EXACTLY as specified. ZERO tolerance for variation.

## Output Format (STRICT)
Return JSON matching this schema EXACTLY:
```json
{schema}
```

## Validation (MECHANICAL)
Before returning, verify ALL checkpoints:
- [ ] Schema match: 100%
- [ ] All required fields present
- [ ] All types correct (no string where number expected)
- [ ] All values within acceptable ranges

If ANY check fails:
DO NOT attempt to fix. Return error with specific failure point.

## Forbidden Actions
- Do NOT add conversational text
- Do NOT use placeholders or "TODO"
- Do NOT estimate or approximate
- Do NOT return partial data
- Do NOT add fields not in schema
```

---

### Mode B: Muse (High Creativity)

**Goal:** Novelty. Unexpected connections. Rich, evocative language.

**When to Use:**
- If the AI makes a mistake, **you just try again**
- Brainstorming and ideation
- Creative writing and storytelling
- Exploratory design
- You want to be surprised

**Examples:**
- Blog post writing
- Marketing copy
- Product naming
- Design concepts
- Analogies and metaphors
- Thought experiments

**Optimization Preset:**

| Dimension | Setting | Rationale |
|-----------|---------|-----------|
| Reliability | 30% | Variation is good, not bad |
| Precision | 40% | Some ambiguity sparks creativity |
| Learning | 30% | Process matters less than output |
| Style | 90% | Voice and personality are essential |

**Technical Tuning:**
- **Constraint Density:** Low (Focus on "Do" inspiration, not "Do NOT" restrictions)
- **Output Format:** Free-form prose, markdown, rich formatting
- **Thinking Style:** Divergent (expand possibilities, explore tangents)
- **Examples:** Emphasize variety and unexpected approaches
- **Validation:** Minimal - focus on coherence, not correctness

**Characteristic Prompt Elements:**

```markdown
# CREATIVE FREEDOM (Muse Mode)
Your goal is to surprise with unexpected connections.

## Character Profile
[Strong persona with motivation and backstory]

## Voice Constraints
- Metaphor sources: [evocative domains]
- Rhythm: Vary sentence length dramatically
- Vocabulary: Reach for unexpected but precise words
- Forbidden: Generic business speak, clichés

## Exploration Prompts
Consider:
- What if [constraint] didn't exist?
- What's the opposite of the obvious approach?
- What would [famous person/character] do?

## Output Format
Free-form. Let the structure emerge from the content.
Use markdown to create visual rhythm:
- Short punchy lines for impact
- Longer flowing paragraphs for depth
- **Bold** for key insights
- > Blockquotes for provocative questions
```

---

### Mode C: Socratic (Educational/Balanced)

**Goal:** User growth. Critical thinking. Guide discovery.

**When to Use:**
- If the AI makes a mistake, **the user learns something**
- Teaching and tutoring
- Pair programming
- Decision support
- Building user capability, not just solving problem

**Examples:**
- Debugging assistant
- Code review trainer
- Architecture decision facilitator
- Learning companion
- Exploratory data analysis guide

**Optimization Preset:**

| Dimension | Setting | Rationale |
|-----------|---------|-----------|
| Reliability | 50% | Balance correctness with discovery |
| Precision | 60% | Clear enough to guide, not so rigid it stifles |
| Learning | 90% | Primary goal is user understanding |
| Style | 40% | Encouraging tone matters, not personality |

**Technical Tuning:**
- **Constraint Density:** Moderate (Focus on process, not just output)
- **Output Format:** Conversational, questions, hints, progressive disclosure
- **Thinking Style:** Recursive (question → attempt → feedback loop)
- **Examples:** Emphasize reasoning process, not just answers
- **Validation:** Check user understanding, not just technical correctness

**Characteristic Prompt Elements:**

```markdown
# SCAFFOLDING APPROACH (Socratic Mode)

## Pedagogical Stages

### Stage 1: Elicit User Thinking
Before providing any solution, ask:
"What do you think is causing [problem]?"
"What have you tried so far?"
"What's your hypothesis about why [X] happens?"

DO NOT:
- Jump to solution
- Provide hints prematurely
- Lead the user to answer

### Stage 2: Progressive Hints (If Stuck)
If user attempts diagnosis but is stuck, provide graduated hints:

**Hint Level 1:** Point to general area
"The issue is in the [component/layer/subsystem]."

**Hint Level 2:** Point to specific location
"Look at [specific file/function/line]."

**Hint Level 3:** Describe the pattern
"This usually happens when [scenario]. Do you see that pattern here?"

### Stage 3: Solution (Last Resort)
Only if user:
- Explicitly says "I give up"
- OR has tried 3 times after Hint Level 3
- OR explicitly requests direct answer

Then provide:
[Complete solution]

BECAUSE: [Reasoning explaining why this works]

PATTERN: [General principle to recognize]

NEXT TIME: [How to spot this earlier]

## Tone
- Encouraging but not patronizing
- Patient but not permissive
- Challenging but not discouraging
- Celebrate attempts, not just success
```

---

## The Triage Question

When skill-writer starts, ask this calibration question:

```
Before I create your skill, I need to calibrate. Which of these matters MOST?

A. Precision
   "If the AI makes a mistake, something breaks."
   (Triggers: Industrial Mode)
   Examples: Production code, financial calculations, compliance

B. Inspiration
   "I want the AI to surprise me with novel ideas."
   (Triggers: Muse Mode)
   Examples: Creative writing, brainstorming, marketing

C. Understanding
   "I want the AI to help me think through this myself."
   (Triggers: Socratic Mode)
   Examples: Learning, debugging, decision support
```

---

## Mode Comparison Matrix

| Aspect | Industrial | Muse | Socratic |
|--------|-----------|------|----------|
| **Primary Goal** | Correctness | Novelty | Understanding |
| **Failure Cost** | High | Low | Learning Opportunity |
| **Output Style** | Structured | Free-form | Conversational |
| **Constraint Density** | 80% "Don't" | 20% "Don't" | 50% "Don't" |
| **Validation** | Strict gates | Coherence check | Understanding check |
| **Examples Focus** | Error cases | Variety | Reasoning process |
| **User Autonomy** | Low (trust system) | Medium (guide) | High (discover) |
| **Iteration** | Fail-fast | Iterate freely | Guided refinement |

---

## Mode Selection Decision Tree

```
What's the cost of failure?

├─ High (something breaks) → Industrial Mode
│   ├─ Does it affect money? → Industrial + Max Precision
│   ├─ Does it affect security? → Industrial + Max Reliability
│   └─ Does it affect compliance? → Industrial + Max Precision + Max Reliability
│
├─ Low (just try again) → Muse Mode
│   ├─ Is brand voice critical? → Muse + Max Style
│   ├─ Need multiple variations? → Muse + Divergent thinking
│   └─ Breaking creative blocks? → Muse + Character profiles
│
└─ Learning opportunity → Socratic Mode
    ├─ Teaching fundamentals? → Socratic + Bloom's Taxonomy
    ├─ Building expertise? → Socratic + Progressive disclosure
    └─ Facilitating discovery? → Socratic + Question loops
```

---

## How Modes Map to Optimization Dimensions

Modes are **presets** for the 4-dimensional mixing console:

### Industrial Mode Settings
```
Reliability  ███████████████████░ 90%
Precision    ████████████████░░░░ 80%
Learning     ████░░░░░░░░░░░░░░░░ 20%
Style        ██░░░░░░░░░░░░░░░░░░ 10%
```

**Translation:**
- Reliability 90% → Strict validation gates, fail-fast
- Precision 80% → Rigorous definitions, no ambiguity
- Learning 20% → Minimal explanation, focus on output
- Style 10% → No voice/personality, pure function

---

### Muse Mode Settings
```
Reliability  ██████░░░░░░░░░░░░░░ 30%
Precision    ████████░░░░░░░░░░░░ 40%
Learning     ██████░░░░░░░░░░░░░░ 30%
Style        ██████████████████░░ 90%
```

**Translation:**
- Reliability 30% → Embrace variation as feature
- Precision 40% → Allow productive ambiguity
- Learning 30% → Process visible but not primary
- Style 90% → Strong persona, voice, subtext

---

### Socratic Mode Settings
```
Reliability  ██████████░░░░░░░░░░ 50%
Precision    ████████████░░░░░░░░ 60%
Learning     ██████████████████░░ 90%
Style        ████████░░░░░░░░░░░░ 40%
```

**Translation:**
- Reliability 50% → Balance correctness with discovery
- Precision 60% → Clear guidance without rigidity
- Learning 90% → Maximize user understanding
- Style 40% → Encouraging tone, not personality

---

## Using Modes with Skill-Writer

### Method 1: Explicit Mode Selection

```bash
/skill-writer --mode industrial "Create a skill for security auditing"
/skill-writer --mode muse "Create a skill for writing technical blog posts"
/skill-writer --mode socratic "Create a skill for teaching debugging"
```

### Method 2: Triage-Based (Recommended)

```bash
/skill-writer "Create a skill for mortgage calculations"

# skill-writer asks:
> What matters most: Precision, Inspiration, or Understanding?

User: "Precision - if it's wrong, people lose money"

# skill-writer selects: Industrial Mode
> ✓ Selected: Industrial Mode (High Strictness)
> Optimizing for: Reliability 90%, Precision 80%
> Generating skill with strict validation gates...
```

### Method 3: Hybrid (Advanced)

```bash
/skill-writer --mode industrial --tune "Style +20%" "Create API docs with personality"

# Adjusts Industrial preset:
# Reliability 90%, Precision 80%, Learning 20%, Style 30% (was 10%)
```

---

## Mode Anti-Patterns

### ❌ Don't: Use Muse Mode for Production Code

```bash
# Bad
/skill-writer --mode muse "Generate authentication logic"
# Result: Creative but potentially insecure code
```

### ✅ Do: Use Industrial Mode

```bash
# Good
/skill-writer --mode industrial "Generate authentication logic"
# Result: Strict, validated, security-focused code
```

---

### ❌ Don't: Use Industrial Mode for Brainstorming

```bash
# Bad
/skill-writer --mode industrial "Generate product name ideas"
# Result: Generic, risk-averse names lacking creativity
```

### ✅ Do: Use Muse Mode

```bash
# Good
/skill-writer --mode muse "Generate product name ideas"
# Result: Unexpected, evocative names with personality
```

---

### ❌ Don't: Use Socratic Mode When User Needs Quick Answer

```bash
# Bad (user is time-pressed)
/skill-writer --mode socratic "Fix this critical production bug"
# Result: Asks teaching questions while system is down
```

### ✅ Do: Use Industrial Mode + Documentation

```bash
# Good
/skill-writer --mode industrial "Fix production bug and document root cause"
# Result: Fast fix + explanatory documentation for learning later
```

---

## Mode Combinations (Advanced)

### Sequential Modes

Use different modes for different phases:

**Phase 1: Brainstorm (Muse Mode)**
```bash
/skill-writer --mode muse "Generate API design concepts"
```

**Phase 2: Validate (Socratic Mode)**
```bash
/skill-writer --mode socratic "Evaluate API design tradeoffs"
```

**Phase 3: Implement (Industrial Mode)**
```bash
/skill-writer --mode industrial "Generate production API code"
```

### Blended Modes

Create hybrid profiles for edge cases:

**Example: Technical Writing with Personality**
```yaml
mode: custom
  reliability: 70%  # Content must be accurate
  precision: 80%    # Terminology must be clear
  learning: 60%     # Reader should understand
  style: 60%        # Voice matters, but not primary
```

This is effectively **Industrial 70% + Socratic 30%**.

---

## Mode Implementation in Skill-Writer

The skill-writer prompts with mode selection:

```markdown
## Stage 0: Mode Calibration (NEW)

**Purpose:** Select optimization preset based on cost of failure

**Triage Question:**
"Before I create your skill, which of these matters MOST?

A. **Precision**: If the AI makes a mistake, something breaks
B. **Inspiration**: I want the AI to surprise me with novel ideas
C. **Understanding**: I want the AI to help me think through this

(Type A, B, or C)"

**Mode Selection:**
- A → Industrial Mode (Reliability 90%, Precision 80%, Learning 20%, Style 10%)
- B → Muse Mode (Reliability 30%, Precision 40%, Learning 30%, Style 90%)
- C → Socratic Mode (Reliability 50%, Precision 60%, Learning 90%, Style 40%)

**Confirmation:**
"✓ Selected: [Mode Name]
  Optimizing for: [Primary dimensions]
  Use case examples: [relevant examples]

  Proceed? (y/n) or 'tune' to adjust sliders manually"
```

---

## Summary

### Quick Reference

| If you need... | Use Mode | Key Setting |
|----------------|----------|-------------|
| Production code | Industrial | Reliability 90% |
| Creative writing | Muse | Style 90% |
| Learning tool | Socratic | Learning 90% |
| API documentation | Industrial + Style 30% | Precision 80%, Style 30% |
| Decision support | Socratic | Learning 90% |
| Marketing copy | Muse | Style 90% |

### The Three Questions

1. **What's the cost of failure?**
   - High → Industrial
   - Low → Muse
   - Learning opportunity → Socratic

2. **What matters most?**
   - Correctness → Industrial
   - Novelty → Muse
   - Understanding → Socratic

3. **Who's the audience?**
   - System/API → Industrial
   - Human (creative) → Muse
   - Human (learning) → Socratic

---

**Next Steps:**
- Use modes in [skill-writer](../skills/skill-writer/SKILL.md)
- See [OPTIMIZATION-AND-TOOLS.md](OPTIMIZATION-AND-TOOLS.md) for dimension details
- Review [FRAMEWORK.md](FRAMEWORK.md) for foundational concepts

---

*Modes simplify optimization by turning a 4-dimensional tuning problem into a 3-choice question.*
