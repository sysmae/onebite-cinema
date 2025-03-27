import SearchableLayout from '@/components/SearchableLayout'
import { ReactNode } from 'react'
import MovieItem from '@/components/MovieItem'
import movies from '@/mock/movies.json'

export default function Home() {
  return (
    <>
      {/* 3개의 MovieItem 컴포넌트 렌더링 */}
      <div className="py-4">
        <h2 className="font-bold ">지금 가장 추천하는 영화</h2>
        <div className="grid grid-cols-3 gap-4">
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </div>

      {/* 한줄에 5개씩 MovieItem 컴포넌트 렌더링 */}

      <div className="py-4">
        <h2 className="font-bold">등록된 모든 영화</h2>
        <div className="grid grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
