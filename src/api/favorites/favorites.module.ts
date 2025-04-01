import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';
import { FavoritesRepository } from './repositories/favorites.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    UsersModule,
    ArticlesModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
