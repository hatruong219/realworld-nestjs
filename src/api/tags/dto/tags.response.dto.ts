import { Expose, Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class TagsResponseDto {
  @Expose()
  @IsArray()
  @Type(() => String)
  tags: string[];
}
