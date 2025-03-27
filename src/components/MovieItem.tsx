import React from 'react'
import type { MovieData } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

const MovieItem = ({ id, title, posterImgUrl }: MovieData) => {
  return (
    <Link href={`/movie/${id}`}>
      <Image src={posterImgUrl} alt={title} width={300} height={500} />
    </Link>
  )
}
export default MovieItem
