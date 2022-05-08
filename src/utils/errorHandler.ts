import {StatusCodes} from "http-status-codes";

export const ErrorHandler = (err) => {
    const {message, stack} = err;

    const error = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: message,
        stack: stack
    }


    return error;
}
