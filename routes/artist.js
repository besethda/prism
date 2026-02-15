import express, { Router } from "express"
import { getSongs } from "./functions.js"

const uploadRouter = express.Router()

uploadRouter.get("/", (req, res) =>{
  res.render('pages/index', {
    title: "Artist",
    songDisplay: {
      title: "Artist",
      type: "list"
    }
  })
})

export default uploadRouter