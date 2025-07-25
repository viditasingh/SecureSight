# SecureSight Dashboard Status Check

Write-Host "🔍 SecureSight Dashboard Status Check" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Check if we're in the right directory
$currentDir = Get-Location
Write-Host "📁 Current Directory: $currentDir" -ForegroundColor Yellow

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found" -ForegroundColor Red
}

# Check if database exists
if (Test-Path "prisma/dev.db") {
    Write-Host "✅ Database file exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Database file not found" -ForegroundColor Yellow
}

# Check if images directory exists
if (Test-Path "public/images/thumbnails") {
    $imageCount = (Get-ChildItem "public/images/thumbnails" -File).Count
    Write-Host "✅ Images directory exists with $imageCount files" -ForegroundColor Green
} else {
    Write-Host "❌ Images directory not found" -ForegroundColor Red
}

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "✅ Node modules installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Node modules not found - run 'npm install'" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 To start the development server:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Dashboard will be available at:" -ForegroundColor Cyan
Write-Host "   http://localhost:3000" -ForegroundColor White
