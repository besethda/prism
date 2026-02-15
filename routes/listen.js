import express from "express"
import * as path from "path"
import { getDB, getSongs, writeToDb, getLayout, __dirname } from "./functions.js"

const listenRouter = express.Router()

listenRouter.get("/", (req, res) => {
  res.render('pages/index', {
    title: "Listen",
    songs: getSongs(),
    songDisplay: {
      title: "Listen",
      type: getLayout()
    }
  })
})

listenRouter.post("/get-song", (req, res) => {
  if (req.body.songId) {
    let songObj = getDB().songs.find(e => e.id === req.body.songId)
    res.sendFile(path.join(__dirname, "..", songObj.file))
  }
})

listenRouter.get("/get-user-preferences", (req, res)=> {
  res.json((getDB().userPreferences[0]))
})

listenRouter.post("/adjust-layout", (req, res)=> {
  let db = getDB()
  db.userPreferences[0].layout = req.body.layout
  if(writeToDb(db) === 'saved') {
    res.json({message: "saved!"})
  } else {
    res.json({message: "Failed"})
  }
})

export default listenRouter