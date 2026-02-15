---
name: create-pr
description: Creates GitHub pull requests with proper validation, branch checking, and structured description. Use when user wants to submit code changes for review. Handles git operations, PR creation, and validation.
type: workflow
optimization: reliability
mode: industrial
version: 2.0.0
---

# Create Pull Request

## Overview

Automates the creation of GitHub pull requests with validation, ensuring all prerequisites are met before submission.

## When to Use

Invoke this skill when:
- User wants to create a pull request
- User says "create PR", "submit changes", "open pull request"
- Code changes are ready for review

## Prerequisites

**Required:**
- Working directory must be a git repository
- Changes must be committed
- GitHub CLI (`gh`) must be installed and authenticated

**Optional:**
- `--base`: Base branch (default: main/master)
- `--title`: PR title (default: generated from commits)
- `--draft`: Create as draft PR
- `--allow-dirty`: Allow creating PR with uncommitted changes (default: false)

## Workflow

### Step 1: Validate Environment

**Purpose:** Ensure all prerequisites are met

**Execute:**
```bash
# Check if in git repo
git rev-parse --git-dir

# Check if gh CLI is available
gh --version

# Check authentication
gh auth status
```

**Interpret:**
- If not a git repo → ERROR: "Not in a git repository"
- If gh not installed → ERROR: "GitHub CLI not installed"
- If not authenticated → ERROR: "Run 'gh auth login' first"

### Step 2: Check Current State

**Purpose:** Understand current branch and changes

**Execute:**
```bash
# Get current branch
git branch --show-current

# Check for uncommitted changes
git status --porcelain

# Check if branch has commits
git log --oneline -n 5
```

**Interpret:**
- If uncommitted changes exist AND --allow-dirty NOT set → ERROR: "Uncommitted changes found. Commit them first or use --allow-dirty"
- If uncommitted changes exist AND --allow-dirty set → WARN: "Creating PR with uncommitted changes (not recommended)"
- If no commits → ERROR: "No commits to create PR from"
- If on main/master → ERROR: "Cannot create PR from main branch. Create a feature branch first."

### Step 3: Check for Existing PR

**Purpose:** Detect if PR already exists for current branch

**Execute:**
```bash
# Check if PR exists for current branch
gh pr list --head $(git branch --show-current) --json number,url,state
```

**Interpret:**
- If PR exists (open or closed) → Display: "⚠️  PR already exists: #120 (https://github.com/user/repo/pull/120). Push new commits to update it, or close and create new."
- If no PR → Continue to Step 4

### Step 4: Determine Base Branch

**Purpose:** Identify and validate target branch for PR

**Execute:**
```bash
# Check default branch
gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name'
```

**Use:** User-provided `--base` or detected default branch

**Validate Base Branch:**
```bash
# Verify base branch exists on remote
git ls-remote --heads origin {base_branch}
```

**Interpret:**
- If branch exists → Continue
- If branch does not exist → ERROR: "Base branch '{base_branch}' does not exist. Available branches: [list from git branch -r]"

### Step 5: Generate PR Title and Body

**Purpose:** Create descriptive PR information

**Logic:**
- If `--title` provided → Validate and use it
- Else → Generate from recent commits

**Title Validation:**
```bash
# If --title provided
if [ -n "$title" ]; then
  # Check if empty after stripping whitespace
  if [ -z "$(echo "$title" | tr -d '[:space:]')" ]; then
    WARN: "Empty title provided, generating from commits instead"
    title=$(generate_from_commits)
  fi

  # Check length (GitHub max: 256 chars)
  if [ ${#title} -gt 256 ]; then
    title="${title:0:253}..."
    WARN: "Title truncated to 256 characters"
  fi
fi
```

**Execute:**
```bash
# Get commit messages for title generation
git log --oneline origin/main..HEAD

# Generate diff stats for body
git diff --stat origin/main..HEAD
```

**Generate:**
```markdown
## Title
{Generated from commit messages or user input}

## Body Template
### Summary
{1-2 sentence summary of changes}

### Changes
- {Bullet point 1}
- {Bullet point 2}

### Test Plan
- [ ] Unit tests passing
- [ ] Manual testing completed

🤖 Generated with Claude Code
```

### Step 6: Push Branch to Remote

**Purpose:** Ensure branch exists on remote

**Check Upstream:**
```bash
# Check if upstream is set
git rev-parse --abbrev-ref @{u} 2>/dev/null
```

**Execute:**
```bash
# If no upstream, push with -u flag
current_branch=$(git branch --show-current)

if ! git rev-parse --abbrev-ref @{u} 2>/dev/null; then
  git push -u origin "$current_branch"
else
  git push
fi
```

