"use client"

import { addCollection } from "@/app/actions"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ButtonAdd ({hallo}) {
  const {data: session, status} = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleAdd = async()=>{
    setLoading(true)
    if(status === "unauthenticated"){
      return router.push('/register')
    }
    try {
      await hallo()
      setTimeout(()=>{
        router.push("/profile")
      },1000)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='relative'>
      <div className='justify-end flex'>
        <button           
          onClick={handleAdd}
          type="button"
          disabled={loading}
          className='text-base font-sans ring-2 disabled:opacity-60 disabled:text-white ring-blue-600 bg-blue-600 rounded-md p-1 items-center flex hover:bg-blue-500 font-semibold text-white'>
          {loading && <svg className="animate-spin h-5 w-5 mr-3 border-2 border-r-black border-b-black opacity-50 rounded-full" viewBox="0 0 24 24"></svg>}
          add anime
        </button>
      </div> 
    </div>
  )
}
