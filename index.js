import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"
import uuid from "uuid/v4"

// Express setup, including JSON body parsing
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere
app.use(cors())

// Connect to the "astro" database
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/astro"
mongoose.connect(mongoUrl, { useMongoClient: true })

// Use ES6 promises
mongoose.Promise = Promise

// Log connection status
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

/////////////////////////// STARS //////////////////////////

// Define star model
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

// GET visible constellations
app.get("/stars", (req, res) => {
  const latitude = parseInt(req.query.latitude, 10)
  const lstHours = parseInt(req.query.lstHours, 10)
  Star.find({
    Dec_deg: { $gte: latitude - 70, $lte: latitude + 70 },
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

/////////////////////////// USERS //////////////////////////

// Define user model
const User = mongoose.model("User", {
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  accessToken: {
    type: String,
    default: () => uuid()
  },
  stars: {
    type: Array,
    default: []
  }
})

// POST new user
app.post("/users", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password)
  })
  newUser.save()
    .then(() => {
      res.status(201).json({ created: true })
    })
    .catch(err => {
      res.status(400).json({ created: false, error: err })
    })
})

// POST new session (i.e. log in)
app.post("/sessions", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ id: user.id, accessToken: user.accessToken, collectedStars: user.stars })
      } else {
        res.send("Username or password not found")
      }
    })
    .catch(err => {
      res.json(err)
    })
})

// PUT user's updated collected stars - add constellation
app.put("/constellations/add", (req, res) => {
  User.findOneAndUpdate(
    { accessToken: req.body.accessToken },
    // add or remove constellation from stars in db
    { $push: { stars: req.body.constellation } },
    { new: true }
  )
    .then(user => {
      res.json({ collectedStars: user.stars })
    })
})

// PUT user's updated collected stars - remove constellation
app.put("/constellations/remove", (req, res) => {
  User.findOneAndUpdate(
    { accessToken: req.body.accessToken },
    // add or remove constellation from stars in db
    { $pull: { stars: req.body.constellation } },
    { new: true }
  )
    .then(user => {
      res.json({ collectedStars: user.stars })
    })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Stars API running on port ${port}`)
})
