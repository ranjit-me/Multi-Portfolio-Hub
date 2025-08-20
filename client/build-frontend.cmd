@echo off
REM Docker build script for React client (Windows)

echo 🏗️  Building React Frontend Docker Image...

REM Build the Docker image
docker build -t portfolio-client .

if %errorlevel% equ 0 (
    echo ✅ Frontend Docker image built successfully!
    echo 📦 Image: portfolio-client
    echo 🚀 To run: docker run -d -p 3000:80 --name portfolio-frontend portfolio-client
) else (
    echo ❌ Failed to build frontend Docker image
    exit /b 1
)
