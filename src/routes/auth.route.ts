import express from 'express'
import validate from "../middlewares/Validate";
import {LoginValidation, RegisterValidation} from "../validations/auth.validations";
import {Login, Logout, Register} from "../controllers/auth.controller";

const router = express.Router()

router
    .route('/register')
    .post(validate(RegisterValidation), Register)

router
    .route('/login')
    .post(validate(LoginValidation), Login)


router.route('/logout').get( Logout)

export default router
