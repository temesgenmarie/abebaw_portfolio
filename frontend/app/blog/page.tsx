"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Ethiopia National ID Training: Building National Capacity at Scale",
      excerpt:
        "Comprehensive insights from designing and implementing Ethiopia's National ID system training program. Lessons learned in training 100+ master trainers and managing a nationwide rollout affecting millions of citizens.",
      author: "Abebaw Belete",
      date: "2024-01-15",
      category: "Training",
      image: "/ethiopian-national-id-training-session-classroom.jpg",
      readTime: "10 min read",
    },
    {
      id: 2,
      title: "Evidence-Based Policy: Research for National Development in Ethiopia",
      excerpt:
        "Exploring how rigorous research and evidence-based approaches drive effective policy making and institutional development in the Ethiopian context. The role of data in shaping national initiatives.",
      author: "Abebaw Belete",
      date: "2024-01-10",
      category: "Research",
      image: "/research-methodology-laboratory-scientist.jpg",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Building World-Class Research Institutions in Africa",
      excerpt:
        "Strategies for developing research excellence in African universities and institutions. Overcoming challenges, building partnerships, and creating sustainable research ecosystems that contribute to development.",
      author: "Abebaw Belete",
      date: "2024-01-05",
      category: "Academic",
      image: "/academic-excellence-university-graduation.jpg",
      readTime: "9 min read",
    },
    {
      id: 4,
      title: "Trainer Development: Creating Sustainable Impact Through People",
      excerpt:
        "How investing in trainer development and capacity building creates multiplier effects. From the National ID project to institutional development, the power of developing local expertise and sustaining impact.",
      author: "Abebaw Belete",
      date: "2023-12-28",
      category: "Development",
      image: "/professional-development-training-workshop.jpg",
      readTime: "7 min read",
    },
  ]

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
            {posts.map((post, idx) => (
              <article
                key={post.id}
                className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {post.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold hover:text-accent transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-foreground/70 leading-relaxed text-balance">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 pt-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" /> {post.author}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-semibold"
                  >
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex-1">
                  <Link
                    href={`/blog/${post.id}`}
                    className="block overflow-hidden rounded-lg border border-border hover:border-accent transition-all"
                  >
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-auto hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </article>
            ))}
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
