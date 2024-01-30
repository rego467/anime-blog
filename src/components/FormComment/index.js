"use client"

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const FormComment = ({ createComment }) => {
  const {status} = useSession()
  const [loading,setLoading] = useState(false)
  const router = useRouter() 
  
  const formik = useFormik({
    initialValues:{
      comment:""
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("input tidak boleh kosong...")
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        if(status === "unauthenticated"){
          return router.push("/register")
        }
        const comment = values.comment
        await createComment(comment)
        formik.resetForm({values:{comment:""}})
      } catch (error) {
        console.log(error.message)
      } finally{
        setLoading(false)
      }
    }
  })

  return (
    <div className='w-full flex mt-8'>
      <form className="p-1 w-full flex flex-col gap-2" onSubmit={formik.handleSubmit}>
        <textarea
          value={formik.values.comment}
          onChange={formik.handleChange} 
          rows="6" 
          cols="6"
          placeholder="comment here..." 
          name="comment"
          className="p-2 ring-1 ring-zinc-500 w-full rounded-md"
        >
        </textarea>
        {formik.errors.comment && <p className='bg-red-500 px-3 rounded-md text-white font-medium'>{formik.errors.comment}</p>}
          <button
            type="submit" 
            className=" bg-blue-600 mt-5 w-32 rounded-md flex items-center justify-center p-2 text-white text-base">
            Send {loading && <svg className="animate-spin h-5 w-5 ml-3 border-2 border-r-black border-b-black opacity-50 rounded-full" viewBox="0 0 24 24"></svg>}
          </button>
      </form>
    </div>
  )
}

export default FormComment