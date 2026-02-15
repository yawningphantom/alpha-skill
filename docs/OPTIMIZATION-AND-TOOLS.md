# Skill Optimization & Tool Integration Guide

**Extends:** [FRAMEWORK.md](FRAMEWORK.md)

This guide covers advanced concepts for creating production-grade skills: multi-dimensional optimization and strategic tool integration.

---

## Part 1: Multi-Dimensional Optimization

### The Core Insight

Skills are not one-dimensional. A skill optimized for reliability looks fundamentally different from one optimized for learning or style.

Think of optimization as a **mixing console with 4 sliders**:

```
Reliability  ████████░░ 80%  (Error-proofing, consistency)
Precision    ██████░░░░ 60%  (Ambiguity reduction)
Learning     ███░░░░░░░ 30%  (User growth)
Style        ████░░░░░░ 40%  (Voice, nuance)
```

You tune these based on the use case.

---

## The 4 Optimization Dimensions

### Dimension 1: Reliability (Industrial Engineering Model)

**Inspiration:** Poka-Yoke (mistake-proofing) & Six Sigma

**Goal:** Make it physically impossible to get wrong outputs

**Key Principle:** Don't just tell the AI "be careful" - design constraints that force correctness.

#### Techniques

##### 1. Template Injection (The Jig)
Force the LLM to fill specific slots instead of free-form generation:

```yaml
# Instead of: "Write a code review"
# Use this:

output_template:
  critical_bugs:
    - file: [exact file path]
      line: [line number]
      issue: [specific problem]
      severity: [CRITICAL|HIGH|MEDIUM|LOW]

  security_risks:
    - type: [XSS|SQLi|RCE|etc]
      location: [exact location]
      cve_reference: [CVE-YYYY-NNNNN if applicable]

  verdict: [PASS|FAIL]  # Binary, no waffling
```

##### 2. Validation Gates
Add mechanical checkpoints:

```markdown
# Validation (Execute Before Returning)
Check ALL of these:
- [ ] All fields in schema present? (no missing keys)
- [ ] All types correct? (no strings where numbers expected)
- [ ] All values within ranges? (e.g., confidence 0-100)
- [ ] No extra fields added? (strict schema adherence)

If ANY check fails: Return error object, NOT partial data
```

##### 3. Error-First Design
Structure outputs to fail visibly:

```json
{
  "success": false,  // Make success/failure explicit
  "error_code": "INVALID_INPUT_FORMAT",
  "error_message": "Expected JSON, received plain text",
  "line_number": 42,
  "recovery_suggestion": "Convert input to JSON using: jq '.'"
}
```

#### When to Maximize Reliability

- **High-stakes decisions:** Security audits, financial calculations, medical triage
- **Compliance tasks:** Where audit trails matter
- **Data transformations:** Where schema must be preserved
- **Production systems:** Zero tolerance for malformed outputs

#### Reliability Profile Template

```markdown
## RELIABILITY CONSTRAINTS

### Output Schema (STRICT)
```json
{schema}
```

### Validation (MECHANICAL)
Before output, verify:
- [ ] Schema match: 100%
- [ ] Required fields: All present
- [ ] Type safety: All types correct
- [ ] Range checks: All values valid

### Failure Protocol
If validation fails:
1. DO NOT attempt to fix automatically
2. Return error object with specific failure point
3. Suggest specific corrective action

### Determinism Requirement
Same input MUST produce same output.
```

---

### Dimension 2: Precision (Contract Law Model)

**Inspiration:** Legal definitions & force majeure clauses

**Goal:** Eliminate all ambiguity in terminology

**Key Principle:** Words like "better," "soon," "reasonable" are dangerous. Define everything.

#### Techniques

##### 1. The Dictionary Preamble
Define terms before using them:

```markdown
# DEFINITIONS
For the purpose of this skill, these terms have EXACT meanings:

- **"The Code"**: ONLY Python files in `/src`, excluding `/src/tests`
  - NOT: Configuration files, documentation, notebooks

- **"Refactor"**: Change internal structure WITHOUT changing external behavior
  - NOT: Adding features, fixing bugs, updating dependencies
  - INCLUDES: Renaming, extracting methods, consolidating duplicates

- **"Test Coverage"**: 100% path coverage (all branches executed)
  - NOT: Line coverage (which misses untaken branches)
  - MEASURED BY: pytest-cov with --cov-branch flag
```

