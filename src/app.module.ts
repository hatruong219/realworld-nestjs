import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ArticlesModule } from './api/articles/articles.module';
import { FavoritesModule } from './api/favorites/favorites.module';
import { CommentsModule } from './api/comments/comments.module';
import { TagsModule } from './api/tags/tags.module';
import { FollowsModule } from './api/follows/follows.module';

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    FavoritesModule,
    CommentsModule,
    TagsModule,
    FollowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
