const express = require('express')
const { validateUser } = require('./validators')
const { addUser, getSessionToken } = require('../controllers')

const router = express.Router()

router.post('/', validateUser, addUser)
router.post('/sessions', validateUser, getSessionToken)

module.exports = router