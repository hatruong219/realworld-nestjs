import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class AuthorOfComment {
  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsString()
  bio: string;

  @Expose()
  @IsString()
  image: string;

  @Expose()
  @IsBoolean()
  following: boolean;
}

export class CommentResponseDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsString()
  body: string;

  @Expose()
  @Type(() => AuthorOfComment)
  author: AuthorOfComment;
}
