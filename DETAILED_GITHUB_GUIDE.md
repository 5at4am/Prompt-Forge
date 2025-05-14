# Detailed Guide: Pushing PromptForge to GitHub

This guide provides step-by-step instructions with screenshots to help you push your PromptForge project to GitHub.

## Method 1: Using the Provided Script

The easiest way to push your project is to use the provided script:

1. Navigate to your `prop` folder
2. Double-click on the `git-push.bat` file
3. Follow the prompts in the command window

If the script runs successfully, your project will be pushed to GitHub. If not, try Method 2 below.

## Method 2: Using Git Commands Manually

### Step 1: Open Command Prompt or PowerShell

1. Press `Win + R` to open the Run dialog
2. Type `cmd` or `powershell` and press Enter
3. Navigate to your project directory:
   ```
   cd path\to\prop
   ```

### Step 2: Initialize Git Repository

```
git init
```

![Git Init](https://via.placeholder.com/600x100/ffffff/000000?text=git+init+command+output)

### Step 3: Add Remote Repository

```
git remote add origin https://github.com/5at4am/Prompt-Forge.git
```

To verify the remote was added correctly:
```
git remote -v
```

![Git Remote](https://via.placeholder.com/600x100/ffffff/000000?text=git+remote+command+output)

### Step 4: Add Files to Staging Area

```
git add .
```

To check which files are staged:
```
git status
```

![Git Add](https://via.placeholder.com/600x200/ffffff/000000?text=git+status+command+output)

### Step 5: Commit Changes

```
git commit -m "Initial commit: PromptForge application"
```

![Git Commit](https://via.placeholder.com/600x150/ffffff/000000?text=git+commit+command+output)

### Step 6: Push to GitHub

```
git push -u origin master
```

If your default branch is named 'main' instead of 'master', use:
```
git push -u origin main
```

![Git Push](https://via.placeholder.com/600x200/ffffff/000000?text=git+push+command+output)

## Method 3: Using GitHub Desktop

If you're having trouble with command-line Git, GitHub Desktop provides a user-friendly interface:

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Click on "File" > "Add local repository"
4. Browse to your `prop` folder and select it
5. If it's not a Git repository yet, you'll be prompted to initialize it
6. Fill in the repository name and description
7. Click on "Publish repository"
8. Enter the GitHub repository URL: https://github.com/5at4am/Prompt-Forge.git
9. Click "Publish"

## Troubleshooting

### Authentication Issues

If you're prompted for credentials and your password doesn't work, you'll need to use a personal access token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token"
3. Give it a name, select the "repo" scope
4. Click "Generate token"
5. Copy the token and use it instead of your password when prompted

### "Updates were rejected" Error

If you see an error like "Updates were rejected because the remote contains work that you do not have locally":

1. Try pulling first:
   ```
   git pull origin master --allow-unrelated-histories
   ```
   or
   ```
   git pull origin main --allow-unrelated-histories
   ```

2. Resolve any conflicts if necessary
3. Commit the merged changes:
   ```
   git commit -m "Merge remote changes"
   ```
4. Push again:
   ```
   git push -u origin master
   ```

### Branch Name Issues

If you're unsure about the default branch name:

1. Check the GitHub repository to see if it uses 'main' or 'master'
2. Use the corresponding branch name in your push command

## Verification

After pushing, visit https://github.com/5at4am/Prompt-Forge to verify that your files have been uploaded successfully.

If you see your files in the repository, congratulations! Your PromptForge project is now on GitHub.
