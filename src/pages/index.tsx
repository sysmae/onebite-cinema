import SearchableLayout from '@/components/SearchableLayout'
import { ReactNode } from 'react'
import MovieItem from '@/components/MovieItem'
import fetchMovies from '@/lib/fetch-movies'
import { InferGetStaticPropsType } from 'next'
import fetchRandomMovies from '@/lib/fetch-random-movies'
import Head from 'next/head'

// SSR 을 사용하여 서버에서 데이터를 가져옵니다.
// export const getServerSideProps = async () => {
//   try {
//     const [allMovies, recoMovies] = await Promise.all([
//       fetchMovies(),
//       fetchRandomMovies(),
//     ])
//     return {
//       props: {
//         allMovies,
//         recoMovies,
//       },
//     }
//   } catch (error) {
//     console.error('Error fetching movies:', error)
//     return {
//       props: {
//         allMovies: [],
//         recoMovies: [],
//       },
//     }
//   }
// }

export const getStaticProps = async () => {
  // SSG을 사용하여 정적 페이지를 생성합니다.
  // ISR을 사용하여 페이지를 재생성합니다.
  // 3초마다 페이지를 재생성합니다.
  try {
    const [allMovies, recoMovies] = await Promise.all([
      fetchMovies(),
      fetchRandomMovies(),
    ])
    return {
      props: {
        allMovies,
        recoMovies,
      },
      //
      revalidate: 3, // 3초마다 페이지를 재생성합니다.
    }
  } catch (error) {
    // console.error('Error fetching movies:', error)
    return {
      props: {
        allMovies: [],
        recoMovies: [],
      },
    }
  }
}

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // InferGetServerSidePropsType<typeof getServerSideProps>)
  return (
    <>
      <Head>
        <title>한입 시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화 설명들을 확인하세요"
        />
      </Head>
      {/* 3개의 MovieItem 컴포넌트 렌더링 */}
      <div className="py-4">
        <h2 className="font-bold ">지금 가장 추천하는 영화</h2>
        <div className="grid grid-cols-3 gap-4">
          {recoMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </div>

      {/* 한줄에 5개씩 MovieItem 컴포넌트 렌더링 */}

      <div className="py-4">
        <h2 className="font-bold">등록된 모든 영화</h2>
        <div className="grid grid-cols-5 gap-4">
          {allMovies.map((movie) => (
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
