import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../entities/comment.entity';

@Injectable()
export class CommentsRepository extends Repository<CommentEntity> {
  constructor(private dataSource: DataSource) {
    super(CommentEntity, dataSource.manager);
  }
}
