import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request){
  try {
    const data = await prisma.user.findMany()
    return Response.json(data)
  } catch (error) {
    console.log(error)
    return Response.json({message: "terjadi kesalhan server", status: 500})
  }

}