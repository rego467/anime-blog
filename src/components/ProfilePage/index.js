"use client"

import { MdOutlineCancel } from "react-icons/md"
import Image from 'next/image'

import { lato } from "@/app/font/font"
import styles from "@/app/styles/component.module.css"
import { useState } from "react"
import Loading from "../Loading"

export default function ProfilePage({collections,buttonDeleteAnime}){
  const [loading,setLoading] = useState(false)
  
  const getDelete = async (id)=>{
    setLoading(true)
    try {
      const cekDelete = confirm("apakah ingin hapus card ini?")
      if(cekDelete){
        await buttonDeleteAnime(id) 
      }
    } catch (error) {
      console.log(error) 
    }finally{
      setLoading(false)
    }
  }

  return(
    <div className="container m-auto">
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2">
        {collections && collections.map((item,index)=>{
            return(
              <div className="grid p-1 rounded-md shadow-xl drop-shadow-md brightness-75 m-2" key={index}>
                <div className='flex flex-row'>
                  <div className='relative p-1 h-20 m-auto flex justify-center items-center rounded-md bg-blue-600'>
                    <Image 
                      src={item.image_url} 
                      width={100}
                      height={100}
                      priority
                      alt={item.title}   
                      className='rounded-md w-full h-full bg-cover object-cover shadow-xl drop-shadow-md flex items-center'
                    />
                  </div>
                  <div className='flex flex-row px-2 justify-between p-1 m-1 w-full'>
                    <div className={`${lato.variable} flex flex-col`}>
                      <h1 className={`${styles.headingCollection} underline flex flex-wrap`}>{item.title}</h1>
                      <h2 className={styles.spanCollection}>{item.duration}</h2>
                      <h2 className={styles.spanCollectionId}>{item.mal_id}</h2>
                    </div>
                  <div className=''>
                    <MdOutlineCancel 
                      size={31} 
                      type='button' 
                      onClick={()=>getDelete(item.id)} 
                      className='cursor-pointer text-blue-600 end-0'/>
                  </div>
                </div> 
            </div>
          </div>
          )
        })
      }
      </div>
    </div>
  )
}