import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  ArticleDto,
  ArticlesQueryDto,
  ArticlesResponseDto,
} from './dto/articles.input.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserBasicInfoDto } from '../users/dto/basic-info.dto';
import { CreateArticleDto } from './dto/article.input.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { Public } from 'src/decorators/public.decorator';
import { UpdateArticleDto } from './dto/update-article.input.dto';

@Controller('api')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('articles')
  @Public()
  getArticles(
    @CurrentUser() currentUser: UserBasicInfoDto,
    @Query() articlesQuery: ArticlesQueryDto,
  ): Promise<ArticlesResponseDto> {
    return this.articlesService.getArticles(currentUser, articlesQuery);
  }

  @Post('articles')
  @Serialize(ArticleDto)
  createArticle(
    @CurrentUser() currentUser: UserBasicInfoDto,
    @Body() article: CreateArticleDto,
  ): Promise<ArticleDto> {
    return this.articlesService.createArticle(currentUser, article);
  }

  @Public()
  @Get('article/:slug')
  @Serialize(ArticleDto)
  getArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleDto> {
    return this.articlesService.getArticle(slug);
  }

  @Put('articles/:slug')
  @Serialize(ArticleDto)
  updateArticle(
    @CurrentUser() currentUser: UserBasicInfoDto,
    @Param('slug') slug: string,
    @Body() article: UpdateArticleDto,
  ): Promise<ArticleDto> {
    return this.articlesService.updateArticle(currentUser, slug, article);
  }

  @Delete('articles/:slug')
  deleteArticle(
    @CurrentUser() currentUser: UserBasicInfoDto,
    @Param('slug') slug: string,
  ): Promise<string> {
    return this.articlesService.deleteArticle(currentUser, slug);
  }
}
