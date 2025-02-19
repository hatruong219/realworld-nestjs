import { ArticleEntity } from 'src/api/articles/entities/article.entity';
import { UserEntity } from 'src/api/users/entities/user.entity';
import { AbstractBaseEntity } from 'src/untils/abstract-base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class CommentEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    length: 255,
    type: 'varchar',
  })
  body: string;

  @ManyToOne(() => UserEntity, (user) => user.comments, { nullable: false })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @ManyToOne(() => ArticleEntity, (article) => article.comments, {
    nullable: false,
  })
  @JoinColumn({
    name: 'article_id',
  })
  article: ArticleEntity;
}
