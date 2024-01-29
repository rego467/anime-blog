"use client"
import { useFormStatus } from 'react-dom'
const ButtonComment = () => {
  const { pending } = useFormStatus()
  return (
    <div className='p-1 w-full mt-3'>
      <button 
        type="submit" 
        aria-disabled={pending} 
        className='bg-blue-600 aria-disabled:opacity-80 flex p-2 rounded-md text-white px-2 text-base'>
          Send Comment
      </button>
    </div>
  )
}

export default ButtonComment