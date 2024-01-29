"use client"

import { useState } from "react"
import { CiUser } from "react-icons/ci";

export default function ButtonBurger({children}){
  const [burger,setBurger] = useState(false)
  
  const handleBurger = ()=>{
    setBurger(!burger)
  }
  
  return(
    <div className="relative">
      <CiUser size={29} type="button" onClick={handleBurger} className="cursor-pointer"/> 
      <div className={`${burger ? "block" : "hidden"} absolute bg-white w-[200px] shadow-md mt-3 p-2 rounded-md -right-1`}>
        {children}
      </div> 
    </div>
  )
}