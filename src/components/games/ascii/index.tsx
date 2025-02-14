"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { VALENTINE_ASCII } from '@/lib/ascii';

interface AsciiArtProps {
  onComplete: () => void
}

export const AsciiArt: React.FC<AsciiArtProps> = ({ onComplete }) => {
  const [art, setArt] = useState<string>("")

  useEffect(() => {
    // Simulating ASCII art generation
    const generateArt = async () => {
      setArt(VALENTINE_ASCII)
      onComplete()
    }

    generateArt()
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="font-mono whitespace-pre p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl shadow-lg border border-pink-200"
    >
      <h3 className="text-2xl font-bold mb-4 text-center text-pink-600">Your Special ASCII Art</h3>
      <div className="overflow-x-auto">
        <pre className="text-purple-700">{art}</pre>
      </div>
    </motion.div>
  )
}

