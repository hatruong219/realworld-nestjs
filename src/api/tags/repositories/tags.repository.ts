import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TagEntity } from '../entities/tag.entity';

@Injectable()
export class TagsRepository extends Repository<TagEntity> {
  constructor(private dataSource: DataSource) {
    super(TagEntity, dataSource.manager);
  }
}
