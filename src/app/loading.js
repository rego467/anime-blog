export default function Loading(){
  return(
    <div className="min-h-screen">
      <div className="container m-auto">
        <div className="flex mt-5 mx-3 items-center justify-between">
          <h1 className="bg-zinc-300 p-2 rounded-md w-20"></h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-2">
      {
        [...Array(25).keys()].map((index)=>{
          return(
            <div className='grid w-full p-1' key={index}>
              <div className="h-[170px] bg-zinc-300 rounded-lg animate-pulse">
                <div className='rounded-md w-full flex items-center h-full'/>
              </div>
              <div className="bg-zinc-300 mt-2 p-2 rounded-md animate-pulse" />
            </div>
          )
        })
      }
    </div>
      </div>   
    </div>
  )
}