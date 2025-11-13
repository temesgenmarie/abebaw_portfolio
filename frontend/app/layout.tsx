import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/app/auth/context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abebaw Belete",
  description:
    " DFS Domain Expertise | Senior Systems Architect | Digital Public Infrastructure | FinTech Solutions | Risk Mitigation | AI Innovation ",
    
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
