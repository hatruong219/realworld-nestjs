import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ArticleEntity } from '../entities/article.entity';

@Injectable()
export class ArticlesRepository extends Repository<ArticleEntity> {
  constructor(private dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }
}
