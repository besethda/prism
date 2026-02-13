import express from "express"
import * as path from "path"
import fs from "fs"
import url, { fileURLToPath } from "url"

const app = express()
const PORT = 3456
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.set("view engine", "ejs")
app.use(express.static("public"))

const getDB = () => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, "/data/index.json")))
  return db
}

const getArtists = () => {
  const db = getDB()
  return db.songs.map(e => e.artist)
}

const getSongs = () => {
  const db = getDB()
  return db.songs.map(e => e)
}

app.get("/", (req, res) =>{
  res.render('pages/index', {
    title: "Home",
    songs: getSongs(),
    songDisplay: {
      title: "Home",
      type: "box"
    }
  })
})



app.listen(PORT, ()=> console.log("listening on port " + PORT))