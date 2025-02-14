"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface GuessingGameProps {
  clues: {
    [key: string]: string
  }
  currentClue: number
  secretAnswer: string
  onComplete: () => void
  guess?: string
}

export const GuessingGame: React.FC<GuessingGameProps> = ({ clues, currentClue, secretAnswer, onComplete, guess }) => {
  const [userGuess, setUserGuess] = useState(guess || "")
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userGuess.toLowerCase().trim() === secretAnswer.toLowerCase().trim()) {
      setIsCorrect(true)
      onComplete()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl shadow-lg border border-red-200"
    >
      <h3 className="text-2xl font-bold mb-4 text-center text-red-600">Guessing Game</h3>
      <div className="mb-6 p-4 bg-white bg-opacity-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-pink-700">Clue #{currentClue}</h4>
        <p className="text-red-800 italic">{clues[`clue${currentClue}`]}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter your guess"
          className="w-full border-2 border-pink-300 focus:border-red-500 rounded-lg"
        />
        <Button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Submit Guess
        </Button>
      </form>
      {isCorrect && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-green-600 font-semibold text-center"
        >
          🎉 Correct! Well done! 🎉
        </motion.p>
      )}
    </motion.div>
  )
}

