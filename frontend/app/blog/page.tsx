"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"
import { useEffect, useState } from "react"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  author: { _id: string; name: string }
  createdAt: string
  category: string
  image?: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://abebaw.onrender.com/api"
        const response = await fetch(`${apiUrl}/posts`)

        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }

        const data = await response.json()
        setPosts(data.data || [])
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Failed to load blog posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-foreground/60">Loading blog posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-destructive">{error}</p>
          <p className="text-sm text-foreground/60">Unable to load blog posts at the moment</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Blog & Insights</h1>
          <p className="text-xl text-foreground/70 text-balance">
            Research findings, professional perspectives, and insights on development, training, and institutional
            excellence in Ethiopia and East Africa.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {posts.length > 0 ? (
              posts.map((post, idx) => (
                <article
                  key={post._id}
                  className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
                >
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {post.category || "General"}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold hover:text-accent transition-colors">
                      <Link href={`/blog/${post._id}`}>{post.title}</Link>
                    </h2>
                    <p className="text-foreground/70 leading-relaxed text-balance">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 pt-4">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" /> {post.author?.name || "Unknown Author"}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post._id}`}
                      className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-semibold"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/blog/${post._id}`}
                      className="block overflow-hidden rounded-lg border border-border hover:border-accent transition-all"
                    >
                      <Image
                        src={post.image || "/placeholder.svg?height=400&width=600&query=blog+post"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-auto hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-foreground/60">No blog posts available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Stay Updated</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Follow my latest research, insights on Ethiopian development, and perspectives on institutional excellence.
          </p>
        </div>
      </section>
    </div>
  )
}
