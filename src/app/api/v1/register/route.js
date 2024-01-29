import prisma from "@/libs/prisma"
import bcrypt from "bcrypt"

export async function POST(request){
  try {
    const {name, email, password} = await request.json()
    
    if(name.length < 1 ||email.length < 1 || password.length < 1){
      return Response.json(
        {message: "input tidak boleh kosong.."},
        {status:400}
      )
    }
    
    const usersExist = await prisma.user.findUnique({
      where:{
        email
      }
    })

    if(usersExist){
      return Response.json(
        {message: "email sudah terdaftar"},
        {status:400}
      )
    }

    const hasPassword = await bcrypt.hash(password, 12)
    const response = await prisma.user.create({
      data:{
        name,
        email,
        password: hasPassword
      }
    })

    return Response.json({data: response})
  } catch (error) {
    console.log(error.message)
    return Response.json({message: "some went wrong"})
  }
}