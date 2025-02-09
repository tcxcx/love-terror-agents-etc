"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { GameState } from "@/utils/supabase/types"
import type React from "react"

interface GiftItemProps {
  name: string
  isUnlocked: boolean
}

const GiftItem: React.FC<GiftItemProps> = ({ name, isUnlocked }) => {
  return (
    <motion.div
      className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden"
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
  )
}

interface GiftCounterProps {
  gameState: GameState
}

const GiftCounter: React.FC<GiftCounterProps> = ({ gameState }) => {
  const gifts = [
    { name: "rose", isUnlocked: gameState.roses_game },
    { name: "wine", isUnlocked: gameState.ascii_game },
    { name: "chocolate", isUnlocked: gameState.guess_game },
    { name: "scroll", isUnlocked: gameState.poem_game },
  ]

  return (
    <motion.div
      className="flex items-center justify-center p-4 bg-transparent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <span className="h-px flex-1 bg-border"></span>
      <div className="flex flex-col space-y-0 p-0 bg-transparent">
        <h1 className="text-2xl font-bold">Open your gifts</h1>
        <h2 className="text-xs  text-gray-600 font-bold">Find your secret admirer</h2>
      </div>
      <div className="flex flex-row space-y-2 p-4 bg-transparent">

        {gifts.map((gift) => (
          <GiftItem key={gift.name} name={gift.name} isUnlocked={gift.isUnlocked} />
        ))}
      </div>
    </motion.div>
  )
}

export default GiftCounter