"use client"

import { inter } from '@/app/font/font'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import styles from "@/app/styles/component.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'

const FormRegister = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:""
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(6, "panjangnya minimal harus 6 karakter"),
      email:Yup.string().required().email(),
      password: Yup.string()
      .required()
      .min(8,"panjang password minimal 8 karakter")
      .matches(/^\S*$/, "tidak boleh ada spasi")
      .matches(/[0-9]/g, "harus berisi setidaknya 1 angka")
      // .matches(/[A-Z]/g, "harus berisi setidaknya 1 huruf besar")
      // .matches(/[a-z]/g, "harus berisi setidaknya 1 huruf kecil")
    }),
    onSubmit: async(values)=>{
      if(!process.env.NEXT_PUBLIC_BASE_URL){
        return null
      }
      try {
        const newUsers ={
          name: values.name,
          email: values.email,
          password: values.password
        }
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/register`,{
          method:"POST",
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body:JSON.stringify(newUsers)
        })

        router.push("/api/auth/signin")
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
      <div className='flex flex-col rounded-lg border-2 p-3 w-full md:w-[500px] lg:w-[500px]'>
        <div className={inter.variable}>
          <h1 className={`${styles.headingRegister} flex justify-center my-4 font-medium text-zinc-600`}>WELCOME TO REGISTER</h1>
        </div>
        <form className='flex flex-col gap-5 p-2 w-full' onSubmit={formik.handleSubmit}>
          <input
            value={formik.values.name}
            onChange={formik.handleChange} 
            type="text" name="name" placeholder='username'
            className='border-2 p-1 rounded-md'/>
            {formik.errors.name && <p className='text-red-500'>{formik.errors.name}</p>}
          <input 
            value={formik.values.email}
            onChange={formik.handleChange}
            type="text" name="email" placeholder='email'
            className='border-2 p-1 rounded-md'/>
            {formik.errors.email && <p className='text-red-500'>{formik.errors.email}</p>}
          <input 
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password" name="password" placeholder='password'
            className='border-2 p-1 rounded-md'/>
            {formik.errors.password && <p className='text-red-500'>{formik.errors.password}</p>}
          <div className={inter.variable}>
            <h1 className={`${styles.spanRegister} text-zinc-600 gap-1 flex items-center`}>Already Have an Account, 
              <button type="button" className='underline text-lg' onClick={()=> signIn(undefined, {callbackUrl:"/"})}>
                signIn
              </button> 
            </h1>  
          </div>
          
          <button  
            type="submit" 
            className='p-1 w-[160px] ring ring-blue-500 ring-offset-1 bg-blue-500 text-white flex justify-center rounded-lg text-lg font-medium'>
              Register
          </button>
        </form>
      </div>
  )
}

export default FormRegister