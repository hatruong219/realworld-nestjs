import { IsEmail, IsString } from 'class-validator';

export class LoginInputDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
