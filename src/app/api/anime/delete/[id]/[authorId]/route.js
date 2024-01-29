
import prisma from "@/libs/prisma"

export async function DELETE(request,{params}){
  try {
    const id = params.id
    const authorId = params.authorId
    
    const cekId = await prisma.collection.findUnique({
      where:{
        id: id,
        authorId: authorId
      }
    })
  
    if(!cekId){
      return Response.json( {message:"id dengan card ini tidak ada"}, {
        status: 404
      })
    }

    const anime = await prisma.collection.delete({
      where:{
        id: cekId.id
      }
    })

    return Response.json( {message:"berhasil delete"},{
        data:anime, 
        status: 200
      })
  
  } catch (error) {
    console.log(error)
    return Response.json({message:"id dengan card ini tidak ada"},{ 
      status: 500
    })  
  }
}