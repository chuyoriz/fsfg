'use client'

import { motion } from 'framer-motion'
import { animeList } from '@/data/animeList'
import AnimeCard from '@/components/AnimeCard'

export default function AnimePage() {
  return (
    <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-200">All Anime</h1>
        <p className="text-gray-400 text-base md:text-lg">Thousands of anime series and movies at your fingertips</p>
      </motion.div>

      {/* Realistic grid with proper spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {animeList.map((anime, index) => (
          <motion.div
            key={anime.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
          >
            <AnimeCard anime={anime} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}