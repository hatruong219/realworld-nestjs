import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentInputDto } from './dto/create-comment.input.dto';
import { CommentsResponseDto } from './dto/comments.response';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserBasicInfoDto } from '../users/dto/basic-info.dto';
import { AuthOption } from 'src/decorators/auth-option.decorator';
import { CommentResponseDto } from './dto/comment.response';

@Controller('api')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('articles/:slug/comments')
  async createComment(
    @Param('slug') slug: string,
    @Body() commentDto: CreateCommentInputDto,
    @CurrentUser() currentUser: UserBasicInfoDto,
  ): Promise<CommentResponseDto> {
    return this.commentsService.createComment(slug, commentDto, currentUser);
  }

  @Get('articles/:slug/comments')
  @AuthOption()
  async getComments(
    @Param('slug') slug: string,
    @CurrentUser() currentUser: UserBasicInfoDto,
  ): Promise<CommentsResponseDto> {
    return this.commentsService.getComments(slug, currentUser);
  }

  @Delete('articles/:slug/comments/:id')
  async deleteComment(
    @Param('slug') slug: string,
    @Param('id') id: string,
    @CurrentUser() currentUser: UserBasicInfoDto,
  ): Promise<string> {
    return this.commentsService.deleteComment(slug, id, currentUser);
  }
}
