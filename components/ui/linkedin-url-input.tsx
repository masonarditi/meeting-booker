"use client"

import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowUp } from "lucide-react"

interface LinkedInUrlInputProps {
  onUrlChange?: (url: string) => void
  onUpload?: (url: string) => void
  defaultValue?: string
}

export function LinkedInUrlInput({ 
  onUrlChange, 
  onUpload, 
  defaultValue = "" 
}: LinkedInUrlInputProps) {
  const [url, setUrl] = useState(defaultValue)
  
  // LinkedIn's exact brand blue color
  const linkedInBlue = "#0275b4"
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }
  
  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.2 } },
    unfocused: { scale: 1, transition: { duration: 0.2 } }
  }
  
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
    rest: { scale: 1, transition: { duration: 0.2 } }
  }
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    if (onUrlChange) {
      onUrlChange(newUrl)
    }
  }
  
  const handleUpload = () => {
    if (onUpload && url) {
      onUpload(url)
    }
  }
  
  return (
    <motion.div 
      className="w-full max-w-lg"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <div className="bg-white rounded-lg border shadow-sm p-7">
        <h3 className="text-lg font-semibold mb-3 text-center flex items-center justify-center">
          <img 
            src="/linkedin-color.png" 
            alt="LinkedIn" 
            className="w-5 h-5 mr-2" 
          />
          Upload LinkedIn URL
        </h3>
        
        <motion.div
          variants={inputVariants}
          initial="unfocused"
          whileFocus="focused"
          whileTap="focused"
          className="relative"
        >
          <Input 
            type="url" 
            placeholder="https://www.linkedin.com/in/your-profile/" 
            value={url}
            onChange={handleUrlChange}
            className="w-full transition-all duration-200 pr-12 py-5 text-base"
          />
          <motion.button
            style={{ backgroundColor: linkedInBlue }}
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-opacity-90 text-white p-1.5 rounded-md flex items-center justify-center"
            onClick={handleUpload}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            aria-label="Upload"
          >
            <ArrowUp size={18} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
} 