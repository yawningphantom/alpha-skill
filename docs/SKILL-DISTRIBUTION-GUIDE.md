# Skill Distribution Guide

## Overview

This guide covers the best practices for shipping and distributing Claude Code skills based on official documentation and real-world patterns.

---

## Distribution Methods: Choose Your Approach

### Quick Comparison

| Method | Scope | Setup Effort | Update Mechanism | Best For |
|--------|-------|--------------|------------------|----------|
| **Project Skills** | Single project | Low | Git pull | Project-specific workflows |
| **Personal Skills** | All your projects | Low | Manual copy | Personal automation |
| **Plugin Marketplace** | Team/Community | Medium | Auto-update | Shared team tools |
| **Enterprise Managed** | Organization | High | Centralized push | Company-wide standards |

---

## Method 1: Project-Level Skills (Simplest)

### When to Use
- Skills are specific to one project
- Team members need consistent workflows
- You want version control and code review
- Quick iteration and testing

### Structure
```
your-project/
├── .claude/
│   └── skills/
│       ├── skill-one/
│       │   └── SKILL.md
│       └── skill-two/
│           ├── SKILL.md
│           └── references/
│               └── details.md
├── .gitignore          # Don't ignore .claude/skills/
└── README.md
```

### Distribution Steps

1. **Create the skill**
```bash
mkdir -p .claude/skills/deploy-prod
cat > .claude/skills/deploy-prod/SKILL.md << 'EOF'
---
name: deploy-prod
description: Deploy application to production with safety checks
disable-model-invocation: true
---

Deploy to production:
1. Run full test suite
2. Build production artifacts
3. Deploy to canary
4. Verify health checks
5. Deploy to all zones
EOF
```

2. **Commit to version control**
```bash
git add .claude/skills/
git commit -m "Add production deployment skill"
git push
```

3. **Team members get it automatically**
```bash
git pull  # Skills are now available
```

### Pros
- ✅ Zero additional setup
- ✅ Version controlled with code
- ✅ Code review for skill changes
- ✅ Works immediately after `git clone`
- ✅ Skills stay in sync with codebase

### Cons
- ❌ Only available in this project
- ❌ No centralized discovery
- ❌ Manual replication to other projects

### Best Practices
- Document skills in project README
- Use `.claude/settings.json` to configure skill defaults
- Add skill examples to onboarding docs
- Review skill changes in PRs like code

---

## Method 2: Personal Skills

### When to Use
- Skills you use across all projects
- Personal productivity automation
- Experimenting before sharing
- Custom workflows specific to you

### Structure
```
~/.claude/
└── skills/
    ├── quick-commit/
    │   └── SKILL.md
    ├── explain-code/
    │   └── SKILL.md
    └── perf-check/
        └── SKILL.md
```

### Distribution Steps

1. **Create personal skill**
```bash
mkdir -p ~/.claude/skills/quick-commit
cat > ~/.claude/skills/quick-commit/SKILL.md << 'EOF'
---
name: quick-commit
description: Create a descriptive commit message from staged changes
disable-model-invocation: true
---

Analyze staged git changes and create a conventional commit message.
Format: <type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
EOF
```

2. **Share via backup/dotfiles**
```bash
# Add to dotfiles repo
cp -r ~/.claude/skills ~/dotfiles/.claude/
git -C ~/dotfiles add .claude/skills
git -C ~/dotfiles commit -m "Add Claude Code skills"
git -C ~/dotfiles push
```

3. **Team members install manually**
```bash
# Clone dotfiles and symlink
git clone https://github.com/you/dotfiles
ln -s ~/dotfiles/.claude/skills ~/.claude/skills
```

### Pros
- ✅ Available in all your projects
- ✅ Fast iteration
- ✅ No namespace conflicts
- ✅ Simple naming (`/commit` not `/plugin:commit`)

### Cons
- ❌ Manual distribution
- ❌ No automatic updates for others
- ❌ Harder to discover by team
- ❌ Each person manages separately

### Best Practices
- Start here before creating plugins
- Use dotfiles repo for personal skills
- Document your personal skills
- Graduate popular skills to plugins

---

## Method 3: Plugin Marketplace (Recommended for Teams)

### When to Use
- Sharing with teams or community
- Need version control and updates
- Multiple skills that work together
- Want discoverability and installation

