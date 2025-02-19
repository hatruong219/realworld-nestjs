import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserInputDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  userName!: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
