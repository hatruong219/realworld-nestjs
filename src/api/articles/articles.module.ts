import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { ArticlesRepository } from './repositories/articles.repository';
import { UsersModule } from '../users/users.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), UsersModule, TagsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
  exports: [ArticlesRepository],
})
export class ArticlesModule {}
