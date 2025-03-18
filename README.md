# Speeed CLI Tool

A powerful command-line interface tool that simplifies working with Vite projects and extends npm functionality.

## Installation

```bash
npm install -g speeed  # Replace with your actual package name
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
speeed vanilla my-app          # Create vanilla JS project
speeed react my-app            # Create React project
speeed vue my-app              # Create Vue project
speeed svelte my-app           # Create Svelte project
speeed preact my-app           # Create Preact project
speeed lit my-app              # Create Lit project
speeed solid my-app            # Create Solid project
speeed qwik my-app             # Create Qwik project
speeed react-swc my-app        # Create React project with SWC

# Add --typescript flag for TypeScript version
speeed react my-app --typescript
```

### Template Management

```bash
speeed list                    # List all available official Vite templates
speeed ready                   # Show available templates from GitHub repository
speeed i <templateName>        # Install a template from the GitHub repository
```

### Project Management

```bash
speeed init-git <appName>      # Initialize git repository in app directory
speeed install <appName>       # Install dependencies for specified app
speeed dev <appName>           # Start development server for specified app
```

### Custom Commands

```bash
speeed set <commandName> <commandString>  # Set a custom command globally
speeed list-custom                        # List all custom commands
speeed unset <commandName>                # Remove a custom command
speeed show                               # Show all available commands
```

### Package Management

```bash
speeed add                     # Install all dependencies (npm install)
speeed add <packageName>       # Install specific package
speeed add <packageName> --save-dev  # Install as dev dependency
speeed add <packageName> --global    # Install globally
speeed add <packageName> --save-exact  # Install exact version
speeed add <packageName> --legacy-peer-deps  # Use legacy peer deps

speeed remove <packageName>    # Uninstall a package
speeed remove <packageName> --global  # Uninstall global package

speeed update                  # Update all packages
speeed update <packageName>    # Update specific package
speeed update --global         # Update global packages

speeed list                    # List installed packages
speeed list --global           # List global packages

speeed outdated                # Check for outdated packages
speeed outdated --global       # Check for outdated global packages

speeed run <script>            # Run a package script
```

## Examples

Create a new React TypeScript project:
```bash
speeed react my-react-app --typescript
cd my-react-app
speeed add
speeed dev .
```

Install a template from GitHub:
```bash
speeed i react-tailwind
cd react-tailwind-app
speeed add
speeed dev .
```

Create a custom command:
```bash
speeed set build-prod "npm run build && npm run preview"
speeed build-prod
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
