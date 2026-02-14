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

const writeToDb = (db) => {
  fs.writeFileSync("./data/index.json", JSON.stringify(db, null, 2))
  return('saved')
}

export const getSongs = () => {
  const db = getDB()
  return db.songs.map(e => e)
}

const getLayout = () => {
  const db = getDB()
  return db.userPreferences[0].layout
}

app.get("/", (req, res) => {
  res.render('pages/index', {
    title: "Home",
    songs: getSongs(),
    songDisplay: {
      title: "Home",
      type: getLayout()
    }
  })
})

app.post("/get-song", (req, res) => {
  if (req.body.songId) {
    let songObj = getDB().songs.find(e => e.id === req.body.songId)
    res.sendFile(path.join(__dirname, songObj.file))
  }
})

app.get("/get-user-preferences", (req, res)=> {
  res.json((getDB().userPreferences[0]))
})

app.post("/adjust-user-settings", (req, res)=> {
  db = getDB()
  db.userPreferences[0].layout = req.body.layout
  if(writeToDb(DB) = 'saved') {
    res.json({message: "saved!"})
  } else {
    res.json({message: "Failed"})
  }
})

app.listen(PORT, () => console.log("listening on port " + PORT))