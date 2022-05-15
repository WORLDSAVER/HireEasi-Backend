import Joi from 'joi'

const RegisterValidation = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        first_name: Joi.string().required(),
        middle_name: Joi.string().allow('', null),
        last_name: Joi.string().allow('', null),
        phone: Joi.string().max(13).min(10).required(),
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
