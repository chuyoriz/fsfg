'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { animeList } from '@/data/animeList'
import { notFound } from 'next/navigation'

export const runtime = 'edge'

export default function WatchPage({ params }: { params: { id: string; episode: string } }) {
  const anime = animeList.find(a => a.id === parseInt(params.id))
  const episodeNum = parseInt(params.episode)
  
  if (!anime) {
    notFound()
  }

  const currentEpisode = anime.episodes.find(e => e.number === episodeNum)
  
  if (!currentEpisode) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link href={`/anime/${anime.id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to series
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-200">{anime.title}</h1>
          <p className="text-base text-gray-400">Episode {episodeNum}: {currentEpisode.title}</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center border border-white/10">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/20 cursor-pointer transition-colors border border-white/10">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-400">Video Player</p>
                <p className="text-sm text-gray-600 mt-1">Episode {episodeNum} • {currentEpisode.duration}</p>
              </div>
            </div>

            {/* Episode Info */}
            <div className="mt-6 p-5 bg-card-dark rounded-lg border border-white/10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-200 mb-1">{currentEpisode.title}</h3>
                  <p className="text-sm text-gray-400">Episode {episodeNum} • {currentEpisode.duration}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{anime.synopsis}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-4 flex gap-3">
              {episodeNum > 1 && (
                <Link href={`/anime/${anime.id}/watch/${episodeNum - 1}`} className="flex-1">
                  <button className="w-full px-5 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all border border-white/10">
                    ← Previous Episode
                  </button>
                </Link>
              )}
              {episodeNum < anime.episodes.length && (
                <Link href={`/anime/${anime.id}/watch/${episodeNum + 1}`} className="flex-1">
                  <button className="w-full px-5 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all">
                    Next Episode →
                  </button>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Episode Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card-dark rounded-lg p-5 sticky top-24 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Episodes</h3>
              <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {anime.episodes.map((ep) => (
                  <Link key={ep.number} href={`/anime/${anime.id}/watch/${ep.number}`}>
                    <div className={`p-3 rounded-md transition-all cursor-pointer ${
                      ep.number === episodeNum 
                        ? 'bg-white text-black' 
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                    }`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">Episode {ep.number}</span>
                        <span className="text-xs opacity-70">{ep.duration}</span>
                      </div>
                      <p className="text-xs opacity-80 line-clamp-1">{ep.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}