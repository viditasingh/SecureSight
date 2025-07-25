@echo off
REM SecureSight Database Migration Script for Windows

echo 🚀 Starting SecureSight Database Migration...

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel@latest
)

echo 🔑 Please login to Vercel...
vercel login

echo 🔗 Linking project to Vercel...
vercel link

echo 🗄️ Creating Vercel Postgres database...
vercel storage create postgres --name securesight-db

echo 📦 Pulling environment variables...
vercel env pull .env.local

echo 🏗️ Generating Prisma client...
npx prisma generate

echo 📤 Pushing database schema...
npx prisma db push

echo 🌱 Seeding database with sample data...
npx prisma db seed

echo 🚀 Deploying to production...
vercel --prod

echo ✅ Migration complete! Your SecureSight dashboard is now running on PostgreSQL with Vercel!
echo 🌐 Visit your deployed app and check the database connection.
