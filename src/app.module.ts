import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ArticlesModule } from './api/articles/articles.module';
import { FavoritesModule } from './api/favorites/favorites.module';
import { CommentsModule } from './api/comments/comments.module';
import { TagsModule } from './api/tags/tags.module';
import { FollowsModule } from './api/follows/follows.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [appConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
    }),
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
