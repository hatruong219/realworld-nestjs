import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserInfoReponse {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  userName: string;

  @Expose()
  @IsString()
  bio: string;

  @Expose()
  @IsString()
  image: string;
}
