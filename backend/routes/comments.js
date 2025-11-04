import express from "express"
import Post from "../models/Post.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Add comment to post
router.post("/:postId", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ error: "Comment text is required" })
    }

    const post = await Post.findById(req.params.postId)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    const comment = {
      userId: req.userId,
      text,
    }

    post.comments.push(comment)
    await post.save()
    await post.populate("comments.userId", "name email profileImage")

    console.log("[v0] Comment added to post:", req.params.postId)

    res.status(201).json({
      message: "Comment added successfully",
      post,
    })
  } catch (error) {
    console.error("[v0] Error adding comment:", error)
    res.status(500).json({ error: "Failed to add comment" })
  }
})

// Delete comment
router.delete("/:postId/:commentId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    const comment = post.comments.id(req.params.commentId)

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" })
    }

    // Check ownership
    if (comment.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized to delete this comment" })
    }

    post.comments.id(req.params.commentId).deleteOne()
    await post.save()

    console.log("[v0] Comment deleted:", req.params.commentId)

    res.json({ message: "Comment deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting comment:", error)
    res.status(500).json({ error: "Failed to delete comment" })
  }
})

export default router
