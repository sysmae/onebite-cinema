import { MovieData } from '@/types'

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = `https://onebite-cinema-api-main-sand.vercel.app/movie` // Mock API URL

  if (q) {
    url += `/search?q=${q}`
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    // console.error('Error fetching movies:', error)
    return [] // Return an empty array or handle the error as needed
  }
}
