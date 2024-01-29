"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ButtonMore(){
  const [pages,setPages] = useState(1)
  const router = useRouter()

  const handleMore = ()=>{
    let count = pages + 1
    setPages(count)
    router.push(`/anime?page=${pages}`)
  }

  // useEffect(()=>{

  // },[pages])
  return(
    <button onClick={handleMore}>MORE</button>
  )
}