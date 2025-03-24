import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const { q } = router.query
  return <div className="font-bold">검색 결과 : {q}</div>
}

export default Page
