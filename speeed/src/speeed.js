#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
const pc = require("picocolors");

// Command handler that maps command names (and shortcuts) to their respective functions
const commands = {
  run: (args) => {
    if (args.length === 0) {
      console.log(pc.red("Please specify a script to run."));
      process.exit(1);
    }

    const scriptPath = args[0];
    const child = spawn("node", [scriptPath, ...args.slice(1)], {
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Script exited with code ${code}`);
      }
    });
  },

  // Help command to display available commands
  help: () => {
    console.log(pc.green("Usage: i <command> [options]"));
    console.log(pc.green("Commands:"));
    console.log(pc.green("  run <script>        Run a Node.js script"));
    console.log(pc.green("  help                Show this help message"));
    console.log(pc.green("  version, -v         Show the CLI version"));
    console.log(pc.green("  init, -i            Initialize a git repository"));
    console.log(
      pc.green("  add, -a             Stage changes to the repository")
    );
    console.log(
      pc.green("  commit, -c          Commit changes to the repository")
    );
    console.log(pc.green("  branch, -b          List or create a new branch"));
    console.log(pc.green("  reBranch, -br       Rename the current branch"));
    console.log(pc.green("  status, -s          Check the git status"));
    console.log(
      pc.green("  push, -p            Push changes to the remote repository")
    );
    console.log(pc.green("  remote, -r          Show remote repositories"));
    console.log(
      pc.green("  remove, -rm         Remove files from the repository")
    );
    console.log(pc.green("  addRemote, -add     Add a remote repository"));
    console.log(
      pc.green("  checkout, -c        Switch branches or restore files")
    );
    console.log(pc.green("  log, -l             Show commit logs"));
    console.log(pc.green("  merge, -m           Merge branches"));
    console.log(
      pc.green("  reset, -re          Reset current HEAD to specified state")
    );
    console.log(pc.green("  clone, -cp          Clone a repository"));
    console.log(pc.green("  ready, -rd          List available templates"));
    console.log(pc.green("  install, -temp <name> Install a template"));
    console.log(
      pc.green(
        "  git, -git           Initialize, add, commit, and rename branch"
      )
    );
    console.log(pc.green("  vite, -vite         Create a new Vite project"));
    console.log(pc.green("  vilo, -vilo         Create a new Vilo project"));
    console.log(pc.green("  next, -next         Create a new Next.js project"));
    console.log(
      pc.green("  ts <file>           Run a TypeScript file directly")
    );
    console.log(pc.green("  get <package>       Install an npm package"));
    console.log(
      pc.green("  pnpm, -pnpm         Run files with PNPM or manage PNPM")
    );
    console.log(pc.green("    i pnpm i          Install PNPM globally"));
    console.log(pc.green("    i pnpm get <pkg>  Install package using PNPM"));
    console.log(pc.green("    i pnpm <file>     Run file using PNPM"));
    console.log(pc.green("i create file <name>  Create a file"));
    console.log(pc.green("i create folder <name>  Create a folder"));
    console.log(pc.green("i update file <name>  Update a file"));
    console.log(pc.green("i update folder <name>  Update a folder"));
    console.log(pc.green("i delete file <name>  Delete a file"));
    console.log(pc.green("i delete folder <name>  Delete a folder"));
    console.log(pc.green("i list files  List all files"));
    console.log(pc.green("i list folders  List all folders"));

    // Add this new command
    console.log(pc.green("  ziro              Clear the terminal"));
  },

  // Version command to display version
  version: () => {
    console.log(pc.green("1.0.0"));
  },

  // init command to initialize a git repository
  init: () => {
    console.log(pc.green("Initializing git repository..."));
    // Run the git init command in the current directory
    const gitInit = spawn("git", ["init"], { stdio: "inherit" });

    gitInit.on("exit", (code) => {
      if (code === 0) {
        console.log(pc.green("Git repository initialized successfully."));
      } else {
        console.error(pc.red(`Git init failed with code ${code}`));
      }
    });
  },
  // git add command
  add: (args) => {
    if (args.length === 0) {
      console.log(pc.green('Running "git add ." to stage all changes...'));
      const gitAdd = spawn("git", ["add", "."], { stdio: "inherit" });

      gitAdd.on("exit", (code) => {
        if (code === 0) {
          console.log(pc.green("All changes have been staged."));
        } else {
          console.error(pc.red(`Git add failed with code ${code}`));
        }
      });
    } else {
      const filename = args[0];
      console.log(pc.green(`Staging file: ${filename}...`));
      const gitAdd = spawn("git", ["add", filename], { stdio: "inherit" });

      gitAdd.on("exit", (code) => {
        if (code === 0) {
          console.log(`${filename} has been staged.`);
        } else {
          console.error(
            pc.red(`Git add failed for ${filename} with code ${code}`)
          );
        }
      });
    }
  },
  // git commit command
  commit: (args) => {
    if (args.length === 0) {
      console.error(
        pc.red("Please provide a commit message using the -m flag.")
      );
      process.exit(1);
    }

    const commitMessage = args.join(" "); // Join all arguments to form the commit message
    console.log(
      pc.green(`Committing changes with message: "${commitMessage}"...`)
    );

    const gitCommit = spawn("git", ["commit", "-m", commitMessage], {
      stdio: "inherit",
    });

    gitCommit.on("exit", (code) => {
      if (code === 0) {
        console.log("Changes committed successfully.");
      } else {
        console.error(pc.red(`Git commit failed with code ${code}`));
      }
    });
  },
  // git branch -M main command
  reBranch: () => {
    console.log(pc.green('Renaming the current branch to "main"...'));
    const gitBranch = spawn("git", ["branch", "-M", "main"], {
      stdio: "inherit",
    });

    gitBranch.on("exit", (code) => {
      if (code === 0) {
        console.log('Branch successfully renamed to "main".');
      } else {
        console.error(pc.red(`Git branch rename failed with code ${code}`));
      }
    });
  },
  status: () => {
    console.log(pc.green("Checking git status..."));
    const gitStatus = spawn("git", ["status"], { stdio: "inherit" });

    gitStatus.on("exit", (code) => {
      if (code !== 0) {
        console.error(pc.red(`Git status failed with code ${code}`));
      }
    });
  },
  // git push command
  push: (args) => {
    const forceFlag = args.includes("-f"); // Check if the -f flag is passed for force push
    const gitPushArgs = ["push", "-u", "origin", "main"];

    if (forceFlag) {
      gitPushArgs.push("--force"); // Add the --force flag if -f is passed
      console.log(pc.green("Force pushing to origin main..."));
    } else {
      console.log(pc.green("Pushing to origin main..."));
    }

    const gitPush = spawn("git", gitPushArgs, { stdio: "inherit" });

    gitPush.on("exit", (code) => {
      if (code === 0) {
        console.log("Push successful.");
      } else {
        console.error(pc.red(`Git push failed with code ${code}`));
      }
    });
  },
  remote: () => {
    console.log(pc.green("Showing git remote repositories..."));
    const gitRemote = spawn("git", ["remote", "-v"], { stdio: "inherit" });

    gitRemote.on("exit", (code) => {
      if (code !== 0) {
        console.error(pc.red(`Git remote failed with code ${code}`));
      }
    });
  },
  remove: () => {
    console.log(pc.green('Removing remote "origin"...'));
    const gitRemove = spawn("git", ["remote", "remove", "origin"], {
      stdio: "inherit",
    });

    gitRemove.on("exit", (code) => {
      if (code === 0) {
        console.log('Remote "origin" removed successfully.');
      } else {
        console.error(
          pc.red(`Failed to remove remote "origin" with code ${code}`)
        );
      }
    });
  },
  // git remote add origin <link>
  addRemote: (args) => {
    if (args.length === 0) {
      console.error(pc.red("Please provide a remote repository URL."));
      process.exit(1);
    }

    const remoteUrl = args[0]; // Get the remote repository URL
    console.log(pc.green(`Adding remote "origin" with URL: ${remoteUrl}...`));

    const gitAddRemote = spawn("git", ["remote", "add", "origin", remoteUrl], {
      stdio: "inherit",
    });

    gitAddRemote.on("exit", (code) => {
      if (code === 0) {
        console.log(`Remote "origin" added successfully: ${remoteUrl}`);
      } else {
        console.error(
          pc.red(`Failed to add remote "origin" with code ${code}`)
        );
      }
    });
  },
  // git branch command
  branch: () => {
    console.log(pc.green("Listing all branches..."));
    const gitBranch = spawn("git", ["branch"], { stdio: "inherit" });

    gitBranch.on("exit", (code) => {
      if (code !== 0) {
        console.error(pc.red(`Git branch command failed with code ${code}`));
      }
    });
  },
  // git checkout <branch>
  checkout: (args) => {
    if (args.length === 0) {
      console.error(pc.red("Please provide a branch name to checkout."));
      process.exit(1);
    }

    const branchName = args[0]; // Get the branch name
    console.log(pc.green(`Switching to branch "${branchName}"...`));

    const gitCheckout = spawn("git", ["checkout", branchName], {
      stdio: "inherit",
    });

    gitCheckout.on("exit", (code) => {
      if (code === 0) {
        console.log(`Switched to branch "${branchName}".`);
      } else {
        console.error(
          pc.red(`Failed to switch to branch "${branchName}" with code ${code}`)
        );
      }
    });
  },
  // git log command
  log: () => {
    console.log(pc.green("Fetching git log (oneline format)..."));
    const gitLog = spawn("git", ["log", "--oneline"], { stdio: "inherit" });

    gitLog.on("exit", (code) => {
      if (code === 0) {
        console.log("Git log fetched successfully.");
      } else {
        console.error(pc.red(`Git log command failed with code ${code}`));
      }
    });
  },
  merge: (branch) => {
    console.log(pc.green(`Merging branch '${branch}'...`));
    const gitMerge = spawn("git", ["merge", branch], { stdio: "inherit" });

    gitMerge.on("exit", (code) => {
      if (code === 0) {
        console.log(`Branch '${branch}' merged successfully.`);
      } else {
        console.error(pc.red(`Git merge failed with code ${code}`));
      }
    });
  },
  reset: (commit) => {
    console.log(pc.green(`Resetting to commit '${commit}'...`));
    const gitReset = spawn("git", ["reset", "--hard", commit], {
      stdio: "inherit",
    });

    gitReset.on("exit", (code) => {
      if (code === 0) {
        console.log(`Reset to commit '${commit}' completed.`);
      } else {
        console.error(pc.red(`Git reset failed with code ${code}`));
      }
    });
  },
  clone: (repositoryUrl) => {
    console.log(pc.green(`Cloning repository from '${repositoryUrl}'...`));
    const gitClone = spawn("git", ["clone", repositoryUrl], {
      stdio: "inherit",
    });

    gitClone.on("exit", (code) => {
      if (code === 0) {
        console.log(`Repository '${repositoryUrl}' cloned successfully.`);
      } else {
        console.error(pc.red(`Git clone failed with code ${code}`));
      }
    });
  },
  ready: async () => {
    console.log(pc.green("Fetching templates from the repository..."));

    try {
      // Fetch the directory contents from the GitHub API
      const response = await fetch(
        "https://api.github.com/repos/seraprogrammer/speeed/contents/template"
      );

      if (!response.ok) {
        throw new Error(pc.red(`HTTP error! status: ${response.status}`));
      }

      const data = await response.json();

      // Filter to get only directories (templates)
      const templates = data.filter((item) => item.type === "dir");

      // Log the number of templates and their names
      console.log(pc.green(`Found ${templates.length} templates:`));
      templates.forEach((template) => {
        console.log(pc.green(`- Template: ${template.name}`));
      });
    } catch (error) {
      console.error(pc.red(`Failed to fetch templates: ${error.message}`));
    }
  },
  install: async (templateName) => {
    // Handle case where templateName might be an array
    if (Array.isArray(templateName)) {
      if (templateName.length === 0) {
        console.error(
          pc.red(
            "Please specify a template name (e.g., 'i install react-router')"
          )
        );
        return;
      }
      templateName = templateName[0]; // Take the first argument as the template name
    } else if (!templateName) {
      console.error(
        pc.red(
          "Please specify a template name (e.g., 'i install react-router')"
        )
      );
      return;
    }

    const repoUrl = "https://github.com/seraprogrammer/speeed.git";
    const templatePath = `template/${templateName}`;
    const currentDir = process.cwd();
    // Create a folder with the template name in the current directory
    const targetDir = path.join(currentDir, templateName);

    console.log(
      pc.green(`Installing ${templateName} template into ${targetDir}...`)
    );

    try {
      // Step 1: Check if the target directory already exists
      try {
        await fs.access(targetDir);
        console.error(
          pc.red(
            `A folder named '${templateName}' already exists in ${currentDir}. Please remove it or choose a different directory.`
          )
        );
        return;
      } catch (error) {
        // If the folder doesn't exist, proceed (this is the expected case)
      }

      // Step 2: Create a temporary directory for cloning
      const tempDir = path.join(currentDir, ".temp-speeed");

      // Make sure the temp directory doesn't exist (clean up from previous runs if needed)
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
      } catch (error) {
        // Ignore errors if directory doesn't exist
      }

      // Step 3: Clone the repository (temporarily) to the hidden directory
      console.log(pc.green("Cloning template repository..."));
      const cloneProcess = spawn(
        "git",
        ["clone", "--depth", "1", repoUrl, tempDir],
        {
          stdio: "inherit",
        }
      );

      await new Promise((resolve, reject) => {
        cloneProcess.on("exit", (code) => {
          if (code === 0) resolve();
          else reject(new Error(pc.red(`Git clone failed with code ${code}`)));
        });
      });

      // Step 4: Check if the template directory exists in the cloned repo
      const sourcePath = path.join(tempDir, templatePath);
      try {
        await fs.access(sourcePath);
      } catch (error) {
        throw new Error(
          pc.red(
            `Template '${templateName}' does not exist in the repository. Use the 'ready' command to see available templates.`
          )
        );
      }

      // Step 5: Create the target directory and copy the template files into it
      await fs.mkdir(targetDir, { recursive: true });
      await fs.cp(sourcePath, targetDir, { recursive: true });

      // Step 6: Clean up the temporary directory
      await fs.rm(tempDir, { recursive: true, force: true });

      console.log(
        `Successfully installed ${templateName} template in ${targetDir}`
      );
      console.log(
        pc.green(`   You can now cd into the directory: cd ${templateName}`)
      );
    } catch (error) {
      console.error(
        pc.red(`Failed to install ${templateName} template: ${error.message}`)
      );
      // Clean up if temp directory exists
      try {
        await fs.rm(path.join(currentDir, ".temp-speeed"), {
          recursive: true,
          force: true,
        });
      } catch (cleanupError) {
        // Ignore cleanup errors
      }

      // Clean up the target directory if it was created but the copy failed
      try {
        await fs.rm(targetDir, { recursive: true, force: true });
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }
  },
  git: () => {
    console.log(pc.green("Starting git operations..."));

    const gitInit = spawn("git", ["init"], { stdio: "inherit" });

    gitInit.on("exit", (code) => {
      if (code !== 0) {
        console.error(pc.red(`Git init failed with code ${code}`));
        return;
      }

      const gitAdd = spawn("git", ["add", "."], { stdio: "inherit" });

      gitAdd.on("exit", (code) => {
        if (code !== 0) {
          console.error(pc.red(`Git add failed with code ${code}`));
          return;
        }

        const randomMessages = [
          "Initial commit",
          "Work in progress",
          "Feature update",
          "Bug fixes",
          "Code cleanup",
        ];
        const randomMsg =
          randomMessages[Math.floor(Math.random() * randomMessages.length)];
        const gitCommit = spawn("git", ["commit", "-m", randomMsg], {
          stdio: "inherit",
        });

        gitCommit.on("exit", (code) => {
          if (code !== 0) {
            console.error(pc.red(`Git commit failed with code ${code}`));
            return;
          }

          const gitBranch = spawn("git", ["branch", "-M", "main"], {
            stdio: "inherit",
          });

          gitBranch.on("exit", (code) => {
            if (code === 0) {
              console.log("Git operations completed successfully:");
              console.log(`- Initialized repository`);
              console.log(`- Added all files`);
              console.log(`- Committed with message: "${randomMsg}"`);
              console.log(`- Renamed branch to main`);
            } else {
              console.error(
                pc.red(`Git branch rename failed with code ${code}`)
              );
            }
          });
        });
      });
    });
  },
  react: () => {
    console.log("Setting up a new project with Vite for React...");

    // Check for npm using a cross-platform approach
    const checkNpmCommand = process.platform === "win32" ? "where" : "which";
    const checkNpm = spawn(checkNpmCommand, ["npm"], { shell: true });
    let npmFound = false;

    checkNpm.stdout.on("data", () => {
      npmFound = true;
    });

    checkNpm.on("close", (code) => {
      console.log(
        "Using npm to create a new Vite project in 'react' folder..."
      );
      // Spawn the Vite create command
      const viteCreate = spawn("npm", ["create", "vite@latest", "react"], {
        stdio: ["pipe", "inherit", "inherit"], // Use pipe for stdin to send input
        shell: true,
      });

      // Wait briefly to ensure the CLI prompt appears, then send input to select "react"
      setTimeout(() => {
        // Simulate selecting the "react" framework by sending the corresponding keypress
        // In Vite's CLI, "react" is typically the 3rd option (index 2, 0-based)
        // We can simulate pressing the down arrow twice and then Enter
        viteCreate.stdin.write("\x1B[B"); // Down arrow
        viteCreate.stdin.write("\x1B[B"); // Down arrow (to select "react")
        viteCreate.stdin.write("\n"); // Enter to confirm selection
        viteCreate.stdin.end(); // Close stdin to let Vite proceed to the variant prompt
      }, 500); // Small delay to ensure the CLI is ready (adjust if needed)

      viteCreate.on("exit", (code) => {
        if (code === 0) {
          console.log("Project created successfully in 'react' folder!");
          console.log("Run 'cd react && npm install' to install dependencies");
          console.log("Then 'npm run dev' to start the development server");
        } else {
          console.error(pc.red(`Failed to create project with code ${code}`));
          if (!npmFound) {
            console.error(
              "This might be because npm is not installed or not in your PATH."
            );
            console.log(
              "Please install npm (Node Package Manager) and try again."
            );
            console.log("You can download it from https://nodejs.org/");
          }
        }
      });

      viteCreate.on("error", (err) => {
        console.error(pc.red(`Error executing npm: ${err.message}`));
        if (err.code === "ENOENT") {
          console.log("Make sure npm is installed and in your PATH.");
          console.log("You can download it from https://nodejs.org/");
        }
      });
    });
  },
  vite: () => {
    console.log(pc.green("Creating new Vite project..."));

    // Check for npm using a cross-platform approach
    const checkNpmCommand = process.platform === "win32" ? "where" : "which";
    const checkNpm = spawn(checkNpmCommand, ["npm"], { shell: true });
    let npmFound = false;

    checkNpm.stdout.on("data", () => {
      npmFound = true;
    });

    checkNpm.on("close", () => {
      // Run the create-vite command
      const createVite = spawn("npm", ["create", "vite@latest"], {
        stdio: "inherit",
        shell: true,
      });

      createVite.on("exit", (code) => {
        if (code === 0) {
          console.log("Vite project created successfully.");
        } else {
          console.error(
            pc.red(`Vite project creation failed with code ${code}`)
          );
        }
      });

      createVite.on("error", (err) => {
        console.error(pc.red(`Error executing npm: ${err.message}`));
        if (err.code === "ENOENT") {
          console.log("Make sure npm is installed and in your PATH.");
          console.log("You can download it from https://nodejs.org/");
        }
      });
    });
  },
  vilo: () => {
    console.log(pc.green("Creating new vilo project..."));

    // Check for npm using a cross-platform approach
    const checkNpmCommand = process.platform === "win32" ? "where" : "which";
    const checkNpm = spawn(checkNpmCommand, ["npm"], { shell: true });
    let npmFound = false;

    checkNpm.stdout.on("data", () => {
      npmFound = true;
    });

    checkNpm.on("close", () => {
      // Run the create-vilo command
      const createVilo = spawn("npm", ["create", "vilo@latest"], {
        stdio: "inherit",
        shell: true,
      });

      createVilo.on("exit", (code) => {
        if (code === 0) {
          console.log("vilo project created successfully.");
        } else {
          console.error(
            pc.red(`vilo project creation failed with code ${code}`)
          );
        }
      });

      createVilo.on("error", (err) => {
        console.error(pc.red(`Error executing npm: ${err.message}`));
        if (err.code === "ENOENT") {
          console.log("Make sure npm is installed and in your PATH.");
          console.log("You can download it from https://nodejs.org/");
        }
      });
    });
  },
  next: () => {
    console.log(pc.green("Creating new Next.js project..."));

    // Check for npm using a cross-platform approach
    const checkNpmCommand = process.platform === "win32" ? "where" : "which";
    const checkNpm = spawn(checkNpmCommand, ["npm"], { shell: true });
    let npmFound = false;

    checkNpm.stdout.on("data", () => {
      npmFound = true;
    });

    checkNpm.on("close", () => {
      // Run the create-next-app command
      const createNext = spawn("npx", ["create-next-app@latest"], {
        stdio: "inherit",
        shell: true,
      });

      createNext.on("exit", (code) => {
        if (code === 0) {
          console.log("Next.js project created successfully.");
          console.log("To start your development server:");
          console.log("1. cd into your project directory");
          console.log("2. Run 'npm run dev'");
        } else {
          console.error(
            pc.red(`Next.js project creation failed with code ${code}`)
          );
        }
      });

      createNext.on("error", (err) => {
        console.error(pc.red(`Error executing npx: ${err.message}`));
        if (err.code === "ENOENT") {
          console.log("Make sure npm/npx is installed and in your PATH.");
          console.log("You can download it from https://nodejs.org/");
        }
      });
    });
  },
  ts: (args) => {
    if (args.length === 0) {
      console.error(pc.red("Please specify a TypeScript file to run."));
      process.exit(1);
    }

    const tsFilePath = args[0];
    const shouldCompile = args.includes("-c");

    // Remove -c from args if present to not pass it to the execution
    const filteredArgs = args.filter((arg) => arg !== "-c");

    // If -c flag is present, compile the file instead of running it
    if (shouldCompile) {
      console.log(`Compiling TypeScript file: ${tsFilePath}`);
    } else {
      console.log(`Running TypeScript file: ${tsFilePath}`);
    }

    // Check if TypeScript is already installed
    const checkTypeScript = spawn("npm", ["list", "typescript"], {
      stdio: "pipe",
      shell: true,
    });

    let isInstalled = false;
    checkTypeScript.stdout.on("data", (data) => {
      if (!data.toString().includes("(empty)")) {
        isInstalled = true;
      }
    });

    checkTypeScript.on("close", (code) => {
      if (!isInstalled) {
        console.log(
          pc.green("TypeScript is not installed. Installing dependencies...")
        );
        // Install TypeScript and ts-node if not present
        const installDeps = spawn(
          "npm",
          ["install", "--save-dev", "typescript", "ts-node"],
          {
            stdio: "inherit",
            shell: true,
          }
        );

        installDeps.on("exit", (code) => {
          if (code === 0) {
            console.log(pc.green("Dependencies installed successfully."));
            if (shouldCompile) {
              compileWithTsc();
            } else {
              runWithTsNode();
            }
          } else {
            console.error(
              "Failed to install dependencies. Please try manually:"
            );
            console.error(pc.red("npm install --save-dev typescript ts-node"));
            process.exit(1);
          }
        });
      } else {
        // TypeScript is already installed
        if (shouldCompile) {
          compileWithTsc();
        } else {
          runWithTsNode();
        }
      }
    });

    function compileWithTsc() {
      const tsc = spawn(
        "npx",
        ["tsc", tsFilePath, "--target", "ES2016", "--module", "CommonJS"],
        {
          stdio: "inherit",
          shell: true,
        }
      );

      tsc.on("exit", (code) => {
        if (code === 0) {
          const jsFilePath = tsFilePath.replace(".ts", ".js");
          console.log(pc.green(`Successfully compiled to ${jsFilePath}`));
        } else {
          console.error(
            pc.red(`TypeScript compilation failed with code ${code}`)
          );
        }
      });

      tsc.on("error", (err) => {
        console.error(pc.red(`Error during compilation: ${err.message}`));
      });
    }

    function runWithTsNode() {
      const tsNode = spawn(
        "npx",
        [
          "ts-node",
          "--transpile-only",
          "--prefer-ts-exts",
          "--files",
          tsFilePath,
          ...filteredArgs.slice(1),
        ],
        {
          stdio: "inherit",
          shell: true,
          env: {
            ...process.env,
            TS_NODE_COMPILER_OPTIONS: JSON.stringify({
              module: "commonjs",
              moduleResolution: "node",
            }),
          },
        }
      );

      tsNode.on("exit", (code) => {
        if (code !== 0) {
          console.error(
            pc.red(`TypeScript execution exited with code ${code}`)
          );
        }
      });

      tsNode.on("error", (err) => {
        console.error(
          pc.red(`Error executing TypeScript file: ${err.message}`)
        );
        if (err.code === "ENOENT") {
          console.log(
            pc.red("Error running ts-node. Please try reinstalling:")
          );
          console.log(pc.red("npm install --save-dev typescript ts-node"));
        }
      });
    }
  },
  get: (args) => {
    if (args.length === 0) {
      console.error(pc.red("Please specify a package to install."));
      process.exit(1);
    }

    const packageName = args[0];
    const isGlobal = args.includes("g");
    const installCommand = ["install"];

    if (isGlobal) {
      installCommand.push("-g");
      console.log(pc.green(`Installing ${packageName} globally...`));
    } else {
      console.log(pc.green(`Installing ${packageName} locally...`));
    }

    installCommand.push(packageName);

    const npmInstall = spawn("npm", installCommand, {
      stdio: "inherit",
      shell: true,
    });

    npmInstall.on("exit", (code) => {
      if (code === 0) {
        console.log(
          `Successfully installed ${packageName}${isGlobal ? " globally" : ""}`
        );
        console.log(
          `You can now use ${packageName} ${
            isGlobal ? "from anywhere" : "in your project"
          }`
        );
      } else {
        console.error(
          pc.red(`Failed to install ${packageName} with code ${code}`)
        );
      }
    });

    npmInstall.on("error", (err) => {
      console.error(pc.red(`Error executing npm: ${err.message}`));
      if (err.code === "ENOENT") {
        console.log(pc.red("Make sure npm is installed and in your PATH."));
        console.log(pc.red("You can download it from https://nodejs.org/"));
      }
    });
  },
  pnpm: (args) => {
    if (args.length === 0) {
      console.error(pc.red("Please specify a file to run or an operation."));
      process.exit(1);
    }

    const operation = args[0];

    if (operation === "i" || operation === "install") {
      // Handle pnpm install
      console.log(pc.green("Installing PNPM globally..."));
      const installPnpm = spawn("npm", ["install", "-g", "pnpm@latest-10"], {
        stdio: "inherit",
        shell: true,
      });

      installPnpm.on("exit", (code) => {
        if (code === 0) {
          console.log(pc.green("PNPM installed successfully"));
        } else {
          console.error(pc.red(`PNPM installation failed with code ${code}`));
        }
      });
    } else if (operation === "get") {
      // Handle pnpm package installation
      if (args.length < 2) {
        console.error(pc.red("Please specify a package to install."));
        process.exit(1);
      }
      const packageName = args[1];
      console.log(pc.green(`Installing ${packageName} using PNPM...`));
      const installPackage = spawn("pnpm", ["add", packageName], {
        stdio: "inherit",
        shell: true,
      });

      installPackage.on("exit", (code) => {
        if (code === 0) {
          console.log(pc.green(`Successfully installed ${packageName}`));
        } else {
          console.error(pc.red(`Failed to install ${packageName}`));
        }
      });
    } else {
      // Handle running files with pnpm
      console.log(pc.green(`Running ${operation} with PNPM...`));
      const pnpmRun = spawn("pnpm", ["node", operation, ...args.slice(1)], {
        stdio: "inherit",
        shell: true,
      });

      pnpmRun.on("exit", (code) => {
        if (code !== 0) {
          console.error(pc.red(`Script exited with code ${code}`));
        }
      });
    }
  },
  create: (args) => {
    if (args.length < 2) {
      console.error(pc.red("Please specify what to create and its name."));
      console.log(pc.green("Usage: i create <file|folder> <name>"));
      process.exit(1);
    }

    const type = args[0].toLowerCase();
    const name = args[1];

    switch (type) {
      case "file":
        console.log(pc.green(`Creating file: ${name}`));
        fs.writeFile(name, "", { flag: "wx" })
          .then(() => {
            console.log(pc.green(`File '${name}' created successfully.`));
          })
          .catch((err) => {
            if (err.code === "EEXIST") {
              console.error(pc.red(`File '${name}' already exists.`));
            } else {
              console.error(pc.red(`Error creating file: ${err.message}`));
            }
          });
        break;

      case "folder":
        console.log(pc.green(`Creating folder: ${name}`));
        fs.mkdir(name)
          .then(() => {
            console.log(pc.green(`Folder '${name}' created successfully.`));
          })
          .catch((err) => {
            if (err.code === "EEXIST") {
              console.error(pc.red(`Folder '${name}' already exists.`));
            } else {
              console.error(pc.red(`Error creating folder: ${err.message}`));
            }
          });
        break;

      default:
        console.error(
          pc.red(`Invalid type '${type}'. Use 'file' or 'folder'.`)
        );
        process.exit(1);
    }
  },

  update: (args) => {
    if (args.length < 2) {
      console.error(pc.red("Please specify the file and content."));
      console.log(pc.green("Usage: i update <file> <content>"));
      process.exit(1);
    }

    const fileName = args[0];
    const content = args.slice(1).join(" ");

    fs.writeFile(fileName, content)
      .then(() => {
        console.log(pc.green(`File '${fileName}' updated successfully.`));
      })
      .catch((err) => {
        console.error(pc.red(`Error updating file: ${err.message}`));
      });
  },

  delete: (args) => {
    if (args.length < 2) {
      console.error(pc.red("Please specify what to delete and its name."));
      console.log(pc.green("Usage: i delete <file|folder> <name>"));
      process.exit(1);
    }

    const type = args[0].toLowerCase();
    const name = args[1];

    switch (type) {
      case "file":
        console.log(pc.green(`Deleting file: ${name}`));
        fs.unlink(name)
          .then(() => {
            console.log(pc.green(`File '${name}' deleted successfully.`));
          })
          .catch((err) => {
            console.error(pc.red(`Error deleting file: ${err.message}`));
          });
        break;

      case "folder":
        console.log(pc.green(`Deleting folder: ${name}`));
        fs.rm(name, { recursive: true, force: true })
          .then(() => {
            console.log(pc.green(`Folder '${name}' deleted successfully.`));
          })
          .catch((err) => {
            console.error(pc.red(`Error deleting folder: ${err.message}`));
          });
        break;

      default:
        console.error(
          pc.red(`Invalid type '${type}'. Use 'file' or 'folder'.`)
        );
        process.exit(1);
    }
  },

  // Add a command to list files and folders
  list: () => {
    console.log(pc.green("Listing files and folders in current directory:"));
    fs.readdir(process.cwd(), { withFileTypes: true })
      .then((entries) => {
        const files = entries
          .filter((entry) => entry.isFile())
          .map((entry) => pc.blue(entry.name));
        const folders = entries
          .filter((entry) => entry.isDirectory())
          .map((entry) => pc.yellow(entry.name));

        console.log("\nFolders:");
        folders.forEach((folder) => console.log(`${folder}`));

        console.log("\nFiles:");
        files.forEach((file) => console.log(`${file}`));
      })
      .catch((err) => {
        console.error(pc.red(`Error listing directory: ${err.message}`));
      });
  },

  // Add this new command
  ziro: () => {
    // Cross-platform clear command
    const clear = process.platform === "win32" ? "cls" : "clear";
    const clearProcess = spawn(clear, [], {
      stdio: "inherit",
      shell: true,
    });

    clearProcess.on("error", (err) => {
      console.error(pc.red(`Error clearing terminal: ${err.message}`));
    });
  },

  ping: async (args) => {
    const now = new Date();
    const os = require("os");
    const showPrivate = args.includes("-p");

    // Basic public information
    console.log(pc.green("System Information:"));
    console.log(pc.blue("Date:"), pc.yellow(now.toLocaleDateString()));
    console.log(pc.blue("Time:"), pc.yellow(now.toLocaleTimeString()));
    console.log(pc.blue("Seconds:"), pc.yellow(now.getSeconds()));
    console.log(pc.blue("OS:"), pc.yellow(os.platform()));
    console.log(pc.blue("Architecture:"), pc.yellow(os.arch()));
    console.log(pc.blue("Node Version:"), pc.yellow(process.version));

    // Only show private/detailed information if -p flag is present
    if (showPrivate) {
      const dns = require("dns");
      const networkInterfaces = os.networkInterfaces();
      const { execSync } = require("child_process");

      // System Details
      console.log(pc.green("\nDetailed System Information:"));
      console.log(pc.blue("Current Path:"), pc.yellow(process.cwd()));
      console.log(
        pc.blue("Total Memory:"),
        pc.yellow((os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB")
      );
      console.log(
        pc.blue("Free Memory:"),
        pc.yellow((os.freemem() / 1024 / 1024 / 1024).toFixed(2) + " GB")
      );
      console.log(pc.blue("CPU Model:"), pc.yellow(os.cpus()[0].model));
      console.log(pc.blue("CPU Cores:"), pc.yellow(os.cpus().length));
      console.log(
        pc.blue("CPU Speed:"),
        pc.yellow(os.cpus()[0].speed + " MHz")
      );
      console.log(pc.blue("Username:"), pc.yellow(os.userInfo().username));
      console.log(pc.blue("Home Directory:"), pc.yellow(os.homedir()));
      console.log(
        pc.blue("System Uptime:"),
        pc.yellow((os.uptime() / 3600).toFixed(2) + " hours")
      );
      console.log(pc.blue("Process PID:"), pc.yellow(process.pid));
      console.log(pc.blue("OS Type:"), pc.yellow(os.type()));
      console.log(pc.blue("OS Release:"), pc.yellow(os.release()));
      console.log(pc.blue("OS Version:"), pc.yellow(os.version()));
      console.log(pc.blue("Hostname:"), pc.yellow(os.hostname()));

      // CPU Load Average
      const loadAvg = os.loadavg();
      console.log(
        pc.blue("CPU Load (1m):"),
        pc.yellow((loadAvg[0] * 100).toFixed(1) + "%")
      );
      console.log(
        pc.blue("CPU Load (5m):"),
        pc.yellow((loadAvg[1] * 100).toFixed(1) + "%")
      );
      console.log(
        pc.blue("CPU Load (15m):"),
        pc.yellow((loadAvg[2] * 100).toFixed(1) + "%")
      );

      // Memory Details
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;
      console.log(
        pc.blue("Memory Usage:"),
        pc.yellow(((usedMem / totalMem) * 100).toFixed(1) + "%")
      );

      // Network Information
      console.log(pc.green("\nNetwork Information:"));

      // Internet Connectivity Check
      try {
        await new Promise((resolve, reject) => {
          dns.lookup("google.com", (err) => {
            if (err) reject(err);
            resolve();
          });
        });
        console.log(pc.blue("Internet:"), pc.green("Connected"));

        // DNS Servers
        dns.getServers().forEach((server, index) => {
          console.log(pc.blue(`DNS Server ${index + 1}:`), pc.yellow(server));
        });
      } catch (err) {
        console.log(pc.blue("Internet:"), pc.red("Disconnected"));
      }

      // Network Interfaces
      Object.keys(networkInterfaces).forEach((interfaceName) => {
        networkInterfaces[interfaceName].forEach((interface) => {
          console.log(
            pc.blue(`${interfaceName}:`),
            pc.yellow(interface.address)
          );
          console.log(pc.blue(`   Family:`), pc.yellow(interface.family));
          console.log(pc.blue(`   MAC:`), pc.yellow(interface.mac));
          console.log(pc.blue(`   Internal:`), pc.yellow(interface.internal));
        });
      });

      // Development Environment
      console.log(pc.green("\nDevelopment Environment:"));
      const devTools = [
        { cmd: "git --version", name: "Git" },
        { cmd: "node --version", name: "Node.js" },
        { cmd: "npm --version", name: "npm" },
        { cmd: "yarn --version", name: "Yarn" },
        { cmd: "docker --version", name: "Docker" },
        { cmd: "python --version", name: "Python" },
        { cmd: "java -version", name: "Java" },
        { cmd: "gcc --version", name: "GCC" },
        { cmd: "rustc --version", name: "Rust" },
        { cmd: "go version", name: "Go" },
      ];

      for (const tool of devTools) {
        try {
          const version = execSync(tool.cmd, {
            stdio: ["ignore", "pipe", "ignore"],
          })
            .toString()
            .trim();
          console.log(pc.blue(`${tool.name}:`), pc.green(version));
        } catch (err) {
          console.log(pc.blue(`${tool.name}:`), pc.red("Not installed"));
        }
      }

      // Package Managers
      console.log(pc.green("\nPackage Managers:"));
      const packageManagers = [
        { cmd: "npm -v", name: "npm" },
        { cmd: "yarn -v", name: "yarn" },
        { cmd: "pnpm -v", name: "pnpm" },
        { cmd: "pip -V", name: "pip" },
        { cmd: "cargo --version", name: "cargo" },
      ];

      for (const pm of packageManagers) {
        try {
          const version = execSync(pm.cmd, {
            stdio: ["ignore", "pipe", "ignore"],
          })
            .toString()
            .trim();
          console.log(pc.blue(`${pm.name}:`), pc.green(version));
        } catch (err) {
          console.log(pc.blue(`${pm.name}:`), pc.red("Not installed"));
        }
      }

      // Environment Variables
      console.log(pc.green("\nEnvironment Variables:"));
      const envVars = [
        "PATH",
        "HOME",
        "SHELL",
        "LANG",
        "TERM",
        "USER",
        "DISPLAY",
        "EDITOR",
        "PWD",
        "JAVA_HOME",
        "GOPATH",
        "PYTHONPATH",
        "NVM_DIR",
        "ANDROID_HOME",
        "MAVEN_HOME",
        "GRADLE_HOME",
      ];
      envVars.forEach((env) => {
        console.log(
          pc.blue(`${env}:`),
          pc.yellow(process.env[env] || "Not set")
        );
      });

      // Process Information
      console.log(pc.green("\nProcess Information:"));
      console.log(pc.blue("Process ID:"), pc.yellow(process.pid));
      console.log(pc.blue("Parent Process ID:"), pc.yellow(process.ppid));
      console.log(pc.blue("Process Title:"), pc.yellow(process.title));
      console.log(
        pc.blue("Current Working Directory:"),
        pc.yellow(process.cwd())
      );
      console.log(pc.blue("Execution Path:"), pc.yellow(process.execPath));
      console.log(pc.blue("Platform:"), pc.yellow(process.platform));
      console.log(pc.blue("Architecture:"), pc.yellow(process.arch));
      console.log(pc.blue("Node.js Version:"), pc.yellow(process.version));
      console.log(pc.blue("V8 Version:"), pc.yellow(process.versions.v8));
    }
  },
};

// Shortcut mapping for commands
const shortcuts = {
  "-v": "version", // `-v` is a shortcut for the `version` command
  "-h": "help", // `-h` is a shortcut for the `help` command
  "-i": "init", // `-i` is a shortcut for the `init` command
  "-a": "add", // `-a` is a shortcut for the `add` command
  "-c": "commit", // `-c` is a shortcut for the `commit` command
  "-br": "reBranch", // `-br` is a shortcut for the `branch` command
  "-s": "status", // `-s` is a shortcut for the `status` command
  "-p": "push", // `-p` is a shortcut for the `push` command
  "-r": "remote", // `-r` is a shortcut for the `remote` command
  "-rm": "remove", // `-rm` is a shortcut for the `remove` command
  "-add": "addRemote", // `-add` is a shortcut for the `addRemote` command
  "-b": "branch", // `-b` is a shortcut for the `branch` command
  "-c": "checkout", // `-c` is a shortcut for the `checkout` command
  "-l": "log", // `-l` is a shortcut for the `log` command
  "-m": "merge", // `-m` is a shortcut for the `merge` command
  "-re": "reset", // `-re` is a shortcut for the `reset` command
  "-cp": "clone", // `-cp` is a shortcut for the `clone` command
  "-rd": "ready", // `-rd` is a shortcut for the `ready` command
  "-temp": "install", // `-temp` is a shortcut for the `install` command
  "-git": "git", // `-git` is a shortcut for the `git` command
  "-vite": "vite", // `-vite` is a shortcut for the `vite` command
  "-vilo": "vilo", // `-vilo` is a shortcut for the `vilo` command
  "-next": "next", // `-next` is a shortcut for the `next` command
  "-ts": "ts", // `-ts` is a shortcut for the `ts` command
  "-g": "get", // Add shortcut for get command
  "-pn": "pnpm", // Add shortcut for pnpm command
  "-mk": "create", // Add shortcut for create command
  "-up": "update", // Add shortcut for update command
  "-del": "delete", // Add shortcut for delete command
  "-ls": "list", // Add shortcut for list command
  0: "ziro", // Add this new shortcut
  "-ping": "ping", // Add shortcut for ping command
};

// Main function to parse and execute commands
function main() {
  const [command, ...args] = process.argv.slice(2);

  // Check if the command is a shortcut and map it to the full command
  const mappedCommand = shortcuts[command] || command;

  // If the command is unknown, display an error
  if (!commands[mappedCommand]) {
    console.error(
      pc.red('Unknown command. Use "-h" to see available commands.')
    );
    process.exit(1);
  }

  // Execute the corresponding command function
  commands[mappedCommand](args);
}

// Execute the main function
main();
