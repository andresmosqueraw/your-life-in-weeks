"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const quotes = [
  "La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon",
  "El tiempo es limitado, no lo desperdicies viviendo la vida de alguien más. - Steve Jobs",
  "En el final, no son los años en tu vida los que cuentan. Es la vida en tus años. - Abraham Lincoln",
  "Vive como si fueras a morir mañana. Aprende como si fueras a vivir para siempre. - Mahatma Gandhi",
  "La vida es corta, y es tu deber vivirla plenamente. - Wayne Dyer"
]

export function InspirationalQuote() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])

  return (
    <motion.p
      className="text-lg text-zinc-600 dark:text-zinc-400 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {quote}
    </motion.p>
  )
}

