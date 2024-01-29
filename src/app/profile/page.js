
import ProfilePage from '@/components/ProfilePage';
import prisma from '@/libs/prisma';

import { inter } from '../font/font';
import styles from "@/app/styles/component.module.css"
import { getSessionUsers } from '../actions';
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/libs/auth-session';

export const revalidate = 0

export default async function Profile () {
  // const session = await getSessionUsers()
  const session= await getSessionUsers()
  if(!session){
    return redirect("/")
  }
  
  const collection = await prisma.user.findUnique({
    where:{id:session?.id},
    select:{collections: true}
  })

  return (
    <div className={`${inter.variable} container m-auto min-h-screen`}>
      <div className='flex my-8'>
        <ProfilePage collections={collection.collections}/>
      </div>
    </div>
  )
}
