import {Request} from "express";

interface IGetUserAuthInfoRequest extends Request {
    userId: any;
    cookies: any;
    sanitize: any;
}


export {IGetUserAuthInfoRequest};
