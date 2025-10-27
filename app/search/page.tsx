'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { searchAnime, AnimeResult } from '@/lib/api'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<AnimeResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      setLoading(true)
      searchAnime(query)
        .then(setResults)
        .finally(() => setLoading(false))
    }
  }, [query])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Searching...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-200">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-400">{results.length} results found</p>
      </motion.div>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">No anime found. Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {results.map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link href={`/anime/${anime.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-card-dark transition-all duration-300 border border-white/10 group-hover:border-white/30">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 px-1">
                    <h3 className="font-semibold text-sm line-clamp-2 text-gray-200 group-hover:text-white transition-colors">
                      {anime.title}
                    </h3>
                    {anime.type && (
                      <p className="text-xs text-gray-500 mt-1">{anime.type}</p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}