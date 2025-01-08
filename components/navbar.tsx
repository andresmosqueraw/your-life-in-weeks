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
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description: "Thank you for your interest. We'll keep you updated!",
        })
        setEmail("")
      } else {
        toast({
          title: "Error",
          description: "There was an error subscribing. Please try again.",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "There was an error subscribing. Please try again.",
      })
    }
  }

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white dark:bg-zinc-950 shadow-sm">
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