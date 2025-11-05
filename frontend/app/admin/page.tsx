"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import { postAPI, type Post } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit, Plus, Loader2, Mail, MessageSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export default function AdminDashboard() {
  const { user, token, isAdmin, loading: authLoading } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("Training")
  const [image, setImage] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/")
    }
  }, [isAdmin, authLoading, router])

  useEffect(() => {
    loadPosts()
    loadMessages()
  }, [])

  const loadPosts = async () => {
    try {
      const data = await postAPI.getPosts()
      console.log("[v0] Loaded posts:", data)
      setPosts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("[v0] Failed to load posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://abebaw.onrender.com/api"
      console.log("[v0] Fetching messages from:", `${apiUrl}/contact`)

      const response = await fetch(`${apiUrl}/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      console.log("[v0] Messages response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Messages data received:", data)
        const messagesArray = Array.isArray(data) ? data : data.data || data.messages || []
        setMessages(messagesArray)
      } else {
        console.error("[v0] Failed to fetch messages:", response.statusText)
      }
    } catch (err) {
      console.error("[v0] Failed to load messages:", err)
    } finally {
      setMessagesLoading(false)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (!token || !confirm("Are you sure you want to delete this message?")) return

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://abebaw.onrender.com/api"
      const response = await fetch(`${apiUrl}/contact/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        await loadMessages()
      }
    } catch (err) {
      alert("Failed to delete message")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    setSubmitting(true)
    setError("")

    try {
      if (editingPost) {
        await postAPI.updatePost(editingPost._id, title, content, category, image, token)
      } else {
        await postAPI.createPost(title, content, category, image, token)
      }

      // Reset form
      setTitle("")
      setContent("")
      setCategory("Training")
      setImage(null)
      setShowCreateForm(false)
      setEditingPost(null)

      // Reload posts
      await loadPosts()
    } catch (err: any) {
      setError(err.message || "Failed to save post")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setTitle(post.title)
    setContent(post.content)
    setCategory(post.category)
    setShowCreateForm(true)
  }

  const handleDelete = async (postId: string) => {
    if (!token || !confirm("Are you sure you want to delete this post?")) return

    try {
      await postAPI.deletePost(postId, token)
      await loadPosts()
    } catch (err) {
      alert("Failed to delete post")
    }
  }

  const handleCancel = () => {
    setShowCreateForm(false)
    setEditingPost(null)
    setTitle("")
    setContent("")
    setCategory("Training")
    setImage(null)
    setError("")
  }

  if (authLoading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your blog posts and messages</p>
        </div>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Posts ({posts.length})
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Messages ({messages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          {!showCreateForm && (
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
          )}

          {showCreateForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingPost ? "Edit Post" : "Create New Post"}</CardTitle>
                <CardDescription>
                  Fill in the details below to {editingPost ? "update" : "create"} a blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your post content here..."
                      rows={10}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Featured Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                    {editingPost?.image && !image && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Current image will be kept if no new image is uploaded
                      </p>
                    )}
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <div className="flex gap-2">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {editingPost ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        <>{editingPost ? "Update Post" : "Create Post"}</>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Posts ({posts.length})</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No posts yet. Create your first post to get started!
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post._id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{post.title}</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{post.category}</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span>{post.likes?.length || 0} likes</span>
                          <span>{post.comments?.length || 0} comments</span>
                        </div>
                      </div>
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(post)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(post._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Messages ({messages.length})</h2>
          {messagesLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No messages yet. Messages from your contact form will appear here.
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => (
              <Card key={message._id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{message.name}</h3>
                        <span className="text-sm text-muted-foreground">({message.email})</span>
                      </div>
                      <p className="font-medium text-foreground/90">{message.subject}</p>
                      <p className="text-muted-foreground">{message.message}</p>
                      <p className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString()}</p>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteMessage(message._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
