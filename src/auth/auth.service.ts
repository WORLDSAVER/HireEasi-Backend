import {Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import ApiError from 'src/utils/apiError';
import {LoginReq, RegisterReq} from './auth.validation';

import * as Argon2 from 'argon2'
import {ErrorHandler} from "../utils/errorHandler";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {
    }

    async login(data: LoginReq): Promise<any> {
        const {email, password} = data;

        try {
            //Check if user exists

            const user = await this.prisma.user.findFirst({
                where: {email}
            });

            if (!user) {
                throw new Error('Wrong Credentials');
            }

            const verified = await Argon2.verify(user.hash_password, password);

            if (!verified) {
                throw new Error('Wrong Credentials');
            }

            const token = this.jwt.sign({
                    id: user.id,
                }, {
                    expiresIn: '1h',
                    secret: this.config.get('JWT_SECRET')
                }
            )

            return {
                access_token: token
            };
        } catch (err) {
            const error = ErrorHandler(err);
            throw new ApiError(error.status, error.message, error.stack);
        }
    }

    async register(data: RegisterReq): Promise<any> {
        const {
            email,
            password,
            confirm_password,
            phone,
            first_name,
            middle_name,
            last_name,
            image_url,
        } = data;

        try {
            if (password !== confirm_password) {
                throw new Error('passwords not match');

            }

            //Find if user exists
            const user = await this.prisma.user.findFirst({
                where: {
                    email
                },
            })

            if (user) {
                throw new Error('user already exists');
            }

            const hashed_password = await Argon2.hash(password);

            //Create user
            return await this.prisma.user.create({
                data: {
                    email,
                    phone,
                    first_name,
                    middle_name,
                    last_name,
                    image_url,
                    hash_password: hashed_password,
                },
            });

        } catch (err) {
            const error = ErrorHandler(err);
            throw new ApiError(error.status, error.message, error.stack);
        }
    }
}
