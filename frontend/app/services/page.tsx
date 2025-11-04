"use client"

import { Briefcase, BookOpen, Users, Zap, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Services() {
  const services = [
    {
      icon: Users,
      title: "Large-Scale Training Programs",
      description:
        "Comprehensive training program design and execution for national initiatives, government projects, and institutional development. Proven track record managing 100+ trainers and thousands of beneficiaries.",
    },
    {
      icon: GraduationCap,
      title: "Trainer Development & Mentoring",
      description:
        "Training-of-trainers programs, capacity building for educators, and mentoring for emerging professionals. Develop local expertise to ensure sustainable program implementation.",
    },
    {
      icon: Briefcase,
      title: "Research Consulting & Strategy",
      description:
        "Strategic guidance on research design, data collection, analysis, and policy research. Expert consultation for government agencies and development organizations on evidence-based decision making.",
    },
    {
      icon: BookOpen,
      title: "Curriculum & Materials Development",
      description:
        "Design comprehensive training curricula, develop instructional materials, create assessment frameworks, and build training resources tailored to organizational and national needs.",
    },
    {
      icon: Zap,
      title: "Digital Transformation Support",
      description:
        "Research and consultation on digital adoption, technology implementation strategies, and capacity building for technology-driven national initiatives and system development.",
    },
    {
      icon: Award,
      title: "Workshops & Policy Seminars",
      description:
        "Interactive workshops, policy seminars, and professional development sessions on research methods, implementation strategy, academic excellence, and institutional development.",
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Services</h1>
          <p className="text-xl text-foreground/70 text-balance">
            Comprehensive training, research, and development expertise tailored to support Ethiopia's national
            initiatives, institutional growth, and organizational excellence.
          </p>
        </div>
      </section>

      {/* Featured Service */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg border border-accent overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="/ethiopian-national-id-training-session-classroom.jpg"
                  alt="National ID Training Program"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-primary">Flagship: Ethiopia National ID Training</h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  Designed and executed comprehensive training program for Ethiopia's National ID system. Successfully
                  trained 100+ master trainers nationwide, who then trained thousands of registration officers across
                  all regions. This national flagship project directly enabled digital identity registration for
                  millions of Ethiopian citizens.
                </p>
                <Link href="/contact">
                  <Button size="lg" className="w-fit">
                    Discuss Your National Initiative
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Complete Service Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="p-8 bg-card rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <service.icon className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">{service.description}</p>
                <Link href="/contact?service=consultation">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Schedule a Consultation</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Discuss your organization's training needs, research requirements, or development projects. Let's explore
            how I can support your goals across Ethiopia and East Africa.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
