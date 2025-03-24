import React from 'react'
import { useRouter } from 'next/router'
const Page = () => {
  const router = useRouter()
  const { id } = router.query
  return <div className="font-bold">{id} 영화 상세페이지</div>
}

export default Page
