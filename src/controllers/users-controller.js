const bcrypt = require('bcryptjs')
const { User } = require('../mongodb/models')

const addUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const newUser = new User({
            username,
            password: bcrypt.hashSync(password)
        })

        await newUser.save()
        return res.status(200).json({ created: true })
    }
    catch (err) {
        console.log('Error creating user in db', err)
        return res.status(500).json({ created: false, error: err })
    }
}

const getSessionToken = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (user && bcrypt.compareSync(password, user.password)) {
            return res.status(200).json({ id: user.id, accessToken: user.accessToken, constellations: user.constellations })
        } else {
            return res.status(404).json({ error: "Username or password not found" })
        }
    }
    catch (err) {
        console.log('Error getting user session token from db', err)
        return res.status(500).json({ created: false, error: err })
    }
}

module.exports = {
    addUser,
    getSessionToken,
}
