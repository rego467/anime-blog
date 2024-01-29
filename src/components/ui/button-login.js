"use client"

import { signIn } from "next-auth/react"

export default function Login(){
  const handleLogin = ()=>{
    signIn()
  }
  return(
    <button type="button" onClick={handleLogin}>Login</button>
  )
}