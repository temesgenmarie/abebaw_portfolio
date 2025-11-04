# Backend Setup Guide

## Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

## Installation Steps

### 1. Install Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

### 2. Configure Environment Variables
Create a `.env` file in the `backend` directory with the following:

\`\`\`env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/abebaw-portfolio
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/abebaw-portfolio

# JWT Secret (change this in production!)
JWT_SECRET=your_secure_jwt_secret_key_here

# Server Port
PORT=5000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
\`\`\`

### 3. Get Cloudinary Credentials
1. Sign up at https://cloudinary.com
2. Go to Dashboard to find your Cloud Name and API Key
3. Generate an API Secret from Account settings
4. Add these to your `.env` file

### 4. Start MongoDB
\`\`\`bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - just update MONGODB_URI
\`\`\`

### 5. Start the Backend Server
\`\`\`bash
npm run dev
# or
npm start
\`\`\`

The server will run at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)

### Comments
- `POST /api/comments/:postId` - Add comment to post (requires auth)
- `DELETE /api/comments/:postId/:commentId` - Delete comment (requires auth)

### Likes
- `POST /api/likes/:postId` - Toggle like on post (requires auth)
- `GET /api/likes/:postId` - Get likes for post

## Testing the API

### Signup
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
\`\`\`

### Login
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
\`\`\`

### Create Post
\`\`\`bash
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=My Post" \
  -F "content=Post content" \
  -F "category=Blog" \
  -F "image=@/path/to/image.jpg"
\`\`\`

## Troubleshooting

**MongoDB Connection Error**: Ensure MongoDB is running and the connection string is correct.

**Cloudinary Upload Error**: Verify your Cloudinary credentials are correct and the API secret is properly set.

**CORS Error**: Check that `FRONTEND_URL` in `.env` matches your frontend URL.

**Token Errors**: Ensure the `JWT_SECRET` is consistent and tokens are being sent in the Authorization header.
