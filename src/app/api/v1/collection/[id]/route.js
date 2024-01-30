import prisma from "@/libs/prisma"

export async function POST(request,{params}){
  try {
    const id = params.id
    const { mal_id,title, duration, image_url } = await request.json()

    const cekCard = await prisma.collection.findUnique({
      where:{mal_id:mal_id}
    })

    if(cekCard){
      return new Response("card sudah ada..",{
        status:400
      })
    }

    const cekUser = await prisma.user.findUnique({
      where:{
        id : id
      }
    })

    if(!cekUser){
      return new Response("user not found", {status:404})
    }
    
    const collectionAnim = await prisma.collection.create({
      data:{
        mal_id: mal_id,
        title: title,
        duration: duration, 
        image_url: image_url,
        author:{
          connect:{
            id: cekUser.id
          }
        }
      }
    })
    
    return new Response("berhasil add card anime",{
      status:201,
      data: collectionAnim
    })

  } catch (error) {
    console.log(error.message)
    return new Response("server eror",{
      status:500
    })  
  }
}