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

# Help & Version:

```bash
 i help | i -h # List commands i version
 i -v # Show version

```

# Terminal:

```bash
  i ziro | i 0    # Clear terminal
```

# System Information:

```bash
  i ping                  # Basic System Info
  i ping -p | i -ping -p     # Detailed System Info
```

# Node.js Script:

```bash
 i run my_script.js [arg1 arg2...]
```

# Git Operations:

```bash
  i init | i -i           # Init repo
  i add | i -a            # Stage all
  i add my_file.txt | i -a my_file.txt   # Stage file
  i commit "msg" | i -c "msg"  # Commit
  i reBranch | i -br       # Rename branch to main
  i status | i -s          # Git status
  i push | i -p            # Push
  i push -f | i -p -f       # Force push
  i remote | i -r          # Show remotes
  i remove | i -rm          # Remove origin remote
  i addRemote <url> | i -add <url>   # Add remote
  i branch | i -b          # List branches
  i checkout <branch> | i -c <branch> # Switch branch
  i log | i -l             # Git log
  i merge <branch> | i -m <branch> # Merge branch
  i reset <commit> | i -re <commit> # Reset HEAD
  i clone <url> | i -cp <url>    # Clone repo
  i git | i -git           # Init, add, commit (random msg), rename branch
```

# Templates:

```bash
  i ready | i -rd          # List templates
  i install <template> | i -temp <template> # Install template
```

# Project Creation:

```bash
  i vite | i -vite         # Create Vite project
  i vilo | i -vilo         # Create Vilo project
  i next | i -next         # Create Next.js project
```

# TypeScript:

```bash
  i ts <file>.ts | i -ts <file>.ts  # Run TS file
  i ts <file>.ts -c | i -ts <file>.ts -c  # Compile TS file
```

# Package Management (NPM):

```bash
  i get <package> | i -g <package>    # Install local
  i get <package> g       # Install global
```

# PNPM Management:

```bash
  i pnpm i | i -pn i          # Install PNPM globally
  i pnpm get <package> | i -pn get <package>  # PNPM install
  i pnpm <file> | i -pn <file>  # Run with PNPM
```
