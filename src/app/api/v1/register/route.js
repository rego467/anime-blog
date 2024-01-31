import prisma from "@/libs/prisma"
import bcrypt from "bcrypt"

export async function POST(request){
  try {
    const {name, email, password} = await request.json()
    
    if(name.length < 1 ||email.length < 1 || password.length < 1){
      return new Response("input tidak kosong", {status:400})
    }
    
    const usersExist = await prisma.user.findUnique({
      where:{
        email
      }
    })

    if(usersExist){
      return new Response("email sudah ada", {status:404})
    }

    const hasPassword = await bcrypt.hash(password, 12)
    const response = await prisma.user.create({
      data:{
        name,
        email,
        password: hasPassword
      }
    })

    return new Response("berhasil register",{status:201, data: response})
  } catch (error) {
    console.log(error.message)
    return new Response("terjadi kesalahan di server",{status:500})
  }
}