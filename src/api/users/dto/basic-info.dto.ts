import { IsEmail, IsString } from 'class-validator';

export class UserBasicInfoDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;
}
