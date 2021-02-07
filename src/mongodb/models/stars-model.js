const mongoose = require('mongoose')

const starSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ra_hours: {
        type: Number,
        required: true
    },
    ra_mins: {
        type: Number,
        required: true
    },
    ra_secs: {
        type: Number,
        required: true
    },
    dec_deg: {
        type: Number,
        required: true
    },
    dec_mins: {
        type: Number,
        required: true
    },
    dec_secs: {
        type: Number,
        required: true
    },
    constellation: {
        type: String,
        required: true
    }
  },
  {
    timestamps: false,
    _id: true,
  }
)

const Star = mongoose.model("Star", starSchema)

module.exports = {
    Star,
}
