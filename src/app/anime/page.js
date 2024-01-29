import PagePagination from "@/components/ui/page-pagination"

export default async function Page(){
  return(
    <div className="container flex flex-col m-auto">
      <PagePagination />
    </div>
  )
}