# Skill Distribution - Quick Reference

## TL;DR: What Should I Do?

```
┌─────────────────────────────────────────┐
│  START HERE: Decision Tree              │
├─────────────────────────────────────────┤
│                                         │
│  Just for me?                           │
│  └─> Personal: ~/.claude/skills/       │
│      Usage: /skill-name                 │
│                                         │
│  One project only?                      │
│  └─> Project: .claude/skills/          │
│      Usage: /skill-name                 │
│      Share: git commit + push           │
│                                         │
│  Share with team?                       │
│  └─> Plugin: Create marketplace         │
│      Usage: /plugin:skill-name          │
│      Share: GitHub + /plugin install    │
│                                         │
│  Company-wide mandatory?                │
│  └─> Enterprise: Managed settings       │
│      Usage: /plugin:skill-name          │
│      Share: IT deployment               │
└─────────────────────────────────────────┘
```

---

## Method Comparison

| Method | Setup Time | Sharing | Updates | Naming | Best For |
|--------|-----------|---------|---------|--------|----------|
| Personal | 1 min | Manual | Manual | `/skill` | Your workflows |
| Project | 1 min | Git | Git pull | `/skill` | One project |
| Plugin | 10 min | Marketplace | Auto | `/plugin:skill` | Team/Community |
| Enterprise | 1 hour | Managed | Centralized | `/plugin:skill` | Organization |

---

## Quick Commands

### Personal Skills
```bash
# Create
mkdir -p ~/.claude/skills/my-skill
vi ~/.claude/skills/my-skill/SKILL.md

# Use immediately
/my-skill
```

### Project Skills
```bash
# Create
mkdir -p .claude/skills/deploy
vi .claude/skills/deploy/SKILL.md

# Share with team
git add .claude/skills/
git commit -m "Add deploy skill"
git push

# Team uses after: git pull
```

### Plugin Marketplace
```bash
# Create plugin
mkdir -p my-plugins/plugins/my-plugin/.claude-plugin
vi my-plugins/plugins/my-plugin/.claude-plugin/plugin.json

# Create marketplace
vi my-plugins/.claude-plugin/marketplace.json

# Publish
git init && git add . && git commit -m "init"
git push origin main

# Install
/plugin marketplace add org/repo
/plugin install my-plugin@marketplace-name

# Use
/my-plugin:skill-name
```

---

## File Locations

### Personal Skills
```
~/.claude/
└── skills/
    └── skill-name/
        └── SKILL.md
```

### Project Skills
```
your-project/
└── .claude/
    └── skills/
        └── skill-name/
            └── SKILL.md
```

### Plugin Marketplace
```
marketplace-repo/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
└── plugins/
    └── plugin-name/
        ├── .claude-plugin/
        │   └── plugin.json
        └── skills/
            └── skill-name/
                └── SKILL.md
```

---

## Skill Name Examples

### Personal/Project (Simple)
- `/review`
- `/deploy`
- `/commit`

### Plugin (Namespaced)
- `/code-tools:review`
- `/deploy-plugin:staging`
- `/team-skills:commit`

---

## Common Workflows

### Test Locally
```bash
# Test plugin before publishing
claude --plugin-dir ./my-plugin

# Validate structure
/plugin validate .

# Try skill
/my-plugin:skill-name
```

### Share Plugin
```bash
# Push to GitHub
git push origin main

# Team installs
/plugin marketplace add org/repo
/plugin install plugin-name@marketplace
```

### Update Plugin
```bash
# Update version in plugin.json
vi .claude-plugin/plugin.json  # Bump version

# Commit and push
git add . && git commit -m "v1.1.0" && git push

# Users update
/plugin update plugin-name@marketplace
```

---

## Distribution Checklist

### Before Sharing
- [ ] Test skill works correctly
- [ ] Add description in frontmatter
- [ ] Include examples
- [ ] Write README.md
- [ ] Version properly (1.0.0)

### For Plugins
- [ ] Create plugin.json
- [ ] Create marketplace.json
- [ ] Test with `--plugin-dir`
- [ ] Validate with `/plugin validate`
- [ ] Push to GitHub
- [ ] Document installation steps