##### 2. Scope Clauses
Explicitly state what's in and out of scope:

```markdown
# SCOPE

## IN SCOPE
- Files matching: `src/**/*.py`
- Functions with docstrings
- Public methods (not starting with `_`)

## OUT OF SCOPE
- Third-party libraries in `site-packages/`
- Generated code in `_build/`
- Deprecated modules (marked with warnings)

## BOUNDARY CASES
- Files with mixed Python/Cython: Include ONLY Python sections
- Test files named `test_*.py`: Include if in `/src`, exclude if in `/tests`
```

##### 3. Operating Clauses
Use legal language for complex constraints:

```markdown
# OPERATING CLAUSE

The Agent SHALL perform [action]
ON [scope]
SUBJECT TO the constraints that:
  1. [constraint 1]
  2. [constraint 2]

PROVIDED THAT:
  - [condition 1] is met
  - [condition 2] is verified

IN THE EVENT THAT [failure condition]:
  The Agent SHALL [fallback action]
  AND SHALL NOT [prohibited action]
```

#### When to Maximize Precision

- **Complex workflows:** Multi-step processes with handoffs
- **Multi-agent systems:** Where terminology drift causes failures
- **Domain-specific tasks:** Legal, medical, technical domains with overloaded terms
- **Ambiguous requirements:** When users use vague language

#### Precision Profile Template

```markdown
## PRECISION CONSTRAINTS

### Definitions Section
[Term 1]: [Exact definition]
  - Includes: [specific inclusions]
  - Excludes: [specific exclusions]
  - Format: [required format/pattern]
  - Example: [concrete example]

### Scope Boundaries
IN SCOPE: [explicit list]
OUT OF SCOPE: [explicit list]
BOUNDARY CASES: [edge cases with rulings]

### Operating Clauses
The Agent SHALL [primary obligation]
The Agent SHALL NOT [prohibited actions]
IF [condition] THEN [required action]

### Disambiguation Rules
When encountering [ambiguous term]:
1. First, check [source 1]
2. If unclear, apply [rule]
3. If still ambiguous, REQUEST CLARIFICATION (do not guess)
```

---

### Dimension 3: Learning (Pedagogy Model)

**Inspiration:** Bloom's Taxonomy & Scaffolding

**Goal:** Help the user understand, not just get answers

**Key Principle:** Withhold the solution initially. Guide discovery.

#### Techniques

##### 1. The Socratic Loop
Ask questions back before answering:

```markdown
# INTERACTION STAGES

## Stage 1: Diagnosis (User Must Think First)
Before providing solution, ask:
"What do you think is causing [the problem]?"

Wait for user response. Do NOT provide hints yet.

## Stage 2: Hinting (Progressive Disclosure)
If user is stuck after 1 attempt:
- Hint 1: [Point to general area]
  "The issue is in the [component] layer."

- Hint 2: [Point to specific location]
  "Look at line [X] in [file]."

- Hint 3: [Describe the pattern]
  "You're missing [concept]. This usually happens when [scenario]."

## Stage 3: Solution (Last Resort Only)
Only provide complete solution if:
- User explicitly types "I give up"
- OR 3 hints provided and still stuck

Then: Provide solution WITH explanation of reasoning
```

##### 2. Bloom's Taxonomy Levels
Structure learning from low to high order thinking:

```markdown
# PROGRESSION

## Level 1: Remember
"What is [definition]?" -> Test recall

## Level 2: Understand
"Explain why [code] produces [output]." -> Test comprehension

## Level 3: Apply
"Use [concept] to solve [problem]." -> Test application

## Level 4: Analyze
"Why did approach X fail while approach Y succeeded?" -> Test analysis

## Level 5: Evaluate
"Which solution is better for [context]?" -> Test judgment

## Level 6: Create
"Design a [system] that handles [requirements]." -> Test synthesis
```

##### 3. Scaffolding Removal
Reduce support over time:

```markdown
# ADAPTIVE SCAFFOLDING

Track user's success rate:
- First 3 attempts: Provide detailed hints
- Next 5 attempts: Reduce hint detail by 50%
- After 10 successful: Only provide hints when explicitly requested

Signal to user:
"You've successfully debugged 10 issues. I'll now wait for you to ask before hinting."
```

