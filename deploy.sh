#!/bin/bash

echo "🚀 BayMax Deployment Script"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Your app is ready for deployment!"
    echo ""
    echo "📁 Build files are in the 'dist' folder"
    echo ""
    echo "🌐 Deployment Options:"
    echo "1. Vercel (Recommended):"
    echo "   - Go to https://vercel.com"
    echo "   - Connect your GitHub repository"
    echo "   - Deploy automatically"
    echo ""
    echo "2. Netlify:"
    echo "   - Go to https://netlify.com"
    echo "   - Drag and drop the 'dist' folder"
    echo ""
    echo "3. GitHub Pages:"
    echo "   - Run: npm install --save-dev gh-pages"
    echo "   - Add deploy script to package.json"
    echo "   - Run: npm run deploy"
    echo ""
    echo "💡 For the easiest deployment, use Vercel!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi 