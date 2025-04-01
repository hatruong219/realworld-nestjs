import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ArticleDto } from '../articles/dto/articles.input.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserBasicInfoDto } from '../users/dto/basic-info.dto';

@Controller('api')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('articles/:slug/favorite')
  async favoriteArticle(
    @Param('slug') slug: string,
    @CurrentUser() currentUser: UserBasicInfoDto,
  ): Promise<ArticleDto> {
    return this.favoritesService.favoriteArticle(slug, currentUser);
  }

  @Delete('articles/:slug/favorite')
  async unfavoriteArticle(
    @Param('slug') slug: string,
    @CurrentUser() currentUser: UserBasicInfoDto,
  ): Promise<ArticleDto> {
    return this.favoritesService.unfavoriteArticle(slug, currentUser);
  }
}
