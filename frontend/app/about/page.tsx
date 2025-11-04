"use client"

import Image from "next/image"
import { Award, BookOpen, Briefcase } from "lucide-react"

export default function About() {
  const timelineItems = [
    {
      year: "2020 - Present",
      title: "PhD Research in Applied Sciences",
      institution: "Ethiopian Leading University",
      description:
        "Conducting groundbreaking research focusing on digital transformation, national development systems, and technology adoption in East Africa.",
      type: "education",
    },
    {
      year: "2019 - 2024",
      title: "National ID System Training Director",
      institution: "Government of Ethiopia",
      description:
        "Designed and led comprehensive training program for Ethiopian National ID system. Trained 100+ master trainers who successfully deployed the system nationwide, impacting over 2 million registrations.",
      type: "work",
    },
    {
      year: "2016 - 2020",
      title: "Master's Degree in Research Methodology",
      institution: "Addis Ababa Institute of Technology",
      description:
        "Specialized in applied research methodologies, data analysis, and project management with distinction. Thesis focused on capacity building in developing countries.",
      type: "education",
    },
    {
      year: "2015 - 2019",
      title: "Research & Development Specialist",
      institution: "Ethiopian Development Agency",
      description:
        "Led multiple research initiatives supporting national development programs. Published 8+ policy papers and contributed to strategic planning for institutional reforms.",
      type: "work",
    },
    {
      year: "2011 - 2015",
      title: "Bachelor of Science in Social Sciences",
      institution: "University of Addis Ababa",
      description:
        "Foundation in research methodology, statistics, and social science principles. Graduated with honors with focus on institutional development.",
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
            <div className="w-48 h-48 rounded-lg overflow-hidden border-2 border-primary shadow-lg flex-shrink-0">
              <Image
                src="/professional-portrait-ethiopian-researcher-abebaw-.jpg"
                alt="Abebaw Belete"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">About Abebaw Belete</h1>
              <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                <p>
                  I am an Ethiopian researcher and trainer dedicated to advancing national development through
                  evidence-based research, innovative training programs, and strategic institutional development. My
                  work bridges the gap between academic rigor and practical impact on the ground.
                </p>
                <p>
                  As a key architect of Ethiopia's National ID system training program, I led the development and
                  implementation of comprehensive training curricula that trained master trainers across the country.
                  This national initiative directly impacted millions of Ethiopian citizens and demonstrated the power
                  of well-designed training and capacity building.
                </p>
                <p>
                  Beyond my government work, I continue to mentor emerging researchers, lead collaborative projects, and
                  contribute to policy research that shapes development initiatives across East Africa. I believe in
                  using research and knowledge to solve real-world problems and build stronger institutions.
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
              <h3 className="text-xl font-semibold mb-4 text-accent">Research & Development</h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>National Development Program Design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Digital Transformation Research</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Data Analysis & Modeling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Institutional Capacity Building</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-accent">Training & Leadership</h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Large-Scale Program Training Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Trainer Development & Mentorship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Policy Research & Implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Cross-Functional Collaboration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
