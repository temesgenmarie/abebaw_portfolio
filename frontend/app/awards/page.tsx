"use client"

import { Award, Trophy } from "lucide-react"

export default function Awards() {
  const awards = [
    {
      title: "Gender Equality Changemakers Award (Final)",
      issuer: "Digital Frontiers Institute (DFI)",
      year: 2024,
      description:
        "Recognition for commitment to promoting gender-sensitive environments and inclusive payment systems in the workplace and through digital solutions.",
    },
  ]

  const certifications = [
    {
      title: "Certified Digital Finance Practitioner (CDFP)",
      issuer: "Fletcher University and Digital Finance Institute (DFI)",
      year: 2023,
    },
    {
      title: "IIPS Program Certification",
      issuer: "Digital Finance Institute (DFI)",
      year: 2023,
    },
    {
      title: "Digital Public Infrastructure (DPI) Certificate",
      issuer: "Digital Finance Institute (DFI)",
      year: 2023,
    },
    {
      title: "Google Project Management Professional",
      issuer: "Google",
      year: 2023,
    },
    {
      title: "AI/ML for Product Managers",
      issuer: "Leading Online Platform",
      year: 2024,
    },
    {
      title: "Machine Learning Foundation for Product Managers",
      issuer: "Professional Development Institute",
      year: 2023,
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Awards & Certifications</h1>
          <p className="text-xl text-foreground/70 text-balance">
            Professional recognition and certifications in Digital Finance, systems architecture, and project
            management, demonstrating commitment to continuous learning and excellence.
          </p>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-accent" />
            Awards & Recognition
          </h2>
          <div className="space-y-6">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="p-6 bg-card rounded-lg border border-border hover:border-accent transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{award.title}</h3>
                        <p className="text-sm text-foreground/70">{award.issuer}</p>
                      </div>
                      <span className="text-sm font-semibold text-accent">{award.year}</span>
                    </div>
                    <p className="text-foreground/70 mt-2">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Award className="w-8 h-8 text-accent" />
            Professional Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-6 bg-background rounded-lg border border-border hover:border-accent transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Award className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">{cert.title}</h3>
                    <p className="text-sm text-foreground/70">{cert.issuer}</p>
                  </div>
                </div>
                <p className="text-xs text-accent font-semibold">Issued {cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
