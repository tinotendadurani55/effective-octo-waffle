#!/bin/bash

# Kidjustin-k V13 Deployment Helper
echo "🚀 Preparing Kidjustin-k for Koyeb..."

# 1. Check for session folder
if [ -d "./session" ]; then
    echo "📦 Session found. Creating backup..."
    
    # Create a zip of the session folder
    zip -r session_backup.zip ./session > /dev/null
    
    # Convert to Base64 for Koyeb Env Variable
    B64_SESSION=$(base64 -w 0 session_backup.zip)
    
    echo "----------------------------------------------------"
    echo "📋 COPY THIS STRING TO YOUR KOYEB 'SESSION_ID' VAR:"
    echo "Kidjustin-k~$B64_SESSION"
    echo "----------------------------------------------------"
    
    # Cleanup local zip
    rm session_backup.zip
else
    echo "❌ No session folder found. Pair the bot first!"
fi

# 2. Update Linux dependencies
echo "🛠️ Updating system dependencies..."
# Note: On Koyeb (Ubuntu/Alpine), these are usually handled via Dockerfile 
# or the build command. Ensure ffmpeg and yt-dlp are in your build.
