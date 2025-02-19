import { IsEmail, IsString } from 'class-validator';

export class loginInputDto {
  user: LoginInfo;
}

export class LoginInfo {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
