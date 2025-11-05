import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Code, Users, Lightbulb, Phone, Mail } from "lucide-react"
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
                  <span className="text-foreground">Selam, I'm</span>
                  <br />
                  <span className="text-primary">Abebaw Belete</span>
                </h1>
                <p className="text-xl text-foreground/70 max-w-2xl text-balance">
                  Ethiopian PhD researcher and professional trainer dedicated to advancing knowledge through rigorous
                  research and innovative training programs. Specializing in national development initiatives, digital
                  transformation, and professional education across East Africa.
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
                <Link href="/portfolio">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    View My Work <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Let's Talk
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                <Image
                  src="/Gemini_Generated_Image_j7wcg7j7wcg7j7wc.png"
                  alt="Abebaw Belay"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
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
                title: "National Development Initiatives",
                desc: "Pioneering research and training programs supporting Ethiopia's digital transformation and institutional development",
              },
              {
                icon: Users,
                title: "Trainer & Mentor",
                desc: "Leading large-scale training programs for government agencies, trained 100+ trainers for national projects",
              },
              {
                icon: Lightbulb,
                title: "Innovation & Impact",
                desc: "Transforming research into practical solutions that drive positive change across East Africa",
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
