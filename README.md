# 🚀 Speeed.js CLI - Accelerate Your Development Workflow

A turbocharged CLI tool that combines package management, project scaffolding,
and Git shortcuts in one powerful utility. Speeed.js streamlines your
development process with intuitive commands and zero configuration.

## 📦 Installation

```bash
npm install -g speeed
```

## 🎯 Features

- **Zero-config project templates** - Create new projects in seconds
- **Enhanced npm commands** - Simplified package management
- **Git shortcuts** - Streamlined version control workflows
- **Custom command system** - Create aliases for your most-used commands
- **Cross-platform support** - Works on Windows, macOS, and Linux

## 🛠️ Core Commands

### Package Management

```bash
# Install packages
i add [package] [--global|--save-dev|--save-exact|--legacy-peer-deps]

# Remove packages
i remove <package> [--global]

# Update packages
i update [package] [--global]

# Check outdated packages
i outdated [--global]

# Run scripts
i run <script>

# List installed packages
i list-packages [--global]
```

### Project Scaffolding

```bash
# Create new projects
i react <appName> [--typescript]
i vue <appName> [--typescript]
i svelte <appName> [--typescript]
i solid <appName> [--typescript]
i qwik <appName> [--typescript]
i lit <appName> [--typescript]
i preact <appName> [--typescript]
i vanilla <appName> [--typescript]
```

### Git Shortcuts

```bash
# Common workflows
i git fire    # Quick commit with random message
i git new     # Initialize repo with first commit
i git push    # Push with auto-set upstream

# Advanced shortcuts
i git s       # status
i git a       # add all
i git c       # commit
i git p       # push
i git pl      # pull
i git b       # branch
i git co      # checkout
i git l       # log --oneline
i git d       # diff
i git f       # fetch
i git m       # merge
i git r       # reset
i git st      # stash
i git cl      # clone
i git rv      # revert
i git rb      # rebase
```

### Custom Commands

```bash
# Save a custom command
i set <name> <command>

# List all custom commands
i list-custom

# Remove a custom command
i unset <commandName>

# Show all available commands (built-in and custom)
i show
```

## 🌟 Templates

Pre-configured Vite templates with optional TypeScript support:

- **React** - Modern UI library with JSX
- **Vue** - Progressive JavaScript framework
- **Svelte** - Compile-time framework with no virtual DOM
- **Solid** - Reactive JavaScript UI library
- **Qwik** - Resumable JavaScript framework
- **Lit** - Simple library for building web components
- **Preact** - Lightweight alternative to React
- **Vanilla** - Pure JavaScript starter

## 🚨 Advanced Features

### Node Script Execution

```bash
i n <file>           # Run JS files with minimal output
i run-node <file>    # Alternative syntax
```

### Template Management

```bash
i ready              # List available templates
i i <template>       # Install GitHub templates
```

### Project Management

```bash
i install <appName>  # Install dependencies
i dev <appName>      # Start development server
i list               # List all available Vite templates
```

### Custom Configuration

Persistent commands are stored in `~/.vite-cli-custom-commands.json` for easy
access across sessions.

## 🐛 Error Handling

Speeed.js provides robust error handling:

- Color-coded status messages for clear feedback
- Automatic error recovery when possible
- Detailed stack traces in debug mode
- Graceful termination with SIGINT handling

## 🔄 Update CLI

```bash
i update speeed -g
```

## 🤝 Contributing

PRs welcome! See our [GitHub repo](https://github.com/seraprogrammer/speeed) for
contribution guidelines.

## 📄 License

ISC © [seraprogrammer](https://sera.dev)
