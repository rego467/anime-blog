"use client"

import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";

export default function Logout(){
  const handleLogout = ()=>{
   signOut()
  }
  return (
    <div className="flex">
      <button type="button" onClick={handleLogout} className="flex gap-2 text-zinc-600">
        <CiLogout size={28} className="flex text-zinc-500"/>
          Logout
      </button>
    </div>
  )
}