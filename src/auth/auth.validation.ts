import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginReq {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 50)
  password: string;
}

export class LoginRes {
  id: number;
  access_token: string;
}

export class RegisterReq {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 50)
  password: string;

  @IsNotEmpty()
  @Length(8, 50)
  confirm_password: string;

  @IsNotEmpty()
  @Length(2, 50)
  first_name: string;

  @Length(0, 50)
  middle_name: string;

  @Length(2, 50)
  last_name: string;

  @IsNotEmpty()
  @Length(10)
  phone: string;

  @Length(0, 50)
  image_url: string;
}

export class RegisterRes {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 50)
  password: string;

  @IsNotEmpty()
  @Length(8, 50)
  confirm_password: string;

  @IsNotEmpty()
  @Length(2, 50)
  first_name: string;

  @Length(2, 50)
  middle_name: string;

  @Length(2, 50)
  last_name: string;

  @IsNotEmpty()
  @Length(10)
  phone: string;

  @Length(6, 50)
  image_url: string;
}
