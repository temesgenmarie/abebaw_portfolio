import Link from "next/link"
import Image from "next/image"
import { Code, Users, Lightbulb, Phone, Mail, Database, Briefcase, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card pt-20">
        <div className="max-w-6xl w-full mx-auto py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                  <span className="text-foreground">Hello, I'm</span>
                  <br />
                  <span className="text-primary">Abebaw Belay</span>
                </h1>
                <p className="text-xl text-foreground/70 max-w-2xl text-balance">
                  Senior Systems Architect and Digital Financial Services (DFS) IT Manager specializing in Digital
                  Public Infrastructure (DPI), FinTech, and instant payment systems. AASIT Alumnus dedicated to
                  designing secure, scalable solutions that drive financial inclusion across East Africa.
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/30 space-y-4">
                <h3 className="font-semibold text-accent text-lg">Connect With Me</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+251929524222"
                    className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="font-medium">+251 929 524 222</span>
                  </a>
                  <a
                    href="mailto:abebawb30@gmail.com"
                    className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="font-medium">abebawb30@gmail.com</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* removed "View My Work" button pointing to portfolio */}
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Let's Talk
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="relative w-72 h-96 rounded-xl overflow-hidden border-2 border-primary/30 shadow-2xl hover:shadow-primary/20 hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src="/images/photo_2025-11-13_15-05-34.jpg"
                  alt="Abebaw Belay - Senior Systems Architect"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
                {/* Subtle overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">My Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Digital Public Infrastructure (DPI)",
                desc: "Expert in designing and implementing DPI systems, digital financial services architecture, and instant payment solutions that drive financial inclusion",
              },
              {
                icon: Users,
                title: "FinTech & Systems Architecture",
                desc: "Experienced in integrating complex financial systems, implementing payment gateways, and ensuring strict industry compliance and security standards",
              },
              {
                icon: Lightbulb,
                title: "Risk Mitigation & AI Innovation",
                desc: "Applying machine learning and AI to optimize financial systems, enhance security protocols, and develop next-generation payment solutions",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-card rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all"
              >
                <item.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DFS Domain Expertise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-12">
            <h2 className="text-4xl font-bold">DFS Domain Expertise</h2>
            <p className="text-lg text-foreground/70 max-w-3xl">
              Digital Financial Services (DFS) domain expertise represents specialized knowledge in delivering secure,
              scalable financial technology solutions—particularly to underserved populations. It goes beyond general IT
              skills to address the unique challenges of financial inclusion, compliance, and operational
              sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Technology and Architecture",
                desc: "Deep expertise in designing and implementing the technical systems that make digital payments possible and scalable. This includes payment infrastructure, real-time processing systems, API integration, data security architectures, and cloud-based solutions that support millions of transactions.",
              },
              {
                icon: Briefcase,
                title: "Operations and Business Models",
                desc: "Practical knowledge of running DFS networks efficiently. This encompasses vendor management, merchant acquisition, customer support systems, fraud detection, transaction settlement, business process optimization, and sustainable revenue models for digital financial services.",
              },
              {
                icon: Scale,
                title: "Regulatory and Market Landscape",
                desc: "Understanding of the legal, compliance, and market frameworks essential for DFS success. Includes navigating financial regulations, anti-money laundering compliance, data protection laws, market entry strategies, and ensuring systems remain trustworthy and strategically aligned with national development goals.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Work Together Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Ready to Work Together?</h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Let's discuss how I can support your organization's training needs, research initiatives, or development
              projects across Ethiopia and the broader East African region.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
            <a
              href="tel:+251929524222"
              className="flex items-center justify-center gap-3 bg-primary-foreground/20 hover:bg-primary-foreground/30 px-6 py-4 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">+251 929 524 222</span>
            </a>
            <a
              href="mailto:abebawb30@gmail.com"
              className="flex items-center justify-center gap-3 bg-primary-foreground/20 hover:bg-primary-foreground/30 px-6 py-4 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-semibold">abebawb30@gmail.com</span>
            </a>
          </div>

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
