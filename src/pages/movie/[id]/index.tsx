import React from 'react'
import { useRouter } from 'next/router'
import type { MovieData } from '@/types'
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import fetchOneMovie from '@/lib/fetch-one-movie'
import fetchMovies from '@/lib/fetch-movies'

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context.params!.id
//   if (!id) {
//     return {
//       notFound: true,
//     }
//   }
//   // 서버사이드에서 영화 데이터 가져오기
//   const movie = await fetchOneMovie(Number(id))
//   return {
//     props: { movie },
//   }
// }

// SSG 방식으로 수정
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id
  if (!id) {
    return {
      notFound: true,
    }
  }
  // 서버사이드에서 영화 데이터 가져오기
  const movie = await fetchOneMovie(Number(id))
  // 영화 데이터가 없는 경우 처리
  if (!movie) {
    return {
      notFound: true,
    }
  }
  // 영화 데이터가 있는 경우 처리
  return {
    props: { movie },
  }
}

export const getStaticPaths = async () => {
  // 모든 영화 데이터 가져오기
  const movies = await fetchMovies()
  // 영화 ID를 기반으로 경로 생성
  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }))
  // SSG를 사용하여 정적 페이지를 생성하기 위한 경로 반환

  return {
    paths,
    fallback: true,
    // false: 'blocking' 페이지가 없을 경우 서버에서 데이터를 가져옴
    // fallback: false, // 페이지가 없을 경우 404 에러 발생
    // fallback: true, // 페이지가 없을 경우 클라이언트에서 데이터를 가져옴. 일단 Props 없는 페이지 반환 한 다음, Props 계산 한 다음 데이터 있는 상태의 페이지 렌더링
  }
}

const Page = ({ movie }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { id } = router.query
  // id가 없는 경우 처리
  if (!id) {
    return (
      <div className="text-center text-gray-500">
        영화 ID를 찾을 수 없습니다.
      </div>
    )
  }
  // 영화 데이터가 로딩 중인 경우 처리
  if (router.isFallback) {
    return <div className="text-center text-gray-500">로딩 중...</div>
  }
  // 영화 데이터가 없는 경우 처리
  if (!movie) {
    return (
      <div className="text-center text-gray-500">영화를 찾을 수 없습니다.</div>
    )
  }

  // 구조분해 할당으로 영화 정보 추출
  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = movie

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 영화 정보 컨테이너 */}
      <div className="max-w-6xl mx-auto p-4 relative">
        {/* 포스터 섹션 */}
        <div className="relative mb-6">
          {/* 배경 포스터 (흐릿하게) */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="w-full h-full blur-sm opacity-30"
              style={{
                backgroundImage: `url(${posterImgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)',
              }}
            ></div>
          </div>

          {/* 메인 포스터 */}
          <div className="flex justify-center items-center py-10 relative z-10">
            <img
              src={posterImgUrl}
              alt={title}
              className="h-96 shadow-2xl"
              style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
            />
          </div>
        </div>

        {/* 영화 제목 및 기본 정보 */}
        <h1 className="text-3xl font-bold mb-1">{title}</h1>
        <div className="text-sm text-gray-400 mb-6">
          {releaseDate} / {genres.join(', ')} / {runtime}분
          <br />
          {company}
        </div>

        {/* 영화 설명 */}
        <div className="mb-8">
          <p className="text-lg font-bold mb-3">{subTitle}</p>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Page
