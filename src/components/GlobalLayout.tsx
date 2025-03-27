import Link from 'next/link'
import React from 'react'

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-5">
      <header className="text-red-600 text-xl font-bold py-2">
        <Link href="/">ONEBITE CINEMA</Link>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default GlobalLayout