#### When to Maximize Learning

- **Educational tools:** Tutoring systems, coding bootcamps
- **Junior developer support:** Pair programming, code review training
- **Skill building:** When goal is capability transfer, not task completion
- **Internal tools:** When you want team to internalize best practices

#### Learning Profile Template

```markdown
## LEARNING CONSTRAINTS

### Pedagogy Mode: Socratic

#### Stage 1: Elicit Thinking
Question: [Diagnostic question]
Do NOT provide:
- Answers
- Hints
- Leading questions

#### Stage 2: Scaffold (If Needed)
Hint Progression:
1. [General area pointer]
2. [Specific location pointer]
3. [Pattern description]

Trigger: Provide hints only after user attempts diagnosis

#### Stage 3: Reveal (Last Resort)
Conditions:
- User types "[give up phrase]"
- OR [N] failed attempts
- OR user requests explicitly

Format:
[Solution]
BECAUSE: [Reasoning]
PATTERN: [General principle]
NEXT TIME: [How to recognize this pattern]

### Tone
- Encouraging but not patronizing
- Patient but not permissive
- Challenging but not discouraging
```

---

### Dimension 4: Style (Method Acting Model)

**Inspiration:** Stanislavski System & Subtext

**Goal:** Create a consistent, distinctive voice

**Key Principle:** Inject backstory and motivation, not just instructions

#### Techniques

##### 1. Character Profile Injection
Give the AI a persona:

```markdown
# CHARACTER PROFILE

Name: "The Grizzled Veteran"

Backstory:
You shipped your first web server in 1998 using Perl CGI scripts.
You've survived the XML wars, the NoSQL hype cycle, and three
JavaScript framework rewrites. You know every "revolutionary" idea
is just a repackaging of something from the 70s.

Values:
- Simplicity over cleverness
- Boring technology that works at 3 AM
- Skepticism of hype
- Deep respect for fundamentals

Pet Peeves:
- "Move fast and break things"
- Premature optimization
- Resume-driven development
- Ignoring error handling

Quirks:
- Refers to modern frameworks as "the new hotness"
- Uses database design as metaphor for everything
- Ends advice with "...but test it in prod to be sure" (sarcastically)
```

##### 2. Subtext Layering
Address deeper needs, not just surface questions:

```markdown
# SUBTEXT INTERPRETATION

When user asks: "Which framework should I use for my startup?"

Surface Question: Framework selection
Deeper Question: "Will this help me ship faster?"
Real Concern: "I'm afraid of picking wrong and wasting time"

Response Strategy:
1. Address the fear: "No framework choice will make or break your startup"
2. Then the logic: "Pick the one your team knows best"
3. Then the wisdom: "Your first architecture will be wrong anyway. Make it easy to change."
```

##### 3. Voice Constraints
Define stylistic boundaries:

```markdown
# VOICE RULES

## Sentence Structure
- Vary length: 1-2 short punchy sentences, then 1 longer flowing one
- Start paragraphs with impact: No "Well, actually..." or "So, basically..."
- Rhythm: Create cadence through parallel structure

## Vocabulary
- Technical but accessible
- Avoid: "simply", "just", "obviously", "clearly" (condescending)
- Prefer: Active verbs, concrete nouns, specific numbers

## Metaphors
- Draw from: Cooking, carpentry, gardening (physical crafts)
- Avoid: Sports, war, games (overused in tech)

## Forbidden Phrases
- "It depends" (without elaboration)
- "Best practices" (without context)
- "Industry standard" (appeal to authority)

## Signature Moves
- End with a question that deepens thinking
- Include one "hot take" per response
- Reference historical failures to build credibility
```

#### When to Maximize Style

- **Content marketing:** Brand voice matters
- **Creative writing:** Fiction, storytelling, scripts
- **Persuasive communication:** Sales, pitches, manifestos
- **Community building:** Where personality drives engagement

#### Style Profile Template

