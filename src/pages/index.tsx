import SearchableLayout from '@/components/SearchableLayout'
import { ReactNode } from 'react'
import MovieItem from '@/components/MovieItem'
import fetchMovies from '@/lib/fetch-movies'
import { InferGetStaticPropsType } from 'next'
import fetchRandomMovies from '@/lib/fetch-random-movies'

// SSR을 사용하여 서버에서 데이터를 가져옵니다.
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

// SSG을 사용하여 정적 페이지를 생성합니다.
export const getStaticProps = async () => {
  console.log('인덱스 페이지')
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
    }
  } catch (error) {
    console.error('Error fetching movies:', error)
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
