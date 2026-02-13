import express from "express"
import * as path from "path"
import fs from "fs"
import url, { fileURLToPath } from "url"
import uploadRouter from "./routes/upload.js"

const app = express()
const PORT = 3456
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use("/upload", uploadRouter)

const getDB = () => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, "/data/index.json")))
  return db
}

const getArtists = () => {
  const db = getDB()
  return db.songs.map(e => e.artist)
}

export const getSongs = () => {
  const db = getDB()
  return db.songs.map(e => e)
}

app.get("/", (req, res) =>{
  res.render('pages/index', {
    title: "Home",
    songs: getSongs(),
    songDisplay: {
      title: "Home",
      type: "list"
    }
  })
})

app.post("/play-song", (req, res)=> {
  if(req.body.songId) {
    let songId = getDB().songs.find(e => e.id === req.body.songId)
  } res.
})



app.listen(PORT, ()=> console.log("listening on port " + PORT))