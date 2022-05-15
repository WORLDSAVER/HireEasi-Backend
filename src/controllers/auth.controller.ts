import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import {login, me, register} from "../services/auth";
import {ERROR} from "../types/strings";
import ApiError from "../utils/apiError";
import {Request, Response} from "express";
import ApiResponse from "../utils/apiResponse";

const Register = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;

    const response = await register(body);

    if(response.status){
        return res.status(httpStatus.CREATED).send(new ApiResponse(httpStatus.OK, {}, response.message));
    
    }
    
    return res.status(httpStatus.BAD_REQUEST).send(new ApiResponse(httpStatus.BAD_REQUEST,{}, response.message));
})



const Login = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    console.log(req.cookies)
    const userLogin = await login(email, password);

    if (userLogin.status === ERROR) {
        throw new ApiError(httpStatus.UNAUTHORIZED, userLogin.message);
    }

    res.cookie('jwt', userLogin.data.refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000 * 30,
        secure: true,
        sameSite: 'none'
    });

    const {id, name, phone, image_url, access_level} = userLogin.data.user;

    return res.json({token: userLogin.data.token, user: {id, name, phone, image_url, email, access_level}});

});

const Logout = catchAsync(async (req, res, next) => {

    res.clearCookie('jwt');

    return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Logout successful'
    });
});

const Me = catchAsync(async (req, res, next) => {
    const {userId} = req;

    const user = await me(userId.id as number);

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    return res.status(httpStatus.OK).json({...user[0]});
});

const getAccessToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.jwt;

    console.log(req.cookies);

    if (!refreshToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token not found');
    }

    const {id} = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (err, decoded) => {
            if (err) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token is invalid');
            }
            return decoded;
        }
    ) as unknown as { id: number };

    const user = await me(id);

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    const {user_name, user_phone, user_image_url, user_access_level, user_email} = user[0];

    //Get new access token

    const access_token = jwt.sign({
        id,
        access_level: user_access_level
    }, process.env.JWT_ACCESS_SECRET, {expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`});

    return res.status(httpStatus.OK).json({
        access_token,
        roles: ['viewer'],
        user: {
            id,
            name: user_name,
            phone: user_phone,
            image_url: user_image_url,
            email: user_email,
            access_level: user_access_level
        }
    });
})

export {Login, Logout, Me, getAccessToken, Register}
