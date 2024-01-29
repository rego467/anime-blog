import { getSessionUsers } from "@/app/actions"
import ButtonBurger from "./ui/button-burger"
import ListBurger from "./ui/list-burger"
import Register from "./ui/button-register"
import { getAuthSession } from "@/libs/auth-session"

export default async function UserExist(){
  // const user = await getSessionUsers()
  const user = await getSessionUsers()
    return(
      <div className="flex gap-4">
        { user ?<ButtonBurger>
                  <h1 className="flex pl-8 my-2 underline text-zinc-600">{user?.user?.name}</h1>
                  <ListBurger />
                </ButtonBurger>
        : <Register /> }
      </div>      
    )
}