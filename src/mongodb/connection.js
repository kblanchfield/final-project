const mongoose = require("mongoose")
const { mongoDbUri } = require("../config/constants")

const initMongoDb = () => {
  mongoose.connect(mongoDbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  const connection = mongoose.connection
  connection.on("error", err => console.error("Connection error", err))
  connection.once("open", () => console.log("MongoDB database connection established successfully"))
}

module.exports = {
  initMongoDb
}
