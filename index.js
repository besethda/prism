import express from "express"
import * as path from "path"
import fs from "fs"
import url, { fileURLToPath } from "url"
import { __dirname } from "./routes/functions.js"
import artistRouter from "./routes/artist.js"
import listenRouter from "./routes/listen.js"

const app = express()
const PORT = 3456

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use("/artist", artistRouter)
app.use("/listen", listenRouter)

app.get("/", (req, res) => {
  res.render('pages/index', {
    title: "Home",
    songDisplay: {
      title: "Home"
    }
  })
})


app.listen(PORT, () => console.log("listening on port " + PORT))