import * as Joi from 'joi';
import pick from '../utils/pick'
import ApiError from "../utils/apiError";
import * as httpStatus from "http-status";


const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const {value, error} = Joi.compile(validSchema)
        .prefs({errors: {label: 'key'}, abortEarly: false})
        .validate(object);

    if (error) {
        let errorMessage;
        if (process.env.NODE_ENV === 'development') {
            console.log(error);
            errorMessage = error.details.map((details) => details.message).join(', ');
        } else {
            errorMessage = "Something went wrong";
        }
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};

export default validate;
