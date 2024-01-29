"use client"

import { useAnimePagination } from "@/utils/api-anime"
import { useEffect, useState } from "react"
import Animes from "../Animes"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { inter } from "@/app/font/font"
import styles from "@/app/styles/component.module.css"


export default function PagePagination(){
  const [anime,setAnime] = useState([])
  const [count,setCount] = useState(1)
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page"))
  const router = useRouter()
  
  const getApiAnimePagination = async ()=>{
    try {
      const response = await useAnimePagination(page || 1)
      setAnime(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMore = (params)=>{
    let counts;
    if(params ==="next"){
      counts = page + 1
      setCount(counts)
    }else if(params === "prev"){
      counts = page - 1
      setCount(page === 1 ? counts = 1 : counts )
    }
    getApiAnimePagination()
    router.push(`/anime?page=${counts}`)
  }

  useEffect(()=>{
    getApiAnimePagination()
  },[page])

  
  return (
    <div className="mt-10">
      <div className={`${inter.variable}`}>
       <Link href={"/"}>
          <h1 className={`${styles.headingPopuler} underline inline-block md:hidden`}>back to home</h1>
        </Link> 
      </div>
      <Animes animes={anime}/>
      <div className="flex gap-5 justify-center my-5">
        <button 
          onClick={()=>handleMore("prev")} 
          className="p-1 px-4 bg-blue-500 hover:opacity-70 rounded-md text-white font-medium outline outline-offset-1 outline-blue-500">
            Prev
        </button>
        <button 
          onClick={()=>handleMore("next")} 
          className="p-1 px-4 bg-blue-500 hover:opacity-70 rounded-md text-white font-medium outline outline-offset-1 outline-blue-500">
            Next
        </button>
      </div>
    </div>
  )
}