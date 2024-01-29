"use client"

import { createComment } from '@/app/actions'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormComment = ({ mal_id }) => {
  const {status} = useSession()
  const router = useRouter() 
  
  const formik = useFormik({
    initialValues:{
      comment:""
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("input tidak boleh kosong...")
    }),
    onSubmit: async (values) => {
      try {
        if(status === "unauthenticated"){
          return router.push("/register")
        }
        const newComment = {
          mal_id,
          comment: values.comment
        }
        await createComment(newComment)
        formik.resetForm({values:{comment:""}})
      } catch (error) {
        console.log(error.message)
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
            className=" bg-blue-600 mt-5 w-20 rounded-md flex items-center justify-center p-2 text-white text-base">
            Send
          </button>
      </form>
    </div>
  )
}

export default FormComment