import Comments from "@/components/Comments"
import { inter,tajawal } from "@/app/font/font"
import ButtonAdd from "@/components/ButtonAdd"
import FormComment from "@/components/FormComment"
import prisma from "@/libs/prisma"

import styles from "@/app/styles/component.module.css"
import Image from "next/image"
import Link from "next/link"

import { useAnimeById } from "@/utils/api-anime"
import { getSessionUsers } from "@/app/actions"
import { revalidateTag } from "next/cache"

export const generateMetadata = async ({params})=>{
  const id = params.id
  const anime = await useAnimeById(id)
  return{
    title: anime?.title
  }  
}

export default async function Page ({params}) {
  const id = params.id
  const anime = await useAnimeById(id)
 
  const mal_id = anime?.mal_id.toString() 
  const users = await getSessionUsers()

  const createComment = async(comment)=>{
    "use server"
    const cekIdUser = await prisma.user.findUnique({
      where:{
        id:users?.id
      }
    })

    await prisma.comment.create({
      data:{
        mal_id:id,
        comment:comment,
        author:{
          connect:{
            id: cekIdUser.id
          }
        }
      }
    })
    revalidateTag("comment")
  }
 
  const comments = await prisma.comment.findMany({
    where:{mal_id:id},
    select: {mal_id : true, comment:true, author:true, id:true}
  })

  const hallo = async()=>{
    "use server"
    return await prisma.collection.create({
      data:{
        title: anime?.title,
        duration: anime?.duration,
        image_url: anime?.images.jpg.image_url,
        mal_id,
        author:{
          connect:{id: users?.id}
        }
      }
    })
  }

  const deleteComment = async(id)=>{
    "use server"
    const cekIdUser = await prisma.comment.findUnique({
      where:{
        id:id,
        authorId: users?.id
      }
    })

    await prisma.comment.delete({
      where:{
        id: cekIdUser.id
      }
    })
    
    revalidateTag("comment")
  }

  return (
    <div className="container m-auto min-h-screen py-5">
      <div className={`${inter.variable} w-full my-4 inline-block md:hidden`}>
          <Link href={"/"}>
            <h1 className={`${styles.headingPopuler} underline`}>back to home</h1>
          </Link> 
        </div>
      <div className='grid grid-cols-1 p-2 justify-items-center md:my-8'>
         <div className="relative w-full h-[200px] md:h-[300px] flex justify-center">
         <Image 
          src={anime?.images?.jpg?.image_url}
          priority ={true}
          width={400}
          height={100}
          alt={anime?.synopsis}
          className='rounded-md bg-center object-cover w-[600px] shadow-xl drop-shadow-md brightness-75 flex items-center h-full'
          />
         </div>   
        <>
        <div className='grid w-full mt-9'>      
          <div className={`${inter.variable} flex justify-between items-center`}>
            <h1 className={`${styles.headingSatu} underline`}>{anime?.title}</h1>
             <ButtonAdd hallo={hallo}/>
          </div>
          <div className={`${tajawal.variable} mt-6`}>
            <p className={`${styles.paragraf} leading-relaxed whitespace-pre-line`}>
              {anime?.synopsis}
            </p>
          </div>              
        </div>
        </>
        <FormComment createComment={createComment} />
      </div>
      <Comments comments={comments} deleteComment={deleteComment} /> 
    </div>
  )
}