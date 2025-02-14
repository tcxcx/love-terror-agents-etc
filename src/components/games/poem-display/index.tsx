"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface PoemDisplayProps {
  poem: string
  onComplete: () => void
}

export const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem, onComplete }) => {
  const [isRevealed, setIsRevealed] = useState(false)

  const handleReveal = () => {
    setIsRevealed(true)
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl shadow-lg border border-purple-200"
    >
      <h3 className="text-2xl font-bold mb-4 text-center text-purple-600">Your Special Poem</h3>
      {isRevealed ? (
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="whitespace-pre-wrap font-serif text-indigo-700 bg-white bg-opacity-50 p-4 rounded-lg"
        >
          {poem}
        </motion.pre>
      ) : (
        <div className="text-center">
          <Button
            onClick={handleReveal}
            className="bg-purple-500 animate-pulse hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Reveal Poem
          </Button>
        </div>
      )}
    </motion.div>
  )
}

