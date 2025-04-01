import { MovieData } from '@/types'

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const url = `http://localhost:12345/movie/random` // Mock API URL

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
