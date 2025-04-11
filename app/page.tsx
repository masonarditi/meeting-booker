"use client"

import { useState } from "react"
import { LinkedInUrlInput } from "@/components/ui/linkedin-url-input"
import { SparklesText } from "@/components/ui/sparkles-text"
import { StatsBadge } from "@/components/ui/stats-badge"
import { motion } from "framer-motion"

export default function Home() {
  const [url, setUrl] = useState("")
  
  // Animation variants for staggered top-to-bottom entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-screen bg-white p-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-2">
        <StatsBadge value={50} label="Response Rate with Clients" />
      </motion.div>
      
      <motion.div 
        className="text-center max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <SparklesText 
          text="Book a Meeting with Anyone" 
          className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl" 
        />
        <SparklesText 
          text="Get on the Calendly of the most important people with just a Linkedin URL." 
          className="mb-4 mt-4 text-gray-500 text-base sm:text-xl md:text-2xl font-light" 
          sparklesCount={0} 
        />
      </motion.div>
      
      <motion.div variants={itemVariants} className="w-full flex justify-center">
        <LinkedInUrlInput onUrlChange={setUrl} />
      </motion.div>
    </motion.div>
  )
}