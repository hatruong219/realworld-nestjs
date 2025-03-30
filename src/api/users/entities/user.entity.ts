import { CommentEntity } from 'src/api/comments/entities/comment.entity';
import { FavoriteEntity } from 'src/api/favorites/entities/favorite.entity';
import { FollowEntity } from 'src/api/follows/entities/follow.entity';
import { AbstractBaseEntity } from 'src/untils/abstract-base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    name: 'user_name',
    length: 255,
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  userName!: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  password!: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: true,
  })
  image?: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: true,
  })
  bio?: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites: FavoriteEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.follower)
  following: FollowEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.followedUser)
  followed: FollowEntity[];
}
