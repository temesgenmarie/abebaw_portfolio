import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    subject: {
      type: String,
      required: [true, "Please provide a subject"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Please provide your message"],
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Message", messageSchema)