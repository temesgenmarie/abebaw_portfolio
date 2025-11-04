import express from "express"
import multer from "multer"
import cloudinary from "../config/cloudinary.js"
import Post from "../models/Post.js"
import { authMiddleware, adminMiddleware } from "../middleware/auth.js"

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// Create post
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, content, category } = req.body

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" })
    }

    let imageUrl = null

    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "abebaw-portfolio/posts" },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          },
        )
        uploadStream.end(req.file.buffer)
      })
      imageUrl = result.secure_url
    }

    const post = new Post({
      title,
      content,
      category,
      image: imageUrl,
      userId: req.userId,
    })

    await post.save()
    await post.populate("userId", "name email profileImage")

    console.log("[v0] New post created:", title)

    res.status(201).json({
      message: "Post created successfully",
      post,
    })
  } catch (error) {
    console.error("[v0] Post creation error:", error)
    res.status(500).json({ error: "Failed to create post" })
  }
})

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name email profileImage")
      .populate("comments.userId", "name email profileImage")
      .sort({ createdAt: -1 })

    res.json(posts)
  } catch (error) {
    console.error("[v0] Error fetching posts:", error)
    res.status(500).json({ error: "Failed to fetch posts" })
  }
})

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "name email profileImage")
      .populate("comments.userId", "name email profileImage")

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    res.json(post)
  } catch (error) {
    console.error("[v0] Error fetching post:", error)
    res.status(500).json({ error: "Failed to fetch post" })
  }
})

// Update post
router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    const { title, content, category } = req.body

    if (title) post.title = title
    if (content) post.content = content
    if (category) post.category = category

    // Handle image upload
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "abebaw-portfolio/posts" },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          },
        )
        uploadStream.end(req.file.buffer)
      })
      post.image = result.secure_url
    }

    post.updatedAt = new Date()
    await post.save()
    await post.populate("userId", "name email profileImage")

    console.log("[v0] Post updated:", post._id)

    res.json({
      message: "Post updated successfully",
      post,
    })
  } catch (error) {
    console.error("[v0] Error updating post:", error)
    res.status(500).json({ error: "Failed to update post" })
  }
})

// Delete post
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    await Post.findByIdAndDelete(req.params.id)

    console.log("[v0] Post deleted:", req.params.id)

    res.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting post:", error)
    res.status(500).json({ error: "Failed to delete post" })
  }
})

export default router
