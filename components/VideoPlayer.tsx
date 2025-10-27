'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  src: string
  isM3U8: boolean
  poster?: string
  referer?: string
}

export default function VideoPlayer({ src, isM3U8, poster, referer }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isM3U8) {
      // Check if HLS.js is supported
      if ((window as any).Hls && (window as any).Hls.isSupported()) {
        const hls = new (window as any).Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90
        })
        
        hls.loadSource(src)
        hls.attachMedia(video)
        
        hls.on((window as any).Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            // Autoplay blocked, user needs to click play
          })
        })

        hls.on((window as any).Hls.Events.ERROR, (event: any, data: any) => {
          // Suppress CORS errors in console (expected in development)
          if (data.fatal) {
            switch (data.type) {
              case (window as any).Hls.ErrorTypes.NETWORK_ERROR:
                // CORS errors are expected - silently fallback to iframe
                setUseFallback(true)
                hls.destroy()
                break
              case (window as any).Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError()
                break
              default:
                setUseFallback(true)
                hls.destroy()
                break
            }
          }
        })

        return () => {
          if (hls) {
            hls.destroy()
          }
        }
      }
      // For Safari (native HLS support)
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(() => {})
        })
      }
    } else {
      video.src = src
    }
  }, [src, isM3U8])

  // Use iframe fallback if HLS fails (CORS issues)
  if (useFallback) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-center max-w-lg p-8">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Streaming Blocked</h3>
          <p className="text-gray-300 mb-2">This video cannot be played directly due to CORS restrictions.</p>
          <p className="text-gray-400 text-sm mb-6">The video source blocks embedding and direct playback from external sites.</p>
          <div className="space-y-3">
            <a 
              href={src} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Video in New Tab
            </a>
            {referer && (
              <a 
                href={referer} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/10 text-white font-medium rounded-md hover:bg-white/20 transition-all border border-white/20"
              >
                Watch on Source Site
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      className="w-full h-full bg-black"
      controls
      controlsList="nodownload"
      poster={poster}
      playsInline
      preload="metadata"
    >
      <source src={src} type={isM3U8 ? 'application/x-mpegURL' : 'video/mp4'} />
      Your browser does not support the video tag.
    </video>
  )
}