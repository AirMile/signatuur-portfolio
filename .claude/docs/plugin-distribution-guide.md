# Claude Code Plugin Distribution Guide

This guide explains how to convert the `claude-code-setup` repository into a reusable Claude Code plugin that can be shared across projects and teams.

---

## Table of Contents

1. [Overview](#overview)
2. [Current Repository Assets](#current-repository-assets)
3. [Plugin Architecture](#plugin-architecture)
4. [Step-by-Step Migration](#step-by-step-migration)
5. [Plugin Manifest Configuration](#plugin-manifest-configuration)
6. [Distribution Options](#distribution-options)
7. [Marketplace Setup](#marketplace-setup)
8. [Installation Instructions for Users](#installation-instructions-for-users)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Overview

Claude Code has an official plugin system that allows packaging and distributing:

- **Slash Commands** (`/command-name`)
- **Subagents** (specialized AI agents)
- **MCP Servers** (Model Context Protocol integrations)
- **Hooks** (event-triggered automations)

Plugins are the recommended way to share Claude Code customizations across multiple repositories and teams.

### Key Benefits

| Feature | Standalone `.claude/` | Plugin |
|---------|----------------------|--------|
| Scope | Single project | Multiple projects |
| Command names | Short (`/plan`) | Namespaced (`/my-plugin:plan`) |
| Version control | Git only | Semantic versioning |
| Distribution | Manual copy | Marketplace system |
| Team sharing | Clone repo | Install plugin |

---

## Current Repository Assets

This repository contains a comprehensive Claude Code setup:

### Commands (19 total)

| Command | Description |
|---------|-------------|
| `/1-plan` | Task classification, requirements clarification, research |
| `/2-code` | Rapid implementation with architecture patterns |
| `/3-verify` | Complete verification and testing |
| `/4-refine` | Small functional changes to implemented features |
| `/5-refactor` | Non-breaking refactoring improvements |
| `/analyze` | Parallel risk analysis, alternatives, simplification |
| `/brainstorm` | Creative idea expansion |
| `/create` | Interactive command creation |
| `/critique` | Critical idea analysis |
| `/debug` | Systematic debugging with parallel agents |
| `/edit` | Interactive command editing |
| `/idea` | Guided idea development |
| `/owasp` | OWASP Top 10:2025 security audit |
| `/review-other` | Code review for feature branches |
| `/setup` | Interactive project setup wizard |
| `/style` | UI/UX styling workflow |
| `/test-other` | Test teammate's code |
| `/wireframe` | HTML wireframe generation |

### Agents (64 total)

Organized into functional groups:

- **Analysis agents** (6): alternatives-explorer, risk-finder, simplification-advisor, etc.
- **Assessment agents** (3): business, technical, user-impact
- **Code agents** (2): architect, explorer
- **Debug agents** (4): change-detective, context-mapper, error-tracer, executor
- **Evaluate agents** (3): optimist, pragmatist, skeptic
- **Fix agents** (4): defensive, minimal, thorough, synthesizer
- **Implement agents** (3): balanced, quality, speed
- **OWASP agents** (13): a01-a10 scanners + fix variants
- **Plan agents** (3): conservative, impact-focused, thorough
- **Refine agents** (3): surgical, clean, safe
- **Research agents** (8): architecture, best-practices, testing, security, performance, quality, error-handling, Context7
- **Review agents** (3): naming, patterns, structure
- **Test agents** (9): happy-path, edge-cases, complex, generate variants, research variants

### Additional Resources

- `resources/` - Supporting files and templates
- `scripts/` - Automation scripts
- `docs/` - Documentation
- `CLAUDE.md` - Project instructions

---

## Plugin Architecture

### Required Structure

```
claude-code-setup-plugin/
├── .claude-plugin/
│   └── plugin.json          # Required manifest
├── commands/                 # Slash commands
│   ├── 1-plan.md
│   ├── 2-code.md
│   └── ...
├── agents/                   # Subagents
│   ├── code-explorer.md
│   ├── debug-executor.md
│   └── ...
├── hooks/                    # Event handlers (optional)
│   └── hooks.json
├── .mcp.json                 # MCP servers (optional)
└── README.md                 # Plugin documentation
```

### Important Notes

- Only `plugin.json` goes inside `.claude-plugin/`
- All other components are at the plugin root level
- Commands are automatically namespaced (e.g., `/claude-code-setup:plan`)

---

## Step-by-Step Migration

### Phase 1: Create Plugin Structure

```bash
# Create new repository
mkdir claude-code-setup-plugin
cd claude-code-setup-plugin

# Create required directories
mkdir -p .claude-plugin
mkdir commands
mkdir agents
mkdir hooks
```

### Phase 2: Copy Assets

```bash
# From the original repository root:

# Copy commands
cp .claude/commands/*.md ../claude-code-setup-plugin/commands/

# Copy agents
cp .claude/agents/*.md ../claude-code-setup-plugin/agents/

# Copy resources (if needed by commands)
cp -r .claude/resources ../claude-code-setup-plugin/

# Copy scripts (if needed)
cp -r .claude/scripts ../claude-code-setup-plugin/
```

### Phase 3: Create Plugin Manifest

Create `.claude-plugin/plugin.json`:

```json
{
  "name": "claude-code-setup",
  "description": "Comprehensive Claude Code workflow with 19 commands and 64 specialized agents for planning, coding, verification, debugging, security audits, and more",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "homepage": "https://github.com/your-org/claude-code-setup-plugin",
  "keywords": [
    "workflow",
    "planning",
    "code-review",
    "security",
    "owasp",
    "debugging",
    "testing"
  ]
}
```

### Phase 4: Extract Hooks (if applicable)

If you have hooks in `.claude/settings.json`, extract them to `hooks/hooks.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "echo 'File modified'"
      }
    ]
  }
}
```

### Phase 5: Test Locally

```bash
# Test the plugin locally
claude --plugin-dir ./claude-code-setup-plugin

# Validate plugin structure
claude plugin validate ./claude-code-setup-plugin
```

---

## Plugin Manifest Configuration

### Basic Manifest

```json
{
  "name": "claude-code-setup",
  "description": "Comprehensive workflow automation for Claude Code",
  "version": "1.0.0",
  "author": {
    "name": "Author Name"
  }
}
```

### Full Manifest with All Options

```json
{
  "name": "claude-code-setup",
  "description": "Comprehensive workflow automation for Claude Code",
  "version": "1.0.0",
  "author": {
    "name": "Author Name",
    "email": "author@example.com",
    "url": "https://example.com"
  },
  "homepage": "https://github.com/org/claude-code-setup-plugin",
  "repository": {
    "type": "git",
    "url": "https://github.com/org/claude-code-setup-plugin.git"
  },
  "keywords": [
    "workflow",
    "automation",
    "code-review",
    "security"
  ],
  "license": "MIT",
  "engines": {
    "claude-code": ">=1.0.0"
  }
}
```

---

## Distribution Options

### Option 1: GitHub Repository (Recommended)

1. Push plugin to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial plugin release"
   git remote add origin https://github.com/your-org/claude-code-setup-plugin.git
   git push -u origin main
   ```

2. Users install with:
   ```
   /plugin add your-org/claude-code-setup-plugin
   ```

### Option 2: Create a Marketplace

For distributing multiple related plugins, create a marketplace:

1. Create marketplace repository
2. Add `marketplace.json` (see [Marketplace Setup](#marketplace-setup))
3. Users add marketplace with:
   ```
   /plugin marketplace add your-org/claude-plugins-marketplace
   ```

### Option 3: Split into Multiple Plugins

Consider splitting by functionality for modular installation:

```
claude-code-workflow/          # Core workflow (plan, code, verify, refine, refactor)
claude-code-security/          # Security (owasp, security agents)
claude-code-debugging/         # Debugging (debug command, debug agents)
claude-code-review/            # Code review (review-other, review agents)
claude-code-testing/           # Testing (test commands, test agents)
```

---

## Marketplace Setup

### Marketplace Structure

```
claude-plugins-marketplace/
├── .claude-plugin/
│   └── marketplace.json
└── README.md
```

### marketplace.json

```json
{
  "name": "claude-code-tools",
  "owner": {
    "name": "Your Organization",
    "email": "contact@example.com"
  },
  "plugins": [
    {
      "name": "claude-code-setup",
      "source": {
        "source": "github",
        "repo": "your-org/claude-code-setup-plugin"
      },
      "description": "Complete workflow automation with 19 commands and 64 agents",
      "version": "1.0.0"
    },
    {
      "name": "claude-code-security",
      "source": {
        "source": "github",
        "repo": "your-org/claude-code-security-plugin"
      },
      "description": "OWASP Top 10:2025 security scanning",
      "version": "1.0.0"
    }
  ]
}
```

### Plugin Sources

Marketplaces support multiple source types:

```json
// GitHub (recommended)
"source": {
  "source": "github",
  "repo": "owner/repo"
}

// GitLab or other Git hosts
"source": {
  "source": "url",
  "url": "https://gitlab.com/org/repo.git"
}

// Local path (for testing)
"source": "./plugins/my-plugin"
```

---

## Installation Instructions for Users

### Single Plugin Installation

```bash
# Add plugin from GitHub
/plugin add your-org/claude-code-setup-plugin

# Or via CLI
claude plugin add your-org/claude-code-setup-plugin
```

### Marketplace Installation

```bash
# Add marketplace
/plugin marketplace add your-org/claude-plugins-marketplace

# List available plugins
/plugin marketplace list

# Install specific plugin from marketplace
/plugin add claude-code-setup@claude-code-tools
```

### Team Auto-Installation

Add to project's `.claude/settings.json` for automatic team distribution:

```json
{
  "extraKnownMarketplaces": {
    "team-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/claude-plugins-marketplace"
      }
    }
  },
  "enabledPlugins": {
    "claude-code-setup@team-tools": true
  }
}
```

When team members open the project, they'll be prompted to install the plugin.

---

## Best Practices

### Versioning

Use semantic versioning for releases:

- `1.0.0` - Initial release
- `1.1.0` - New features (backward compatible)
- `1.0.1` - Bug fixes
- `2.0.0` - Breaking changes

### Documentation

Include comprehensive README.md with:

- Installation instructions
- List of all commands with descriptions
- List of all agents with use cases
- Configuration options
- Examples and usage patterns
- Troubleshooting guide

### Testing

Before each release:

```bash
# Validate plugin structure
claude plugin validate .

# Test locally
claude --plugin-dir .

# Test all commands work
/claude-code-setup:plan
/claude-code-setup:code
# etc.
```

### Command Naming

After plugin installation, commands are namespaced:

| Original | Plugin |
|----------|--------|
| `/plan` | `/claude-code-setup:plan` |
| `/code` | `/claude-code-setup:code` |
| `/verify` | `/claude-code-setup:verify` |

Consider short plugin names for better UX.

---

## Troubleshooting

### Plugin Not Found

```
Error: Plugin not found
```

**Solution**: Verify GitHub repository is public or user has access.

### Command Conflicts

```
Warning: Command 'plan' conflicts with existing command
```

**Solution**: Plugin commands are namespaced automatically. Use full name: `/plugin-name:command`.

### Validation Errors

```bash
# Check plugin structure
claude plugin validate .

# Common issues:
# - Missing plugin.json
# - Invalid JSON syntax
# - Missing required fields
```

### Agent Not Loading

Ensure agent files:
- Have `.md` extension
- Are in the `agents/` directory
- Have valid YAML frontmatter (if used)

---

## Resources

### Official Documentation

- [Claude Code Plugin Docs](https://code.claude.com/docs/en/plugins)
- [Plugin Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Agent Skills](https://code.claude.com/docs/en/skills)

### Community Resources

- [Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code)
- [Claude Plugins Registry](https://claude-plugins.dev/)

---

## Quick Reference

### Commands

```bash
# Plugin management
/plugin add <github-user/repo>       # Install plugin
/plugin remove <plugin-name>         # Remove plugin
/plugin list                         # List installed plugins
/plugin validate <path>              # Validate plugin

# Marketplace management
/plugin marketplace add <user/repo>  # Add marketplace
/plugin marketplace list             # List marketplaces
/plugin marketplace remove <name>    # Remove marketplace

# Local testing
claude --plugin-dir ./my-plugin      # Test plugin locally
```

### File Locations

| Type | Location |
|------|----------|
| Plugin manifest | `.claude-plugin/plugin.json` |
| Commands | `commands/*.md` |
| Agents | `agents/*.md` |
| Hooks | `hooks/hooks.json` |
| MCP Servers | `.mcp.json` |
| Marketplace | `.claude-plugin/marketplace.json` |

---

*Last updated: December 2025*
