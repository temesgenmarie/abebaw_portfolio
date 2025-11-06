# Quick Start Guide - 5 Minute Setup

## Step 1: Install Dependencies (1 minute)
\`\`\`bash
npm install
\`\`\`

## Step 2: Verify Environment Configuration (30 seconds)
Check that `.env.local` exists in the root directory with:
\`\`\`
NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api
\`\`\`

If not, create it:
\`\`\`bash
echo "NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api" > .env.local
\`\`\`

## Step 3: Start Development Server (30 seconds)
\`\`\`bash
npm run dev
\`\`\`

Output should show:
\`\`\`
> next dev
  ▲ Next.js 16.x
  - Local:        http://localhost:3000
\`\`\`

## Step 4: Open in Browser (1 minute)
1. Open http://localhost:3000
2. You should see the Abebaw Belete portfolio homepage

## Test It Out

### Test 1: Sign Up
1. Click "Sign Up" in navbar or footer
2. Fill in any name, email, password
3. Click "Sign Up"
4. You should be logged in and redirected to home

### Test 2: View Blog
1. Navigate to `/blog` or click Blog in navbar
2. Click on any blog post
3. Scroll down to see likes and comments

### Test 3: Add Comment
1. While logged in, scroll down on a blog post
2. Type a comment in the text field
3. Click the send button
4. Comment appears immediately

### Test 4: Like a Post
1. Scroll to the heart button at the top of comments
2. Click to like/unlike the post
3. Like count updates in real-time

### Test 5: Logout
1. Click your name in the navbar
2. Click "Logout"
3. You should be logged out

---

## Common Issues & Solutions

### Issue: "NEXT_PUBLIC_API_URL is not defined"
**Solution:** Create `.env.local` file with the URL
\`\`\`bash
echo "NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api" > .env.local
\`\`\`

### Issue: "Failed to fetch from API"
**Solution:** 
1. Verify the API URL is correct: `https://abebaw.onrender.com/api`
2. Try visiting it in browser - should show API response
3. Restart development server: `Ctrl+C` then `npm run dev`

### Issue: "Login not working"
**Solution:**
1. Check console (F12) for error messages
2. Verify account was created with valid email
3. Check that `.env.local` has correct API URL

### Issue: "Comments/likes not showing"
**Solution:**
1. Make sure you're logged in
2. Refresh the page
3. Check that you're accessing blog post detail page (not list)

---

## File Structure You Need to Know

\`\`\`
project/
├── .env.local                          # ← Put API URL here
├── app/
│   ├── page.tsx                       # Home page
│   ├── blog/
│   │   ├── page.tsx                  # Blog list
│   │   └── [id]/page.tsx            # Blog detail (comments/likes here)
│   ├── auth/
│   │   ├── signup/page.tsx           # Sign up form
│   │   ├── login/page.tsx            # Login form
│   │   └── context.tsx               # Auth provider
│   └── layout.tsx                     # Root layout
├── components/
│   ├── blog-comments.tsx              # Comments component
│   ├── blog-likes.tsx                 # Likes component
│   └── navbar.tsx                     # Navigation
├── lib/
│   └── api-client.ts                  # All API calls here
└── public/
    └── images/                        # Images
\`\`\`

---

## API Endpoints Being Used

All these are called automatically by the frontend:

\`\`\`
Auth:
  POST   /api/auth/signup        - Create account
  POST   /api/auth/login         - Login
  GET    /api/auth/me            - Get current user

Blog:
  GET    /api/posts              - Get all posts
  GET    /api/posts/:id          - Get single post
  POST   /api/posts              - Create post (auth required)
  PUT    /api/posts/:id          - Update post (auth required)
  DELETE /api/posts/:id          - Delete post (auth required)

Comments:
  POST   /api/comments/:postId           - Add comment (auth required)
  DELETE /api/comments/:postId/:commentId - Delete comment (auth required)

Likes:
  POST   /api/likes/:postId      - Toggle like (auth required)
  GET    /api/likes/:postId      - Get like count
\`\`\`

---

## Next Steps

1. ✅ Run `npm install`
2. ✅ Create `.env.local` with API URL
3. ✅ Run `npm run dev`
4. ✅ Test the features above
5. ✅ Deploy to Vercel (optional)

---

## Deployment to Vercel (5 minutes)

1. Push code to GitHub
   \`\`\`bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   \`\`\`

2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repository
5. In "Environment Variables", add:
   \`\`\`
   NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api
   \`\`\`
6. Click "Deploy"
7. Done! Your site is live

---

## Getting Help

If something doesn't work:
1. Check browser console: **F12** → Console tab
2. Check if backend is running: Visit https://abebaw.onrender.com/api in browser
3. Verify `.env.local` has the right URL
4. Restart dev server: `Ctrl+C` then `npm run dev`
5. Clear browser cache: `Ctrl+Shift+Delete`

**Still stuck?**
- Email: abebawb30@gmail.com
- Phone: +251 929 524 222
