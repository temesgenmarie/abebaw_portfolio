"use client"

import Image from "next/image"
import { Award, BookOpen, Briefcase } from "lucide-react"

export default function About() {
  const timelineItems = [
    {
      year: "2024 - Present",
      title: "DFS IT Manager",
      institution: "EthioPost",
      description:
        "Leading digital financial services initiatives at EthioPost, managing IT infrastructure for payment systems and driving digital financial inclusion across the organization.",
      type: "work",
    },
    {
      year: "2022 - 2024",
      title: "Senior System Architect",
      institution: "EthSwitch S.C.",
      description:
        "Architected digital payment solutions and interoperable systems connecting financial institutions. Designed frameworks for secure, scalable payment infrastructure supporting the broader financial ecosystem.",
      type: "work",
    },
    {
      year: "2021 - 2022",
      title: "Senior System Admin",
      institution: "EthSwitch",
      description:
        "Managed critical system infrastructure for national payment systems, ensuring 99.9% uptime and security compliance for millions of transactions daily.",
      type: "work",
    },
    {
      year: "2019 - 2021",
      title: "System Engineer",
      institution: "Kifiya Financial Technology PLC",
      description:
        "Designed and implemented FinTech solutions with focus on API development, system integration, and digital payment platforms serving diverse financial institutions.",
      type: "work",
    },
    {
      year: "2018 - 2019",
      title: "M.Sc. in Computer Engineering",
      institution: "Addis Ababa Institute of Technology (AAiT)",
      description:
        "Advanced degree specializing in systems architecture, network design, and digital infrastructure. Capstone project on instant and inclusive payment systems.",
      type: "education",
    },
    {
      year: "2014 - 2018",
      title: "B.Sc. in Computer Engineering",
      institution: "Addis Ababa Institute of Technology (AAiT)",
      description:
        "Foundation in computer systems, network architecture, and software engineering principles with distinction.",
      type: "education",
    },
    {
      year: "2012 - 2016",
      title: "B.Sc. in Information Technology",
      institution: "Unity University",
      description:
        "Comprehensive IT education covering systems analysis, database management, and information systems architecture.",
      type: "education",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "education":
        return <BookOpen className="w-5 h-5" />
      case "work":
        return <Briefcase className="w-5 h-5" />
      default:
        return <Award className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Introduction Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
            <div className="w-56 h-72 rounded-xl overflow-hidden border-2 border-primary/30 shadow-xl flex-shrink-0 relative">
              <Image
                src="/images/photo-2025-11-13-15-05-34.jpg"
                alt="Abebaw Belay"
                width={224}
                height={288}
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay for visual depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">About Abebaw Belay</h1>
              <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                <p>
                  I am a Senior Systems Architect and Digital Financial Services IT Manager with deep expertise in
                  Digital Public Infrastructure (DPI), digital financial services, and FinTech architecture. My
                  background spans systems design, payment infrastructure, and the application of AI to solve complex
                  financial technology challenges.
                </p>
                <p>
                  Throughout my career at leading organizations including EthSwitch, Kifiya Financial Technology PLC,
                  and EthioPost, I have designed and implemented scalable, secure payment systems that serve millions of
                  users. I specialize in integrating complex financial systems, ensuring compliance with strict
                  regulatory requirements, and building inclusive payment solutions.
                </p>
                <p>
                  My expertise covers systems architecture design, information systems analysis, AI/ML applications in
                  finance, risk mitigation, and security protocols. I am passionate about leveraging technology to drive
                  financial inclusion across East Africa and promoting gender-sensitive, inclusive environments in the
                  workplace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-primary">Professional Journey</h2>

          <div className="space-y-0">
            {timelineItems.map((item, index) => (
              <div key={index} className="flex gap-6 pb-8">
                {/* Timeline Dot and Line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground border-4 border-card">
                    {getIcon(item.type)}
                  </div>
                  {index !== timelineItems.length - 1 && <div className="w-1 h-20 bg-border mt-2" />}
                </div>

                {/* Timeline Content */}
                <div className="pb-2 flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-sm font-semibold text-accent">{item.year}</span>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-foreground/70 font-medium mb-2">{item.institution}</p>
                  <p className="text-foreground/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-primary">Expertise & Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-accent">Systems & Architecture</h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Digital Public Infrastructure (DPI) Design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Digital Financial Services (DFS) Architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Payment Systems Integration & Interoperability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Systems Security & Compliance</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-accent">Technical & Management</h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>FinTech Foundation & Application</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>AI/ML for Product Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Risk Mitigation & Security Protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Strategic Leadership & Project Management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
