"use client"

import { useEffect, useRef } from 'react'
import { MediaPlayer, MediaProvider, Track } from '@vidstack/react'

interface VidStackPlayerProps {
  src: string
  title: string
  poster?: string
  subtitles?: Array<{ url: string; lang: string }>
  intro?: { start: number; end: number }
  outro?: { start: number; end: number }
}

export default function VidStackPlayer({ 
  src, 
  title, 
  poster, 
  subtitles = [],
  intro,
  outro 
}: VidStackPlayerProps) {
  const playerRef = useRef<any>(null)

  useEffect(() => {
    const player = playerRef.current
    if (!player || !intro) return

    // Add intro skip functionality
    const handleTimeUpdate = () => {
      const currentTime = player.currentTime
      
      // Skip intro button
      if (intro && currentTime >= intro.start && currentTime <= intro.end) {
        console.log('Intro detected at', currentTime)
      }
      
      // Skip outro button
      if (outro && currentTime >= outro.start && currentTime <= outro.end) {
        console.log('Outro detected at', currentTime)
      }
    }

    player.addEventListener('time-update', handleTimeUpdate)
    return () => player.removeEventListener('time-update', handleTimeUpdate)
  }, [intro, outro])

  // Filter out thumbnail tracks
  const validSubtitles = subtitles.filter(sub => sub.lang !== 'thumbnails')
  const thumbnailTrack = subtitles.find(sub => sub.lang === 'thumbnails')

  return (
    <MediaPlayer
      ref={playerRef}
      title={title}
      src={src}
      poster={poster}
      crossOrigin="anonymous"
      playsInline
      controls
      className="w-full h-full bg-black"
      style={{ width: '100%', height: '100%' }}
    >
      <MediaProvider />
      
      {validSubtitles.map((subtitle, index) => (
        <Track
          key={index}
          kind="subtitles"
          src={subtitle.url}
          label={subtitle.lang}
          lang={subtitle.lang.toLowerCase().substring(0, 2)}
          default={index === 0}
        />
      ))}
      
      {thumbnailTrack && (
        <Track
          kind="metadata"
          src={thumbnailTrack.url}
        />
      )}
    </MediaPlayer>
  )
}
