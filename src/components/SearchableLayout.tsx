import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

export default function SearchableLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const q = router.query.q as string

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    if (!search.trim() || q === search) return
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div>
      <div className="flex gap-2 my-5">
        <input
          type="text"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요 ..."
          className="flex-1 px-3 py-2 text-base text-white bg-transparent border border-gray-500 rounded"
        />
        <button
          onClick={onSubmit}
          className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-red-600"
        >
          검색
        </button>
      </div>
      {children}
    </div>
  )
}
