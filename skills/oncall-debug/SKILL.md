---
name: oncall-debug
description: Interactive oncall debugging workflow for investigating production issues. Guides through systematic root cause analysis using logs, metrics, and service health checks. Use when investigating incidents, alerts, or user-reported issues.
type: interactive
optimization: reliability
mode: industrial
version: 2.0.0
---

# Oncall Debug

## Overview

A systematic debugging workflow for oncall engineers investigating production issues. Provides structured investigation paths based on issue symptoms, with fallback strategies and escalation procedures.

## When to Use

Invoke this skill when:
- Production alerts fire
- User reports issues or errors
- Investigating performance degradation
- Responding to incidents
- User says "debug issue", "investigate alert", "oncall triage"

## Prerequisites

**Required:**
- Issue description or alert details
- Service name
- Approximate time of issue

**Optional:**
- Error messages or stack traces
- Affected user IDs or request IDs
- Severity level (P0/P1/P2/P3)

### Input Validation

**BEFORE starting investigation, validate:**

1. **Service Name:**
   - If missing, attempt to extract from error messages/stack traces
   - If still unavailable, request from user
   - Verify service exists in your environment

2. **Environment Verification:**
   - Explicitly confirm which environment you are investigating (prod/staging/dev)
   - Match environment with issue context (don't investigate prod issue in staging)
   - For production operations, require explicit confirmation

3. **Issue Description:**
   - If vague ("something is broken"), request specific symptoms:
     - What behavior is observed?
     - What is the expected behavior?
     - When did it start?
   - Extract useful context from whatever information is available

**Safety Check:**
```
⚠️ BEFORE ANY PRODUCTION OPERATION:
1. Confirm current environment: "Confirmed investigating [ENVIRONMENT]"
2. Verify service name spelling and existence
3. For destructive operations (restart, rollback), require explicit user approval
```

## CRITICAL GUIDANCE

⚠️ **Safety First:**
- NEVER run destructive commands in production without confirmation
- ALWAYS verify you're looking at the correct environment
- Document your investigation steps for incident reports
- Communicate status updates to stakeholders

⚠️ **Common Mistakes:**
- Jumping to conclusions without gathering evidence
- Ignoring related services or dependencies
- Not checking recent deployments
- Forgetting to check multiple availability zones

## Tool Availability Notice

**IMPORTANT:** All command examples in this skill are **illustrative** and assume common monitoring tools. Your environment may have different tools available.

**Adapting Commands:**
- Replace example commands with your environment's equivalent
- Common tool categories:
  - Log viewing: `logs`, `kubectl logs`, `tail`, custom log aggregation
  - Metrics: `metrics`, Grafana, Datadog, custom dashboards
  - Service status: `service-status`, `systemctl`, `kubectl get pods`
  - Deployments: `deployment-history`, CI/CD platform, git history

- If a suggested tool doesn't exist: Use available alternatives that provide similar data
- If no equivalent exists: Skip that step or gather information manually

**Example Adaptation:**
```
# Skill suggests:
service-status {service_name}

# Your environment might use:
kubectl get pods -l app={service_name}
# OR
systemctl status {service_name}
# OR
curl https://{service_name}/health
```

## Debugging Methods

### Method 1: Symptom-Based Triage

**When to use:** Initial investigation, unclear root cause

**Steps:**

#### Step 1: Gather Context

**Purpose:** Understand the scope and severity of the issue

**Execute:**
```bash
# Example (verify tool availability):
# Get service status
service-status {service_name}

# Check recent deployments
deployment-history {service_name} --last 24h

# Get current metrics
metrics {service_name} --time-range 1h
```

**Interpret:**
- Recent deployment within last hour → Likely deployment issue (go to Method 2)
- Metrics show spike at specific time → Check what changed at that time
- Multiple services affected → Check shared dependencies (database, cache, network)

**If no results returned:**
- Verify service name spelling
- Check if service exists in current environment
- Verify time range (issue might be outside window)
- Check if monitoring/logging pipeline is healthy
- Try alternative data sources

#### Step 2: Classify the Symptom

**Purpose:** Determine investigation path

**Symptom Classification:**

| Symptom | Path | Next Step |
|---------|------|-----------|
| High error rate | Error Analysis | Step 3A |
| Slow response time | Performance Analysis | Step 3B |
| Service down/unreachable | Availability Check | Step 3C |
| Data inconsistency | Data Validation | Step 3D |
| Doesn't fit above | Custom Investigation | Step 3E |

#### Step 2.5: Validate Signal Consistency

**Purpose:** Detect contradictory signals before proceeding

**Check for Contradictions:**
- Alert says "service down" but metrics show healthy
- Users report errors but logs show no errors
- High latency reported but metrics show fast response times

**If contradictions detected:**
```
1. List contradictory signals explicitly
2. Investigate monitoring system health:
   - Are metrics delayed or stale?
   - Is log pipeline working?
   - Are alerts misconfigured?
3. Prioritize user-reported symptoms over automated signals
4. Verify time ranges match across all data sources
5. Check if looking at correct environment/region
```

**Proceed when:**
- Signals are consistent, OR
- Contradictions explained (e.g., delayed metrics), OR
- Decided which signal to trust with justification

#### Step 3A: Error Analysis Path

**Purpose:** Investigate error patterns and causes

**Execute:**
```bash
# Example (verify tool availability):
# Get error logs
logs {service_name} --level ERROR --time-range 30m --limit 100

# Group errors by type
error-summary {service_name} --time-range 1h
```

**Interpret:**
- Consistent error message → Known error, check runbooks
- New error pattern → Dig deeper with stack traces
- Third-party API errors → Check external service status
- Database errors → Check database health and queries

**If no error logs found:**
- Errors might be logged at different level (WARN, INFO)
- Check if logs are being written at all
- Verify log retention window
- Errors might be surfacing only in metrics, not logs
- Issue might be intermittent (expand time range)

**Thresholds:**
- Error rate > 5% → P1 incident
- Error rate > 1% → Investigate immediately
- Error rate < 1% but 4x+ baseline → Monitor trend, investigate if sustained

#### Step 3B: Performance Analysis Path

**Purpose:** Identify performance bottlenecks

**Execute:**
```bash
# Get latency percentiles
latency {service_name} --percentiles 50,95,99 --time-range 1h

# Check resource utilization
resource-usage {service_name} --metrics cpu,memory,disk

# Identify slow endpoints
slow-endpoints {service_name} --threshold 1000ms --time-range 30m
```

**Interpret:**
- p99 latency spike → Check slow endpoints
- CPU/Memory spike → Resource exhaustion or memory leak
- Disk I/O spike → Database or file system issue
- Network latency → Check downstream dependencies

**Thresholds:**
- p95 > 2x baseline → P1 incident
- p99 > 5x baseline → P0 incident

#### Step 3C: Availability Check Path

**Purpose:** Determine if service is reachable and healthy

**Execute:**
```bash
# Check health endpoints
health-check {service_name}

# Check load balancer status
lb-status {service_name}

# Check instance health
instance-health {service_name}
```

**Interpret:**
- All instances down → Infrastructure issue, check cloud provider status
- Some instances down → Rolling deployment issue or bad host
- Health checks failing → Application startup or dependency issue
- Load balancer misconfigured → Check recent config changes

#### Step 3D: Data Validation Path

**Purpose:** Investigate data inconsistencies or corruption

**Execute:**
```bash
# Check data integrity
data-validation {service_name} --dataset {dataset_name}

# Check recent data changes
data-audit {service_name} --time-range 1h

# Compare with expected data
data-diff {service_name} --baseline {baseline_snapshot}
```

**Interpret:**
- Schema mismatch → Check recent migrations
- Missing data → Check data pipeline
- Duplicate data → Check deduplication logic
- Corrupted data → Check write operations

#### Step 3E: Custom Investigation Path

**When to use:** Symptom doesn't fit standard classifications

**Examples of non-standard symptoms:**
- Intermittent issues affecting specific user cohorts
- Rate limiting or throttling issues
- Multi-region inconsistencies
- Cascading failures across services
- Resource exhaustion in specific components

**Approach:**
1. **Document the unique symptom clearly**
2. **Gather baseline evidence:**
   - Logs (cast wide net, don't filter by level)
   - Metrics (all available, not just standard ones)
   - Recent changes (deployments, config, traffic patterns)
3. **Form hypothesis based on symptom characteristics:**
   - Intermittent → Timing/race conditions, load-dependent
   - User-specific → Data/permissions/routing issues
   - Region-specific → Infrastructure/network issues
4. **Test hypothesis with targeted investigation**
5. **If hypothesis fails, revise and repeat**
6. **After 3 failed hypotheses or 30 minutes → Escalate**

### Method 2: Deployment-Related Issues

**When to use:** Recent deployment detected OR rollback needed

**Steps:**

#### Step 1: Identify Deployment

**Execute:**
```bash
# Get latest deployment
deployment-info {service_name} --latest

# Get deployment diff
deployment-diff {service_name} --previous --current
```

#### Step 2: Rollback Decision

**Decision Tree:**
```
Is the issue correlated with deployment?
├─ YES → Proceed with rollback
│   ├─ Rollback command available? → Execute rollback
│   └─ Manual rollback needed? → Follow rollback runbook
└─ NO → Return to Method 1
```

**Execute Rollback:**
```bash
# Rollback to previous version
rollback {service_name} --to {previous_version}

# Monitor rollback progress
rollback-status {service_name} --watch
```

**Verify:**
```bash
# Check metrics after rollback
metrics {service_name} --compare before,after

# Verify error rate decreased
error-rate {service_name} --time-range 10m
```

### Method 3: Dependency Analysis

**When to use:** Issue spans multiple services OR external dependencies suspected

**Steps:**

#### Step 1: Map Dependencies

**Execute:**
```bash
# Get service dependency graph
dependency-graph {service_name}

# Check dependency health
dependency-health {service_name}
```

#### Step 2: Check Shared Resources

**Execute:**
```bash
# Check database health
database-health {database_name}

# Check cache health
cache-health {cache_name}

# Check message queue health
queue-health {queue_name}
```

**Interpret:**
- Database slow → Check slow queries, connection pool
- Cache down → Check cache cluster status
- Queue backlog → Check consumer health and processing rate

## Investigation Stuck Protocol

**Detect when investigation is stuck:**
- Spent > 30 minutes without identifying root cause
- Exhausted all standard debugging paths
- Multiple hypotheses tested, all failed
- Contradictory evidence cannot be resolved
- Missing critical access or tools

**When stuck, DON'T:**
- ❌ Keep repeating the same investigation steps
- ❌ Make random changes hoping something works
- ❌ Jump to conclusions without evidence

**When stuck, DO:**

### Step 1: Document Evidence Collected

Create structured summary:
```markdown
## Evidence Gathered
- [ ] Logs reviewed (time range: X)
- [ ] Metrics analyzed (which ones: Y)
- [ ] Recent deployments checked (result: Z)
- [ ] Dependencies checked (result: A)
- [ ] Health checks verified (result: B)

## Hypotheses Tested
1. {Hypothesis 1}: {Result}
2. {Hypothesis 2}: {Result}

## Contradictions/Unknowns
- {Unresolved question 1}
- {Unresolved question 2}
```

### Step 2: Identify What You DON'T Know

- What data is missing?
- What tools/access do you lack?
- What expertise is needed?

### Step 3: Escalate with Context

Use evidence summary from Step 1 to brief next investigator. Include:
- Timeline of investigation
- What was checked and results
- Current hypotheses
- What is needed to proceed

## Escalation Criteria

Escalate to senior engineer or manager when:
- Issue severity is P0 (customer-impacting outage)
- Investigation exceeds 30 minutes with no progress
- Root cause requires code changes
- Issue affects multiple critical services
- Need additional access or permissions

## Output Format

### Investigation Summary

```markdown
## Incident Summary
**Service:** {service_name}
**Time:** {issue_time}
**Severity:** {P0/P1/P2/P3}
**Status:** {Investigating/Mitigated/Resolved}

## Timeline
- {timestamp}: Alert fired
- {timestamp}: Investigation started
- {timestamp}: Root cause identified
- {timestamp}: Mitigation applied

## Root Cause
{Description of root cause}

## Evidence
- {Evidence item 1}
- {Evidence item 2}

## Resolution
{What was done to resolve}

## Action Items
- [ ] {Follow-up task 1}
- [ ] {Follow-up task 2}
```

## Examples

### Example 1: High Error Rate Investigation

**Input:**
```
Service: user-auth-service
Issue: 500 errors spiking
Time: 2026-02-14 10:30 UTC
```

**Investigation:**
1. Check service status → All instances running
2. Check error logs → "Database connection timeout"
3. Check database health → Connection pool exhausted
4. Check recent changes → Traffic spike from marketing campaign
5. Root cause: Insufficient connection pool size

**Resolution:**
- Increased connection pool size
- Added auto-scaling rule for high traffic

### Example 2: Deployment Rollback

**Input:**
```
Service: payment-service
Issue: Payment failures after deployment
Time: 2026-02-14 14:00 UTC
Deployment: v2.3.4 deployed at 13:55 UTC
```

**Investigation:**
1. Confirm correlation with deployment
2. Check deployment diff → API contract change
3. Decision: Rollback to v2.3.3
4. Execute rollback
5. Verify error rate dropped

## Related Skills

- **create-pr** - Create PR with fix after identifying root cause
- **performance-analysis** - Deep dive into performance metrics
- **incident-report** - Generate incident report after resolution

## Version History

- **v2.0.0** (2026-02-14): Adversarial hardening - Added input validation with environment verification, tool availability disclaimer, signal consistency validation, custom investigation path, empty results handling, investigation stuck protocol, and explicit safety checks for production operations
- **v1.0.0** (2026-02-14): Initial implementation

---

**Tool:** Service monitoring and logging tools
**Mode:** Industrial (High Reliability for production debugging)
**Optimization:** Reliability (Debugging must be thorough and safe)
