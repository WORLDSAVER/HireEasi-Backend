import {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import {Users} from '../entity/User';
import * as bcrypt from 'bcryptjs'
import {getRepository} from "typeorm";
import {ERROR, SUCCESS} from "../types/strings";

async function login(email: string, password: string): Promise<any | null> {
    
    try {
        const user = await getRepository(Users).findOne({where: {email}});
        //If user not found

        if (!user) {
            return {
                status: ERROR,
                message: 'User not found'
            };
        }

        //If user is not active

        if (!user.is_active) {
            return {
                status: ERROR,
                message: 'User is not active'
            };
        }

        //const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        //If password is not valid

        if (!isPasswordValid) {
            return {
                status: ERROR,
                message: 'Invalid password'
            };
        }

        //Token
        const access_token = jwt.sign({
            id: user.id,
            access_level: user.access_level
        }, process.env.JWT_ACCESS_SECRET, {expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`});
        const refresh_token = jwt.sign({
            id: user.id,
            access_level: user.access_level
        }, process.env.JWT_REFRESH_SECRET, {expiresIn: `${process.env.JWT_REFRESH_EXPIRATION_DAYS}d`});


        //Save the refresh token in the database
        await getRepository(Users).update(user.id, {refresh_token});

        return {
            status: SUCCESS,
            data: {
                token: access_token,
                refresh_token: refresh_token,
                user
            }
        };
    } catch (err) {
        console.log(err);
        return {
            status: ERROR,
            message: err.message
        };
    }

}


async function register(body) {
    const {email, password, first_name, middle_name, last_name, phone, access_level, image_url} = body;

    try {
        //Hash the password and add to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = `https://avatars.dicebear.com/api/male/${hashedPassword}.svg`
        const userExists = await getRepository(Users).findOne({
            where :{
                email
            }
        });

        if (userExists) {
            throw new Error('User already exists');
        } else {
            const user = await getRepository(Users)
                .createQueryBuilder("user")
                .insert()
                .values({
                    email,
                    password_hash: hashedPassword,
                    first_name,
                    middle_name,
                    last_name,
                    phone,
                    access_level: access_level,
                    created_at: new Date(),
                    image_url: image_url || avatar
                })
                .execute();
            if (user) {
                return {
                    status: true,
                    message: 'User created successfully'
                }
            } else {
                throw new Error('User not created')
            }
        }

    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: e.message
        }
    }
}

async function me(id: number) {
    return await getRepository(Users)
        .createQueryBuilder("user")
        .where("user.id = :id", {id: id})
        .execute()
}

export {login, register, me};
