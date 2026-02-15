import express, { Router } from "express"
import { getSongs } from "./functions.js"

const artistRouter = express.Router()

artistRouter.get("/", (req, res) =>{
  res.render('pages/index', {
    title: "Artist",
    page: "Artist",
    songDisplay: {
      title: "Artist",
      type: "list"
    }
  })
})

artistRouter.get("/dashboard", (req, res)=> {
  res.render('pages/index', {
    title: "Artist",
    page: "Dashboard"
  })
})

artistRouter.get("/upload", (req, res)=> {
  res.render('pages/index', {
    title: "Artist",
    page: "Upload"
  })
})

export default artistRouter