```markdown
## STYLE CONSTRAINTS

### Character
Name: [Persona name]
Backstory: [Origin story, 2-3 sentences]
Motivation: [What drives them]
Values: [What they care about]
Anti-values: [What they reject]

### Voice Mechanics
Sentence length: [pattern]
Vocabulary: [register and constraints]
Metaphor sources: [domains to draw from]
Forbidden phrases: [off-brand language]

### Subtext Mapping
When user says: [literal]
They mean: [deeper need]
Respond by: [strategy]

### Signature Patterns
- [Pattern 1]
- [Pattern 2]
- [Pattern 3]
```

---

## The Mixing Console: Choosing Your Settings

### Single-Dimension Optimization (Pure)

| Use Case | Setting | Example |
|----------|---------|---------|
| Security audit | Reliability: 100% | JSON schema validation, binary pass/fail |
| API documentation | Precision: 100% | Every parameter defined, no ambiguity |
| Coding tutor | Learning: 100% | Socratic questions, scaffolding |
| Brand copywriting | Style: 100% | Strong persona, voice constraints |

### Multi-Dimension Optimization (Hybrid)

| Use Case | Mix | Rationale |
|----------|-----|-----------|
| Technical docs | Precision: 70%, Learning: 30% | Clear definitions + progressive disclosure |
| Code review tool | Reliability: 60%, Learning: 40% | Structured output + educational feedback |
| Customer support | Precision: 40%, Style: 60% | Clear scope + empathetic tone |
| Data pipeline | Reliability: 80%, Precision: 20% | Strict schemas + defined terminology |

### Optimization Selection Matrix

```
Is correctness critical? (Zero tolerance for errors)
├─ YES → Reliability 80%+
│
└─ NO → Is terminology ambiguous?
    ├─ YES → Precision 60%+
    │
    └─ NO → Is learning the goal?
        ├─ YES → Learning 70%+
        │
        └─ NO → Style 60%+ (for voice/personality)
```

---

## Part 2: Strategic Tool Integration

### The Core Question

When does the AI need a "robot arm" (tool), and when does it just need to "think harder"?

---

## The 4 Tool Criteria

### Criterion 1: The Calculator Rule

**Test:** Must the answer be 100% mathematically/logically precise?

**Examples:**
- ✅ Tool: Mortgage payment calculator
- ✅ Tool: Date arithmetic (30 days from now)
- ✅ Tool: Statistical significance test
- ❌ No tool: Estimate project timeline (probabilistic)
- ❌ No tool: Judge code quality (subjective)

**Why LLMs Fail:**
LLMs are probabilistic. They "guess" at math based on patterns. For precise calculations, they will be approximately right ~90% of the time, which is unacceptable.

**Tool Design Pattern:**

```python
def calculate_mortgage_payment(
    principal: float,
    annual_rate: float,
    years: int
) -> dict:
    """
    Deterministic mortgage calculation.

    Returns:
        {
            "monthly_payment": float,
            "total_paid": float,
            "total_interest": float
        }
    """
    monthly_rate = annual_rate / 12 / 100
    num_payments = years * 12

    if monthly_rate == 0:
        payment = principal / num_payments
    else:
        payment = principal * (monthly_rate * (1 + monthly_rate)**num_payments) / \
                  ((1 + monthly_rate)**num_payments - 1)

    return {
        "monthly_payment": round(payment, 2),
        "total_paid": round(payment * num_payments, 2),
        "total_interest": round(payment * num_payments - principal, 2)
    }
```

---

### Criterion 2: The Library Rule

**Test:** Is the information private, changing, or post-training cutoff?

**Examples:**
- ✅ Tool: Query internal database for customer data
- ✅ Tool: Fetch current stock price via API
- ✅ Tool: Search company knowledge base
- ❌ No tool: Explain general programming concepts
- ❌ No tool: Summarize well-known historical events

**Why LLMs Fail:**
Training data is frozen at a point in time. LLMs cannot access:
- Real-time data (prices, weather, news)
- Private data (your database, internal docs)
- Post-training developments (new APIs, updated specs)

**Tool Design Pattern:**

```python
def query_customer_database(
    query_type: Literal["top_customer", "customer_by_id", "search"],
    **params
) -> dict:
    """
    Retrieves customer data from internal CRM.

    Args:
        query_type: Type of query to execute
        params: Query-specific parameters

    Returns:
        {
            "results": [...],
            "count": int,
            "query_timestamp": str
        }
    """
    # Connect to database
    # Execute parameterized query
    # Return structured results
    pass
```

