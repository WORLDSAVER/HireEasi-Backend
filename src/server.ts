import "reflect-metadata";
import express, {NextFunction, Request, Response} from 'express';
import morgan from 'morgan';
import dotenv from "dotenv";
import helmet from "helmet";
import xss from 'xss-clean';
import cors from 'cors';
import compression from 'compression';
import router from './routes/index';
import ApiError from "./utils/apiError";
import httpStatus from "http-status";
import {errorConverter, errorHandler} from "./middlewares/Error";
import cookieParser from "cookie-parser";
import expressSanitizer from "express-sanitizer";
//Middlewares
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(expressSanitizer());
app.use(compression());
app.use(cors(
    {
        origin: ['http://localhost:3000', '*'],
        credentials: true
    }
));
app.options('*', cors());
app.use(cookieParser());

dotenv.config({path: '.env'});


//Router
app.use('/api/v1', router);


//404
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
})

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export {app};
