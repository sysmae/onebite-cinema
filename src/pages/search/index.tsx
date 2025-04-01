import SearchableLayout from '@/components/SearchableLayout'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import MovieItem from '@/components/MovieItem'
// import {
//   GetServerSidePropsContext,
//   GetStaticPropsContext,
//   InferGetServerSidePropsType,
//   InferGetStaticPropsType,
// } from 'next'
import fetchMovies from '@/lib/fetch-movies'
import { MovieData } from '@/types'
import Head from 'next/head'

// 기존 SSR 방식
// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { q } = context.query
//   const movies = await fetchMovies(q as string)

//   return {
//     props: { movies },
//   }
// }

// SSG 로 번경 하려고 해도 검색 결과는 빌드 타임에 알 수 없기 때문에 X

// 검색 결과는 클라이언트 측에서 가져오도록 수정
const Page = () => {
  const [movies, setMovies] = useState<MovieData[]>([])
  const router = useRouter()
  const { q } = router.query

  const fetchSearchResult = async () => {
    const res = await fetchMovies(q as string)
    setMovies(res)
  }

  useEffect(() => {
    if (q) {
      fetchSearchResult()
    }
  }, [q])

  // 검색어와 일치하는 영화 필터링
  const filteredMovies = movies.filter(
    (movie) => movie.title.includes(q as string)
    // || movie.description.includes(q as string)
  )

  return (
    <div>
      <Head>
        <title>한입 시네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 시네마 - 검색결과" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화 설명들을 확인하세요"
        />
      </Head>
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
