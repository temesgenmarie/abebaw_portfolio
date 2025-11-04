import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"

dotenv.config()

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: true }))

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/abebaw-portfolio")
  .then(() => console.log("[v0] MongoDB connected successfully"))
  .catch((err) => console.error("[v0] MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("[v0] Error:", err.message)
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`[v0] Server running on http://localhost:${PORT}`)
})
