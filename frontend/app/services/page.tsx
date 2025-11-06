"use client"

import { Briefcase, BookOpen, Users, Zap, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Services() {
  const services = [
    {
      icon: Briefcase,
      title: "Digital Public Infrastructure (DPI) Consultation",
      description:
        "Strategic guidance on designing and implementing DPI systems for financial inclusion, digital identity, and government services. Expertise in architecture, security, and compliance standards.",
    },
    {
      icon: Users,
      title: "Digital Financial Services (DFS) Strategy",
      description:
        "Comprehensive consultation on DFS architecture, payment system integration, and building inclusive financial services for underserved populations across East Africa.",
    },
    {
      icon: Zap,
      title: "Systems Architecture & Design",
      description:
        "Expert system design services covering payment infrastructure, API development, interoperability standards, and scalable solutions for financial institutions and government agencies.",
    },
    {
      icon: BookOpen,
      title: "FinTech & AI/ML Implementation",
      description:
        "Guidance on integrating FinTech solutions, machine learning applications for fraud detection, AI-driven risk management, and next-generation payment technologies.",
    },
    {
      icon: Award,
      title: "Risk Mitigation & Security Protocols",
      description:
        "Comprehensive security assessment and implementation of risk mitigation strategies, compliance frameworks, and security protocols for financial systems and digital infrastructure.",
    },
    {
      icon: GraduationCap,
      title: "Technical Training & Mentoring",
      description:
        "Training programs for teams implementing digital financial systems, systems architecture principles, and best practices in building secure, scalable financial infrastructure.",
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Services</h1>
          <p className="text-xl text-foreground/70 text-balance">
            Expert consultation in Digital Public Infrastructure, digital financial services, systems architecture, and
            FinTech innovation to drive financial inclusion and digital transformation across East Africa.
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
                  src="/digital-payment-systems-architecture-infrastructur.jpg"
                  alt="DPI & DFS Architecture"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-primary">Digital Financial Infrastructure Design</h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  Expert in designing end-to-end digital financial services infrastructure including payment gateways,
                  digital identity systems, and inclusive payment platforms. With experience at EthSwitch and leading
                  FinTech organizations, I provide comprehensive consultation on DPI implementation, system
                  interoperability, and regulatory compliance to drive financial inclusion.
                </p>
                <Link href="/contact">
                  <Button size="lg" className="w-fit">
                    Discuss Your Project
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
            Discuss your organization's DPI/DFS needs, systems architecture requirements, or FinTech implementation
            challenges. Let's explore how I can support your digital transformation goals.
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
