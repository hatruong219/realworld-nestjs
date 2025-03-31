import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

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
}

export class ArticlesResponseDto {
  @Expose()
  @Type(() => ArticleDto)
  articles: ArticleDto[];

  @Expose()
  articlesCount: number;
}

export class TagDto {
  @Expose()
  name: string;
}

// export class AuthorDto {
//   @Expose()
//   username: string;

//   @Expose()
//   bio: string;

//   @Expose()
//   image: string;

//   @Expose()
//   following: boolean;
// }

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

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 20;
}
