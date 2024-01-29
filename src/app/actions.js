"use server"

import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { revalidatePath, revalidateTag, unstable_noStore as noStore } from "next/cache"
import { cache } from 'react'

export async function addCollection(newAdd){
  const session = await getSessionUsers()
  const id = session?.id
  try  {
    const response = await fetch(`http://localhost:3000/api/v1/collection/${id}`,{
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAdd)
    })

    if(!response.ok){
      console.log("eror")
    }
    
    revalidatePath("/profile")

  } catch (error) {
   console.log(error.message)
  }
}

export async function deleteCollection(id){
  const session = await getSessionUsers()
  const authorId = session?.id
  try {
    const res = await fetch(`http://localhost:3000/api/anime/delete/${id}/${authorId}`,{
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json'  
      }
    })
    
    if(!res.ok){
      throw new Error("something went wrong")
    }
    await res.json()
    revalidatePath("/profile")
  } catch (error) {
    console.log(error)
  }  
}

export async function createComment(newComment){
  const user = await getSessionUsers()
  const id = user?.id
  try {
   const res = await fetch(`http://localhost:3000/api/v1/comment/${id}`,{
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newComment)
    })

    if(!res.ok){
      throw new Error(`gagal mengirim komentar ${res.status}`)
    }
    revalidateTag("comment")  
  } catch (error) {
    console.log(error.message)
  }
}

export const getSessionUsers = async () =>{
  const session = await getServerSession(authOptions)
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(session)
    },1000)
  }) 
}

