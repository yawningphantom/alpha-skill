#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO_URL = 'https://github.com/yawningphantom/alpha-skill.git';
const CLONE_DIR = path.join(os.tmpdir(), 'alpha-skill-temp');
const CLAUDE_INSTALL_DIR = path.join(os.homedir(), '.claude', 'skills');
const CURSOR_INSTALL_DIR = path.join(os.homedir(), '.cursor', 'rules');

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║                   ALPHA SKILL SETUP                          ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

try {
  // Step 1: Clone or update repository
  console.log('📦 Step 1: Fetching alpha-skill repository...');

  if (fs.existsSync(CLONE_DIR)) {
    console.log('   Updating existing repository...');
    execSync('git pull', { cwd: CLONE_DIR, stdio: 'pipe' });
  } else {
    console.log('   Cloning repository...');
    execSync(`git clone ${REPO_URL} ${CLONE_DIR}`, { stdio: 'pipe' });
  }
  console.log('   ✅ Repository ready\n');

  // Step 2: Create install directories if needed
  console.log('📁 Step 2: Preparing installation directories...');

  // Claude Code directory
  if (!fs.existsSync(CLAUDE_INSTALL_DIR)) {
    fs.mkdirSync(CLAUDE_INSTALL_DIR, { recursive: true });
    console.log(`   Created: ${CLAUDE_INSTALL_DIR}`);
  } else {
    console.log(`   Using: ${CLAUDE_INSTALL_DIR}`);
  }

  // Cursor directory
  if (!fs.existsSync(CURSOR_INSTALL_DIR)) {
    fs.mkdirSync(CURSOR_INSTALL_DIR, { recursive: true });
    console.log(`   Created: ${CURSOR_INSTALL_DIR}`);
  } else {
    console.log(`   Using: ${CURSOR_INSTALL_DIR}`);
  }

  console.log('   ✅ Directories ready\n');

  // Step 3: Install to Claude Code
  console.log('🚀 Step 3: Installing to Claude Code...');

  const skillsSourceDir = path.join(CLONE_DIR, 'skills');
  const skillDirs = fs.readdirSync(skillsSourceDir).filter(name => {
    const fullPath = path.join(skillsSourceDir, name);
    return fs.statSync(fullPath).isDirectory() && name.startsWith('skill-');
  });

  const installedSkills = [];
  for (const skillDir of skillDirs) {
    const source = path.join(skillsSourceDir, skillDir);
    const dest = path.join(CLAUDE_INSTALL_DIR, skillDir);

    // Remove existing and copy fresh
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }

    execSync(`cp -r "${source}" "${dest}"`);
    const skillName = skillDir.replace('skill-', '');
    console.log(`   ✓ /${skillName}`);
    installedSkills.push({ dir: skillDir, name: skillName });
  }

  console.log(`   ✅ ${installedSkills.length} skills installed to Claude Code\n`);

  // Step 4: Install to Cursor (all skills as .md files)
  console.log('📝 Step 4: Installing to Cursor...');

  let cursorInstalledCount = 0;
  for (const skillInfo of installedSkills) {
    const skillSource = path.join(CLONE_DIR, 'skills', skillInfo.dir, 'SKILL.md');
    const skillDest = path.join(CURSOR_INSTALL_DIR, `${skillInfo.dir}.md`);

    if (fs.existsSync(skillSource)) {
      fs.copyFileSync(skillSource, skillDest);
      console.log(`   ✓ @${skillInfo.dir} rule installed`);
      cursorInstalledCount++;
    }
  }

  console.log(`   ✅ ${cursorInstalledCount} skills installed to Cursor\n`);

  // Step 5: Cleanup temp directory
  console.log('🧹 Step 5: Cleaning up...');
  fs.rmSync(CLONE_DIR, { recursive: true, force: true });
  console.log('   ✅ Done\n');

  // Beautiful Documentation Display
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    ✅ INSTALLATION COMPLETE                  ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('');
  console.log('  ╔═══════════════════════════════════════════════════════════╗');
  console.log('  ║                      ALPHA SKILL v0.0.1                   ║');
  console.log('  ║        Engineering-Grade AI Automation Framework          ║');
  console.log('  ╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('  🎯 What is Alpha Skill?');
  console.log('  ───────────────────────────────────────────────────────────');
  console.log('  Production-ready skill generator using 4-Agent Reinforcement');
  console.log('  Learning loop that automatically refines skills until they');
  console.log('  score ≥90 and pass all adversarial tests.');
  console.log('');
  console.log('  🏗️  4-Agent Architecture:');
  console.log('  ───────────────────────────────────────────────────────────');
  console.log('  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐');
  console.log('  │  GENERATOR  │──▶│  ADVERSARY  │──▶│   JUDGE     │');
  console.log('  │  Creates v1 │   │  10 Tests   │   │  Score: 75  │');
  console.log('  └─────────────┘   └─────────────┘   └──────┬──────┘');
  console.log('         ▲                                    │');
  console.log('         │          ┌─────────────┐          ▼');
  console.log('         └──────────│  OPTIMIZER  │◀─────────┘');
  console.log('                    │  Fixes bugs │');
  console.log('                    └─────────────┘');
  console.log('');
  console.log('  🚀 Quick Start');
  console.log('  ───────────────────────────────────────────────────────────');
  console.log('  Claude Code:');
  console.log('     $ claude');
  console.log('     /alpha-skill "Create a skill for code reviews"');
  console.log('');
  console.log('  Cursor Editor:');
  console.log('     @alpha-skill create a skill for code reviews');
  console.log('');
  console.log('  Both editors use the same 4-Agent RL loop:');
  console.log('     → Generates v1 → Tests (7/10 fail) → Refines v2');
  console.log('     → Tests (13/13 pass) ✅ → Production-ready!');
  console.log('');
  console.log('  📦 Main Command');
  console.log('  ───────────────────────────────────────────────────────────');
  console.log('  /alpha-skill "Create a skill for [task]"');
  console.log('');
  console.log('  Production-ready skill generator with automatic quality');
  console.log('  refinement using 4-Agent RL loop (Generator → Adversary');
  console.log('  → Evaluator → Optimizer) until score ≥90 and all tests pass.');
  console.log('');
  console.log('  💡 Example Usage');
  console.log('  ───────────────────────────────────────────────────────────');
  console.log('  /alpha-skill "Create SQL query translator" --target 90');
  console.log('');
  console.log('  Output:');
  console.log('  ┌──────────────────────────────────────────────────────────┐');
  console.log('  │ Iteration 1: Score 73, Tests 3/10 → Refining...         │');
  console.log('  │ Iteration 2: Score 84, Tests 11/12 → Refining...        │');
  console.log('  │ Iteration 3: Score 91, Tests 13/13 ✅ SUCCESS!          │');
  console.log('  └──────────────────────────────────────────────────────────┘');
  console.log('');
  console.log('  🎨 Key Features');
  console.log('  ───────────────────────────────────────────────────────────');
  console.log('  ✅ Automatic refinement (no manual iteration)');
  console.log('  ✅ Adversarially hardened (survives attacks)');
  console.log('  ✅ Empirical testing (10+ test cases per skill)');
  console.log('  ✅ Framework-aligned (4 skill types)');
  console.log('  ✅ Security-first (input sandboxing, injection prevention)');
  console.log('');
  console.log('  📚 Learn More');
  console.log('  ───────────────────────────────────────────────────────────');
  console.log('  📖 Documentation:  https://github.com/yawningphantom/alpha-skill');
  console.log('  🐛 Report Issues:  https://github.com/yawningphantom/alpha-skill/issues');
  console.log('  💬 Discussions:    https://github.com/yawningphantom/alpha-skill/discussions');
  console.log('');
  console.log('  🌟 Star us on GitHub if you find this useful!');
  console.log('  ───────────────────────────────────────────────────────────');
  console.log('');
  console.log('');

} catch (error) {
  console.error('\n╔══════════════════════════════════════════════════════════════╗');
  console.error('║                   ❌ INSTALLATION FAILED                     ║');
  console.error('╚══════════════════════════════════════════════════════════════╝\n');
  console.error('Error:', error.message);
  console.error('\n📝 Manual Installation:');
  console.error('  1. git clone https://github.com/yawningphantom/alpha-skill.git');
  console.error('  2. cp -r skills/skill-* ~/.claude/skills/');
  console.error('\n💬 Need help? https://github.com/yawningphantom/alpha-skill/issues\n');
  process.exit(1);
}
