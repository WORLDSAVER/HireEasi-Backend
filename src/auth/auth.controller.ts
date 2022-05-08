import { Body, Controller, Get, Post } from '@nestjs/common';
import catchAsync from 'src/utils/catchAsync';
import { AuthService } from './auth.service';
import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from './auth.validation';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginReq): Promise<LoginRes> {
    return this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: RegisterReq): Promise<RegisterRes> {
    return this.authService.register(data);
  }
}
