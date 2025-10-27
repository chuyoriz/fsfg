"use client"

import { useEffect, useRef } from 'react'

interface VideoJSPlayerProps {
  src: string
  poster?: string
  subtitles?: Array<{ url: string; lang: string }>
}

export default function VideoJSPlayer({ src, poster, subtitles = [] }: VideoJSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    if (!videoRef.current) return

    // Initialize Video.js player
    const videoElement = videoRef.current
    
    if (!(window as any).videojs) {
      console.error('Video.js not loaded')
      return
    }

    const player = (window as any).videojs(videoElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      responsive: true,
      html5: {
        vhs: {
          overrideNative: true
        },
        nativeVideoTracks: false,
        nativeAudioTracks: false,
        nativeTextTracks: false
      }
    })

    playerRef.current = player

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (playerRef.current && src) {
      playerRef.current.src({
        src: src,
        type: 'application/x-mpegURL'
      })
    }
  }, [src])

  return (
    <div data-vjs-player className="w-full h-full">
      <video
        ref={videoRef}
        className="video-js vjs-theme-forest vjs-big-play-centered"
        poster={poster}
        playsInline
      >
        {subtitles.filter(s => s.lang !== 'thumbnails').map((sub, i) => (
          <track
            key={i}
            kind="subtitles"
            src={sub.url}
            label={sub.lang}
            srcLang={sub.lang.toLowerCase().substring(0, 2)}
          />
        ))}
      </video>
    </div>
  )
}
