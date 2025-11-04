"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Ethiopian National ID Training Program",
      category: "Training",
      image: "/ethiopian-national-id-training-session-classroom.jpg",
      tags: ["Training", "National ID", "Education"],
      description:
        "Comprehensive training program for Ethiopian National ID system implementation, training over 100 trainers and thousands of registration officers.",
    },
    {
      id: 2,
      title: "Advanced Research Initiative",
      category: "Research",
      image: "/research-methodology-laboratory-scientist.jpg",
      tags: ["Research", "Innovation", "Methodology"],
      description:
        "Pioneering research project advancing knowledge in cutting-edge methodologies and scientific innovation.",
    },
    {
      id: 3,
      title: "Academic Publication Series",
      category: "Publications",
      image: "/academic-excellence-university-graduation.jpg",
      tags: ["Publishing", "Research", "Writing"],
      description: "Series of peer-reviewed publications contributing to academic discourse.",
    },
    {
      id: 4,
      title: "Professional Development Workshops",
      category: "Training",
      image: "/professional-development-training-workshop.jpg",
      tags: ["Training", "Development", "Education"],
      description: "Comprehensive professional development and training workshops for various organizations.",
    },
    {
      id: 5,
      title: "Data Analysis Framework",
      category: "Development",
      image: "/data-analysis-dashboard.png",
      tags: ["Data Science", "Analytics", "Technology"],
      description: "Comprehensive framework for advanced data analysis and statistical modeling.",
    },
    {
      id: 6,
      title: "Collaborative Research Project",
      category: "Collaboration",
      image: "/team-collaboration-research-meeting.jpg",
      tags: ["Collaboration", "Interdisciplinary", "Research"],
      description: "Cross-institutional research partnership yielding innovative outcomes.",
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Portfolio</h1>
          <p className="text-xl text-foreground/70 text-balance">
            Showcasing selected projects, research initiatives, training programs, and professional achievements.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300 bg-card"
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-accent font-semibold">{project.category}</p>
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium text-sm">
                    View Project <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
