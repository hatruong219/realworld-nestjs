import { CommentEntity } from 'src/api/comments/entities/comment.entity';
import { FavoriteEntity } from 'src/api/favorites/entities/favorite.entity';
import { TagEntity } from 'src/api/tags/entities/tag.entity';
import { AbstractBaseEntity } from 'src/untils/abstract-base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('articles')
export class ArticleEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  title!: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  slug!: string;

  @Column({
    length: 255,
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'text',
  })
  body: string;

  @ManyToMany(() => TagEntity, (tag) => tag.articles, { cascade: true })
  @JoinTable({
    name: 'article_tags',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: TagEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.article)
  favorites: FavoriteEntity[];
}
