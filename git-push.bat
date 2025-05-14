@echo off
echo ===== PromptForge Git Push Script =====
echo.

echo Step 1: Initializing Git repository (if not already initialized)...
git init
if %ERRORLEVEL% NEQ 0 (
    echo Error initializing Git repository.
    goto error
)
echo Git repository initialized successfully.
echo.

echo Step 2: Adding remote origin (if not already added)...
git remote -v | findstr "origin" > nul
if %ERRORLEVEL% NEQ 0 (
    git remote add origin https://github.com/5at4am/Prompt-Forge.git
    if %ERRORLEVEL% NEQ 0 (
        echo Error adding remote origin.
        goto error
    )
    echo Remote origin added successfully.
) else (
    echo Remote origin already exists.
)
echo.

echo Step 3: Adding all files to staging area...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo Error adding files to staging area.
    goto error
)
echo Files added to staging area successfully.
echo.

echo Step 4: Committing changes...
git commit -m "Initial commit: PromptForge application"
if %ERRORLEVEL% NEQ 0 (
    echo Error committing changes.
    goto error
)
echo Changes committed successfully.
echo.

echo Step 5: Pushing to GitHub repository...
git push -u origin master
if %ERRORLEVEL% NEQ 0 (
    echo Error pushing to GitHub. Trying alternative branch name...
    git push -u origin main
    if %ERRORLEVEL% NEQ 0 (
        echo Error pushing to GitHub with alternative branch name.
        goto error
    )
)
echo.
echo Changes pushed to GitHub successfully!
echo.
echo ===== Process completed successfully! =====
goto end

:error
echo.
echo ===== An error occurred during the process. =====
echo Please check the error message above and try again.
echo If you need help, refer to the GITHUB_UPLOAD_GUIDE.md file.

:end
pause
