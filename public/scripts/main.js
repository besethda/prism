import { gsap } from "https://cdn.skypack.dev/gsap"
import { Flip } from "https://cdn.skypack.dev/gsap/Flip"
import { Howl, Howler } from "https://cdn.skypack.dev/howler"
import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js'

const makeRequest = async (url, data = undefined, method) => {
  const baseUrl = "http://localhost:3456"
  let requestJson = {
    method: method,
    headers: { "Content-Type": "application/json" },
  }
  if (method !== "GET") {
    requestJson.body = JSON.stringify(data)
  }
  let response = await fetch(baseUrl + url, requestJson)
  if (!response.ok) {
    console.log('Error')
    return
  } if (response.headers.get("Content-Type") === "audio/wav") {
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

const saveLayoutSetting = async (setting) => {
  let message = await makeRequest("/adjust-layout", {layout: setting}, "POST")
}

const changeLayout = (target) => {
  const boxIcon = document.querySelector('#box-icon')
  const listIcon = document.querySelector('#list-icon')
  if (target.id === "box-icon" && !boxIcon.classList.contains('active')) {
    document.querySelector('.active').classList.remove('active')
    boxIcon.classList.add('active')
    saveLayoutSetting("box")
    document.querySelectorAll('.list').forEach(element => {
      element.classList.remove('list')
      element.classList.add('box')
    });
  } else if (target.id === "list-icon" && !listIcon.classList.contains('active')) {
    document.querySelector('.active').classList.remove('active')
    listIcon.classList.add('active')
    saveLayoutSetting("list")
    document.querySelectorAll('.box').forEach(element => {
      element.classList.remove('box')
      element.classList.add('list')
    });
  }
}

const togglePlayingMedia = (changedId = false) => {
  if (changedId) {
    let selectedSong = document.querySelector(`.selected-song`)
    selectedSong && selectedSong.classList.remove(`.selected-song`)
  }
  document.querySelector(`[data-song-id="${currentId}"]`).classList.toggle(`selected-song`)
}

const requestSong = async (id) => {
  let songData = await makeRequest("/get-song", { songId: `${id}` }, "POST")
  let songUrl = URL.createObjectURL(songData)
  currentSound = new Howl({
    src: [songUrl],
    html5: true
  })
  currentSound.play()
  currentId = `${id}`
}

const playPauseSong = () => {
  if (currentSound.playing()) {
    currentSound.pause()
  } else {
    currentSound.play()
  }
}

const addListeners = async () => {
  await getUserPreferences()
  let renderedSongs = document.querySelectorAll(`.song`)
  renderedSongs.forEach(songElement => {
    songElement.addEventListener('click', async () => {
      if (songElement.dataset.songId !== currentId) {
        await requestSong(songElement.dataset.songId)
        togglePlayingMedia(true)
      } else {
        playPauseSong()
        togglePlayingMedia()
      }
    })
  })
}

const layoutIcons = document.querySelectorAll(".layout-icon")
layoutIcons.forEach(e => e.addEventListener("click", (e) => changeLayout(e.currentTarget)))

addListeners()