### Structure
```
my-plugins/
├── .claude-plugin/
│   ├── plugin.json           # Plugin metadata
│   └── marketplace.json      # Marketplace catalog
└── plugins/
    ├── code-review-plugin/
    │   ├── .claude-plugin/
    │   │   └── plugin.json
    │   └── skills/
    │       └── review/
    │           └── SKILL.md
    └── deploy-plugin/
        ├── .claude-plugin/
        │   └── plugin.json
        └── skills/
            ├── deploy-staging/
            │   └── SKILL.md
            └── deploy-prod/
                └── SKILL.md
```

### Distribution Steps

#### Step 1: Create Plugin Structure

```bash
# Create marketplace
mkdir -p my-plugins/.claude-plugin
mkdir -p my-plugins/plugins/code-review-plugin/.claude-plugin
mkdir -p my-plugins/plugins/code-review-plugin/skills/review
```

#### Step 2: Create Skill

```bash
cat > my-plugins/plugins/code-review-plugin/skills/review/SKILL.md << 'EOF'
---
description: Review code for bugs, security, and performance
disable-model-invocation: true
---

Review the selected code or recent changes for:
- Potential bugs or edge cases
- Security concerns (injection, auth, data exposure)
- Performance issues (N+1 queries, memory leaks)
- Readability improvements

Provide specific, actionable feedback with line numbers.
EOF
```

#### Step 3: Create Plugin Manifest

```bash
cat > my-plugins/plugins/code-review-plugin/.claude-plugin/plugin.json << 'EOF'
{
  "name": "code-review-plugin",
  "description": "Adds /review skill for quick code reviews",
  "version": "1.0.0",
  "author": {
    "name": "Your Team"
  },
  "homepage": "https://github.com/your-org/my-plugins",
  "license": "MIT"
}
EOF
```

#### Step 4: Create Marketplace Catalog

```bash
cat > my-plugins/.claude-plugin/marketplace.json << 'EOF'
{
  "name": "team-plugins",
  "owner": {
    "name": "Engineering Team",
    "email": "eng@company.com"
  },
  "plugins": [
    {
      "name": "code-review-plugin",
      "source": "./plugins/code-review-plugin",
      "description": "Adds /review skill for quick code reviews",
      "version": "1.0.0",
      "category": "productivity",
      "keywords": ["code-review", "qa", "security"]
    }
  ]
}
EOF
```

#### Step 5: Host on GitHub

```bash
cd my-plugins
git init
git add .
git commit -m "Initial marketplace with code-review plugin"
git remote add origin https://github.com/your-org/my-plugins
git push -u origin main
```

#### Step 6: Users Install

```bash
# Add marketplace
/plugin marketplace add your-org/my-plugins

# Install plugin
/plugin install code-review-plugin@team-plugins

# Use the skill
/team-plugins:review
```

### Plugin Naming

Skills in plugins are **namespaced** to prevent conflicts:

```
/plugin-name:skill-name
/code-review-plugin:review
/deploy-plugin:staging
```

### Automatic Updates

Users can update plugins:

```bash
# Update marketplace catalog
/plugin marketplace update team-plugins

# Update specific plugin
/plugin update code-review-plugin@team-plugins

# Update all plugins
/plugin update --all
```

### Pros
- ✅ Centralized distribution
- ✅ Automatic updates
- ✅ Version control
- ✅ Discoverable by team/community
- ✅ Can include multiple skills
- ✅ Supports hooks, agents, MCP servers

### Cons
- ❌ More setup required
- ❌ Namespaced skill names
- ❌ Requires GitHub/GitLab hosting
- ❌ Learning curve for plugin structure

### Best Practices

**Version your plugins properly:**
```json
{
  "version": "1.2.3"
  // MAJOR.MINOR.PATCH
  // MAJOR: Breaking changes
  // MINOR: New features (backwards compatible)
  // PATCH: Bug fixes
}
```

**Use descriptive categories:**
```json
{
  "category": "productivity",     // Good categories:
  "keywords": [                   // - productivity
    "code-review",                // - deployment
    "security",                   // - testing
    "quality"                     // - debugging
  ]                               // - documentation
}
```

