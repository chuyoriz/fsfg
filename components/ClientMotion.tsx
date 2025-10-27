'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function MotionDiv({ 
  children, 
  initial, 
  animate, 
  whileInView,
  viewport,
  transition,
  whileHover,
  className 
}: { 
  children: ReactNode
  initial?: any
  animate?: any
  whileInView?: any
  viewport?: any
  transition?: any
  whileHover?: any
  className?: string
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      whileHover={whileHover}
      className={className}
    >
      {children}
    </motion.div>
  )
}