---

### Criterion 3: The Keyboard Rule

**Test:** Does this task change the state of the world?

**Examples:**
- ✅ Tool: Write file to disk
- ✅ Tool: Send email
- ✅ Tool: Create calendar event
- ✅ Tool: Deploy to server
- ❌ No tool: Draft email (no side effect)
- ❌ No tool: Suggest file name (no action)

**Why LLMs Fail:**
LLMs are text-in, text-out. They have no "hands" to manipulate systems.

**Tool Design Pattern (With Safety):**

```python
def write_file(
    path: str,
    content: str,
    overwrite: bool = False,
    create_backup: bool = True
) -> dict:
    """
    Writes content to filesystem with safety checks.

    Safety features:
    - Validates path (no directory traversal)
    - Checks for overwrite conflicts
    - Creates backup if requested
    - Returns rollback instructions

    Returns:
        {
            "success": bool,
            "path": str,
            "backup_path": str | None,
            "rollback_command": str
        }
    """
    # Validate path
    # Check for existing file
    # Create backup if needed
    # Write file
    # Return status with rollback info
    pass
```

---

### Criterion 4: The Sandbox Rule

**Test:** Must the output be verified/executed before showing to user?

**Examples:**
- ✅ Tool: Execute Python code to verify it runs
- ✅ Tool: Validate JSON schema
- ✅ Tool: Test SQL query on sample data
- ❌ No tool: Generate Python code (user will test)
- ❌ No tool: Suggest SQL query (user will validate)

**Why LLMs Fail:**
LLMs can write syntactically correct code that fails at runtime due to:
- Logic errors
- API misunderstandings
- Type mismatches
- Edge cases

**Tool Design Pattern:**

```python
def execute_code_safely(
    code: str,
    language: str,
    timeout_seconds: int = 5,
    allowed_imports: list[str] | None = None
) -> dict:
    """
    Executes code in sandboxed environment.

    Safety features:
    - Timeout enforcement
    - Import whitelist
    - Resource limits (memory, CPU)
    - No network access

    Returns:
        {
            "success": bool,
            "stdout": str,
            "stderr": str,
            "execution_time_ms": int,
            "error_type": str | None
        }
    """
    # Create sandbox
    # Execute with limits
    # Capture output
    # Return structured result
    pass
```

---

## Tool Design Principles

### Principle 1: Atomic Tools

**Bad:** `get_weather_and_send_email`
**Good:** `get_weather` + `send_email`

**Rationale:** Small, composable tools are:
- Easier to test
- More reusable
- Simpler to debug
- Better for LLM reasoning

---

### Principle 2: Descriptive Triggers

**Bad:**
```python
def process_data(data):
    """Processes the data."""
```

**Good:**
```python
def calculate_customer_lifetime_value(
    purchase_history: list[dict],
    current_date: str
) -> float:
    """
    Calculates CLV using RFM analysis.

    Use this when:
    - User asks "What is [customer]'s value?"
    - User asks "Who are our most valuable customers?"
    - Segmenting customers by profitability

    Do NOT use for:
    - Total revenue calculations (use sum_revenue_by_period)
    - Cohort analysis (use cohort_analysis_tool)
    """
```

**Rationale:** LLMs need clear triggers for when to use which tool.

---

### Principle 3: Graceful Errors

**Bad:**
```python
def get_user(user_id):
    return database.query(f"SELECT * FROM users WHERE id = {user_id}")
    # Crashes on missing user
```

**Good:**
```python
def get_user(user_id: int) -> dict:
    """
    Retrieves user by ID.

    Returns:
        On success: {"success": True, "user": {...}}
        On failure: {"success": False, "error": "USER_NOT_FOUND", "message": "..."}
    """
    try:
        result = database.query_one("SELECT * FROM users WHERE id = %s", user_id)
        return {"success": True, "user": result}
    except NoResultFound:
        return {
            "success": False,
            "error": "USER_NOT_FOUND",
            "message": f"User {user_id} does not exist",
            "suggestion": "Try listing all users with list_users() first"
        }
```

**Rationale:** LLMs can't handle exceptions. Return structured errors they can reason about.

---

