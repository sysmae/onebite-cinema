import React from 'react'
import { useRouter } from 'next/router'
import movies from '@/mock/movies.json'
import type { MovieData } from '@/types'

const Page = () => {
  const router = useRouter()
  const { id } = router.query

  // ID에 해당하는 영화 데이터 찾기
  const movie = movies.find((movie) => movie.id === Number(id)) as
    | MovieData
    | undefined

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
