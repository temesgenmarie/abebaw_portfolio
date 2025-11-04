"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/auth/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { MessageCircle, Send, Trash2 } from "lucide-react"
import { commentAPI, type Comment } from "@/lib/api-client"

export function BlogComments({ postId }: { postId: string }) {
  const { user, token } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [isLoadingComments, setIsLoadingComments] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/posts/${postId}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error("[v0] Failed to fetch comments:", error)
    } finally {
      setIsLoadingComments(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !token) return

    setLoading(true)
    try {
      const post = await commentAPI.addComment(postId, newComment, token)
      setComments(post.comments)
      setNewComment("")
    } catch (error) {
      console.error("[v0] Failed to submit comment:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!user || !token) return

    try {
      await commentAPI.deleteComment(postId, commentId, token)
      setComments(comments.filter((c) => c._id !== commentId))
    } catch (error) {
      console.error("[v0] Failed to delete comment:", error)
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="text-2xl font-bold">{comments.length} Comments</h3>
      </div>

      {!user ? (
        <div className="bg-card border border-border rounded-lg p-6 text-center mb-8">
          <p className="text-foreground/60 mb-4">Sign in to leave a comment</p>
          <div className="flex gap-3 justify-center">
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmitComment} className="mb-8 bg-card border border-border rounded-lg p-6">
          <div className="flex gap-3">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !newComment.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-foreground/50 mt-2">Commenting as {user.name}</p>
        </form>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {isLoadingComments ? (
          <p className="text-foreground/60">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-foreground/60">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-card border border-border rounded-lg p-4 flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <strong className="text-primary">{comment.userId.name}</strong>
                  <span className="text-xs text-foreground/50">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-foreground/80">{comment.text}</p>
              </div>
              {user && user.id === comment.userId._id && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
