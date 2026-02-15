# Tools Design Guide

**Quick Reference for Tool Integration in Skills**

---

## What Are Tools?

Tools extend your skills with **deterministic capabilities** that LLMs cannot perform reliably:
- Precise calculations
- External data access
- State-changing actions
- Output verification

Think of tools as giving the AI "hands" to manipulate the real world.

---

## The Decision Tree: Do I Need a Tool?

```
┌─ Start: Analyzing task requirement ─┐
│                                      │
├─ Is mathematical precision required? ─┼─ YES → Calculator Tool
│                                      │
├─ Is data external/private/realtime? ─┼─ YES → Library Tool
│                                      │
├─ Does this change system state? ─────┼─ YES → Keyboard Tool
│                                      │
├─ Must output be verified first? ─────┼─ YES → Sandbox Tool
│                                      │
└─ NO to all → LLM reasoning sufficient
```

---

## The 4 Tool Patterns

### Pattern 1: Calculator Tools (Deterministic Logic)

**When:** Math, logic, algorithms that must be 100% correct

**Examples:**
- Financial calculations
- Date/time arithmetic
- Statistical tests
- Cryptographic operations
- Data transformations

**Template:**

```python
def calculate_X(
    param1: float,
    param2: int,
    options: dict | None = None
) -> dict:
    """
    One-line description of what this calculates.

    This is a deterministic tool - same inputs produce same outputs.
    Use when: [Specific trigger conditions]

    Args:
        param1: [Description with constraints]
        param2: [Description with range]
        options: Optional configuration

    Returns:
        {
            "result": float,
            "intermediate_values": {...},  # For transparency
            "formula_used": str             # For verification
        }

    Errors:
        Returns {"error": code, "message": details} on failure
    """
    # Input validation
    if param2 <= 0:
        return {
            "error": "INVALID_PARAM",
            "message": "param2 must be positive",
            "param": "param2",
            "value": param2
        }

    # Calculation
    result = param1 * param2  # Simplified example

    # Return structured result
    return {
        "result": result,
        "intermediate_values": {"step1": param1, "step2": param2},
        "formula_used": "param1 * param2"
    }
```

---

### Pattern 2: Library Tools (External Knowledge)

**When:** Data that changes, is private, or post-training

**Examples:**
- Database queries
- API calls
- File system searches
- Real-time data (weather, stocks)

**Template:**

```python
def fetch_X(
    query: str,
    filters: dict | None = None,
    limit: int = 10
) -> dict:
    """
    Retrieves [data type] from [source].

    Use when: User needs [specific information type]
    Do NOT use: For [out of scope cases]

    Args:
        query: Search term or ID
        filters: Optional filtering criteria
        limit: Maximum results (default: 10, max: 100)

    Returns:
        {
            "results": [...],
            "count": int,
            "query_time_ms": int,
            "source": str,
            "cached": bool
        }

    Errors:
        {
            "error": "NO_RESULTS",
            "message": "No matching records found",
            "suggestion": "Try broader search terms"
        }
    """
    try:
        # Query external source
        results = external_source.query(query, **filters)

        return {
            "results": results[:limit],
            "count": len(results),
            "query_time_ms": 42,
            "source": "internal_database",
            "cached": False
        }

    except ConnectionError:
        return {
            "error": "CONNECTION_FAILED",
            "message": "Could not reach data source",
            "suggestion": "Check network connection",
            "retry_after_seconds": 30
        }
```

---

### Pattern 3: Keyboard Tools (Side Effects)

**When:** Actions that change the world (files, emails, APIs)

**Examples:**
- File operations
- Email sending
- Calendar events
- Deployments
- Database mutations

**Template:**

```python
def action_X(
    target: str,
    data: dict,
    dry_run: bool = False,
    create_backup: bool = True
) -> dict:
    """
    Performs [action] on [target].

    ⚠️ WARNING: This tool has side effects. It will [specific changes].

    Safety features:
    - dry_run mode for testing
    - Automatic backups (if create_backup=True)
    - Rollback instructions included

    Use when: User explicitly requests [action]
    Require confirmation: If [high-risk condition]

    Args:
        target: Path/ID of item to modify
        data: Changes to apply
        dry_run: If True, simulate but don't execute
        create_backup: If True, create backup before change

    Returns:
        {
            "success": bool,
            "action_taken": str,
            "backup_location": str | None,
            "rollback_command": str,
            "timestamp": str
        }

    Errors:
        {
            "error": "PERMISSION_DENIED",
            "message": "Insufficient permissions for [action]",
            "required_permission": "write:target",
            "current_permissions": [...]
        }
    """
    if dry_run:
        return {
            "success": True,
            "action_taken": "DRY_RUN: Would have [action description]",
            "dry_run": True
        }

    # Create backup
    backup_path = None
    if create_backup:
        backup_path = create_backup_of(target)

    # Perform action
    try:
        result = perform_action(target, data)

        return {
            "success": True,
            "action_taken": f"[Action] completed on {target}",
            "backup_location": backup_path,
            "rollback_command": f"restore_from_backup('{backup_path}')",
            "timestamp": get_timestamp()
        }

    except Exception as e:
        # Restore from backup if action failed
        if backup_path:
            restore_from_backup(backup_path)

        return {
            "success": False,
            "error": "ACTION_FAILED",
            "message": str(e),
            "backup_restored": True,
            "backup_location": backup_path
        }
```

