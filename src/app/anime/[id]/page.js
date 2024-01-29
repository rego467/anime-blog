import Comments from "@/components/Comments"
import { inter,tajawal } from "@/app/font/font";
import ButtonAdd from "@/components/ButtonAdd"
import FormComment from "@/components/FormComment";
import prisma from "@/libs/prisma";

import styles from "@/app/styles/component.module.css"
import Image from "next/image";
import { useAnimeById } from "@/utils/api-anime";
import { getSessionUsers } from "@/app/actions";
import { getAuthSession } from "@/libs/auth-session";
import Link from "next/link";

export const metadata ={
  title: "detail"
}

export default async function Page ({params}) {
  const id = params.id
  const anime = await useAnimeById(id)
  
  const mal_id = anime?.mal_id.toString() 
  const users = await getSessionUsers()
  // const users = await getAuthSession()
  const comments = await prisma.comment.findMany({
    where:{mal_id:id},
    select: {mal_id : true, comment:true, author:true}
  })

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
          src={anime?.images.jpg.image_url}
          priority ={true}
          width={400}
          height={100}
          alt={anime?.title}
          className='rounded-md bg-center object-cover w-[600px] shadow-xl drop-shadow-md brightness-75 flex items-center h-full'
          />
         </div>   
        <>
        <div className='grid w-full mt-9'>      
          <div className={`${inter.variable} flex justify-between items-center`}>
            <h1 className={`${styles.headingSatu} underline`}>{anime?.title}</h1>
             <ButtonAdd 
             duration={anime?.duration} 
             image_url={anime?.images.jpg.image_url} 
             title={anime?.title} 
             mal_id={mal_id}
            />
          </div>
          <div className={`${tajawal.variable} mt-6`}>
            <p className={`${styles.paragraf} leading-relaxed whitespace-pre-line`}>
              {anime?.synopsis}
            </p>
          </div>              
        </div>
        </>
        <FormComment mal_id ={id} email={users?.user?.email}/>
      </div>
      <Comments comments={comments} /> 
    </div>
  )
}