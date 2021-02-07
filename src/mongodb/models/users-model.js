const mongoose = require('mongoose')
const uuid = require('uuid4')

const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true
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
    constellations: {
        type: Array,
        default: []
    }
  },
  {
    timestamps: false,
    _id: true,
  }
)

const User = mongoose.model("User", userSchema)

module.exports = {
    User,
}
