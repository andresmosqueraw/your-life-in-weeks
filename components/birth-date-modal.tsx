"use client"

import React from "react"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BirthDateModalProps {
  onBirthDateSubmit: (birthDate: Date) => void
  onClose: () => void
  initialDate?: Date
}

const DEFAULT_DATE = new Date(2000, 0, 1); // January 1, 2000

export function BirthDateModal({ onBirthDateSubmit, onClose, initialDate }: BirthDateModalProps) {
  const [date, setDate] = useState<Date | undefined>(initialDate || DEFAULT_DATE)
  const [error, setError] = useState("")

  useEffect(() => {
    if (initialDate) {
      setDate(initialDate)
    }
  }, [initialDate])

  const handleSubmit = () => {
    if (!date) {
      setError("Please select a birth date.")
      return
    }
    if (date > new Date()) {
      setError("Birth date cannot be in the future.")
      return
    }
    onBirthDateSubmit(date)
  }

  const years = Array.from({ length: new Date().getFullYear() - 1939 }, (_, i) => 1940 + i)
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle>Enter Your Birth Date</DialogTitle>
          <DialogDescription>
            Please select your birth date to see where you are on the life grid.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date > new Date()}
                fromYear={1940}
                toYear={new Date().getFullYear()}
                defaultMonth={date}
                captionLayout="dropdown-buttons"
                classNames={{
                  caption_dropdowns: "flex justify-center gap-1",
                  dropdown: "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring",
                  caption_label: "hidden",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  head_cell: "w-9 font-normal text-muted-foreground",
                  day: cn(
                    "h-9 w-9 p-0 font-normal",
                    "aria-selected:opacity-100"
                  ),
                }}
                components={{
                  Dropdown: ({ value, onChange, children, ...props }) => {
                    const options = React.Children.toArray(children) as Array<React.ReactElement<{ value: unknown, children: React.ReactNode }>>
                    const selected = options.find((child) => child.props.value === value)
                    const handleChange = (value: string) => {
                      const changeEvent = { target: { value } }
                      onChange?.(changeEvent as React.ChangeEvent<HTMLSelectElement>)
                    }
                    return (
                      <Select
                        value={value?.toString()}
                        onValueChange={(value) => {
                          handleChange(value)
                        }}
                      >
                        <SelectTrigger className="pr-1.5 focus:ring-0">
                          <SelectValue>{selected?.props?.children}</SelectValue>
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {options.map((option, id: number) => (
                            <SelectItem key={id} value={option.props.value?.toString() ?? ""}>
                              {option.props.children}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  },
                }}
              />
            </PopoverContent>
          </Popover>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  )
}

