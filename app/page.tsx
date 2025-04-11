"use client"

import { useState } from "react"
import { LinkedInUrlInput } from "@/components/ui/linkedin-url-input"
import { SparklesText } from "@/components/ui/sparkles-text"

export default function Home() {
  const [url, setUrl] = useState("")
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4 gap-4">
      <div className="text-center max-w-4xl mx-auto">
        <SparklesText 
          text="Book a Meeting with Anyone" 
          className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl" 
        />
        <SparklesText 
          text="Get on the Calendly of the most important people with just a Linkedin URL." 
          className="mb-4 mt-2 text-gray-500 text-base sm:text-xl md:text-2xl font-light" 
          sparklesCount={0} 
        />
      </div>
      <LinkedInUrlInput onUrlChange={setUrl} />
    </div>
  )
}