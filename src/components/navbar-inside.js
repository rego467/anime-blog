"use client"

import { inter } from "@/app/font/font"
import { usePathname } from "next/navigation"
import styles from "@/app/styles/component.module.css"
import Link from "next/link"

export default function NavbarInside({children}){
  const pathname = usePathname()
  return (
    <>
    {pathname === "/register" ? "" :
      <div className="flex container m-auto gap-8 p-3 py-4 bg-white shadow-xl sticky top-0 z-10"> 
        <div className="flex w-full justify-between items-center gap-2">
          <div className={`${inter.variable} w-2/4 flex`}>
            <Link href={"/"}>
              <h1 className={`${styles.headingLogo} hidden md:inline-block`}>Pucung Rumble</h1>
            </Link>
          </div>
          <div className="flex m-auto container gap-7 justify-end p-1 items-center">
            {children}
          </div>
        </div>
      </div>
    }
    </>
  )
}