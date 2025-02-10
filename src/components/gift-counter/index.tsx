"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { GameState } from "@/types"
import Link from "next/link"

interface GiftItemProps {
  name: string
  isUnlocked: boolean
}

const GiftItem: React.FC<GiftItemProps> = ({ name, isUnlocked }) => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={`/images/pixel-${name}.png`}
              alt={`Pixel ${name}`}
              width={96}
              height={96}
              priority
              className={`object-cover ${!isUnlocked ? 'opacity-50' : ''}`}
            />
            {!isUnlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/pixel-gift.png"
                  alt="Locked gift"
                  width={96}
                  height={96}
                  priority
                  className="object-cover"
                />
              </div>
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            {isUnlocked ? `${capitalizedName} unlocked!` : 'Locked'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface GiftCounterProps {
  gameState: GameState
}

const GiftCounter: React.FC<GiftCounterProps> = ({ gameState }) => {
  const confettiRef = useRef<ConfettiRef>(null)
  const [previousUnlockState, setPreviousUnlockState] = useState({
    roses_game: false,
    ascii_game: false,
    guess_game: false,
    poem_game: false,
  })

  useEffect(() => {
    // Check if any gift was just unlocked
    const newUnlock = (
      (gameState.roses_game && !previousUnlockState.roses_game) ||
      (gameState.ascii_game && !previousUnlockState.ascii_game) ||
      (gameState.guess_game && !previousUnlockState.guess_game) ||
      (gameState.poem_game && !previousUnlockState.poem_game)
    )

    if (newUnlock) {
      confettiRef.current?.fire({
        spread: 90,
        startVelocity: 45,
        particleCount: 200,
        decay: 0.9
      })
    }

    // Update previous state
    setPreviousUnlockState({
      roses_game: gameState.roses_game,
      ascii_game: gameState.ascii_game,
      guess_game: gameState.guess_game,
      poem_game: gameState.poem_game,
    })
  }, [gameState])

  const gifts = [
    { name: "roses", isUnlocked: gameState.roses_game },
    { name: "wine", isUnlocked: gameState.ascii_game },
    { name: "chocolate", isUnlocked: gameState.guess_game },
    { name: "scroll", isUnlocked: gameState.poem_game },
  ]

  return (
    <div className="relative">
      <Confetti
        ref={confettiRef}
        className="fixed inset-0 z-50 pointer-events-none"
      />
      <motion.div
        className="flex items-center justify-center p-4 bg-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/">
          <Image 
            src="/cringe-logo.png" 
            alt="Gift" 
            width={96} 
            height={96} 
            priority 
            className="flex justify-start items-left top-0 left-0 w-25 h-25 object-cover" 
          />
        </Link>
        <span className="h-px flex-1 bg-border"></span>
        <div className="flex flex-col space-y-0 p-0 bg-transparent">
          <h1 className="text-2xl font-bold">Open your gifts</h1>
          <h2 className="text-xs text-gray-600 font-bold">Find your secret admirer</h2>
        </div>
        <div className="flex flex-row space-y-2 p-4 bg-transparent">
          {gifts.map((gift) => (
            <GiftItem 
              key={gift.name} 
              name={gift.name} 
              isUnlocked={gift.isUnlocked} 
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default GiftCounter