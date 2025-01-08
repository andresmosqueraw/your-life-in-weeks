import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  eventName: string
}

export function ImageModal({ isOpen, onClose, images, eventName }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[80vh] p-0">
        <div className="relative">
          <img 
            src={images[currentIndex]} 
            alt={`${eventName} - Image ${currentIndex + 1}`} 
            className="w-full h-[500px] object-contain"
          />
          <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <h2 className="text-lg font-semibold">{eventName}</h2>
            <p className="text-sm">Imagen {currentIndex + 1} de {images.length}</p>
          </div>
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

