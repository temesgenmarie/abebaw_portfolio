# API Integration Troubleshooting Guide

## Current Setup
- **Backend URL**: `https://abebaw.onrender.com/api`
- **Frontend URL**: Your deployment URL (or localhost:3000 for development)
- **Database**: MongoDB Atlas

## Common Issues & Solutions

### 1. "Failed to fetch" Error

**Symptoms:**
- Login/signup buttons don't work
- Posts won't load
- All API calls fail with "Failed to fetch"

**Causes & Solutions:**
- Backend might be cold-starting (first request takes 10-30 seconds on Render)
- Network connectivity issue
- CORS configuration

**Fix:**
\`\`\`bash
# The API client now has automatic retry logic (up to 3 attempts with 1s delays)
# Just wait for 30-60 seconds for backend to wake up
\`\`\`

### 2. Signup/Login Not Working

**Symptoms:**
- Submit button shows "Creating Account..." but nothing happens
- No error message displayed

**Solution:**
\`\`\`javascript
// Check browser console (F12) for [v0] logs:
// Look for: "[v0] Signup response received" or "[v0] Signup error"
// This tells you exactly what the backend returned
\`\`\`

### 3. "Cannot POST /api/posts" Error

**Symptoms:**
- Admin dashboard shows error when creating posts
- Post creation button hangs

**Solution:**
- Backend might not have the routes defined
- Check that backend is running with all routes registered

### 4. Posts Not Loading on Blog Page

**Symptoms:**
- Blog page shows "No posts" or loading spinner forever
- Console shows "Failed to fetch" for `/posts`

**Solution:**
- Verify backend is responding: Visit `https://abebaw.onrender.com/api/health` in browser
- Should return: `{ "status": "Backend is running" }`

## Debugging Steps

### Step 1: Check Backend Health
\`\`\`bash
# In browser console:
fetch('https://abebaw.onrender.com/api/health').then(r => r.json()).then(console.log)
# Should return: { status: "Backend is running" }
\`\`\`

### Step 2: Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Try signup/login
4. Look for failed requests
5. Click each request to see status code and response

### Step 3: Read [v0] Logs
1. Open DevTools Console
2. Look for `[v0]` prefixed messages
3. These show exactly what's happening with API calls
4. Copy error messages for troubleshooting

### Step 4: Test Individual Endpoints

**Test Auth Signup:**
\`\`\`javascript
// In browser console:
fetch('https://abebaw.onrender.com/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test', email: 'test@test.com', password: 'pass123' })
}).then(r => r.json()).then(console.log)
\`\`\`

**Test Get Posts:**
\`\`\`javascript
// In browser console:
fetch('https://abebaw.onrender.com/api/posts')
  .then(r => r.json())
  .then(console.log)
\`\`\`

## Backend Route Reference

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/signup | No | Create account |
| POST | /api/auth/login | No | Login |
| GET | /api/auth/me | Yes | Get current user |
| GET | /api/posts | No | Get all posts |
| GET | /api/posts/:id | No | Get single post |
| POST | /api/posts | Yes (Admin) | Create post |
| PUT | /api/posts/:id | Yes (Admin) | Update post |
| DELETE | /api/posts/:id | Yes (Admin) | Delete post |
| POST | /api/comments/:postId | Yes | Add comment |
| DELETE | /api/comments/:postId/:commentId | Yes | Delete comment |
| POST | /api/likes/:postId | Yes | Toggle like |
| GET | /api/likes/:postId | No | Get likes count |
| POST | /api/contact | No | Send message |
| GET | /api/contact | Yes (Admin) | Get all messages |
| DELETE | /api/contact/:messageId | Yes (Admin) | Delete message |

## Expected Response Formats

### Successful Auth Response
\`\`\`json
{
  "message": "Signup successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
\`\`\`

### Successful Post Creation
\`\`\`json
{
  "_id": "64abc456...",
  "title": "My Post",
  "content": "Content here",
  "category": "Training",
  "userId": "64abc123...",
  "likes": [],
  "comments": [],
  "createdAt": "2024-01-20T10:30:00Z"
}
\`\`\`

### Error Response
\`\`\`json
{
  "error": "Email already exists",
  "message": "User with this email already registered"
}
\`\`\`

## Environment Variables Needed

**Frontend (.env.local):**
\`\`\`
NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api
\`\`\`

**Backend (.env):**
\`\`\`
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=production
\`\`\`

## When to Restart Backend

You need to restart the backend if:
- You deployed new code to Render
- You changed environment variables
- You're getting persistent connection errors after 60 seconds

**To restart on Render:**
1. Go to https://dashboard.render.com
2. Find your backend service
3. Click "Manual Deploy" → "Deploy latest commit"

## Performance Tips

- First request to backend takes 10-30 seconds (cold start)
- Subsequent requests are faster
- If app feels slow, check Network tab in DevTools
- Look for requests taking >5 seconds

---

**Still having issues?** Check the browser console for `[v0]` error messages and share those in your next troubleshooting request.
