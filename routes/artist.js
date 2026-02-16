import express, { Router } from "express"
import { getDB, getSongs, getAnalytics } from "./functions.js"

const artistRouter = express.Router()

artistRouter.get("/", (req, res) => {
  res.render('pages/index', {
    title: "Options",
    page: "Artist",
    options: [{
      "name": "Dashboard",
      "path": "/artist/dashboard"
    }, {
      "name": "Upload",
      "path": "/artist/upload"
    }]
  })
})

artistRouter.get("/dashboard", (req, res) => {
  res.render('pages/index', {
    title: "Dashboard",
    page: "Dashboard",
    analytics: getAnalytics('besethda')
  })
})


artistRouter.post("/upload-song", (req, res) => {
  let db = getDB()
  console.log(req.body)
  res.json({message: "connected"})
})

artistRouter.get("/upload", (req, res) => {
  res.render('pages/index', {
    title: "Upload",
    page: "Upload"
  })
})

export default artistRouter