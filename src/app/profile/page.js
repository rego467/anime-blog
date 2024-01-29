
import ProfilePage from '@/components/ProfilePage';
import prisma from '@/libs/prisma';

import { inter } from '../font/font';
import { getSessionUsers } from '../actions';
import { redirect } from 'next/navigation';

export const metadata = {
  title:"profile"
}
export default async function Profile () {
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
