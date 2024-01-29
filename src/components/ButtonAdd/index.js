"use client"

import { addCollection } from "@/app/actions"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function ButtonAdd ({title, duration,image_url,mal_id}) {
  const {data: session, status} = useSession()
  const router = useRouter()
  const handleAdd = async()=>{
    if(status === "unauthenticated"){
      return router.push('/register')
    }
    try {
    const newAdd = {
      title,
      duration,
      image_url,
      mal_id,
    }
    await addCollection(newAdd)
    router.push("/profile")
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <div className='relative'>
      <div className='justify-end flex'>
        <button           
          onClick={handleAdd}
          type="button"
          className='text-base font-sans ring-2 disabled:opacity-60 disabled:text-white ring-blue-600 bg-blue-600 rounded-md p-1 items-center flex hover:bg-blue-500 font-semibold text-white'>
          add Anime
        </button>
      </div> 
    </div>
  )
}