---

### Pattern 4: Sandbox Tools (Verification)

**When:** Output must be validated before showing to user

**Examples:**
- Code execution
- Query validation
- Format checking
- Linting

**Template:**

```python
def execute_X(
    code: str,
    language: str,
    timeout_seconds: int = 5,
    allowed_imports: list[str] | None = None
) -> dict:
    """
    Executes [code type] in sandboxed environment.

    Safety features:
    - Timeout enforcement
    - Import whitelist
    - Resource limits (memory, CPU)
    - No network access
    - No file system access

    Use when: Generated code needs verification before showing to user

    Args:
        code: Code to execute
        language: Programming language
        timeout_seconds: Max execution time (max: 10)
        allowed_imports: Whitelist of importable modules

    Returns:
        {
            "success": bool,
            "stdout": str,
            "stderr": str,
            "execution_time_ms": int,
            "resource_usage": {...}
        }

    Errors:
        {
            "error": "TIMEOUT_EXCEEDED",
            "message": "Execution exceeded 5 second limit",
            "partial_output": str,
            "suggestion": "Optimize algorithm or increase timeout"
        }
    """
    import subprocess
    import resource

    # Set resource limits
    def limit_resources():
        # Max 100MB memory
        resource.setrlimit(resource.RLIMIT_AS, (100 * 1024 * 1024, -1))

    try:
        result = subprocess.run(
            ["python", "-c", code],
            capture_output=True,
            timeout=timeout_seconds,
            preexec_fn=limit_resources
        )

        return {
            "success": result.returncode == 0,
            "stdout": result.stdout.decode(),
            "stderr": result.stderr.decode(),
            "execution_time_ms": 42,  # Measure actual time
            "exit_code": result.returncode
        }

    except subprocess.TimeoutExpired:
        return {
            "error": "TIMEOUT_EXCEEDED",
            "message": f"Execution exceeded {timeout_seconds}s limit",
            "suggestion": "Optimize algorithm or check for infinite loops"
        }
```

---

## Tool Specification Format

When designing a tool, document it using this YAML specification:

```yaml
tool:
  name: tool_name
  category: [calculator|library|keyboard|sandbox]

  description: |
    One-line summary.

    Detailed explanation of what this tool does.

    Use when:
    - [Specific trigger condition 1]
    - [Specific trigger condition 2]

    Do NOT use when:
    - [Anti-pattern or out-of-scope case]

  parameters:
    - name: param_1
      type: string
      required: true
      description: What this parameter does
      validation:
        pattern: "^[a-z0-9-]+$"
        max_length: 100
      example: "my-value"

    - name: param_2
      type: integer
      required: false
      default: 10
      description: Controls [aspect]
      validation:
        minimum: 1
        maximum: 100

  returns:
    success_schema:
      type: object
      properties:
        result: [description]
        metadata: [description]

    error_schema:
      type: object
      properties:
        error: string  # Error code
        message: string  # Human-readable
        suggestion: string  # Recovery action

  errors:
    - code: ERROR_CODE_1
      message: What went wrong
      recovery: How to fix
      http_analogy: "Like HTTP 404"

  examples:
    - description: Basic usage
      input:
        param_1: "value"
      output:
        result: "expected_output"

    - description: Error case
      input:
        param_1: "invalid"
      output:
        error: "VALIDATION_FAILED"

  implementation:
    language: python
    dependencies: [library1, library2]
    estimated_time: "< 100ms"
    external_services: [api_name]

  safety:
    side_effects: [list any state changes]
    requires_confirmation: boolean
    reversible: boolean
    rollback_procedure: [description if reversible]
```

---

## Adding Tools to Skills

### In YAML Frontmatter

```yaml
---
name: skill-name
description: [description]
tools:
  - tool_name_1
  - tool_name_2
optimization: [dimension]
---
```

### In Skill Body

```markdown
## Tool Definitions

### Tool 1: calculate_mortgage

**Category:** Calculator (Deterministic Logic)

**Purpose:** Calculate monthly mortgage payments with precision

**Criteria Met:** Calculator Rule (must be 100% mathematically accurate)

**Specification:**
```yaml
[Full tool spec from above]
```

**Usage in Skill:**
When user provides home price, interest rate, and term:
1. Call `calculate_mortgage(principal={price}, rate={rate}, years={term})`
2. Extract `monthly_payment` from result
3. Present to user with breakdown
```

---

## Tool Quality Checklist

Before deploying a tool:

### Functionality
- [ ] **Atomic**: Does exactly one thing
- [ ] **Deterministic**: Same input → same output (for Calculator tools)
- [ ] **Validated**: Input validation prevents bad calls
- [ ] **Tested**: Unit tests for happy path and errors

