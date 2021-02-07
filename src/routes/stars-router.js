const express = require('express')

const { validateStar } = require('./validators')
const { addStar } = require('../controllers')

const router = express.Router()

router.post('/', validateStar, addStar)

module.exports = router