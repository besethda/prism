import express from "express"
import * as path from "path"
import { getDB, getSongs, getArtist, getArtistSongs, getPlaylists, incrementListens, writeToDb, getLayout, getSinglePlaylist, __dirname } from "./functions.js"

const listenRouter = express.Router()

listenRouter.get("/", (req, res) => {
  res.render('pages/index', {
    title: "Listen",
    page: "All Songs",
    songs: getSongs(),
    songDisplay: {
      title: "Listen",
      type: getLayout()
    }
  })
})

listenRouter.get("/artist", (req, res) => {
  res.render('pages/index', {
    title: "Listen",
    page: req.query.name,
    songs: getArtistSongs(req.query.name),
    artistDisplay: getArtist(req.query.name),
    songDisplay: {
      title: req.query.name,
      type: getLayout()
    }
  })
})

listenRouter.get("/playlists", (req, res) => {
  res.render('pages/index', {
    title: "Listen",
    page: "Playlist",
    playlists: getPlaylists(),
    songDisplay: {
      title: "Playlist",
      type: getLayout()
    }
  })
})

listenRouter.get("/single-playlist", (req, res) => {
  let currentPlaylist = getSinglePlaylist(req.query.id)
  console.log(currentPlaylist.name)
  res.render('pages/index', {
    title: "Listen",
    page: currentPlaylist.name,
    songs: currentPlaylist.songs,
    playlist: currentPlaylist,
    songDisplay: {
      title: currentPlaylist.name,
      type: getLayout()
    }
  })
})

listenRouter.post("/record-listen", (req, res) => {
  if (req.body.songId) {
    res.json({ message: incrementListens(req.body.songId) })
  }
})

listenRouter.post("/get-song", (req, res) => {
  if (req.body.songId) {
    let songObj = getDB().songs.find(e => e.id === req.body.songId)
    res.sendFile(path.join(__dirname, "..", songObj.file))
  }
})

listenRouter.get("/get-user-preferences", (req, res) => {
  res.json((getDB().userPreferences[0]))
})

listenRouter.post("/adjust-layout", (req, res) => {
  let db = getDB()
  db.userPreferences[0].layout = req.body.layout
  if (writeToDb(db) === 'saved') {
    res.json({ message: "saved!" })
  } else {
    res.json({ message: "Failed" })
  }
})

export default listenRouter