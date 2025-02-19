import { ArticleEntity } from 'src/api/articles/entities/article.entity';
import { AbstractBaseEntity } from 'src/untils/abstract-base.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class TagEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  name!: string;

  @ManyToMany(() => ArticleEntity, (article) => article.tags)
  articles: ArticleEntity[];
}
