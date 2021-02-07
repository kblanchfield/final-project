const Joi = require('joi')

const validateRequest = (req, next, schema) => {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
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
        mame: Joi.string(),
        ra_hours: Joi.number().required(),
        ra_mins: Joi.number().required(),
        ra_secs: Joi.number().required(),
        dec_deg: Joi.number().required(),
        dec_mins: Joi.number().required(),
        dec_secs: Joi.number().required(),
        constellation: Joi.string().required(),
    })

    validateRequest(req, next, schema)
}

const validateConstellation = (req, res, next) => {
    const schema = Joi.object({
        access_token: Joi.string().required(),
        constellation: Joi.string().required(),
    })

    validateRequest(req, next, schema)
}

module.exports = {
    validateUser,
    validateStar,
    validateConstellation,
}