**Document your plugins:**
```
code-review-plugin/
├── .claude-plugin/
│   └── plugin.json
├── README.md              # Installation and usage
├── CHANGELOG.md           # Version history
├── LICENSE                # MIT, Apache, etc.
└── skills/
    └── review/
        ├── SKILL.md       # Skill implementation
        └── README.md      # Skill-specific docs
```

**Test before publishing:**
```bash
# Test locally first
claude --plugin-dir ./my-plugins/plugins/code-review-plugin

# Validate plugin structure
/plugin validate ./my-plugins
```

---

## Method 4: Enterprise Managed Settings

### When to Use
- Organization-wide deployment
- Mandatory compliance/security skills
- Centralized management
- Need to enforce specific versions

### Structure

**Admin creates managed settings:**
```json
// Deployed via MDM or company config
~/.claude/managed-settings.json
{
  "extraKnownMarketplaces": {
    "company-required": {
      "source": {
        "source": "github",
        "repo": "company/required-plugins"
      }
    }
  },
  "enabledPlugins": {
    "security-scanner@company-required": true,
    "compliance-checker@company-required": true
  },
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "company/approved-plugins"
    }
  ]
}
```

### Distribution Steps

1. **Admin creates company marketplace**
```bash
# Create company plugins repo
mkdir company-plugins
cd company-plugins
# Add .claude-plugin/marketplace.json
# Add plugins as shown in Method 3
git push to company/required-plugins
```

2. **Admin deploys managed settings**
```bash
# Via MDM, puppet, or deployment script
scp managed-settings.json user@machine:~/.claude/
```

3. **Users automatically get plugins**
```bash
# On first run, Claude Code prompts:
"Your organization requires these plugins:
  - security-scanner@company-required
  - compliance-checker@company-required

Install now? [Y/n]"
```

### Pros
- ✅ Centralized enforcement
- ✅ Automatic distribution
- ✅ Version control at scale
- ✅ Can restrict third-party plugins
- ✅ Compliance and security

### Cons
- ❌ Requires infrastructure
- ❌ Complex setup
- ❌ Less flexibility for users
- ❌ Needs IT/admin involvement

### Best Practices
- Use `strictKnownMarketplaces` to allowlist sources
- Deploy via configuration management (Puppet, Ansible, MDM)
- Test on pilot group before company-wide
- Document required plugins in internal wiki
- Provide support channel for plugin issues

---

## Choosing the Right Method

### Decision Tree

```
Start here:
├─ Is this for your personal use only?
│  └─ YES → Use Personal Skills (~/.claude/skills/)
│
├─ Is this specific to one project?
│  └─ YES → Use Project Skills (.claude/skills/)
│
├─ Do you want to share with team/community?
│  └─ YES → Do you have 3+ projects that need it?
│     ├─ YES → Use Plugin Marketplace
│     └─ NO  → Use Project Skills (copy to other projects as needed)
│
└─ Need organization-wide enforcement?
   └─ YES → Use Enterprise Managed Settings
```

### Progression Path

Most teams follow this progression:

1. **Start**: Create in `.claude/skills/` (project-level)
2. **Iterate**: Test and refine based on team feedback
3. **Graduate**: Move to plugin when stable and needed elsewhere
4. **Scale**: Add to marketplace for easy discovery/updates
5. **Enforce**: Deploy via managed settings if compliance-critical

---

## Real-World Examples

### Example 1: Personal Productivity Skill

**Scenario:** You frequently need to explain complex code

**Distribution:** Personal Skills

```bash
mkdir -p ~/.claude/skills/explain-code
cat > ~/.claude/skills/explain-code/SKILL.md << 'EOF'
---
name: explain-code
description: Explain code with diagrams and analogies
---

When explaining code, include:
1. Analogy from everyday life
2. ASCII diagram showing flow/structure
3. Step-by-step walkthrough
4. Common gotcha or mistake

Keep it conversational and use multiple analogies for complex concepts.
EOF

# Available in all projects immediately
claude
/explain-code src/auth/login.ts
```

---

### Example 2: Project-Specific Deployment

**Scenario:** Your team needs a safe production deployment workflow

**Distribution:** Project Skills

