const express = require("express")
const usersRouter = require("./users-router")
const starsRouter = require("./stars-router")
const constellationsRouter = require("./constellations-router")

const router = express.Router()

router.use("/users", usersRouter)
router.use("/stars", starsRouter)
router.use("/constellations", constellationsRouter)

module.exports = router
