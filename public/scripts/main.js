import { gsap } from "https://cdn.skypack.dev/gsap"
import { Flip } from "https://cdn.skypack.dev/gsap/Flip"
import { Howl, Howler } from "https://cdn.skypack.dev/howler"

const makeRequest = async (url, data) => {
  const baseUrl = "http://localhost:3456"
  let response = await fetch(baseUrl + url, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  })

  if(!response.ok) {
    console.log('Error')
    return
  }

  data = response.json()
  console.log(data)
  return data
}

let songRequest = {
  songId: "001"
}

makeRequest("/play-song", songRequest)