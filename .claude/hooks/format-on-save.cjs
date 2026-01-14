#!/usr/bin/env node
// Format-on-save hook for React/JS/TS projects (Prettier)

const { execSync } = require('child_process');
const path = require('path');

// Supported extensions for Prettier
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.less', '.json', '.md', '.html', '.vue', '.svelte', '.yaml', '.yml'];

// Read JSON from stdin
let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path || data.tool_response?.filePath;

    if (!filePath) {
      process.exit(0);
    }

    const ext = path.extname(filePath).toLowerCase();

    // Only format supported file types
    if (!EXTENSIONS.includes(ext)) {
      process.exit(0);
    }

    // Run Prettier
    const cwd = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    execSync(`npx prettier --write "${filePath}"`, {
      stdio: 'ignore',
      cwd: cwd,
    });
  } catch (error) {
    // Silently fail - don't block Claude's workflow
    process.exit(0);
  }
});
