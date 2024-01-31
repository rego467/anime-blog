"use client"

import { genos, tajawal } from "@/app/font/font"
import styles from "@/app/styles/component.module.css"
import { useSession } from "next-auth/react"
import ButtonMore from "../ui/button-more"
import { AiOutlineDelete } from "react-icons/ai";

export const revalidate = 0

export default function Comments({comments, deleteComment}){
  const {data: session} = useSession()
  const handleDeleteComment = async(id)=>{
    await deleteComment(id)
  }

  return (
    <div className='gap-5 flex flex-col p-2'>
      {comments && comments.map((item,index)=>{
        const cekName = session?.user?.name === item.author.name 
        return(
          <div 
            key={index} 
            className={`${tajawal.variable} ${genos.variable} justify-between flex border border-zinc-400 rounded-md p-1 w-full md:w-2/4`}
          >
            <div>
              <h1 className={`${styles.headingDetail} underline`}>@{item.author.name}</h1>
              <p className={`${styles.paragraf} px-3`}>{item.comment}</p>
            </div>
            { cekName && <div>
                <ButtonMore>
                  <AiOutlineDelete 
                    type="button" 
                    onClick={()=>handleDeleteComment(item.id)} 
                    className="p-1 text-white w-2/4 cursor-pointer flex" size={30} />
                </ButtonMore>
              </div>
            }
          </div>
          )
        })
      }
    </div>
  )
}
