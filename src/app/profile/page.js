
import ProfilePage from '@/components/ProfilePage';
import prisma from '@/libs/prisma';

import { inter } from '../font/font';
import { getSessionUsers } from '../actions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title:"profile"
}

export const revalidate = 0
export default async function Profile () {
  const session= await getSessionUsers()
  if(!session){
    return redirect("/")
  }
  
  const collection = await prisma.user.findUnique({
    where:{id:session?.id},
    select:{collections: true}
  })

  const buttonDeleteAnime = async(id)=>{
    "use server"
    const cekId = await prisma.collection.findUnique({
      where:{id:id, authorId: session?.id}
    })

    await prisma.collection.delete({
      where:{id:cekId.id}
    })

    revalidatePath("/profile")
  }

  return (
    <div className={`${inter.variable} container m-auto min-h-screen`}>
      <div className='flex my-8'>
        <ProfilePage collections={collection.collections} buttonDeleteAnime={buttonDeleteAnime}/>
      </div>
    </div>
  )
}
