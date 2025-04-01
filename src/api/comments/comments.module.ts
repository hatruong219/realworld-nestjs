import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';
import { CommentsRepository } from './repositories/comments.repository';
import { FollowsModule } from '../follows/follows.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    UsersModule,
    ArticlesModule,
    FollowsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
