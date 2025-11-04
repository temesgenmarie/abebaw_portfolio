import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
  cloud_name: "dqmqpl5y9",
  api_key: "686431658314417",
  api_secret: "wM-2w1TiGk3BxQHoTgfWMFyKwEQ",
})

export default cloudinary
