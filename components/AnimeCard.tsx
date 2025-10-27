'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Anime } from '@/data/animeList'

interface AnimeCardProps {
  anime: Anime
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group relative cursor-pointer"
      >
        {/* Poster with elegant shadow */}
        <div className="aspect-[2/3] overflow-hidden rounded-lg bg-card-dark transition-all duration-300 border border-white/10 group-hover:border-white/30">
          <img
            src={anime.poster}
            alt={anime.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          

        </div>

        {/* Title */}
        <div className="mt-3 px-1">
          <h3 className="font-semibold text-sm md:text-base line-clamp-1 text-gray-200 group-hover:text-white transition-colors">
            {anime.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-white text-xs">★</span>
            <span className="text-xs text-gray-400">{anime.rating}</span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-400">{anime.genre[0]}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}