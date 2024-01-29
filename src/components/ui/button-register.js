"use client"
import { inter } from "@/app/font/font"
import Link from "next/link"
import styles from "@/app/styles/component.module.css"

export default function Register(){
  return(
    <Link href={"/register"} className={inter.variable}>
      <h1 className={`${styles.register} underline`}>Register</h1>
    </Link>
  )
}