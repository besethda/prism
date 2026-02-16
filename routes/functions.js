import express from "express"
import * as path from "path"
import fs from "fs"
import url, { fileURLToPath } from "url"

export const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const getDB = () => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/index.json")))
  return db
}

export const writeToDb = (db) => {
  fs.writeFileSync(path.join(__dirname, "../data/index.json"), JSON.stringify(db, null, 2))
  return('saved')
}

export const getSongs = () => {
  const db = getDB()
  return db.songs.map(e => e)
}

export const getArtist = (artist) => {
  const db = getDB()
  let artistObject = db.artists.find(e => e.name.toLowerCase() === artist.toLowerCase())
  return artistObject
}

export const getArtistSongs = (artist) => {
  const db = getDB()
  let songsList = db.songs.filter(e => e.artist.toLowerCase() === artist.toLowerCase())
  return songsList
}

export const getPlaylists = () => {
  const db = getDB()
  let playlists = db.playlists.map(e => {
    let art
    if (e.songs !== "") {
      let firstSong = db.songs.find(f => f.id === e.songs[0])
      art = firstSong.artwork
    }
    e.artwork = art
    return e
  })
  return playlists
}

export const incrementListens = (songID) => {
  const db = getDB()
  let currentSong = db.songs.find(e=> e.id === songID)
  currentSong.listens++
  writeToDb(db)
  return "success"
}

const findTopSong = (artist) => {
}

export const getAnalytics = (artists) => {
  let songsList = getArtistSongs(artist)
  songsList.reduce()
  const analytics = {
    songNumber: songsList.length,

  }
}

export const getLayout = () => {
  const db = getDB()
  return db.userPreferences[0].layout
}