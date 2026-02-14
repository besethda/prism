import { gsap } from "https://cdn.skypack.dev/gsap"
import { Flip } from "https://cdn.skypack.dev/gsap/Flip"
import { Howl, Howler } from "https://cdn.skypack.dev/howler"

const makeRequest = async (url, data = undefined, method) => {
  const baseUrl = "http://localhost:3456"
  let requestJson = {
    method: method,
    headers: {"Content-Type":"application/json"},
  }
  if (method !== "GET"){
    requestJson.body = JSON.stringify(data)
  }
  let response = await fetch(baseUrl + url, requestJson)
  if(!response.ok) {
    console.log('Error')
    return
  } if(response.headers.get("Content-Type") === "audio/wav") {
    data = await response.blob()
    return data
  }
  data = await response.json()
  return data
}


let layout
let currentSound
let currentId

const getUserPreferences = async () => {
  let data = await makeRequest("/get-user-preferences", undefined, "GET")
  layout = data.layout
}



const togglePlayingMedia = (changedId = false) => {
  if (changedId) {
    let selectedSong = document.querySelector(`.selected-song-${layout}`)
    selectedSong && selectedSong.classList.remove(`.selected-song-${layout}`)
  }
  document.querySelector(`[data-song-id="${currentId}"]`).classList.toggle(`selected-song-${layout}`)
}

const requestSong = async (id) => {
  let songData = await makeRequest("/get-song", {songId: `${id}`}, "POST")
  let songUrl = URL.createObjectURL(songData)
  currentSound = new Howl({
    src: [songUrl],
    html5: true
  })
  currentSound.play()
  currentId = `${id}`
}

const playPauseSong = () => {
  if(currentSound.playing()) {
    currentSound.pause()
  } else {
    currentSound.play()
  }
}

const addListeners = async () => {
  await getUserPreferences()
  let renderedSongs = document.querySelectorAll(`.song-${layout}`)
  renderedSongs.forEach(songElement => {
    songElement.addEventListener('click', async ()=> {
      if(songElement.dataset.songId !== currentId) {
        await requestSong(songElement.dataset.songId)
        togglePlayingMedia(true)
      } else {
        playPauseSong()
        togglePlayingMedia()
      }
    })
  })
}

addListeners()