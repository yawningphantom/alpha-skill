/**
 * alpha-skill - Engineering-grade framework for AI automation agents
 *
 * Skills are automatically installed via postinstall script to:
 *   - Claude Code: ~/.claude/skills/
 *   - Cursor:      ~/.cursor/rules/
 *   - OpenCode:    ~/.opencode/commands/
 *
 * Documentation: https://github.com/yawningphantom/alpha-skill
 */

console.log(`
╔══════════════════════════════════════════════════════════════╗
║                        ALPHA SKILL                           ║
║       Engineering-grade framework for AI automation          ║
╚══════════════════════════════════════════════════════════════╝

✅ Installed to:
   Claude Code: ~/.claude/skills/
   Cursor:      ~/.cursor/rules/
   OpenCode:    ~/.opencode/commands/

Usage:
   Claude Code: /alpha-skill "Create a skill for [task]"
   Cursor:      @alpha-skill create a skill for [task]
   OpenCode:    /alpha-skill "Create a skill for [task]"

The 4-Agent RL loop automatically refines skills until they
score ≥90 and pass all adversarial tests.

📖 Documentation: https://github.com/yawningphantom/alpha-skill
🚀 Features: 4-Agent RL Loop, Automatic Refinement, Empirical Testing
`);

module.exports = {
  version: require('./package.json').version,
  repository: 'https://github.com/yawningphantom/alpha-skill',
  installInstructions: 'cp -r skills/skill-* ~/.claude/skills/'
};
