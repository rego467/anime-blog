"use client"

import { genos, tajawal } from "@/app/font/font"
import styles from "@/app/styles/component.module.css"

export const revalidate = 0

export default function Comments({comments}){
  return (
    <div className='gap-5 flex flex-col p-2'>
      {comments && comments.map((item,index)=>{
          return(
            <div key={index} className={`${tajawal.variable} ${genos.variable}`}>
              <h1 className={`${styles.headingDetail} underline`}>@{item.author.name}</h1>
              <p className={`${styles.paragraf} px-3`}>{item.comment}</p>
            </div>
          )
        })
      }
    </div>
  )
}
