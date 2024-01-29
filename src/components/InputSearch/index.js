"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CiSearch } from "react-icons/ci";

export default function InputSearch(){
  const [keyword, setKeyword] = useState("")
  const router = useRouter()
  
  const handleSearch = async()=>{
    router.push(`/search?q=${keyword}`)
  }

  return(
    <div className="flex w-[500px]">
      <div className="flex w-full relative bg-slate-400 ">
        <input 
          type="text"
          placeholder="Search here..." 
          name="search" 
          value={keyword}
          onChange={(e)=>setKeyword(e.target.value)}
          className="px-1 w-full space-x-4 p-1.5 flex ring-2 ring-zinc-400 rounded-md"/>
        <CiSearch
          type="button"
          onClick={handleSearch} 
          size={33} 
          className="text-zinc-500 font-semibold absolute end-0 cursor-pointer w-12 h-9 rounded-r-md"/> 
      </div>
    </div>
  )
}