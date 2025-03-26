import Link from 'next/link'
import React from 'react'
import style from './global-layout.module.css'

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">ONEBITE CINEMA</Link>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default GlobalLayout
