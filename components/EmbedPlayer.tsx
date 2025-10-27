'use client'

interface EmbedPlayerProps {
  episodeId: string
  animeTitle: string
}

export default function EmbedPlayer({ episodeId, animeTitle }: EmbedPlayerProps) {
  // Extract episode number from episodeId
  const episodeMatch = episodeId.match(/\$episode\$(\d+)/)
  const episodeNumber = episodeMatch ? episodeMatch[1] : '1'

  // Use alternative embed sources
  const embedSources = [
    {
      name: 'Primary',
      url: `https://2embed.org/embed/${episodeId}`,
    },
    {
      name: 'Backup',
      url: `https://www.2embed.to/embed/tmdb/tv?id=${episodeId}`,
    },
  ]

  return (
    <div className="w-full h-full bg-black">
      <iframe
        src={embedSources[0].url}
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
        referrerPolicy="origin"
        title={`${animeTitle} - Episode ${episodeNumber}`}
      />
    </div>
  )
}