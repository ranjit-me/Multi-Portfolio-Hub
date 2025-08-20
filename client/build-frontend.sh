#!/bin/bash

# Docker build script for React client

echo "🏗️  Building React Frontend Docker Image..."

# Build the Docker image
docker build -t portfolio-client .

if [ $? -eq 0 ]; then
    echo "✅ Frontend Docker image built successfully!"
    echo "📦 Image: portfolio-client"
    echo "🚀 To run: docker run -d -p 3000:80 --name portfolio-frontend portfolio-client"
else
    echo "❌ Failed to build frontend Docker image"
    exit 1
fi
