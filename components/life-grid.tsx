"use client"

import React, { useState, useEffect } from "react"
import { BirthDateModal } from "./birth-date-modal"
import { EventModal } from "./event-modal"
import { ImageModal } from "./image-modal"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { format, addDays, differenceInDays, differenceInWeeks, isLeapYear } from "date-fns"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { ImageIcon } from 'lucide-react'

interface Event {
  id: string
  age: number
  week: number
  name: string
  images: string[]
}

const defaultEvents: Event[] = [
  { id: "default-1", age: 16, week: 1, name: "Semana en que puedes conducir en la mayoría de los estados", images: [] },
  { id: "default-2", age: 18, week: 1, name: "Semana en que puedes votar, fumar cigarrillos, ir a la guerra y ser juzgado como adulto", images: [] },
  { id: "default-3", age: 21, week: 1, name: "Semana en que puedes beber alcohol legalmente", images: [] },
  { id: "default-4", age: 25, week: 6, name: "Edad promedio en que una mujer tiene su primer hijo", images: [] },
  { id: "default-5", age: 28, week: 35, name: "Semana en que los hombres se casan por primera vez, en promedio, hoy", images: [] },
  { id: "default-6", age: 22, week: 41, name: "Semana en que los hombres se casaban por primera vez, en promedio en 1960", images: [] },
  { id: "default-7", age: 47, week: 27, name: "Esperanza de vida promedio en Sierra Leona", images: [] },
  { id: "default-8", age: 76, week: 10, name: "Esperanza de vida promedio para hombres", images: [] },
  { id: "default-9", age: 81, week: 15, name: "Esperanza de vida promedio para mujeres", images: [] },
  { id: "default-10", age: 32, week: 27, name: "Newton desarrolla su ley de gravitación", images: [] },
  { id: "default-11", age: 26, week: 16, name: "Einstein publica su teoría de la Relatividad Especial", images: [] },
  { id: "default-12", age: 26, week: 28, name: "Einstein publica su fórmula E=mc^2", images: [] },
  { id: "default-13", age: 26, week: 25, name: "Newton inventa el cálculo", images: [] },
  { id: "default-14", age: 28, week: 30, name: "Einstein publica un artículo concibiendo por primera vez la Relatividad General", images: [] },
  { id: "default-15", age: 26, week: 37, name: "Newton publica sus descubrimientos sobre el espectro de la luz", images: [] },
]

