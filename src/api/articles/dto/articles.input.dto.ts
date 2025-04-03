import { IntersectionType } from '@nestjs/mapped-types';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/api/common/pagination/page.dto';
export class AuthorDto {
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
  @IsBoolean()
  following: boolean;
}

export class ArticleDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  slug: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  body: string;

  @Expose()
  @IsArray()
  @Type(() => TagDto)
  tags: TagDto[];

  @Expose()
  @Type(() => AuthorDto)
  author: AuthorDto;
}

export class TagDto {
  @Expose()
  name: string;
}

export class ArticlesQueryDto {
  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  favorited?: string;
}

export class QueryArticlesDto extends IntersectionType(
  PageOptionsDto,
  ArticlesQueryDto,
) {}