**Error Handling:**
- If error contains "timeout|network|connection|failed to connect" → ERROR: "Network error during push: {error}. Check your internet connection and retry."
- If error contains "rejected|non-fast-forward" → ERROR: "Push rejected. Pull latest changes first: git pull origin {branch}"
- If error contains "permission denied|403|authentication" → ERROR: "Permission denied. Check your GitHub authentication: gh auth status"
- If other error → ERROR: "Failed to push branch: {error}"
- If success → Continue

### Step 7: Create Pull Request

**Purpose:** Submit PR to GitHub

**Execute:**
```bash
gh pr create \
  --title "{title}" \
  --body "{body}" \
  --base {base_branch}
```

**Error Handling:**
- If error contains "timeout|network|connection" → ERROR: "Network error during PR creation: {error}. Check connection and retry."
- If error contains "already exists" → INFO: "PR already exists (detected late). See Step 3 output for details."
- If error contains "base branch|invalid" → ERROR: "Invalid base branch (validation missed). Check branch exists."
- If success → Display PR URL and continue to Step 8

### Step 8: Confirm Creation

**Purpose:** Verify PR was created successfully

**Execute:**
```bash
# Get PR details
gh pr view --json number,url,title,state
```

**Output:**
```
✅ Pull Request Created Successfully!

PR #123: {title}
URL: {pr_url}
Status: Open
Base: {base_branch}

Next steps:
- Review the PR description and edit if needed
- Request reviewers
- Monitor CI checks
```

## Output Format

### Success Case

```markdown
✅ Pull Request Created!

**Details:**
- PR Number: #123
- Title: Add user authentication feature
- Base Branch: main
- URL: https://github.com/user/repo/pull/123

**Summary:**
3 files changed, 150 insertions(+), 20 deletions(-)
- Added authentication middleware
- Updated user model
- Added tests

**Next Steps:**
1. Add reviewers: `gh pr edit 123 --add-reviewer @teammate`
2. Monitor checks: `gh pr checks 123`
3. Merge when approved: `gh pr merge 123`
```

### Error Case

```markdown
❌ Failed to Create Pull Request

**Error:** Not in a git repository

**Resolution:**
Navigate to a git repository and try again.

**Common Issues:**
- Not in git repo → cd to project directory
- Not authenticated → Run `gh auth login`
- No commits → Make commits first
- On main branch → Create feature branch first
```

## Examples

### Example 1: Basic PR Creation

**Input:**
```bash
/create-pr
```

**Process:**
```
1. Detected branch: feature/user-auth
2. Base branch: main
3. Found 3 commits
4. Generated title: "Add user authentication"
5. Pushed to origin
6. Created PR #123
```

**Output:**
```
✅ PR #123 created: https://github.com/user/repo/pull/123
```

### Example 2: Custom Title and Base

**Input:**
```bash
/create-pr --title "Fix: Security vulnerability in auth" --base develop
```

**Process:**
```
1. Using provided title
2. Target base: develop
3. Created PR #124
```

### Example 3: Draft PR

**Input:**
```bash
/create-pr --draft
```

**Process:**
```
1. Creating as draft PR
2. PR #125 created in draft mode
```

## Error Handling

### Error 1: Not Authenticated

```
❌ GitHub CLI not authenticated

Run: gh auth login
Then retry: /create-pr
```

### Error 2: No Remote Branch

```
❌ Current branch has no upstream

Creating upstream: git push -u origin feature/new-feature
Retrying PR creation...
```

### Error 3: PR Already Exists

```
⚠️  PR already exists for this branch

Existing PR: #120
URL: https://github.com/user/repo/pull/120

To update: Push new commits and they'll appear automatically
```

## Anti-Patterns

### ❌ Don't: Create PR from Main

```bash
# Bad - on main branch
git checkout main
/create-pr  # ERROR
```

### ✅ Do: Create Feature Branch First

```bash
# Good - on feature branch
git checkout -b feature/my-feature
# ... make changes ...
git commit -m "Add feature"
/create-pr
```

---

### ❌ Don't: Create PR with Uncommitted Changes

```bash
# Bad - changes not committed
/create-pr  # WARN: uncommitted changes
```

### ✅ Do: Commit Changes First

```bash
# Good
git add .
git commit -m "Complete feature"
/create-pr
```

## Related Skills

- **git-commit** - Commit changes before creating PR
- **code-review-checklist** - Review changes before PR
- **ci-status** - Check CI status after PR creation

## Version History

- **v2.0.0** (2026-02-14): Adversarial hardening - Added existing PR detection, base branch validation, upstream handling, network error handling, empty title validation, title length limits, and explicit uncommitted changes handling
- **v1.0.0** (2026-02-14): Initial implementation

---

**Tool:** GitHub CLI (`gh`)
**Mode:** Industrial (High Reliability)
**Optimization:** Reliability (PR creation must be correct)
