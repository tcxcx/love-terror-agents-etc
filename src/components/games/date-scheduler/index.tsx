"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CalendarHeart, MapPin } from "lucide-react"
import Link from "next/link"

interface DateSchedulerProps {
  location: string
  details: string
  calendlyLink: string
}

export const DateScheduler: React.FC<DateSchedulerProps> = ({ location, details, calendlyLink }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl shadow-lg border border-blue-200"
    >
      <h3 className="text-2xl font-bold mb-4 text-center text-blue-600">Your Special Date</h3>
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-2">
          <MapPin className="text-teal-500" />
          <p className="text-blue-700">
            <strong>Location:</strong> {location}
          </p>
        </div>
        <div className="bg-white bg-opacity-50 p-4 rounded-lg">
          <p className="text-teal-700">
            <strong>Details:</strong> {details}
          </p>
        </div>
      </div>
      <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
        <Link 
          href={calendlyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2"
        >
          <CalendarHeart className="w-5 h-5" />
          <span>Schedule Your Date</span>
        </Link>
      </Button>
    </motion.div>
  )
}

