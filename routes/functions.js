import express from "express"
import * as path from "path"
import fs from "fs"
import url, { fileURLToPath } from "url"

export const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const getDB = () => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/index.json")))
  return db
}

export const writeToDb = (db) => {
  fs.writeFileSync(path.join(__dirname, "../data/index.json"), JSON.stringify(db, null, 2))
  return('saved')
}

export const getSongs = () => {
  const db = getDB()
  return db.songs.map(e => e)
}

export const getLayout = () => {
  const db = getDB()
  return db.userPreferences[0].layout
}