import express from "express"
import Post from "../models/Post.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Like/Unlike post
router.post("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    const userLiked = post.likes.includes(req.userId)

    if (userLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== req.userId)
      console.log("[v0] Post unliked:", req.params.postId)
    } else {
      // Like
      post.likes.push(req.userId)
      console.log("[v0] Post liked:", req.params.postId)
    }

    await post.save()

    res.json({
      message: userLiked ? "Post unliked" : "Post liked",
      likes: post.likes.length,
      isLiked: !userLiked,
    })
  } catch (error) {
    console.error("[v0] Error toggling like:", error)
    res.status(500).json({ error: "Failed to toggle like" })
  }
})

// Get likes for a post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    res.json({
      likes: post.likes.length,
      likedBy: post.likes,
    })
  } catch (error) {
    console.error("[v0] Error fetching likes:", error)
    res.status(500).json({ error: "Failed to fetch likes" })
  }
})

export default router
