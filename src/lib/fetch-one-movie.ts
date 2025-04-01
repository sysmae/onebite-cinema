import { MovieData } from '@/types'

export default async function fetchOneMovie(
  id: number
): Promise<MovieData | null> {
  const url = `https://onebite-cinema-api-main-sand.vercel.app/movie/${id}` // Mock API URL

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
    // console.error('Error fetching movie:', error)
    return null // Return null or handle the error as needed
  }
}
