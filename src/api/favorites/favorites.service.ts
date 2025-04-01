import { Injectable, NotFoundException } from '@nestjs/common';
import { UserBasicInfoDto } from '../users/dto/basic-info.dto';
import { ArticleDto } from '../articles/dto/articles.input.dto';
import { IsNull, UpdateResult } from 'typeorm';
import { ArticlesRepository } from '../articles/repositories/articles.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { FavoritesRepository } from './repositories/favorites.repository';
import { plainToInstance } from 'class-transformer';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly articlesRepository: ArticlesRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}
  async favoriteArticle(
    slug: string,
    currentUser: UserBasicInfoDto,
  ): Promise<ArticleDto> {
    const user = await this.usersRepository.findOneBy({
      id: currentUser.userId,
      deletedAt: IsNull(),
    });
    if (!user) {
      throw new NotFoundException('User is not found!!!');
    }
    const article = await this.articlesRepository.findOne({
      where: { slug, deletedAt: IsNull() },
      relations: { tags: true },
    });
    if (!article) {
      throw new NotFoundException('Article is not found!!!');
    }

    const favorite = await this.favoritesRepository.findOne({
      where: {
        user: { id: user.id },
        article: { id: article.id },
      },
    });

    if (favorite) {
      await this.favoritesRepository.update(
        { id: favorite.id },
        { isFavorite: true },
      );
    } else {
      const updateFavorite = await this.favoritesRepository.create({
        user,
        article,
        isFavorite: true,
      });
      await this.favoritesRepository.save(updateFavorite);
    }

    return plainToInstance(ArticleDto, article, {
      excludeExtraneousValues: true,
    });
  }

  async unfavoriteArticle(
    slug: string,
    currentUser: UserBasicInfoDto,
  ): Promise<ArticleDto> {
    const user = await this.usersRepository.findOneBy({
      id: currentUser.userId,
      deletedAt: IsNull(),
    });
    if (!user) {
      throw new NotFoundException('User is not found!!!');
    }
    const article = await this.articlesRepository.findOne({
      where: { slug, deletedAt: IsNull() },
      relations: { tags: true },
    });
    if (!article) {
      throw new NotFoundException('Article is not found!!!');
    }

    const favorite = await this.favoritesRepository.findOne({
      where: {
        user: { id: user.id },
        article: { id: article.id },
      },
    });

    if (!favorite) {
      throw new NotFoundException('User not favorited article yet!!!');
    } else {
      await this.favoritesRepository.update(
        { id: favorite.id },
        { isFavorite: false },
      );
    }

    return plainToInstance(ArticleDto, article, {
      excludeExtraneousValues: true,
    });
  }
}
