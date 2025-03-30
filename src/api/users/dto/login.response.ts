import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginResponseDto {
  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  accessToken: string;
}
