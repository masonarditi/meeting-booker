"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// People data array
const people = [
  {
    name: "Alex Chen",
    description: "Tech Startup Founder",
    photoSrc: "/avatars/alex.webp",
  },
  {
    name: "Sarah Johnson",
    description: "Marketing Executive",
    photoSrc: "/avatars/sarah.webp",
  },
  {
    name: "Michael Rodriguez",
    description: "Investment Analyst",
    photoSrc: "/avatars/michael.webp",
  },
  {
    name: "Priya Patel",
    description: "Product Manager",
    photoSrc: "/avatars/priya.webp",
  },
  {
    name: "David Kim",
    description: "Software Engineer",
    photoSrc: "/avatars/david.webp",
  }
]

export function PeopleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === people.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) // Change every 3 seconds
    
    return () => clearInterval(interval)
  }, [])

  // Animation variants for horizontal transition
  const cardVariants = {
    enter: { opacity: 0, x: 100 },
    center: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { 
        duration: 0.8,
        ease: "easeIn"
      }
    }
  }

  return (
    <div className="w-full max-w-xs mx-auto relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-3 flex items-center space-x-3"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100">
            <Image 
              src={people[currentIndex].photoSrc} 
              alt={people[currentIndex].name}
              fill
              sizes="40px"
              priority={true}
              className="object-cover"
              onError={(e) => {
                // Fallback for missing images
                const target = e.target as HTMLImageElement
                target.src = "https://via.placeholder.com/48?text=User"
              }}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{people[currentIndex].name}</h3>
            <p className="text-xs text-gray-500">{people[currentIndex].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
