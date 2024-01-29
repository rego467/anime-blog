"use client"

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from '../Loading';

import Animes from '../Animes';
import delay from 'delay';
import { useAnimePagination } from '@/utils/api-anime';

export default function LoadMore(){
  const [ref, inView] = useInView()
  const [anime,setAnime] = useState([])
  const [pageLoad, setPageLoad] = useState(1)

  const loadMorePage = async()=>{
    await delay(1000)
    try {
      let nextPage = pageLoad + 1
      console.log(nextPage)
      const datas = await  useAnimePagination(nextPage)
      setAnime((prev) => [...prev, ...datas])
      setPageLoad(nextPage)      
    } catch (error) {
      console.log(error)
    }

  }
  
  useEffect(()=>{
    if(inView){
      loadMorePage()
    }
  },[inView])
  
  return(
    <>
    <Animes animes={anime}/>
     <div ref={ref}>
       <Loading />
     </div>
    </>
  )
}