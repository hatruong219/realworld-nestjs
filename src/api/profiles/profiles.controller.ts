import { Controller, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileResponse } from './dto/profile.response.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserBasicInfoDto } from '../users/dto/basic-info.dto';
import { AuthOption } from 'src/decorators/auth-option.decorator';

@Controller('api')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @AuthOption()
  @Get('profile/:username')
  @Serialize(ProfileResponse)
  async getProfile(
    @Param('username') username: string,
    @CurrentUser() currentUser: UserBasicInfoDto,
  ): Promise<ProfileResponse> {
    return await this.profilesService.getProfile(currentUser, username);
  }

  @Get('profile/:username/follow')
  @Serialize(ProfileResponse)
  async followUser(
    @Param('username') username: string,
    @CurrentUser() currentUser: UserBasicInfoDto,
  ): Promise<ProfileResponse> {
    return this.profilesService.followUser(currentUser, username);
  }

  @Get('profile/:username/unfollow')
  @Serialize(ProfileResponse)
  async unfollowUser(
    @Param('username') username: string,
    @CurrentUser() currentUser: UserBasicInfoDto,
  ): Promise<ProfileResponse> {
    return this.profilesService.unfollowUser(currentUser, username);
  }
}
