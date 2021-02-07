const { Star } = require('../mongodb/models')
const { mapToDbStar } = require('../mongodb/mappings')

const SKY_VISIBILITY_THRESHOLDS = {
    latitude: 70,
    lstHours: 6
}

const getVisibleConstellations = async (req, res) => {
    const { latitude, lstHours } = req.query

    try {
        const latitudeInt = parseInt(latitude, 10)
        const lstHoursInt = parseInt(lstHours, 10)

        const stars = await Star.find({
            dec_deg: { $gte: latitudeInt - SKY_VISIBILITY_THRESHOLDS.latitude, $lte: latitudeInt + SKY_VISIBILITY_THRESHOLDS.latitude },
            ra_hours: { $gte: lstHoursInt - SKY_VISIBILITY_THRESHOLDS.lstHours, $lte: lstHoursInt + SKY_VISIBILITY_THRESHOLDS.lstHours }
        }, { constellation: 1 })

        const constellations = stars.map(star => star.constellation)
        const uniqueConstellations = [...new Set(constellations)]
        return res.status(200).json({ constellations: uniqueConstellations })
    }
    catch (err) {
        console.log('Error getting visible constellations for coordinate', latitude, lstHours, err)
        return res.status(500).json({ error: 'Error getting visible constellations' })
    }
}

const addStar = async (req, res) => {
    const { star } = req.body

    try {
        const newStar = new Star(mapToDbStar(star))
        await newStar.save()
        console.log('Saved star to db')
        return res.status(200).send()
    }
    catch (err) {
        console.log('Error saving star to db', star, err)
        return res.status(500).json({ error: 'Error saving star to db' })
    }

}

const updateUserConstellations = async (req, res) => {
    const { accessToken, constellation } = req.body

    try {
        const user = await User.findOne({ access_token: accessToken })

        if (user.stars.includes(constellation)) {
            const updatedUser = await User.findOneAndUpdate(
              { access_token: accessToken },
              { $pull: { constellations: constellation } },
              { new: true }
            )
            return res.status(201).json({ constellations: updatedUser.constellations })
        } else {
            const updatedUser = await User.findOneAndUpdate(
                { access_token: accessToken },
                { $push: { constellations: constellation } },
                { new: true }
              )
              return res.status(201).json({ constellations: updatedUser.constellations })
        }
    }
    catch (err) {
        console.log('Error updating users constellations in db', err)
        return res.status(500).json({ error: 'Error updating users constellations in db' })
    }
}

module.exports = {
    getVisibleConstellations,
    addStar,
    updateUserConstellations,
}