### Documentation
- [ ] **Descriptive**: Clear trigger conditions in description
- [ ] **Exemplified**: Includes realistic usage examples
- [ ] **Error-documented**: All error codes explained

### Safety
- [ ] **Error-handling**: Returns structured errors, not exceptions
- [ ] **Timeout-protected**: Won't hang indefinitely
- [ ] **Resource-limited**: Can't consume excessive memory/CPU
- [ ] **Reversible**: Provides rollback if state-changing

### Performance
- [ ] **Responsive**: < 1s for interactive use
- [ ] **Logged**: Execution tracked for debugging
- [ ] **Monitored**: Failure rate measurable

---

## Common Tool Patterns

### Pattern: Pagination

For tools returning large result sets:

```python
def list_items(
    page: int = 1,
    page_size: int = 10,
    cursor: str | None = None
) -> dict:
    return {
        "items": [...],
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total_pages": 10,
            "total_items": 100,
            "next_cursor": "abc123",
            "has_more": True
        }
    }
```

### Pattern: Dry Run

For destructive operations:

```python
def delete_items(
    items: list[str],
    dry_run: bool = True  # Safe default
) -> dict:
    if dry_run:
        return {
            "dry_run": True,
            "would_delete": items,
            "warning": "Set dry_run=False to actually delete"
        }
    # Actual deletion logic
```

### Pattern: Batch Operations

For efficiency:

```python
def process_batch(
    items: list[str],
    operation: str,
    fail_fast: bool = False
) -> dict:
    results = []
    errors = []

    for item in items:
        try:
            result = perform_operation(item, operation)
            results.append({"item": item, "success": True, "result": result})
        except Exception as e:
            errors.append({"item": item, "error": str(e)})
            if fail_fast:
                break

    return {
        "succeeded": len(results),
        "failed": len(errors),
        "results": results,
        "errors": errors
    }
```

---

## Tool Testing Strategy

### Unit Tests

Test each tool independently:

```python
def test_calculate_mortgage():
    # Test happy path
    result = calculate_mortgage(principal=100000, rate=5.0, years=30)
    assert result["success"]
    assert 500 < result["monthly_payment"] < 600

    # Test validation
    result = calculate_mortgage(principal=-100, rate=5.0, years=30)
    assert result["error"] == "INVALID_PRINCIPAL"

    # Test edge cases
    result = calculate_mortgage(principal=0, rate=0, years=30)
    assert result["monthly_payment"] == 0
```

### Integration Tests

Test tools within skill context:

```python
def test_skill_with_tools():
    skill = load_skill("mortgage-advisor")

    # Simulate user interaction
    response = skill.execute(
        user_input="I want to buy a $300k house with 20% down"
    )

    # Verify tool was called
    assert "calculate_mortgage" in response.tools_used

    # Verify output format
    assert "monthly_payment" in response.output
```

---

## Tool Anti-Patterns

### ❌ Don't: Monolithic Tools

```python
# Bad: Does too much
def process_and_send_report(data, email):
    results = analyze(data)
    report = format_report(results)
    send_email(email, report)
```

### ✅ Do: Atomic Tools

```python
# Good: Composable
def analyze_data(data): ...
def format_report(results): ...
def send_email(recipient, content): ...
```

---

### ❌ Don't: Vague Descriptions

```python
def process_data(data):
    """Processes the data."""
```

### ✅ Do: Specific Triggers

```python
def calculate_lifetime_value(purchase_history):
    """
    Calculates customer lifetime value using RFM analysis.

    Use when:
    - User asks "What is this customer worth?"
    - Segmenting customers by profitability

    Do NOT use for:
    - Simple revenue summation (use sum_revenue)
    """
```

---

### ❌ Don't: Exceptions as Errors

```python
def get_user(id):
    user = database.query(id)  # Raises if not found
    return user
```

### ✅ Do: Structured Errors

```python
def get_user(id):
    try:
        user = database.query(id)
        return {"success": True, "user": user}
    except NotFound:
        return {
            "success": False,
            "error": "USER_NOT_FOUND",
            "message": f"User {id} does not exist",
            "suggestion": "Try list_users() to see available IDs"
        }
```

---

## Summary

### Quick Decision Guide

| Need | Tool Type | Key Feature |
|------|-----------|-------------|
| Math precision | Calculator | Deterministic |
| External data | Library | Real-time access |
| Change state | Keyboard | Side effects + rollback |
| Verify output | Sandbox | Safe execution |

### Quality Standards

Every tool must:
1. Do one thing (atomic)
2. Return structured results
3. Handle errors gracefully
4. Include clear triggers
5. Be tested and documented

---

**Next Steps:**
- Use [skill-writer](../skills/skill-writer/SKILL.md) to generate tools
- See [OPTIMIZATION-AND-TOOLS.md](OPTIMIZATION-AND-TOOLS.md) for integration strategy
- Review templates in [templates/](../templates/) for skill structure

---

*Tools make skills powerful. Use them strategically.*