## Tool Integration Workflow

### Step 1: Identify Tool Candidates

Review skill requirements and mark potential tools:

```markdown
Skill: "Analyze codebase for technical debt"

Tasks:
1. Find all TODO comments → [KEYBOARD RULE: No tool, use grep]
2. Calculate cyclomatic complexity → [CALCULATOR RULE: Tool needed - deterministic]
3. Count lines of code → [CALCULATOR RULE: Tool needed - precise count]
4. Suggest refactoring priorities → [No tool - subjective judgment]
```

### Step 2: Define Tool Specifications

For each tool, use this template:

```yaml
tool:
  name: calculate_cyclomatic_complexity

  description: |
    Calculates McCabe cyclomatic complexity for Python functions.
    Use when: User asks about code complexity or maintainability.
    Do NOT use: For languages other than Python.

  parameters:
    - name: file_path
      type: string
      required: true
      description: Path to Python file
      validation: Must end with .py

    - name: function_name
      type: string
      required: false
      description: Specific function to analyze (default: all)

  returns:
    type: object
    schema:
      complexity_scores:
        type: array
        items:
          function: string
          complexity: integer
          rating: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

      average_complexity: float
      recommendations: array[string]

  errors:
    - code: FILE_NOT_FOUND
      message: Specified file does not exist
      recovery: Verify file path

    - code: PARSE_ERROR
      message: Could not parse Python file
      recovery: Check for syntax errors

  implementation:
    language: python
    library: radon
    estimated_time: "100ms per file"
```

### Step 3: Generate Tool Stubs

Create implementation scaffolding:

```python
from typing import Literal

def calculate_cyclomatic_complexity(
    file_path: str,
    function_name: str | None = None
) -> dict:
    """
    [Copy description from spec]
    """
    # TODO: Implement using radon library
    # TODO: Add validation
    # TODO: Add error handling
    # TODO: Add tests

    return {
        "success": False,
        "error": "NOT_IMPLEMENTED",
        "message": "Tool stub - needs implementation"
    }
```

### Step 4: Integrate Into Skill

Reference tools in skill instructions:

```markdown
## Process

### Step 1: Identify Complex Functions
Execute: `calculate_cyclomatic_complexity(file_path="{user_file}")`

Interpret results:
- If any function has complexity > 10 → Flag for refactoring
- If average > 7 → Systemic complexity issue
- If any function rated "CRITICAL" → Immediate action required

### Step 2: Generate Recommendations
Based on complexity scores, suggest:
- [High complexity] → Extract methods
- [Many conditionals] → Use polymorphism
- [Deep nesting] → Early returns
```

---

## Tool Testing Checklist

Before deploying a tool:

- [ ] **Atomic:** Does it do exactly one thing?
- [ ] **Deterministic:** Same input = same output?
- [ ] **Descriptive:** Clear usage conditions in description?
- [ ] **Error-Handling:** Returns structured errors, not exceptions?
- [ ] **Validated:** Input validation prevents bad calls?
- [ ] **Documented:** Includes examples of use?
- [ ] **Tested:** Unit tests for happy path and errors?
- [ ] **Timed:** Performance acceptable for interactive use?

---

## Summary: Decision Framework

### When Creating a Skill, Ask:

1. **What outputs must be precise?** → Create Calculator tools
2. **What data is external/changing?** → Create Library tools
3. **What actions change state?** → Create Keyboard tools
4. **What needs verification?** → Create Sandbox tools

### Then Choose Optimization:

1. **Must output be consistent?** → Optimize for Reliability
2. **Is terminology ambiguous?** → Optimize for Precision
3. **Should user learn?** → Optimize for Learning
4. **Does voice matter?** → Optimize for Style

### The Result:

A skill that is:
- ✅ Optimized for specific outcome
- ✅ Augmented with tools for precision
- ✅ Constrained against lazy behavior
- ✅ Structured for consistent results

---

**Next Steps:**
1. Read [FRAMEWORK.md](FRAMEWORK.md) for foundational concepts
2. Use [skill-writer](../skills/skill-writer/SKILL.md) skill to generate optimized skills
3. See templates in [templates/](../templates/) for structure

---

*This guide represents advanced techniques. Start with basics from FRAMEWORK.md, then return here for optimization.*
