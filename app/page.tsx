import { LifeGrid } from "@/components/life-grid"
import { InspirationalQuote } from "@/components/inspirational-quote"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="container mx-auto flex-1 p-8">
          <div className="max-w-4xl mx-auto text-center mb-4">
            <h1 className="text-5xl font-bold tracking-tight mb-6 relative inline-block">
              Your Life in Weeks
              <div className="absolute -bottom-3 left-0 right-0 h-2 bg-pink-500 transform -rotate-1"></div>
            </h1>
            <InspirationalQuote />
          </div>
          <LifeGrid />
          <Toaster />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}