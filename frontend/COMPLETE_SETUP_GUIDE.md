# Complete Setup Guide - Frontend & Backend

## Backend Setup (Node.js + MongoDB)

### 1. Prerequisites
- Node.js v16+ installed
- MongoDB Atlas account or local MongoDB
- Git

### 2. Environment Variables
Create `.env` file in `backend/` folder:

\`\`\`env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/abebaw-portfolio

# Server
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://abebaw.onrender.com

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

### 3. Install Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

### 4. Start Backend
\`\`\`bash
# Development
npm run dev

# Production
npm start
\`\`\`

Backend will run on: `https://abebaw.onrender.com/api` (already deployed)

---

## Frontend Setup (Next.js + React)

### 1. Prerequisites
- Node.js v16+ installed
- Git

### 2. Environment Variables
Create `.env.local` file in root folder:

\`\`\`env
NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api
\`\`\`

### 3. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 4. Start Frontend Development
\`\`\`bash
npm run dev
\`\`\`

Frontend will run on: `http://localhost:3000`

### 5. Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

---

## Testing the Application

### Test Blog Feature
1. Navigate to `/blog`
2. Should see blog posts fetched from database
3. Click on a post to view details
4. Check author name is displayed correctly
5. (Logged in) Add comments and likes

### Test Contact Form
1. Navigate to `/contact`
2. Fill in all fields (name, email, subject, message)
3. Click "Send Message"
4. Should see success message
5. Message is saved in database (no login required)

### Test Authentication
1. Signup at `/auth/signup` with email and password
2. Login at `/auth/login`
3. Create a new blog post (only visible when logged in)
4. Add comments/likes to posts
5. Logout from navbar

---

## API Testing with cURL

### Get All Blog Posts
\`\`\`bash
curl https://abebaw.onrender.com/api/posts
\`\`\`

### Get Single Blog Post
\`\`\`bash
curl https://abebaw.onrender.com/api/posts/{postId}
\`\`\`

### Send Contact Message
\`\`\`bash
curl -X POST https://abebaw.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
\`\`\`

### Create Blog Post (requires auth token)
\`\`\`bash
curl -X POST https://abebaw.onrender.com/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My Blog Post",
    "excerpt": "Brief description",
    "content": "Full content here",
    "category": "Research",
    "image": "image_url"
  }'
\`\`\`

---

## Deployment

### Deploy Backend to Render.com
Already deployed at: `https://abebaw.onrender.com`

To redeploy:
1. Push to GitHub
2. Render automatically rebuilds from git commits

### Deploy Frontend to Vercel
\`\`\`bash
npm install -g vercel
vercel login
vercel
\`\`\`

Or connect GitHub repo to Vercel dashboard for auto-deployment.

---

## Troubleshooting

### Blog posts not showing
- Check browser console for errors
- Verify backend is running
- Check `.env.local` has correct API URL
- Verify MongoDB connection in backend

### Contact form not sending
- Check network tab in DevTools
- Verify backend contact routes are registered
- Check MongoDB is connected
- Look for error messages in console

### Authentication issues
- Clear browser cookies/localStorage
- Check JWT token is stored correctly
- Verify backend JWT_SECRET is set
- Check token hasn't expired

### CORS errors
- Verify FRONTEND_URL in backend .env matches your domain
- Check backend CORS middleware is enabled
- Ensure credentials: true if needed

---

## Files Modified/Created

### Backend
- `backend/models/Message.js` (NEW)
- `backend/routes/contact.js` (NEW)
- `backend/server.js` (MODIFIED - added contact routes)

### Frontend
- `app/blog/page.tsx` (MODIFIED - fetch from backend)
- `app/blog/[id]/page.tsx` (MODIFIED - fetch from backend)
- `app/contact/page.tsx` (MODIFIED - send to backend)
- `.env.local` (MODIFIED - backend URL)

---

## Next Steps

1. Verify all tests pass
2. Deploy frontend to Vercel or desired platform
3. Backend already deployed at Render
4. Monitor logs for any errors
5. Test all features in production

All systems are now fully integrated and operational!
