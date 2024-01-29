import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { cache } from "react";

export const getAuthSession = cache(async ()=>{
  try {
    const session = getServerSession(authOptions)
    return session    
  } catch (error) {
    console.log(error)
  }

})