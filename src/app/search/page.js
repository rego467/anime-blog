"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Animes from '@/components/Animes'
import Link from 'next/link'

import { inter } from '../font/font'
import styles from "@/app/styles/component.module.css"
import { useSearchAnime } from '@/utils/api-anime'

const Home = () => {
  const [anime,setAnime] = useState([])
  const searchParams = useSearchParams()
  const search = searchParams.get("q")

  const getData = async()=>{
    try {
      const data = await useSearchAnime(search)
      setAnime(data?.data)
    } catch (error) {
      console.log(error)      
    }
  }

  useEffect(()=>{
    getData()
  },[search])

  return (
    <div className='container m-auto min-h-screen mt-5'>
      <div className={`${inter.variable} flex justify-between items-center mt-10 my-3 px-4`}>
        <h1 className={`${styles.headingSearch} font-semibold`}>search page "{search}"</h1>
        <Link href={"/"}>
          <h1 className={`${styles.headingSearch} font-semibold underline`}>Back to home</h1>
        </Link>
      </div>
      <div>        
        <Animes animes={anime}/>     
      </div>
    </div>
  )
}

export default Home