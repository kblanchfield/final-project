require("dotenv").config()
const express = require('express')
const { PORT } = require('./config/constants')
const { initMongoDb } = require("./mongodb/connection")
const cors = require("cors")

const app = express()
initMongoDb()

app.use(express.json())
app.use(cors())

app.use("/", require("./routes"))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
