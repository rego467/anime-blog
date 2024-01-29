import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function POST(request,{params}){
  try {
  const id = params.id
  const { comment, mal_id } = await request.json()
  
  if(comment === ""){
    return NextResponse.json({message: "input tidak boleh kosong"}, {status:400})
  }
  const cekUser = await prisma.user.findUnique({
    where:{id:id}
  })

  if(!cekUser){
    return NextResponse.json({error: "user tidak ada.."},{status:404})
  }
  const response = await prisma.comment.create({
    data:{
      mal_id,
      comment,
      author:{
        connect:{
          id: cekUser.id
        }
      }
    }
  })

  return NextResponse.json({message: "comment success"}, {status:201},{data: response})
  
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: error.message},{status:500})
  }
}