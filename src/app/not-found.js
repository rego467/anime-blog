import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='container m-auto justify-center flex flex-col items-center min-h-screen'>
      <div className='flex flex-col gap-1 justify-center items-center h-44'>
        <h1 className='text-2xl'>Halaman tidak ada...</h1>
        <Link href="/" className='underline underline-offset-2'>Back to home</Link>
      </div>
    </div>
  )
}

export default Home