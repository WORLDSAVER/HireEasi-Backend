import jwt from 'jsonwebtoken'
import {NextFunction, Response} from 'express'
import {IGetUserAuthInfoRequest} from "../types/requests/auth";

const verifyToken = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //@ts-ignore
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        req.userId = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export default verifyToken;
