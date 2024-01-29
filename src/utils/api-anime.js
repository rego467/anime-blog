export async function useAnime(){
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ANIME_API}/anime`,{
      method:"GET",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()

    return data?.data
  } catch (error) {
    console.log(error.message)
  }
}

export async function useSearchAnime(search){
  const response = await fetch(`${process.env.NEXT_PUBLIC_ANIME_API}/anime?q=${search}`,{
    method:"GET",
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()

  return data
}

export async function useAnimeById(id){
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ANIME_API}/anime/${id}`,{
      method:"GET",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      cache: 'no-cache'
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    console.log(error)
  }
}

export async function useAnimePagination(page){
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ANIME_API}/anime?page=${page}`,{
      method:"GET",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })

    const data = await response.json()

    return data?.data
  } catch (error) {
    console.log(error.message)
  }
}