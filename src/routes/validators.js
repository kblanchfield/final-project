const Joi = require('joi')

const validateRequest = (req, next, schema) => {
    const options = {
        abortEarly: false,
        allowUnknown: true,
    }

    const { error, value } = schema.validate(req.body, options)
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
    } else {
        req.body = value
        next()
    }
}

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })

    validateRequest(req, next, schema)
}

const validateStar = (req, res, next) => {
    const schema = Joi.object({
        star: Joi.object({
            mame: Joi.string(),
            raHours: Joi.number().required(),
            raMins: Joi.number().required(),
            raSecs: Joi.number().required(),
            decDeg: Joi.number().required(),
            decMins: Joi.number().required(),
            decSecs: Joi.number().required(),
            constellation: Joi.string().required(),
        }),
    })

    validateRequest(req, next, schema)
}

const validateConstellation = (req, res, next) => {
    const schema = Joi.object({
        accessToken: Joi.string().required(),
        constellation: Joi.string().required(),
    })

    validateRequest(req, next, schema)
}

module.exports = {
    validateUser,
    validateStar,
    validateConstellation,
}