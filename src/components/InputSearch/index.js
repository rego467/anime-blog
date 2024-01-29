"use client"

import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { CiSearch } from "react-icons/ci"

export default function InputSearch(){
  const router = useRouter()
  const formik = useFormik({
    initialValues:{
      search:""
    },
    onSubmit: values=>{
      router.push(`/search?q=${values.search}`)
    } 
  })

  return(
    <div className="flex w-[500px]">
      <form className="flex w-full relative bg-slate-400" onSubmit={formik.handleSubmit}>
        <input 
          type="text"
          placeholder="Search here..." 
          name="search" 
          value={formik.values.search}
          onChange={formik.handleChange}
          className="px-1 w-full space-x-4 p-1.5 flex ring-2 ring-zinc-400 rounded-md"/>
          <button 
            type="submit" 
            className="text-zinc-500 font-semibold absolute end-0 items-center flex cursor-pointer w-12 h-9 rounded-r-md">
            <CiSearch size={33} className="flex w-full"/>
          </button>
      </form> 
    </div>
  )
}