function LifeGrid() {
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [showBirthDateModal, setShowBirthDateModal] = useState(true)
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedCell, setSelectedCell] = useState<{ age: number; week: number } | null>(null)
  const [events, setEvents] = useState<Event[]>(defaultEvents)
  const [progress, setProgress] = useState(0)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedEventName, setSelectedEventName] = useState("")

  // Generate all ages from 0 to 85
  const ages = Array.from({ length: 86 }, (_, i) => i)
  
  // Generate weeks from 1 to 52
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1)

  const handleBirthDateSubmit = (date: Date | null) => {
    setBirthDate(date || new Date(2000, 0, 1))
    setShowBirthDateModal(false)
  }

  const handleEditBirthDate = () => {
    setShowBirthDateModal(true)
  }

  const handleCloseBirthDateModal = () => {
    setShowBirthDateModal(false)
  }

  const handleCellClick = (age: number, week: number) => {
    setSelectedCell({ age, week })
    setShowEventModal(true)
  }

  const handleEventSubmit = (eventName: string, images: string[]) => {
    if (selectedCell) {
      const newEvent: Event = {
        id: `${selectedCell.age}-${selectedCell.week}-${Date.now()}`,
        ...selectedCell,
        name: eventName,
        images: images
      }
      setEvents([...events, newEvent])
    }
  }

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId))
  }

  const calculateLifeProgress = (birthDate: Date): {
    currentAge: number,
    currentWeek: number,
    totalWeeksLived: number,
    totalDaysLived: number,
    remainingWeeks: number,
    remainingChristmases: number
  } => {
    const today = new Date()
    const totalDaysLived = differenceInDays(today, birthDate)
    const totalWeeksLived = Math.floor(totalDaysLived / 7)
    
    // Restamos 3 semanas al total de semanas vividas
    const adjustedWeeksLived = totalWeeksLived - 3
    
    const currentAge = Math.floor(adjustedWeeksLived / 52)
    const currentWeek = adjustedWeeksLived - (currentAge * 52)

    // Calculate remaining weeks and Christmases
    const totalPossibleWeeks = 85 * 52 // Maximum weeks in 85 years
    const remainingWeeks = Math.max(0, totalPossibleWeeks - adjustedWeeksLived)
    const remainingChristmases = Math.max(0, 85 - currentAge)

    return {
      currentAge,
      currentWeek,
      totalWeeksLived: adjustedWeeksLived,
      totalDaysLived,
      remainingWeeks,
      remainingChristmases
    }
  }

  const getDateForWeek = (age: number, week: number): string => {
    if (!birthDate) return ""
    const weekStart = addDays(birthDate, (age * 52 + week - 1) * 7)
    const weekEnd = addDays(weekStart, 6)
    return `${format(weekStart, "d MMM")} - ${format(weekEnd, "d MMM, yyyy")}`
  }

  const currentProgress = birthDate ? calculateLifeProgress(birthDate) : null

  useEffect(() => {
    if (currentProgress) {
      const totalWeeks = 85 * 52 // Total weeks in 85 years
      setProgress((currentProgress.totalWeeksLived / totalWeeks) * 100)
    }
  }, [currentProgress])

  return (
    <div className="relative mx-auto max-w-[650px]">
      {showBirthDateModal && (
        <BirthDateModal 
          onBirthDateSubmit={handleBirthDateSubmit} 
          onClose={handleCloseBirthDateModal}
          initialDate={birthDate || undefined}
        />
      )}
      {showEventModal && selectedCell && (
        <EventModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          onSubmit={handleEventSubmit}
          onDelete={handleEventDelete}
          age={selectedCell.age}
          week={selectedCell.week}
          date={getDateForWeek(selectedCell.age, selectedCell.week)}
          existingEvents={events.filter(e => e.age === selectedCell.age && e.week === selectedCell.week)}
        />
      )}
      
      {selectedImages.length > 0 && (
        <ImageModal
          isOpen={selectedImages.length > 0}
          onClose={() => {
            setSelectedImages([])
            setSelectedEventName("")
          }}
          images={selectedImages}
          eventName={selectedEventName}
        />
      )}

      <div className="mt-4 mb-8 text-center">
        <p className="mt-2">
          Fecha de nacimiento: {birthDate ? format(birthDate, "PPP") : "No seleccionada"}
          <Button 
            onClick={handleEditBirthDate}
            variant="outline"
            size="sm"
            className="ml-2"
          >
            Editar
          </Button>
        </p>
      </div>
      
      {/* Barra de progreso de la vida */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold mb-2">Progreso de tu vida</h2>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground mt-1">
          Has vivido aproximadamente el {progress.toFixed(2)}% de una vida de 85 años.
        </p>
      </div>

      {/* Axis Labels */}
      <div className="absolute -left-36 top-1/2 -rotate-90 transform whitespace-nowrap text-lg font-bold">
        Edad
      </div>
      <div className="mb-4 text-center text-lg font-bold">
        Semana ───────⟶
      </div>

      <TooltipProvider delayDuration={0}>
        <div className="grid mt-8 justify-center items-center">
          {/* Header row with week numbers */}
          <div className="flex">
            <div className="h-2.5 w-2.5 m-[3px]" /> {/* Empty corner cell */}
            {weeks.map((week) => (
              <div
                key={week}
                className="flex h-2.5 w-2.5 items-center justify-center text-[10px] m-[3px] font-medium"
              >
                {week % 5 === 0 ? week : ""}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {ages.map((age) => (
            <div key={age} className="flex">
              {/* Age label - show all numbers but only make visible every 5 years */}
              <div 
                className="flex h-3 w-3 items-center justify-center text-[10px] font-medium"
                style={{
                  visibility: age % 5 === 0 ? 'visible' : 'hidden'
                }}
              >
                {age}
              </div>
              {/* Week cells */}
              {weeks.map((week) => {
                const cellEvents = events.filter(e => e.age === age && e.week === week)
                const isCurrentWeek = currentProgress && age === currentProgress.currentAge && week === currentProgress.currentWeek
                const isPastWeek = currentProgress && (
                  age < currentProgress.currentAge || 
                  (age === currentProgress.currentAge && week <= currentProgress.currentWeek)
                )
                return (
                  <Tooltip key={`${age}-${week}`}>
                    <TooltipTrigger>
                      <motion.div
                        className={`h-2.5 w-2.5 border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer m-[3px] ${
                          isCurrentWeek ? 'bg-blue-500 hover:bg-blue-600' : 
                          cellEvents.length > 0 ? 'bg-green-500 hover:bg-green-600' : 
                          isPastWeek ? 'bg-red-200 dark:bg-red-800' : ''
                        }`}
                        onClick={() => handleCellClick(age, week)}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        {cellEvents.some(event => event.images.length > 0) && (
                          <ImageIcon className="w-2 h-2 text-white absolute top-0 right-0" />
                        )}
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <p>Edad: {age} años y {week} semanas</p>
                      <p>Semana de tu vida: {age * 52 + week - 3}</p>
                      {isCurrentWeek && currentProgress && (
                        <>
                          <p className="font-bold text-blue-500">Semana actual</p>
                          <p>Días vividos: {currentProgress.totalDaysLived}</p>
                          <p>Semanas vividas: {currentProgress.totalWeeksLived}</p>
                          <p>Semanas restantes: {currentProgress.remainingWeeks}</p>
                          <p>Navidades restantes: {currentProgress.remainingChristmases}</p>
                        </>
                      )}
                      {cellEvents.length > 0 && (
                        <>
                          <p>Eventos:</p>
                          <ul className="list-disc pl-4">
                            {cellEvents.map(event => (
                              <li key={event.id} className="flex flex-col space-y-2">
                                <span>{event.name}</span>
                                {event.images.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {event.images.map((image, index) => (
                                      <img 
                                        key={index} 
                                        src={image} 
                                        alt={`${event.name} - Image ${index + 1}`} 
                                        className="w-16 h-16 object-cover rounded cursor-pointer" 
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          setSelectedImages(event.images)
                                          setSelectedEventName(event.name)
                                        }}
                                      />
                                    ))}
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {!isCurrentWeek && cellEvents.length === 0 && (
                        <p>Haz clic para agregar un evento</p>
                      )}
                      {isPastWeek && <p className="font-bold text-red-500">Esta semana ya pasó</p>}
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          ))}
        </div>
      </TooltipProvider>

      {currentProgress && (
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold mb-2">Te quedan aproximadamente:</p>
          <motion.p 
            className="text-4xl font-bold text-red-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentProgress.remainingWeeks} semanas
          </motion.p>
          <p className="text-lg mb-2">Eso es aproximadamente:</p>
          <ul className="list-disc list-inside mb-4">
            <li>{Math.floor(currentProgress.remainingWeeks / 52)} años</li>
            <li>{Math.floor(currentProgress.remainingWeeks / 4)} meses</li>
            <li>{currentProgress.remainingWeeks * 7} días</li>
          </ul>
          <p className="text-lg mb-2">Y solo te quedan cerca de:</p>
          <p className="text-2xl font-bold text-orange-500 mb-4">{currentProgress.remainingChristmases} Navidades</p>
        </div>
      )}
    </div>
  )
}

export { LifeGrid }
