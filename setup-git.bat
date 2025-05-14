@echo off
echo Setting up Git repository for PromptForge...

echo Initializing Git repository...
git init

echo Adding remote origin...
git remote add origin https://github.com/5at4am/Prompt-Forge.git

echo Adding all files to Git...
git add .

echo Committing files...
git commit -m "Initial commit: PromptForge application"

echo Pushing to GitHub...
git push -u origin master

echo Done! Your PromptForge repository has been set up and pushed to GitHub.
pause
