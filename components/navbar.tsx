"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Square } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    toast({
      title: "Subscribed!",
      description: "Thank you for your interest. We'll keep you updated!",
    })
    setEmail("")
  }

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white dark:bg-zinc-800 shadow-sm">
      <div className="flex items-center">
        <Square className="h-6 w-6 mr-2" />
        <div className="text-xl font-bold">Your Life in Weeks</div>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="max-w-[200px]"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </nav>
  )
}