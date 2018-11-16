import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

// Express setup, including JSON body parsing
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere
app.use(cors())

// Connect to the "astro" database
mongoose.connect("mongodb://localhost/astro", { useMongoClient: true })

// Use ES6 promises
mongoose.Promise = Promise

// Log connection status
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

// define star model
const Star = mongoose.model("Star", {
  Name: {
    type: String
  },
  RA_hours: {
    type: Number,
    required: true
  },
  RA_mins: {
    type: Number,
    required: true
  },
  RA_secs: {
    type: Number,
    required: true
  },
  Dec_deg: {
    type: Number,
    required: true
  },
  Dec_mins: {
    type: Number,
    required: true
  },
  Dec_secs: {
    type: Number,
    required: true
  },
  Constellation: {
    type: String,
    required: true
  }
})

// GET all visible stars
app.get("/stars", (req, res) => {
  const latitude = parseInt(req.query.latitude, 10)
  const lstHours = parseInt(req.query.lstHours, 10)
  Star.find({
    Dec_deg: { $gte: latitude - 90, $lte: latitude + 90 },
    RA_hours: { $gte: lstHours - 6, $lte: lstHours + 6 }
  }).then(stars => {
    const constellations = stars.map(star => star.Constellation)
    const uniqueConstellations = [...new Set(constellations)]
    res.json(uniqueConstellations)
  }).catch(err => {
    res.json({ error: err })
  })
})

// POST new star
app.post("/stars", (req, res) => {
  const star = new Star(req.body)
  star.save()
    .then(() => { res.status(201).send("Star added") })
    .catch(err => { res.status(400).send(err) })
})

app.listen(8080, () => console.log("Stars API listening on port 8080"))
