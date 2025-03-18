# Speeed CLI Tool

A powerful command-line interface tool that simplifies working with Vite projects and extends npm functionality.

## Installation

```bash
npm install -g speeed  # Install the CLI tool globally
```

## Features

- **Quick Project Creation**: Create new Vite projects with various frameworks
- **Template Support**: Use official Vite templates or custom templates from GitHub
- **Custom Commands**: Define and manage your own CLI commands
- **Git Integration**: Initialize git repositories with a single command
- **NPM Wrapper**: Simplified npm commands for package management

## Available Commands

### Project Creation

Create new projects using various frameworks:

```bash
i vanilla my-app          # Create vanilla JS project
i react my-app            # Create React project
i vue my-app              # Create Vue project
i svelte my-app           # Create Svelte project
i preact my-app           # Create Preact project
i lit my-app              # Create Lit project
i solid my-app            # Create Solid project
i qwik my-app             # Create Qwik project
i react-swc my-app        # Create React project with SWC

# TypeScript versions can be created in two ways:
i react my-app --typescript  # Using --typescript flag
i react ts my-app           # Using 'ts' shorthand
```

### Template Management

```bash
i list                    # List all available official Vite templates
i ready                   # Show available templates from GitHub repository
i i <templateName>        # Install a template from the GitHub repository
```

### Project Management

```bash
i init-git <appName>      # Initialize git repository in app directory
i install <appName>       # Install dependencies for specified app
i dev <appName>           # Start development server for specified app
```

### Custom Commands

```bash
i set <commandName> <commandString>  # Set a custom command globally
i list-custom                        # List all custom commands
i unset <commandName>                # Remove a custom command
i show                               # Show all available commands
```

### Package Management

```bash
i add                     # Install all dependencies (npm install)
i add <packageName>       # Install specific package
i add <packageName> --save-dev  # Install as dev dependency
i add <packageName> --global    # Install globally
i add <packageName> --save-exact  # Install exact version
i add <packageName> --legacy-peer-deps  # Use legacy peer deps

i remove <packageName>    # Uninstall a package
i remove <packageName> --global  # Uninstall global package

i update                  # Update all packages
i update <packageName>    # Update specific package
i update --global         # Update global packages

i list                    # List installed packages
i list --global           # List global packages

i outdated                # Check for outdated packages
i outdated --global       # Check for outdated global packages

i run <script>            # Run a package script
```

## Examples

Create a new React TypeScript project:
```bash
# Two equivalent ways to create a React TypeScript project:
i react my-react-app --typescript
# OR
i react ts my-react-app

cd my-react-app
i add
i dev .
```

Install a template from GitHub:
```bash
i i react-tailwind
cd react-tailwind-app
i add
i dev .
```

Create a custom command:
```bash
i set build-prod "npm run build && npm run preview"
i build-prod
```

## Configuration

Custom commands are stored in `~/.vite-cli-custom-commands.json`.

## Error Handling

The CLI provides helpful error messages and gracefully handles exceptions. Look for emoji indicators:
- ✅ Success
- ❌ Error
- ⚠️ Warning
- 📦 Process running
- 🚀 Script execution

## License

MIT  <!-- Adjust as needed -->

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
