"use client"

import { CountAnimation } from "@/components/ui/count-animation"
import { motion } from "framer-motion"

interface StatsBadgeProps {
  value: number
  label: string
}

export function StatsBadge({ value, label }: StatsBadgeProps) {
  return (
    <motion.div 
      className="inline-flex items-center justify-center px-4 py-3 rounded-full bg-gradient-to-r from-blue-50 via-[#3498db]/30 to-blue-50 shadow-sm mx-auto relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {/* Static shine effect overlay */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        animate={{ 
          x: ["100%", "-100%"]
        }}
        transition={{ 
          repeat: Infinity, 
          repeatType: "loop", 
          duration: 3,
          ease: "linear"
        }}
      />
      
      {/* Enhanced hover shine effect */}
      <motion.div 
        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"
        initial={{ x: "100%" }}
        whileHover={{ x: "-100%" }}
        transition={{ 
          duration: 1,
          ease: "easeOut" 
        }}
      />

      <span className="text-xl font-extrabold text-[#3498db] relative z-10 group-hover:text-[#3498db]/80 transition-colors duration-300 flex items-center">
        <CountAnimation 
          number={value}
          className="text-xl font-extrabold" 
        />
        <span>x</span>
      </span>
      <span className="text-lg font-medium ml-2 relative z-10">
        {label}
      </span>
    </motion.div>
  )
} 