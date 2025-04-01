import { IsString } from 'class-validator';

export class CreateCommentInputDto {
  @IsString()
  body: string;
}
