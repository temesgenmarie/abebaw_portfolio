# Frontend Setup Guide - Abebaw Belete Portfolio

## Overview
This is a Next.js 16+ portfolio website with authentication, blog functionality, comments, and likes system integrated with a deployed Node.js backend.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git (for cloning the repository)

## Installation Steps

### 1. Clone or Download the Project
\`\`\`bash
# If cloning from GitHub
git clone <your-repo-url>
cd <project-directory>

# Or download and extract the ZIP file
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api
\`\`\`

**Important:** This URL must be exactly as shown to connect to the deployed backend.

### 4. Run the Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will be available at: **http://localhost:3000**

## Features

### Authentication System
- **Sign Up Page** (`/auth/signup`)
  - Create new account with name, email, and password
  - Form validation and error handling
  - Automatic redirect to home after successful signup

- **Login Page** (`/auth/login`)
  - Login with email and password
  - Demo credentials displayed for testing
  - Automatic token storage in localStorage

### Blog Functionality
- **Blog List** (`/blog`)
  - View all blog posts with categories
  - Filter posts by category
  - Links to individual post pages

- **Blog Detail** (`/blog/[id]`)
  - Full article content with images
  - Like system (requires login)
  - Comments section (requires login)
  - User authentication state preserved

### User Features
- **Comments**
  - Add comments to blog posts when logged in
  - View all comments with author info and timestamps
  - Delete your own comments

- **Likes**
  - Like/unlike blog posts
  - Like count displayed for each post
  - User's like status persisted

## Project Structure

\`\`\`
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout with providers
│   ├── auth/
│   │   ├── login/page.tsx      # Login page
│   │   ├── signup/page.tsx     # Signup page
│   │   └── context.tsx         # Auth context provider
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [id]/page.tsx       # Blog detail page
│   ├── about/page.tsx          # About page
│   ├── portfolio/page.tsx      # Portfolio page
│   ├── services/page.tsx       # Services page
│   ├── awards/page.tsx         # Awards page
│   └── globals.css             # Global styles
├── components/
│   ├── navbar.tsx              # Navigation bar
│   ├── footer.tsx              # Footer
│   ├── blog-comments.tsx       # Comments component
│   ├── blog-likes.tsx          # Likes component
│   └── ui/                     # shadcn UI components
├── lib/
│   ├── api-client.ts           # API integration layer
│   └── utils.ts                # Utility functions
└── public/
    └── images/                 # Images and assets
\`\`\`

## API Integration

All API calls are centralized in `lib/api-client.ts`:

### Auth API
\`\`\`typescript
authAPI.signup(name, email, password)    // Create new account
authAPI.login(email, password)           // Login user
authAPI.getCurrentUser(token)            // Get current user info
\`\`\`

### Post API
\`\`\`typescript
postAPI.getPosts()               // Get all posts
postAPI.getPost(id)              // Get single post
postAPI.createPost(...)          // Create new post (requires auth)
postAPI.updatePost(...)          // Update post (requires auth)
postAPI.deletePost(id, token)    // Delete post (requires auth)
\`\`\`

### Comment API
\`\`\`typescript
commentAPI.addComment(postId, text, token)           // Add comment
commentAPI.deleteComment(postId, commentId, token)   // Delete comment
\`\`\`

### Like API
\`\`\`typescript
likeAPI.toggleLike(postId, token)    // Like/unlike post
likeAPI.getLikes(postId)             // Get like count
\`\`\`

## Testing the Application

### Test Sign Up
1. Navigate to `/auth/signup`
2. Fill in: Name, Email, Password
3. Click "Sign Up"
4. You'll be redirected to home page (logged in)

### Test Login
1. Navigate to `/auth/login`
2. Use credentials: `demo@example.com` / `demo123`
3. Click "Login"
4. You'll be redirected to home page (logged in)

### Test Blog Interactions
1. Navigate to `/blog`
2. Click on any blog post
3. Scroll down to see comments and likes
4. If logged in: add comments and like posts
5. If not logged in: see login/signup prompts

### Test User Persistence
1. Login to the account
2. Refresh the page - you should remain logged in
3. Navigate between pages - auth state persists
4. Close and reopen browser - token is recovered from localStorage

## Deployment

### Deploy to Vercel (Recommended)
\`\`\`bash
# Push to GitHub first
git push origin main

# Then in Vercel dashboard:
# 1. Connect your GitHub repository
# 2. Vercel auto-detects Next.js
# 3. Add environment variable: NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api
# 4. Deploy
\`\`\`

### Deploy to Other Platforms
- **Netlify**: Follow Netlify's Next.js deployment guide
- **Build command**: `npm run build`
- **Start command**: `npm run start`
- **Environment variable**: `NEXT_PUBLIC_API_URL`

## Environment Variables Explained

- `NEXT_PUBLIC_API_URL` - The backend API base URL (must be public since it's used in browser)
  - Production: `https://abebaw.onrender.com/api`
  - Development: `http://localhost:5000/api` (if running backend locally)

## Troubleshooting

### Issue: "Failed to fetch from API"
- **Solution**: Check that `NEXT_PUBLIC_API_URL` in `.env.local` is correct
- Verify backend is running at that URL
- Check browser console for CORS errors

### Issue: "Cannot login/signup"
- **Solution**: Ensure backend is running and accessible
- Check network tab in browser DevTools
- Verify email and password are correct

### Issue: Comments/Likes not showing
- **Solution**: Make sure you're logged in
- Refresh the page
- Check browser console for errors
- Verify API URL is correct

### Issue: Persistent login not working
- **Solution**: Check browser's localStorage is enabled
- Clear localStorage and try login again
- Check browser console for errors

## Development Tips

### Hot Reload
- Changes to files automatically reload the development server
- No need to manually restart

### Browser DevTools
- Open DevTools (F12)
- Check Network tab to see API calls
- Check Console for error messages
- Check Storage tab to see localStorage tokens

### API Debugging
- Add console.log statements in `lib/api-client.ts` to debug API calls
- Check backend logs at https://abebaw.onrender.com
- Use Postman or similar tool to test backend endpoints directly

## Production Checklist

Before deploying to production:
- [ ] Verify `.env.local` has production API URL
- [ ] Test all authentication flows
- [ ] Test comments and likes functionality
- [ ] Test with different browsers
- [ ] Check responsive design on mobile
- [ ] Verify all images load correctly
- [ ] Test all navigation links work
- [ ] Clear cache and test from incognito mode

## Support & Troubleshooting

For issues or questions:
1. Check browser console (F12) for error messages
2. Verify API URL in `.env.local`
3. Ensure backend is running and accessible
4. Clear browser cache and localStorage if needed
5. Try in incognito mode to rule out caching issues

## Contact Information
- **Email**: abebawb30@gmail.com
- **Phone**: +251 929 524 222
- **Website**: https://abebaw.onrender.com (backend deployed here)
