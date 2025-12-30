#!/bin/bash

# Healthcare Simple - Development Server Starter
# This script starts a local development server

echo "🏥 Healthcare Website - Simple Version"
echo "======================================"
echo ""

# Check which server is available
if command -v python3 &> /dev/null; then
    echo "✅ Starting Python HTTP Server..."
    echo "📂 Server running at: http://localhost:8000"
    echo "🌐 Open browser: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Starting Python 2 HTTP Server..."
    echo "📂 Server running at: http://localhost:8000"
    echo "🌐 Open browser: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
elif command -v php &> /dev/null; then
    echo "✅ Starting PHP Built-in Server..."
    echo "📂 Server running at: http://localhost:8000"
    echo "🌐 Open browser: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:8000
elif command -v node &> /dev/null; then
    if command -v npx &> /dev/null; then
        echo "✅ Starting Node.js HTTP Server..."
        echo "📂 Server running at: http://localhost:8000"
        echo "🌐 Open browser: http://localhost:8000"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        npx http-server -p 8000
    else
        echo "❌ Error: npx not found"
        echo "Please install Node.js or use Python"
    fi
else
    echo "❌ Error: No suitable HTTP server found"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3: brew install python3"
    echo "  - PHP: brew install php"
    echo "  - Node.js: brew install node"
    echo ""
    echo "Or simply open index.html in your browser"
fi
