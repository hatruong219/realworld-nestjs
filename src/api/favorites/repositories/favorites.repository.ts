import { DataSource, Repository } from 'typeorm';
import { FavoriteEntity } from '../entities/favorite.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesRepository extends Repository<FavoriteEntity> {
  constructor(private dataSource: DataSource) {
    super(FavoriteEntity, dataSource.manager);
  }
}
