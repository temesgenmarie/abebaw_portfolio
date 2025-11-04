const express = require("express")
const router = express.Router()
const Message = require("../models/Message")

// Get all messages (admin only - no auth for now)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    })
  }
})

// Send a new message (no authentication required)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      })
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    })

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    })
  }
})

// Get a single message
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      })
    }

    // Mark as read
    message.read = true
    await message.save()

    res.status(200).json({
      success: true,
      data: message,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching message",
      error: error.message,
    })
  }
})

// Delete a message
router.delete("/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting message",
      error: error.message,
    })
  }
})

export default router