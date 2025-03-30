import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ProfileResponse {
  // @Expose()
  // @IsString()
  // id: string;
  @Expose()
  @IsString()
  userName: string;

  @Expose()
  @IsString()
  bio: string;

  @Expose()
  @IsString()
  image: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  isFollowing?: boolean;
}
