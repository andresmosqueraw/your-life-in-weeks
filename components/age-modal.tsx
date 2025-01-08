"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AgeModalProps {
  onAgeSubmit: (age: number) => void
}

export function AgeModal({ onAgeSubmit }: AgeModalProps) {
  const [age, setAge] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    const parsedAge = parseInt(age, 10)
    if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 85) {
      setError("Please enter a valid age between 0 and 85.")
      return
    }
    onAgeSubmit(parsedAge)
  }

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Your Age</DialogTitle>
          <DialogDescription>
            Please enter your current age to see where you are on the life grid.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value)
              setError("")
            }}
            placeholder="Enter your age"
            type="number"
            min="0"
            max="85"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  )
}

