"use client"

import { useState } from "react"
import { LinkedInUrlInput } from "@/components/ui/linkedin-url-input"
import { SparklesText } from "@/components/ui/sparkles-text"
import { StatsBadge } from "@/components/ui/stats-badge"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { PeopleCarousel } from "@/components/ui/people-carousel"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ExternalLink } from "lucide-react"

export default function Home() {
  const [url, setUrl] = useState("")
  const [calendlyLink, setCalendlyLink] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
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

  const resultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        duration: 0.3 
      } 
    }
  }
  
  const handleUpload = async (linkedinUrl: string) => {
    console.log(`[handleUpload] Starting upload process for URL: "${linkedinUrl}"`)
    
    if (!linkedinUrl) {
      console.warn("[handleUpload] Empty LinkedIn URL provided, aborting request")
      return
    }
    
    console.log("[handleUpload] Setting states: isLoading=true, error=null, calendlyLink=null")
    setIsLoading(true)
    setError(null)
    setCalendlyLink(null)
    
    try {
      console.log("[handleUpload] Preparing API request payload:", { linkedinUrl })
      
      console.log("[handleUpload] Sending POST request to https://calendly-backend.vercel.app/generate-link")
      const startTime = performance.now()
      
      const response = await fetch("https://calendly-backend.vercel.app/generate-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ linkedinUrl }),
      })
      
      const requestTime = performance.now() - startTime
      console.log(`[handleUpload] Request completed in ${requestTime.toFixed(2)}ms with status: ${response.status}`)
      
      if (!response.ok) {
        console.error(`[handleUpload] API request failed with status ${response.status}`, response)
        throw new Error(`Request failed with status ${response.status}`)
      }
      
      console.log("[handleUpload] Parsing response JSON")
      const data = await response.json()
      console.log("[handleUpload] Response data received:", data)
      
      console.log(`[handleUpload] Setting calendlyLink state to: "${data.link}"`)
      setCalendlyLink(data.link)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate link"
      console.error("[handleUpload] Error occurred during request:", err)
      console.log(`[handleUpload] Setting error state to: "${errorMessage}"`)
      setError(errorMessage)
    } finally {
      console.log("[handleUpload] Request completed, setting isLoading=false")
      setIsLoading(false)
    }
  }
  
  // Log URL changes
  const handleUrlChange = (newUrl: string) => {
    console.log(`[handleUrlChange] URL updated: "${newUrl}"`)
    setUrl(newUrl)
  }
  
  // Log component lifecycle and state changes
  console.log("[Home] Current state:", { 
    url, 
    isLoading, 
    hasError: !!error, 
    hasCalendlyLink: !!calendlyLink,
    calendlyLink
  })
  
  return (
    <div className="relative h-screen">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.2}
        flickerChance={0.1}
      />
      
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center h-screen p-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onAnimationStart={() => console.log("[Animation] Container animation started")}
        onAnimationComplete={() => console.log("[Animation] Container animation completed")}
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
            text="LinkedIn to Calendly in seconds." 
            className="mb-4 mt-4 text-gray-500 text-base sm:text-xl md:text-2xl font-light" 
            sparklesCount={0} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="w-full flex justify-center">
          <LinkedInUrlInput onUrlChange={handleUrlChange} onUpload={handleUpload} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="w-full flex justify-center mt-6">
          <PeopleCarousel />
        </motion.div>
        
        <AnimatePresence mode="wait" onExitComplete={() => console.log("[Animation] Exit animation completed for result")}>
          {isLoading && (
            <motion.div
              key="loading"
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-4 flex items-center gap-2 text-gray-700"
              onAnimationStart={() => console.log("[Animation] Loading indicator animation started")}
              onAnimationComplete={() => console.log("[Animation] Loading indicator animation completed")}
            >
              <Loader2 className="animate-spin" size={20} />
              <span>Finding Calendly link...</span>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              key="error"
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-4 p-3 bg-red-50 text-red-700 rounded-md"
              onAnimationStart={() => console.log("[Animation] Error message animation started")}
              onAnimationComplete={() => console.log("[Animation] Error message animation completed")}
            >
              {error}
            </motion.div>
          )}
          
          {calendlyLink && (
            <motion.div
              key="success"
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-6 w-full max-w-lg"
              onAnimationStart={() => console.log("[Animation] Success message animation started")}
              onAnimationComplete={() => console.log("[Animation] Success message animation completed")}
            >
              <div className="bg-white border shadow-sm rounded-lg p-5">
                <h3 className="font-medium text-gray-900 mb-2">Calendly Link Found!</h3>
                <div className="flex items-center gap-2">
                  <a 
                    href={calendlyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors w-full"
                    onClick={() => console.log(`[Calendly link] User clicked link: "${calendlyLink}"`)}
                    onMouseEnter={() => console.log(`[Calendly link] User hovering over link: "${calendlyLink}"`)}
                  >
                    <span className="truncate">{calendlyLink}</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}