```bash
# In your project
mkdir -p .claude/skills/deploy-prod
cat > .claude/skills/deploy-prod/SKILL.md << 'EOF'
---
name: deploy-prod
description: Deploy to production with all safety checks
disable-model-invocation: true
---

⚠️ PRODUCTION DEPLOYMENT

Execute these steps:

1. **Pre-flight checks**
   - All tests passing in CI
   - All required approvals on PR
   - No open P0/P1 incidents

2. **Deploy to canary**
   - Run: `./scripts/deploy.sh canary`
   - Monitor for 10 minutes
   - Check error rates and latency

3. **Deploy to production**
   - Run: `./scripts/deploy.sh production`
   - Monitor all zones
   - Verify health checks pass

4. **Post-deployment**
   - Update deployment tracker
   - Notify #deployments channel
   - Monitor for 30 minutes

If ANY step fails, immediately rollback.
EOF

# Commit so team gets it
git add .claude/skills/deploy-prod/
git commit -m "Add production deployment skill"
git push
```

---

### Example 3: Team Code Review Plugin

**Scenario:** Your team wants shared code review standards

**Distribution:** Plugin Marketplace

```bash
# Create plugin structure
mkdir -p team-plugins/.claude-plugin
mkdir -p team-plugins/plugins/review-standards/.claude-plugin
mkdir -p team-plugins/plugins/review-standards/skills/review

# Create skill
cat > team-plugins/plugins/review-standards/skills/review/SKILL.md << 'EOF'
---
description: Review code against team standards
disable-model-invocation: true
---

Review code for:

## Architecture
- Follows our layered architecture (Controller → Service → Repository)
- Uses dependency injection correctly
- Proper error handling at boundaries

## Code Quality
- Functions < 50 lines
- Max cyclomatic complexity: 10
- Descriptive variable names (no single letters except loop counters)

## Security
- Input validation on all external data
- SQL queries use parameterized statements
- Authentication checks on all protected endpoints

## Testing
- Unit tests for business logic
- Integration tests for API endpoints
- Edge cases covered

Provide specific line numbers and concrete suggestions.
EOF

# Create plugin manifest
cat > team-plugins/plugins/review-standards/.claude-plugin/plugin.json << 'EOF'
{
  "name": "review-standards",
  "description": "Company code review standards and checklist",
  "version": "1.0.0",
  "author": {"name": "Engineering Team"}
}
EOF

# Create marketplace
cat > team-plugins/.claude-plugin/marketplace.json << 'EOF'
{
  "name": "company-tools",
  "owner": {"name": "Engineering"},
  "plugins": [{
    "name": "review-standards",
    "source": "./plugins/review-standards",
    "description": "Company code review standards",
    "category": "quality"
  }]
}
EOF

# Publish to GitHub
cd team-plugins
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/your-company/claude-plugins
git push -u origin main

# Team installs
/plugin marketplace add your-company/claude-plugins
/plugin install review-standards@company-tools

# Now everyone uses the same review standards
/company-tools:review
```

---

### Example 4: Enterprise Security Enforcement

**Scenario:** Company requires all code pass security scan before commit

**Distribution:** Enterprise Managed + Marketplace

**Step 1: Create security plugin**
```bash
# Similar structure to Example 3
mkdir -p security-plugins/plugins/security-scanner
# Add skills, hooks for pre-commit scanning
```

**Step 2: Deploy managed settings**
```json
// ~/.claude/managed-settings.json (deployed via IT)
{
  "extraKnownMarketplaces": {
    "company-security": {
      "source": {
        "source": "github",
        "repo": "company/security-plugins"
      }
    }
  },
  "enabledPlugins": {
    "security-scanner@company-security": true
  },
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "company/security-plugins"
    },
    {
      "source": "github",
      "repo": "company/approved-plugins"
    }
  ]
}
```

**Result:**
- All engineers automatically get security scanner
- Can't disable it or use unapproved plugins
- Centralized updates when security rules change

---

## Best Practices Across All Methods

### 1. Skill Quality
- Follow the [Framework.md](../FRAMEWORK.md) patterns
- Include examples in skill documentation
- Test with real use cases
- Gather team feedback

### 2. Documentation
```
skill-name/
├── SKILL.md           # Implementation
├── README.md          # User guide
├── EXAMPLES.md        # Usage examples
└── CHANGELOG.md       # Version history
```

### 3. Versioning

