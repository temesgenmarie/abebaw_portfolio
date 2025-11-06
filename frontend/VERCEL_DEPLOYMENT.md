# Deploying to Vercel

## Prerequisites
- GitHub account with your code pushed
- Vercel account (free at vercel.com)
- Backend deployed at https://abebaw.onrender.com

## Step-by-Step Deployment

### 1. Push to GitHub
\`\`\`bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
\`\`\`

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js framework
5. Click "Deploy"

### 3. Set Environment Variables
In Vercel project settings:
1. Go to Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api`
3. Make sure it's set for Production environment
4. Redeploy

### 4. Verify Deployment
- Visit your Vercel domain
- Test signup/login functionality
- Test creating posts (if admin)
- Test contact form

## Environment Variables Required
- `NEXT_PUBLIC_API_URL` - Your backend URL (e.g., https://abebaw.onrender.com/api)

## Important Notes
- Backend dependencies (express, mongoose, etc.) have been removed from package.json
- Only frontend dependencies remain
- Backend is deployed separately on Render
- All API calls use environment variable for backend URL

## Troubleshooting
- If API calls fail, check environment variables in Vercel
- Make sure backend is running at the URL specified
- Check browser console for error messages with [v0] prefix

## Build Commands
- Development: `npm run dev`
- Production build: `npm run build`
- Start production: `npm start`
