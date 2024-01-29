"use client"

import { inter } from "@/app/font/font"
import styles from "@/app/styles/component.module.css"
import Link from "next/link"
import Image from "next/image"

export default function Animes({animes}){
  return(
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-2">
      {Array.isArray(animes) ? animes.map((item,index)=>{
          return(
            <div className='grid w-full p-1' key={index}>
              <div className="relative h-[170px]">
                <Image 
                  src={item.images.jpg.image_url}
                  width={300}
                  height={100}
                  priority={true}
                  alt={item.title}
                  className='rounded-md object-cover w-full shadow-xl drop-shadow-md brightness-75 flex items-center h-full'
                />
              </div>
              <div className={inter.variable}>
                <Link href={`/anime/${item.mal_id.toString()}`}>
                  <h1 className={`${styles.headingSatu}`}>{item.title}</h1>
                </Link>
              </div>
            </div>
          )
        })
      :null}
    </div>
  </>
  )
}