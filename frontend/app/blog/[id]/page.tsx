"use client"

import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createElement } from "react"
import { BlogComments } from "@/components/blog-comments"
import { BlogLikes } from "@/components/blog-likes"

export default function BlogPost({ params }: { params: { id: string } }) {
  // Blog post data
  const posts: Record<string, any> = {
    "1": {
      id: "1",
      title: "Training Ethiopian National ID System: A Comprehensive Approach",
      author: "Abebaw Belete",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/ethiopian-national-id-training-session-classroom.jpg",
      content: [
        {
          type: "paragraph",
          text: "As a professional trainer, I had the privilege of delivering comprehensive training on Ethiopia's National ID system implementation. This experience provided valuable insights into the technical, operational, and security aspects of modern identity management systems.",
        },
        {
          type: "heading",
          level: 2,
          text: "Overview of the Training Program",
        },
        {
          type: "paragraph",
          text: "The Ethiopian National ID system represents a significant step forward in digital identity management for the country. Our training program was designed to equip trainers and administrators with the knowledge and skills necessary to effectively implement and manage this critical infrastructure.",
        },
        {
          type: "image",
          src: "/ethiopian-national-id-training-session-classroom.jpg",
          alt: "Training session for Ethiopian National ID system",
        },
        {
          type: "heading",
          level: 2,
          text: "Key Training Components",
        },
        {
          type: "heading",
          level: 3,
          text: "1. System Architecture and Technical Foundation",
        },
        {
          type: "paragraph",
          text: "We covered the fundamental architecture of the National ID system, including database management, biometric integration, and security protocols. Participants learned about the technical infrastructure that supports millions of identity records while maintaining data integrity and security.",
        },
        {
          type: "heading",
          level: 3,
          text: "2. Security Protocols and Data Protection",
        },
        {
          type: "paragraph",
          text: "Security is paramount in any national identity system. Our training emphasized encryption standards, access control mechanisms, and compliance with international data protection regulations. Trainers learned how to implement and teach best practices for safeguarding sensitive personal information.",
        },
        {
          type: "heading",
          level: 3,
          text: "3. Operational Procedures",
        },
        {
          type: "paragraph",
          text: "Practical operational procedures formed a crucial part of the curriculum. This included enrollment processes, document verification, quality assurance checks, and troubleshooting common issues that arise during ID registration and issuance.",
        },
        {
          type: "heading",
          level: 2,
          text: "Training Methodology",
        },
        {
          type: "paragraph",
          text: "Our approach combined theoretical knowledge with hands-on practical sessions. Participants engaged in:",
        },
        {
          type: "list",
          items: [
            "Interactive workshops with real-world scenarios",
            "Hands-on practice with the ID system interface",
            "Group discussions on implementation challenges",
            "Case studies from successful deployments",
            "Assessment and certification processes",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Challenges and Solutions",
        },
        {
          type: "paragraph",
          text: "Throughout the training, we addressed several challenges including language barriers, varying technical literacy levels, and infrastructure constraints. By adapting our teaching methods and providing multilingual support materials, we ensured comprehensive understanding across all participant groups.",
        },
        {
          type: "heading",
          level: 2,
          text: "Impact and Outcomes",
        },
        {
          type: "paragraph",
          text: "The training program successfully prepared over 100 trainers who went on to train thousands of registration officers across Ethiopia. The systematic approach to knowledge transfer ensured consistency in service delivery and helped establish a robust foundation for the national ID rollout.",
        },
        {
          type: "heading",
          level: 2,
          text: "Lessons Learned",
        },
        {
          type: "paragraph",
          text: "This experience reinforced the importance of comprehensive training programs in large-scale technology implementations. Key takeaways include the need for continuous support, regular refresher training, and adaptive learning materials that can evolve with system updates.",
        },
        {
          type: "paragraph",
          text: "The success of Ethiopia's National ID system implementation demonstrates how effective training can bridge the gap between technology and its practical application, ultimately serving millions of citizens.",
        },
      ],
    },
    "2": {
      id: "2",
      title: "The Future of Research Methodology",
      author: "Abebaw Belete",
      date: "2024-01-10",
      readTime: "5 min read",
      image: "/research-methodology-laboratory-scientist.jpg",
      content: [
        {
          type: "paragraph",
          text: "The landscape of research methodology is undergoing a profound transformation. As we navigate an increasingly complex world, our approaches to inquiry, analysis, and knowledge generation must evolve to meet new challenges.",
        },
        {
          type: "image",
          src: "/research-methodology-laboratory-scientist.jpg",
          alt: "Research methodology in modern laboratory",
        },
        {
          type: "heading",
          level: 2,
          text: "Key Points",
        },
        {
          type: "list",
          items: [
            "Innovation in Approach: Modern research requires adaptive methodologies that respond to emerging challenges",
            "Interdisciplinary Collaboration: Breaking silos between fields enables breakthrough discoveries",
            "Data-Driven Insights: Advanced analytics transform how we understand complex phenomena",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Emerging Trends",
        },
        {
          type: "paragraph",
          text: "The landscape of research methodology continues to evolve with technological advancement and changing global needs. Researchers are increasingly adopting mixed-methods approaches that combine quantitative rigor with qualitative depth.",
        },
        {
          type: "heading",
          level: 3,
          text: "Digital Transformation",
        },
        {
          type: "paragraph",
          text: "Research institutions are increasingly adopting digital tools and platforms to enhance collaboration and data management. Cloud-based research platforms, AI-assisted analysis, and virtual collaboration tools are becoming standard in modern research practice.",
        },
        {
          type: "heading",
          level: 3,
          text: "Ethical Considerations",
        },
        {
          type: "paragraph",
          text: "As research expands, maintaining ethical standards becomes increasingly crucial in all fields. Researchers must navigate complex ethical landscapes involving data privacy, informed consent, and the responsible use of emerging technologies.",
        },
        {
          type: "heading",
          level: 2,
          text: "Conclusion",
        },
        {
          type: "paragraph",
          text: "The future of research methodology lies in our ability to adapt, collaborate, and maintain scientific rigor while embracing innovation. By staying open to new approaches while grounding ourselves in proven principles, we can advance knowledge in meaningful ways.",
        },
      ],
    },
    "3": {
      id: "3",
      title: "Navigating Academic Excellence",
      author: "Abebaw Belete",
      date: "2024-01-05",
      readTime: "7 min read",
      image: "/academic-excellence-university-graduation.jpg",
      content: [
        {
          type: "paragraph",
          text: "Academic excellence is not merely about achieving high grades or accumulating credentials. It represents a holistic approach to learning, research, and intellectual growth that prepares individuals for meaningful contributions to their fields.",
        },
        {
          type: "image",
          src: "/academic-excellence-university-graduation.jpg",
          alt: "Academic excellence and graduation",
        },
        {
          type: "heading",
          level: 2,
          text: "Foundations of Academic Success",
        },
        {
          type: "paragraph",
          text: "Building a strong academic foundation requires dedication, strategic planning, and a genuine passion for learning. It involves developing critical thinking skills, effective time management, and the ability to engage deeply with complex material.",
        },
        {
          type: "heading",
          level: 2,
          text: "Key Strategies",
        },
        {
          type: "list",
          items: [
            "Develop strong research and analytical skills",
            "Build meaningful relationships with mentors and peers",
            "Engage actively in academic communities and conferences",
            "Balance depth of knowledge with breadth of understanding",
            "Maintain curiosity and openness to new ideas",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The Role of Mentorship",
        },
        {
          type: "paragraph",
          text: "Mentorship plays a crucial role in academic development. Experienced mentors provide guidance, open doors to opportunities, and help navigate the complexities of academic life. Equally important is the responsibility to mentor others as you progress in your journey.",
        },
        {
          type: "heading",
          level: 2,
          text: "Conclusion",
        },
        {
          type: "paragraph",
          text: "Academic excellence is a journey, not a destination. It requires continuous learning, adaptation, and a commitment to contributing meaningfully to your field and society at large.",
        },
      ],
    },
    "4": {
      id: "4",
      title: "Innovation in Professional Development",
      author: "Abebaw Belete",
      date: "2023-12-28",
      readTime: "6 min read",
      image: "/professional-development-training-workshop.jpg",
      content: [
        {
          type: "paragraph",
          text: "In today's rapidly evolving professional landscape, continuous learning and development are not optional—they are essential for career growth and organizational success.",
        },
        {
          type: "image",
          src: "/professional-development-training-workshop.jpg",
          alt: "Professional development training workshop",
        },
        {
          type: "heading",
          level: 2,
          text: "The Changing Nature of Work",
        },
        {
          type: "paragraph",
          text: "The modern workplace demands adaptability, continuous skill development, and the ability to learn new technologies and methodologies quickly. Professional development has evolved from periodic training sessions to an ongoing process of growth and adaptation.",
        },
        {
          type: "heading",
          level: 2,
          text: "Key Areas of Focus",
        },
        {
          type: "list",
          items: [
            "Technical skills and digital literacy",
            "Leadership and management capabilities",
            "Communication and collaboration skills",
            "Critical thinking and problem-solving",
            "Emotional intelligence and adaptability",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Strategies for Continuous Growth",
        },
        {
          type: "paragraph",
          text: "Effective professional development requires intentional planning and commitment. This includes setting clear goals, seeking diverse learning opportunities, and actively applying new knowledge in practical contexts.",
        },
        {
          type: "heading",
          level: 2,
          text: "Conclusion",
        },
        {
          type: "paragraph",
          text: "Professional development is an investment in yourself and your future. By embracing continuous learning and staying curious, you position yourself for long-term success and fulfillment in your career.",
        },
      ],
    },
  }

  const post = posts[params.id] || posts["1"]

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
              <Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {post.content.map((block: any, idx: number) => {
              switch (block.type) {
                case "heading":
                  const headingClass =
                    {
                      1: "text-4xl font-bold mt-12 mb-6 text-primary",
                      2: "text-3xl font-bold mt-10 mb-5 text-primary",
                      3: "text-2xl font-bold mt-8 mb-4 text-accent",
                    }[block.level] || "text-xl font-semibold mt-6 mb-3"
                  return createElement(`h${block.level}`, { key: idx, className: headingClass }, block.text)

                case "paragraph":
                  return (
                    <p key={idx} className="text-foreground/80 leading-relaxed text-lg text-balance">
                      {block.text}
                    </p>
                  )

                case "list":
                  return (
                    <ul key={idx} className="space-y-3 ml-6">
                      {block.items.map((item: string, i: number) => (
                        <li key={i} className="text-foreground/80 leading-relaxed flex items-start gap-3">
                          <span className="text-accent mt-1 font-bold">•</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )

                case "image":
                  return (
                    <div key={idx} className="my-8 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={block.src || "/placeholder.svg"}
                        alt={block.alt}
                        width={800}
                        height={500}
                        className="w-full h-auto"
                      />
                    </div>
                  )

                default:
                  return null
              }
            })}
          </div>

          {/* Author Bio */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex gap-6 items-start">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                <Image
                  src="/professional-portrait-of-ethiopian-male-researcher.jpg"
                  alt="Abebaw Belete"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">About the Author</h3>
                <p className="text-foreground/70 leading-relaxed">
                  <strong>Abebaw Belete</strong> is a PhD researcher and professional trainer specializing in research
                  methodology, technical training, and innovation. With extensive experience in delivering training
                  programs and conducting research, Abebaw is passionate about advancing knowledge and empowering others
                  through education.
                </p>
              </div>
            </div>
          </div>

          {/* Likes and Comments sections */}
          <div className="mb-8">
            <BlogLikes postId={params.id} />
          </div>

          <BlogComments postId={params.id} />
        </div>
      </section>
    </article>
  )
}
