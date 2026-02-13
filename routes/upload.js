import express, { Router } from "express"
import { getSongs } from "../index.js"

const uploadRouter = express.Router()

uploadRouter.get("/", (req, res) =>{
  res.render('pages/index', {
    title: "Upload",
    songDisplay: {
      title: "Home",
      type: "list"
    }
  })
})

export default uploadRouter