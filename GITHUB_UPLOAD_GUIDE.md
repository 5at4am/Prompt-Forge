# Guide to Upload PromptForge to GitHub

This guide will walk you through the process of uploading the PromptForge project to the specified GitHub repository.

## Prerequisites

- Git installed on your computer
- GitHub account
- Access to the repository: https://github.com/5at4am/Prompt-Forge.git

## Method 1: Using the Setup Script

1. Open a command prompt or terminal in the `prop` directory
2. Run the setup script:
   ```
   setup-git.bat
   ```
3. If prompted for GitHub credentials, enter your username and password/token
4. Wait for the process to complete

## Method 2: Manual Setup

If the script doesn't work, follow these manual steps:

1. Open a command prompt or terminal in the `prop` directory
2. Initialize a Git repository:
   ```
   git init
   ```
3. Add the remote repository:
   ```
   git remote add origin https://github.com/5at4am/Prompt-Forge.git
   ```
4. Add all files to the staging area:
   ```
   git add .
   ```
5. Commit the files:
   ```
   git commit -m "Initial commit: PromptForge application"
   ```
6. Push to GitHub:
   ```
   git push -u origin master
   ```
   
   Note: If the repository uses `main` as the default branch instead of `master`, use:
   ```
   git push -u origin main
   ```

## Troubleshooting

### Authentication Issues

If you encounter authentication issues, you may need to use a personal access token instead of your password:

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with the `repo` scope
3. Use this token instead of your password when prompted

### Branch Issues

If you get an error about the remote branch, try:

```
git push -u origin master:main
```

or

```
git push -u origin master:master
```

depending on the default branch name of the repository.

### Existing Repository

If the repository already contains files, you may need to pull first:

```
git pull origin main --allow-unrelated-histories
```

Then resolve any conflicts before pushing.

## Verification

After pushing, visit https://github.com/5at4am/Prompt-Forge to verify that your files have been uploaded successfully.
