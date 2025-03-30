import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';
import { plainToInstance } from 'class-transformer';
import { ProfileResponse } from './dto/profile.response.dto';
import { UserBasicInfoDto } from '../users/dto/basic-info.dto';
import { FollowsRepository } from '../follows/repositories/follows.repository';
import { IsNull } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly followsRepository: FollowsRepository,
  ) {}
  async getProfile(
    currentUser: UserBasicInfoDto,
    username: string,
  ): Promise<ProfileResponse> {
    const profile = await this.usersRepository.findOneBy({
      userName: username,
      deletedAt: IsNull(),
    });
    if (!profile) {
      throw new NotFoundException('User is not found!!!');
    }

    let isFollowing = null;
    if (currentUser) {
      const followRecord = await this.followsRepository.findOneBy({
        follower: { id: currentUser.userId },
        followedUser: { id: profile.id },
        deletedAt: IsNull(),
      });

      isFollowing = followRecord ? followRecord.isFollow : false;
    }
    return plainToInstance(
      ProfileResponse,
      { ...profile, isFollowing: isFollowing },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async followUser(
    currentUser: UserBasicInfoDto,
    username: string,
  ): Promise<ProfileResponse> {
    const profile = await this.usersRepository.findOneBy({
      userName: username,
      deletedAt: IsNull(),
    });
    if (!profile) {
      throw new NotFoundException('User is not found!!!');
    }
    let followRecord = await this.followsRepository.findOneBy({
      follower: { id: currentUser.userId },
      followedUser: { id: profile.id },
      deletedAt: IsNull(),
    });

    if (!followRecord) {
      const newFollow = this.followsRepository.create({
        follower: { id: currentUser.userId },
        followedUser: { id: profile.id },
        isFollow: true,
      });
      followRecord = await this.followsRepository.save(newFollow);
    } else {
      followRecord.isFollow = true;
      followRecord = await this.followsRepository.save(followRecord);
    }

    return plainToInstance(
      ProfileResponse,
      { ...profile, isFollowing: followRecord.isFollow },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async unfollowUser(
    currentUser: UserBasicInfoDto,
    username: string,
  ): Promise<ProfileResponse> {
    const profile = await this.usersRepository.findOneBy({
      userName: username,
      deletedAt: IsNull(),
    });
    if (!profile) {
      throw new NotFoundException('User is not found!!!');
    }
    const followRecord = await this.followsRepository.findOneBy({
      follower: { id: currentUser.userId },
      followedUser: { id: profile.id },
      deletedAt: IsNull(),
    });

    if (!followRecord) {
      throw new NotFoundException('Not following this user!!!');
    }

    followRecord.isFollow = false;
    const updateFollowUser = await this.followsRepository.save(followRecord);

    return plainToInstance(
      ProfileResponse,
      { ...profile, isFollowing: updateFollowUser.isFollow },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
