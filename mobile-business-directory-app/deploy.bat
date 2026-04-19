@echo off
REM BizDirectory - Quick Deployment Script for Windows
REM This script helps you deploy to GitHub quickly

echo.
echo ========================================
echo   BizDirectory - GitHub Deployment
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Check if this is already a git repository
if exist .git (
    echo [OK] Git repository already initialized
) else (
    echo Initializing Git repository...
    git init
    echo [OK] Git repository initialized
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Remote origin already configured
    for /f "delims=" %%i in ('git remote get-url origin') do set REMOTE_URL=%%i
    echo    Current remote: %REMOTE_URL%
) else (
    echo.
    echo Please enter your GitHub repository URL
    echo (e.g., https://github.com/username/repo-name.git)
    set /p REPO_URL="Repository URL: "
    
    if "%REPO_URL%"=="" (
        echo ERROR: No URL provided. Exiting.
        pause
        exit /b 1
    )
    
    git remote add origin %REPO_URL%
    echo [OK] Remote origin configured
)

REM Add all files
echo.
echo Adding files to git...
git add .

REM Commit
echo.
set /p COMMIT_MSG="Enter commit message (or press Enter for default): "
if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=Deploy BizDirectory app
)

git commit -m "%COMMIT_MSG%"
echo [OK] Files committed

REM Push to GitHub
echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   Successfully pushed to GitHub!
    echo ========================================
    echo.
    echo Next Steps:
    echo 1. Go to your GitHub repository
    echo 2. Click 'Settings' - 'Pages'
    echo 3. Under 'Source', select 'GitHub Actions'
    echo 4. Wait for deployment (check 'Actions' tab)
    echo 5. Your app will be live at:
    echo    https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
    echo.
    echo Happy deploying!
) else (
    echo.
    echo ERROR: Push failed. Please check the error above.
    echo.
    echo Common solutions:
    echo - Make sure the repository URL is correct
    echo - Check if you have permission to push
    echo - Verify your GitHub credentials
)

echo.
pause
