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

@Entity('favorites')
export class FavoriteEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    name: 'is_favorite',
    type: 'boolean',
    default: false,
  })
  isFavorite: boolean;

  @ManyToOne(() => UserEntity, (user) => user.favorites, { nullable: false })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @ManyToOne(() => ArticleEntity, (article) => article.favorites, {
    nullable: false,
  })
  @JoinColumn({
    name: 'article_id',
  })
  article: ArticleEntity;
}
