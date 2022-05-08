import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtGuard} from "../auth/auth.guard";
import {GetUser} from "../auth/auth.userdecorator";

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {

    @Get("me")
    me(@GetUser() user) {
        return user;
    }
}
