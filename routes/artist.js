import express, { Router } from "express"
import { getSongs } from "./functions.js"

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
    title: "Artist",
    page: "Dashboard",
    analytics: "none"
  })
})

artistRouter.get("/upload", (req, res) => {
  res.render('pages/index', {
    title: "Upload",
    page: "Upload"
  })
})

export default artistRouter