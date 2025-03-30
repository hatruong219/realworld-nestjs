import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FollowEntity } from '../entities/follow.entity';

@Injectable()
export class FollowsRepository extends Repository<FollowEntity> {
  constructor(private dataSource: DataSource) {
    super(FollowEntity, dataSource.manager);
  }
}
