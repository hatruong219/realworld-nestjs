import { UserEntity } from 'src/api/users/entities/user.entity';
import { AbstractBaseEntity } from 'src/untils/abstract-base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('follows')
export class FollowEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    name: 'is_follow',
    type: 'boolean',
    default: false,
  })
  isFollow: Boolean;

  @ManyToOne(() => UserEntity, (user) => user.following, { nullable: false })
  @JoinColumn({
    name: 'follower_id',
  })
  follower: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followed, { nullable: false })
  @JoinColumn({
    name: 'followed_user_id',
  })
  followedUser: UserEntity;
}
