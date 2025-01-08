"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Email submitted:", email)
    // For now, we'll just show a success message
    toast({
      title: "Subscribed!",
      description: "Thank you for your interest. We'll keep you updated!",
    })
    setEmail("")
  }

  return (
    <div className="bg-primary/5 p-4 rounded-lg mb-8 max-w-[600px] mx-auto">
      <h2 className="text-lg font-semibold mb-2">Help Us Launch!</h2>
      <p className="text-sm text-muted-foreground mb-4">
        If we reach 50 subscribers, we'll move forward with this project. Be part of making it happen!
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  )
}

