"use client"

import Link from "next/link"
import { CiHome } from "react-icons/ci"
import { CgProfile } from "react-icons/cg"
import Logout from "./button-logout"
import { CiSettings } from "react-icons/ci"

export default function ListBurger(){
  return(
    <div className="flex flex-col gap-2">
      <Link href={"/"} className="flex gap-2 items-center text-zinc-600">
        <CiHome size={28} className="flex text-zinc-500"/>
        Home
      </Link>
      <Link href={"/profile"} className="flex gap-2 items-center text-zinc-600">
        <CgProfile size={28} className="flex text-zinc-400"/>
        Profile
      </Link>
      <Logout />    
    </div>
  )
}