const express = require('express')
const { validateConstellation } = require('./validators')
const { getVisibleConstellations, updateUserConstellations } = require('../controllers')

const router = express.Router()

router.get('/', getVisibleConstellations)
router.put('/', validateConstellation, updateUserConstellations)

module.exports = router
