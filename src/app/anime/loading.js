export default function Loading(){
  return(
    <div className="container m-auto p-2">
      <div className="mt-20 p-2 flex justify-between">
        <h1 className="bg-zinc-300 w-32 p-2 rounded-md animate-pulse"></h1>
        <span className="bg-zinc-300 w-32 h-10 p-2 rounded-md animate-pulse"></span>
      </div>
      <div className="bg-zinc-300 h-[160px] rounded-md mt-10 animate-pulse"/>
      <div className="bg-zinc-300 h-[160px] rounded-md mt-5 animate-pulse"/>
      <div className="bg-zinc-300 h-[160px] rounded-md mt-5 animate-pulse"/>
    </div>
  )
}