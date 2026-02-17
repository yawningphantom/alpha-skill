#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const CLAUDE_INSTALL_DIR = path.join(os.homedir(), '.claude', 'skills');
const CURSOR_INSTALL_DIR = path.join(os.homedir(), '.cursor', 'skills');
const OPENCODE_INSTALL_DIR = path.join(
  process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.opencode'),
  'commands'
);

/**
 * Recursively copy a directory using only Node.js built-ins.
 */
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function install() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                   ALPHA SKILL SETUP                          ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  try {
    // Skills are bundled in the npm package alongside this script
    const skillsSourceDir = path.join(__dirname, 'skills');

    if (!fs.existsSync(skillsSourceDir)) {
      console.error('❌ Skills directory not found at:', skillsSourceDir);
      console.error('   The npm package may have been published without skills/.');
      console.error('   Check .npmignore to ensure skills/ is not excluded.\n');
      process.exit(1);
    }

    // Discover all skill directories
    const skillDirs = fs.readdirSync(skillsSourceDir).filter(name => {
      return fs.statSync(path.join(skillsSourceDir, name)).isDirectory();
    });

    if (skillDirs.length === 0) {
      console.warn('⚠️  No skill directories found in', skillsSourceDir);
      return;
    }

    // Step 1: Prepare directories
    console.log('📁 Step 1: Preparing installation directories...');
    for (const [label, dir] of [
      ['Claude Code', CLAUDE_INSTALL_DIR],
      ['Cursor', CURSOR_INSTALL_DIR],
      ['OpenCode', OPENCODE_INSTALL_DIR],
    ]) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`   Created: ${dir}`);
      } else {
        console.log(`   Using:   ${dir}`);
      }
    }
    console.log('   ✅ Directories ready\n');

    // Step 2: Install full skill directories to Claude Code
    console.log('🚀 Step 2: Installing to Claude Code...');
    for (const skillDir of skillDirs) {
      const src = path.join(skillsSourceDir, skillDir);
      const dest = path.join(CLAUDE_INSTALL_DIR, skillDir);
      if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
      copyDirSync(src, dest);
      console.log(`   ✓ ${skillDir}`);
    }
    console.log(`   ✅ ${skillDirs.length} skills installed to Claude Code\n`);

    // Step 3: Install full skill directories to Cursor
    console.log('📝 Step 3: Installing to Cursor...');
    let cursorCount = 0;
    for (const skillDir of skillDirs) {
      const src = path.join(skillsSourceDir, skillDir);
      const dest = path.join(CURSOR_INSTALL_DIR, skillDir);
      if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
      copyDirSync(src, dest);
      console.log(`   ✓ ${skillDir}`);
      cursorCount++;
    }
    console.log(`   ✅ ${cursorCount} skills installed to Cursor\n`);

    // Step 4: Install SKILL.md files to OpenCode as commands
    console.log('🖥️  Step 4: Installing to OpenCode...');
    let opencodeCount = 0;
    for (const skillDir of skillDirs) {
      const skillMd = path.join(skillsSourceDir, skillDir, 'SKILL.md');
      const dest = path.join(OPENCODE_INSTALL_DIR, `${skillDir}.md`);
      if (fs.existsSync(skillMd)) {
        fs.copyFileSync(skillMd, dest);
        console.log(`   ✓ /${skillDir} command installed`);
        opencodeCount++;
      }
    }
    console.log(`   ✅ ${opencodeCount} skills installed to OpenCode\n`);

    // Success
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║                    ✅ INSTALLATION COMPLETE                  ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('  Installed to:');
    console.log(`    Claude Code: ${CLAUDE_INSTALL_DIR}`);
    console.log(`    Cursor:      ${CURSOR_INSTALL_DIR}`);
    console.log(`    OpenCode:    ${OPENCODE_INSTALL_DIR}`);
    console.log('');
    console.log('  Usage:');
    console.log('    Claude Code:  /alpha-skill "Create a skill for [task]"');
    console.log('    Cursor:       @alpha-skill create a skill for [task]');
    console.log('    OpenCode:     /alpha-skill "Create a skill for [task]"');
    console.log('');
    console.log('  Re-install anytime:  npx alpha-skill');
    console.log('');
    console.log('  📖 Docs: https://github.com/yawningphantom/alpha-skill');
    console.log('');

  } catch (error) {
    console.error('\n╔══════════════════════════════════════════════════════════════╗');
    console.error('║                   ❌ INSTALLATION FAILED                     ║');
    console.error('╚══════════════════════════════════════════════════════════════╝\n');
    console.error('Error:', error.message);
    console.error('\n📝 Manual Installation:');
    console.error('  1. git clone https://github.com/yawningphantom/alpha-skill.git');
    console.error('  2. cp -r skills/* ~/.claude/skills/');
    console.error('  3. cp -r skills/* ~/.cursor/skills/');
    console.error('  4. cp skills/*/SKILL.md ~/.opencode/commands/');
    console.error('\n💬 Need help? https://github.com/yawningphantom/alpha-skill/issues\n');
  }
}

// Run when called directly (postinstall or `npx alpha-skill`)
if (require.main === module) {
  install();
}

module.exports = { install };