Use [Semantic Versioning](https://semver.org/):
```
MAJOR.MINOR.PATCH

1.0.0 → Initial release
1.1.0 → Add new feature (backwards compatible)
1.1.1 → Fix bug
2.0.0 → Breaking change
```

### 4. Testing Before Distribution

```bash
# Test locally
claude --plugin-dir ./my-plugin

# Validate structure
/plugin validate .

# Try all commands
/my-plugin:skill-one
/my-plugin:skill-two

# Check for errors in output
```

### 5. Communication

**For project skills:**
- Document in project README
- Announce in team chat
- Add to onboarding guide

**For plugin marketplaces:**
- Create marketplace README
- Link from company wiki
- Demo in team meeting

**For enterprise:**
- Send company-wide email
- Create support documentation
- Provide training if needed

---

## Migration Paths

### From Project to Plugin

```bash
# 1. Copy project skills to plugin structure
cp -r .claude/skills/* my-plugin/skills/

# 2. Create plugin.json
cat > my-plugin/.claude-plugin/plugin.json << 'EOF'
{
  "name": "project-tools",
  "version": "1.0.0",
  "description": "Tools from our main project"
}
EOF

# 3. Remove from project, add as dependency
rm -rf .claude/skills
echo "Install: /plugin install project-tools@company" >> README.md
```

### From Personal to Team

```bash
# 1. Create plugin from personal skill
mkdir -p team-plugin/skills
cp -r ~/.claude/skills/my-skill team-plugin/skills/

# 2. Add to marketplace (see Method 3)

# 3. Update personal skill to redirect
cat > ~/.claude/skills/my-skill/SKILL.md << 'EOF'
---
description: Use team version instead
---

This skill has moved to the team plugin.

Install: /plugin install my-skill@team-plugins
Use: /team-plugins:my-skill
EOF
```

---

## Troubleshooting Common Issues

### Issue: Skill not loading

**Check:**
```bash
# Verify file location
ls -la .claude/skills/my-skill/SKILL.md

# Check YAML frontmatter syntax
head .claude/skills/my-skill/SKILL.md

# Restart Claude Code
claude --restart
```

### Issue: Plugin namespace conflicts

**Problem:** `/my-plugin:review` conflicts with `/other-plugin:review`

**Solution:** Use unique skill names within each plugin
```
my-plugin:
  - code-review (not just "review")

other-plugin:
  - security-review (not just "review")
```

### Issue: Marketplace not found

**Check:**
```bash
# Verify marketplace URL
curl https://raw.githubusercontent.com/org/repo/main/.claude-plugin/marketplace.json

# Check marketplace list
/plugin marketplace list

# Re-add marketplace
/plugin marketplace remove old-name
/plugin marketplace add org/repo
```

---

## Resources

### Official Documentation
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Plugins](https://code.claude.com/docs/en/plugins)
- [Plugin Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Discover Plugins](https://code.claude.com/docs/en/discover-plugins)

### Templates
- [skills/skill-writer](../skills/skill-writer) - Generates skills automatically
- [templates/](../templates/) - Skill templates for each framework type

### Community
- [Agent Skills Open Standard](https://agentskills.io)
- [Claude Developers Discord](https://anthropic.com/discord)
- [GitHub: anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## Summary: Quick Decision Guide

| Your Goal | Use This Method | Skill Name Format |
|-----------|----------------|-------------------|
| Personal automation | Personal Skills (`~/.claude/skills/`) | `/skill-name` |
| Project-specific workflow | Project Skills (`.claude/skills/`) | `/skill-name` |
| Share with team | Plugin Marketplace (GitHub) | `/plugin:skill` |
| Company-wide enforcement | Enterprise Managed Settings | `/plugin:skill` |
| Quick experiment | Personal Skills → Graduate later | `/skill-name` |
| Team with 5+ projects | Plugin Marketplace | `/plugin:skill` |
| Compliance required | Enterprise Managed | `/plugin:skill` |

**Most Common Path:**
1. Start in `.claude/skills/` (project)
2. Test and refine
3. Create plugin when needed in 2+ projects
4. Add to marketplace for team distribution

**Remember:** Start simple (project skills), then graduate to plugins when sharing becomes important. Don't over-engineer early—skills are easy to move later.
