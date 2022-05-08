import Joi from 'joi'

const RegisterValidation = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.string().max(13).min(10).required(),
        access_level: Joi.number().required(),
        image_url: Joi.string().allow('', null),
    })
}

const LoginValidation = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
}

export {RegisterValidation, LoginValidation}
