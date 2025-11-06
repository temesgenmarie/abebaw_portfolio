# Admin System Guide

## Overview

The portfolio website now has a complete admin role system that distinguishes between the owner (Abebaw Belete) and regular users.

## How It Works

### User Roles

- **Admin (Owner)**: Can create, edit, and delete blog posts
- **Regular Users**: Can only comment and like blog posts

### Admin Identification

The system automatically assigns the admin role based on email address:
- Email: `abebawb30@gmail.com` → **Admin Role**
- All other emails → **Regular User Role**

## Features

### For Admin Users

1. **Admin Dashboard** (`/admin`)
   - Create new blog posts with title, content, category, and images
   - Edit existing posts
   - Delete posts
   - View all posts with statistics (likes, comments)
   - Upload images to Cloudinary

2. **Admin Navigation**
   - Admin link appears in navbar (with shield icon)
   - Quick access to dashboard from any page

3. **Post Management**
   - Full CRUD operations (Create, Read, Update, Delete)
   - Image upload support via Cloudinary
   - Category selection (Training, Research, Development, Technology)
   - Rich text content editing

### For Regular Users

1. **Blog Interaction**
   - View all blog posts
   - Comment on posts (requires login)
   - Like/unlike posts (requires login)
   - No access to post creation or editing

2. **Contact Form**
   - Send messages without login required
   - Messages stored in database

## Backend Protection

### API Routes Protected

All post creation/editing/deletion routes require:
1. Valid authentication token (authMiddleware)
2. Admin role verification (adminMiddleware)

\`\`\`javascript
// Example: Only admins can create posts
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  // Create post logic
})
\`\`\`

### Middleware

- **authMiddleware**: Verifies JWT token and extracts user ID
- **adminMiddleware**: Checks if user has admin role

## How to Use

### As the Owner (Admin)

1. **Sign Up/Login** with `abebawb30@gmail.com`
2. Navigate to **Admin** link in navbar
3. Click **Create New Post** button
4. Fill in:
   - Title
   - Category
   - Content
   - Upload featured image (optional)
5. Click **Create Post**
6. Post appears on blog page immediately

### Managing Posts

- **Edit**: Click edit icon on any post in admin dashboard
- **Delete**: Click delete icon (requires confirmation)
- **View**: All posts show likes and comments count

### As a Regular User

1. Sign up with any other email
2. Browse blog posts at `/blog`
3. Click on a post to read full content
4. Add comments and likes (login required)
5. No admin dashboard access

## Database Schema

### User Model
\`\`\`javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String (enum: ["user", "admin"]),
  profileImage: String,
  bio: String,
  createdAt: Date
}
\`\`\`

### Post Model
\`\`\`javascript
{
  title: String,
  content: String,
  image: String (Cloudinary URL),
  category: String,
  userId: ObjectId (ref: User),
  likes: [ObjectId],
  comments: [{
    userId: ObjectId,
    text: String,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## Security Features

1. **JWT Authentication**: All protected routes require valid token
2. **Role-Based Access Control**: Admin routes check user role
3. **Password Hashing**: bcryptjs with salt rounds
4. **Token Expiration**: 7-day token validity
5. **CORS Protection**: Configured for frontend domain

## Testing

### Test Admin Access

1. Create account with `abebawb30@gmail.com`
2. Verify "Admin" link appears in navbar
3. Access `/admin` dashboard
4. Create a test post
5. Verify post appears on `/blog`

### Test Regular User

1. Create account with any other email
2. Verify no "Admin" link in navbar
3. Try accessing `/admin` (should redirect to home)
4. Comment and like posts on blog

## Troubleshooting

### Admin Link Not Showing

- Ensure logged in with `abebawb30@gmail.com`
- Check browser console for errors
- Verify token is stored in localStorage
- Refresh page after login

### Cannot Create Posts

- Verify you're logged in as admin
- Check backend is running at `https://abebaw.onrender.com`
- Ensure Cloudinary credentials are configured
- Check browser network tab for API errors

### Posts Not Appearing

- Verify post was created successfully (check admin dashboard)
- Refresh blog page
- Check backend logs for errors
- Verify MongoDB connection

## Environment Variables

### Backend (.env)
\`\`\`
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_API_URL=https://abebaw.onrender.com/api
\`\`\`

## Summary

The admin system provides complete control over blog content for the owner while allowing regular users to engage through comments and likes. The role-based system is secure, automatic, and requires no manual configuration beyond using the correct email address.
