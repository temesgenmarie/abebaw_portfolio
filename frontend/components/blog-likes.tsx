"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/auth/context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart } from "lucide-react"
import { likeAPI } from "@/lib/api-client"

export function BlogLikes({ postId }: { postId: string }) {
  const { user, token } = useAuth()
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchLikes()
  }, [postId, user])

  const fetchLikes = async () => {
    try {
      const data = await likeAPI.getLikes(postId)
      setLikeCount(data.likes)
      if (user && token) {
        setLiked(data.likedBy.includes(user.id))
      }
    } catch (error) {
      console.error("[v0] Failed to fetch likes:", error)
    }
  }

  const handleLike = async () => {
    if (!user || !token) return

    setLoading(true)
    try {
      const data = await likeAPI.toggleLike(postId, token)
      setLikeCount(data.likes)
      setLiked(data.isLiked)
    } catch (error) {
      console.error("[v0] Failed to toggle like:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3 mb-8">
      {!user ? (
        <Link href="/auth/login">
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Like ({likeCount})
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleLike}
          disabled={loading}
          variant={liked ? "default" : "outline"}
          size="sm"
          className={liked ? "bg-red-600 hover:bg-red-700" : ""}
        >
          <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
          {liked ? "Liked" : "Like"} ({likeCount})
        </Button>
      )}
    </div>
  )
}
