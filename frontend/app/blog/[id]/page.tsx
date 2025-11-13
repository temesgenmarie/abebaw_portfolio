"use client"

import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import { BlogComments } from "@/components/blog-comments"
import { BlogLikes } from "@/components/blog-likes"

interface BlogPost {
  _id: string
  title: string
  content: string
  author: { _id: string; name: string }
  createdAt: string
  image?: string
}

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://abebaw.onrender.com/api"
        console.log("[v0] Fetching post with ID:", id)
        const response = await fetch(`${apiUrl}/posts/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch post")
        }

        const data = await response.json()
        console.log("[v0] Post data received:", data)
        setPost(data.data || data)
      } catch (err) {
        console.error("[v0] Error fetching post:", err)
        setError("Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-foreground/60">Loading blog post...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-destructive">{error || "Blog post not found"}</p>
          <Link href="/blog" className="text-accent hover:text-accent/80 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article>
      {/* Hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-foreground/60">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {post.author?.name || "Abebaw Belay"}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          {post.image && (
            <div className="mb-8 rounded-lg overflow-hidden border border-border">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none mb-8">
            <div className="text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Author Bio */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex gap-6 items-start">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                <Image
                  src="/images/photo_2025-11-13_15-05-34.jpg"
                  alt={post.author?.name || "Abebaw Belay"}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">About the Author</h3>
                <p className="text-foreground/70 leading-relaxed">
                  <strong>{post.author?.name}</strong> is a Senior Systems Architect with extensive experience in Digital Public Infrastructure and FinTech solutions. Passionate about leveraging technology to drive innovation and create impactful solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Likes and Comments sections */}
          <div className="mb-8">
            <BlogLikes postId={id} />
          </div>

          <BlogComments postId={id} />
        </div>
      </section>
    </article>
  )
}
