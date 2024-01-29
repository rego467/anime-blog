import InputSearch from "./InputSearch";
import NavbarInside from "./navbar-inside";
import UserExist from "./user-exist";


export const revalidate=0
export default function NavbarLayout(){
  return(
    <div className="flex container m-auto top-0 sticky z-10">
        <NavbarInside>
          <InputSearch />
          <UserExist />
        </NavbarInside>
    </div>
  )
}