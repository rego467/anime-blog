import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "./prisma"

export const authOptions ={
  session:{
    strategy:"jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers:[
    Credentials({
      credentials:{
        email:{
          label: "Email",
          type:"email",
          placeholder: "example@example.com"
        },
        password:{
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials.password) return null
        
        const user = await prisma.user.findUnique({
          where:{
            email: credentials?.email
          }
        })
        if(!user) return null
      
        const decode = await bcrypt.compare(credentials.password, user.password)
        if(!decode) return null

        return{
          name:user.name,
          email:user.email,
          id: user.id,
        }
      }
    })
  ],
  callbacks:{
  async jwt({token,user}){  
    if(!user) return token

      return{
        ...token,
        id: user.id,
      }
    },
  async session({session,token}){
      return{
        ...session,
        id: token.id,
      }
    }
  }
}