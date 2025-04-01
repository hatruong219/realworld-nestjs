import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './repositories/comments.repository';
import { CreateCommentInputDto } from './dto/create-comment.input.dto';
import { CommentsResponseDto } from './dto/comments.response';
import { UserBasicInfoDto } from '../users/dto/basic-info.dto';
import { UsersRepository } from '../users/repositories/users.repository';
import { ArticlesRepository } from '../articles/repositories/articles.repository';
import { IsNull } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AuthorOfComment, CommentResponseDto } from './dto/comment.response';
import { FollowsRepository } from '../follows/repositories/follows.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly articlesRepository: ArticlesRepository,
    private readonly followRepository: FollowsRepository,
  ) {}
  async createComment(
    slug: string,
    commentDto: CreateCommentInputDto,
    currentUser: UserBasicInfoDto,
  ): Promise<CommentResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id: currentUser.userId, deletedAt: IsNull() },
    });
    if (!user) {
      throw new NotFoundException('User is not found!!!');
    }

    const article = await this.articlesRepository.findOne({
      where: { slug, deletedAt: IsNull() },
    });
    if (!article) {
      throw new NotFoundException('Article is not found!!!');
    }

    const comment = await this.commentsRepository.create({
      body: commentDto.body,
      article,
      user,
    });
    const createdComment = await this.commentsRepository.save(comment);

    return plainToInstance(
      CommentResponseDto,
      {
        ...createdComment,
        author: {
          username: createdComment.user.userName,
          bio: createdComment.user.bio,
          image: createdComment.user.image,
          following: false,
        },
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async getComments(
    slug: string,
    currentUser: UserBasicInfoDto,
  ): Promise<CommentsResponseDto> {
    let listFollowing: string[] = [];
    if (currentUser) {
      const user = await this.usersRepository.findOne({
        where: { id: currentUser.userId, deletedAt: IsNull() },
      });
      if (!user) {
        throw new NotFoundException('User is not found!!!');
      }
      const follows = await this.followRepository
        .createQueryBuilder('follow')
        .select('follow.followed_user_id', 'followedId')
        .where('follow.follower_id = :userId', { userId: user.id })
        .andWhere('follow.deleted_at IS NULL')
        .getRawMany();

      listFollowing = follows.map((f) => f.followedId);
    }
    const comments = await this.commentsRepository.find({
      where: { article: { slug }, deletedAt: IsNull() },
      relations: {
        user: true,
      },
    });
    if (!comments) {
      throw new NotFoundException('Comments are not found!!!');
    }
    const mappedComments = comments.map((comment) => {
      const author: AuthorOfComment = {
        username: comment.user.userName,
        bio: comment.user.bio,
        image: comment.user.image,
        following: listFollowing.includes(comment.user.id),
      };

      const commentResponse: CommentResponseDto = {
        id: comment.id,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        body: comment.body,
        author,
      };

      return commentResponse;
    });

    return {
      comments: mappedComments,
    };
  }

  async deleteComment(
    slug: string,
    id: string,
    currentUser: UserBasicInfoDto,
  ): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { id: currentUser.userId, deletedAt: IsNull() },
    });
    if (!user) {
      throw new NotFoundException('User is not found!!!');
    }

    const article = await this.articlesRepository.findOne({
      where: { slug: slug, deletedAt: IsNull() },
    });
    if (!article) {
      throw new NotFoundException('Article is not found!!!');
    }

    const comment = await this.commentsRepository.findOne({
      where: {
        id,
        article: { id: article.id },
        user: { id: user.id },
        deletedAt: IsNull(),
      },
    });
    if (!comment) {
      throw new NotFoundException('Comment is not found!!!');
    }

    await this.commentsRepository.update(
      { id: comment.id },
      { deletedAt: new Date() },
    );

    return 'Deleted successfully !';
  }
}
