import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { CommentResponseDto } from './comment.response';

export class CommentsResponseDto {
  @Expose()
  @Type(() => CommentResponseDto)
  comments: CommentResponseDto[];
}
