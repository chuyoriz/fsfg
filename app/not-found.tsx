'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-8xl mb-8"
        >
          🌀
        </motion.div>
        <h1 className="text-7xl md:text-9xl font-bold mb-6 text-gray-200">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-300">You took a wrong portal!</h2>
        <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
          Looks like this anime dimension doesn't exist. Let's get you back to safety.
        </p>
        <Link href="/">
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-all duration-200 hover:scale-105 shadow-lg">
            Return Home
          </button>
        </Link>
      </motion.div>
    </div>
  )
}