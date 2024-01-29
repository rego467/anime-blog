
import styles from "@/app/styles/component.module.css"
import { inter } from "./font/font";
import Animes from "@/components/Animes";
import Link from "next/link";

export async function useAnime(){
  try {
    const response = await  fetch(`${process.env.NEXT_PUBLIC_ANIME_API}/anime`,{
      method:"GET",
      headers:{
        "accept": "application/json",
        "Content-Type": "application/json"
      }
    })
  
    const data = await response.json()
  
    return data.data
  } catch (error) {
    console.log(error)
  }
}

export default async function Page() {
  const data = await useAnime()
  return (
    <div className="min-h-screen">
      <div className="container m-auto">
        <div className={`${inter.variable} flex mt-5 p-1 items-center justify-between`}>
          <div className="flex justify-between w-full items-center">
            <h1 className={`${styles.headingPopuler} underline`}>POPULER</h1>
            <Link href={"/anime"}><h1 className={`${styles.headingPopuler} underline`}>ALL ANIME</h1></Link>
          </div>
        </div>
          <Animes animes={data}/>
      </div>   
    </div>
  )
}



