import prisma from "@/libs/prisma";

export async function GET(request, {params}){
  const mal_id = params.mal_id
  
  try {   
    const response = await prisma.comment.findMany({
      where:{
        mal_id: mal_id
      }
    })

    return Response.json({message: "sukses get all comment", data:response, status:200})

  } catch (error) {
    console.log(error)
    return Response.json({message: "server error", status:500})
  }
}