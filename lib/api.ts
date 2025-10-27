const API_BASE = 'https://consumet-api-37qu.onrender.com/anime/zoro'

export interface AnimeResult {
  id: string
  title: string
  image: string
  url: string
  type?: string
}

export interface AnimeInfo {
  id: string
  title: string
  image: string
  description: string
  genres: string[]
  rating?: number
  episodes: Episode[]
  totalEpisodes: number
}

export interface Episode {
  id: string
  number: number
  title?: string
  url?: string
}

// Helper to log API responses
function logApiResponse(endpoint: string, data: any) {
  console.log(`[API ${endpoint}]:`, JSON.stringify(data, null, 2))
}

export interface StreamingData {
  headers?: {
    Referer?: string
    'User-Agent'?: string
  }
  sources: { url: string; quality?: string; isM3U8?: boolean }[]
  subtitles?: { url: string; lang: string }[]
  intro?: { start: number; end: number }
  outro?: { start: number; end: number }
  download?: string
}

// Search anime
export async function searchAnime(query: string): Promise<AnimeResult[]> {
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(query)}`, {
      next: { revalidate: 3600 } // Cache 1 hour
    })
    const data = await res.json()
    return data.results || []
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}

// Get anime info & episodes
export async function getAnimeInfo(id: string): Promise<AnimeInfo | null> {
  try {
    const url = `${API_BASE}/info?id=${encodeURIComponent(id)}`
    console.log('[API] Fetching anime info:', url)
    const res = await fetch(url, {
      next: { revalidate: 3600 }
    })
    const data = await res.json()
    console.log('[API] Anime info response:', data)
    return data
  } catch (error) {
    console.error('Info error:', error)
    return null
  }
}

// Get streaming links
export async function getStreamingData(episodeId: string, server: string = 'vidcloud'): Promise<StreamingData | null> {
  try {
    const url = `${API_BASE}/watch?episodeId=${encodeURIComponent(episodeId)}&server=${server}`
    console.log('[API] Fetching stream data:', url)
    const res = await fetch(url, {
      next: { revalidate: 0 } // No cache for streaming
    })
    const data = await res.json()
    console.log('[API] Stream data response:', data)
    return data
  } catch (error) {
    console.error('Streaming error:', error)
    return null
  }
}

export interface RecentAnimeResponse {
  results: AnimeResult[]
  hasNextPage: boolean
  currentPage: number
}

// Get recent anime with pagination
export async function getRecentAnime(page: number = 1): Promise<RecentAnimeResponse> {
  try {
    const url = `${API_BASE}/recent-episodes?page=${page}`
    console.log('[API] Fetching recent anime:', url)
    const res = await fetch(url, {
      next: { revalidate: 1800 }, // Cache 30 min
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'AniFlix/1.0'
      }
    })
    
    if (!res.ok) {
      console.error('[API] Recent anime request failed:', res.status, res.statusText)
      return { results: [], hasNextPage: false, currentPage: page }
    }
    
    const data = await res.json()
    console.log('[API] Recent anime response:', data)
    
    return {
      results: data.results || [],
      hasNextPage: data.hasNextPage || false,
      currentPage: data.currentPage || page
    }
  } catch (error) {
    console.error('[API] Recent anime error:', error)
    return { results: [], hasNextPage: false, currentPage: page }
  }
}