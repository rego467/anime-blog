"use client"

import { useState } from "react"
import { IoIosMore } from "react-icons/io"

export default function ButtonMore({children}){
  const [more,setMore] = useState(false)

  const handleMore = ()=>{
    setMore(!more)
  }


  return(
    <div className="relative">
      <IoIosMore size={29} className="cursor-pointer" onClick={handleMore} />
      <div className={`${more ? "inline-block" : "hidden"} absolute end-0 bg-zinc-600 w-20 p-1 rounded-md`}>
        {children}
      </div>
    </div>
  )
}