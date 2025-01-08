"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, ImageIcon, PlusCircle, Trash2 } from 'lucide-react'

interface Event {
  name: string
  id: string
  images: string[]
}

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (eventName: string, images: string[]) => void
  onDelete: (eventId: string) => void
  age: number
  week: number
  date: string
  existingEvents: Event[]
}

export function EventModal({ isOpen, onClose, onSubmit, onDelete, age, week, date, existingEvents }: EventModalProps) {
  const [eventName, setEventName] = useState("")
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (eventName.trim()) {
      onSubmit(eventName.trim(), images)
      setEventName("")
      setImages([])
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle>Events for Week {week} of Age {age}</DialogTitle>
          {/* <DialogDescription>
            Date: {date}
          </DialogDescription> */}
        </DialogHeader>
        <div className="space-y-4">
          {existingEvents.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Existing Events:</h3>
              <ul className="space-y-2">
                {existingEvents.map((event) => (
                  <li key={event.id} className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span>{event.name}</span>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(event.id)}>Delete</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.images.map((image, index) => (
                        <img key={index} src={image} alt={`${event.name} - Image ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter new event name"
            />
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  multiple
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Images
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button type="submit">Add Event</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

