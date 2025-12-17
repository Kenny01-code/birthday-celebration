# Check if Netlify CLI is installed
if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
    Write-Host "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
}

# Deploy to Netlify
Write-Host "Deploying to Netlify..."
netlify deploy --prod --dir="build"
