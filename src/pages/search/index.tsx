import SearchableLayout from '@/components/SearchableLayout'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import MovieItem from '@/components/MovieItem'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import fetchMovies from '@/lib/fetch-movies'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { q } = context.query
  const movies = await fetchMovies(q as string)

  return {
    props: { movies },
  }
}

const Page = ({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { q } = router.query

  // 검색어와 일치하는 영화 필터링
  const filteredMovies = movies.filter(
    (movie) => movie.title.includes(q as string)
    // || movie.description.includes(q as string)
  )

  return (
    <div>
      <h1 className="font-bold text-xl mb-4">검색 결과: {q}</h1>
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  )
}

export default Page

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