### After Publishing
- [ ] Announce to team
- [ ] Add to documentation
- [ ] Monitor for issues
- [ ] Respond to feedback
- [ ] Update when needed

---

## Troubleshooting

### Skill Not Loading
```bash
# Check file exists
ls -la .claude/skills/*/SKILL.md

# Check YAML syntax
head .claude/skills/*/SKILL.md

# Restart
exit  # From claude session
claude
```

### Plugin Not Found
```bash
# Check marketplace
/plugin marketplace list

# Re-add
/plugin marketplace add org/repo

# Verify plugin
/plugin list
```

### Wrong Version
```bash
# Update marketplace
/plugin marketplace update marketplace-name

# Update plugin
/plugin update plugin-name@marketplace

# Check version
/plugin list  # Shows installed versions
```

---

## Examples by Use Case

### Code Review Skill
```bash
# Personal - Quick start
mkdir -p ~/.claude/skills/review
cat > ~/.claude/skills/review/SKILL.md << 'EOF'
---
description: Review code for issues
---
Review for bugs, security, and performance issues.
EOF

# Use: /review
```

### Deployment Workflow
```bash
# Project - Team workflow
mkdir -p .claude/skills/deploy-prod
cat > .claude/skills/deploy-prod/SKILL.md << 'EOF'
---
description: Deploy to production safely
disable-model-invocation: true
---
1. Run tests
2. Build
3. Deploy canary
4. Deploy prod
EOF

git add .claude/skills/ && git commit -m "Add deploy skill"

# Team uses: /deploy-prod
```

### Team Standards Plugin
```bash
# Plugin - Shared across projects
mkdir -p plugins/team-standards/.claude-plugin
cat > plugins/team-standards/.claude-plugin/plugin.json << 'EOF'
{
  "name": "team-standards",
  "version": "1.0.0",
  "description": "Team coding standards"
}
EOF

# Add skills in plugins/team-standards/skills/
# Create marketplace.json
# Push to GitHub

# Team installs:
# /plugin marketplace add org/repo
# /plugin install team-standards@marketplace

# Use: /team-standards:skill-name
```

---

## Version Numbers

Use [Semantic Versioning](https://semver.org):

```
MAJOR.MINOR.PATCH

1.0.0  Initial release
1.1.0  Add feature (compatible)
1.1.1  Fix bug
2.0.0  Breaking change
```

**When to bump:**
- **MAJOR**: Skill behavior changes (breaking)
- **MINOR**: Add new skills, options
- **PATCH**: Bug fixes, docs

---

## Resources

### Documentation
- Full Guide: [SKILL-DISTRIBUTION-GUIDE.md](SKILL-DISTRIBUTION-GUIDE.md)
- Framework: [FRAMEWORK.md](FRAMEWORK.md)
- Skill Writer: [skills/skill-writer/](../skills/skill-writer/)

### Official Docs
- [code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)
- [code.claude.com/docs/en/plugins](https://code.claude.com/docs/en/plugins)
- [code.claude.com/docs/en/plugin-marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)

### Community
- [Agent Skills Standard](https://agentskills.io)
- [Claude Discord](https://anthropic.com/discord)

---

## Quick Copy-Paste Templates

### Minimal SKILL.md
```yaml
---
description: What this skill does
---

Instructions for Claude to follow.
```

### Full SKILL.md
```yaml
---
name: skill-name
description: Detailed description of when to use this skill
disable-model-invocation: true  # User-only
---

## Overview
What this skill does.

## Steps
1. First step
2. Second step
3. Third step

## Examples
Example usage and output.
```

### plugin.json
```json
{
  "name": "plugin-name",
  "description": "What this plugin provides",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  },
  "homepage": "https://github.com/you/plugin",
  "license": "MIT"
}
```

### marketplace.json
```json
{
  "name": "marketplace-name",
  "owner": {
    "name": "Team Name"
  },
  "plugins": [
    {
      "name": "plugin-name",
      "source": "./plugins/plugin-name",
      "description": "Plugin description",
      "version": "1.0.0"
    }
  ]
}
```

---

**Remember:** Start simple → Test locally → Share when ready → Iterate based on feedback
