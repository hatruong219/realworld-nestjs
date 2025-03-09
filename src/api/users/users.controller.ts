import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginInputDto } from './dto/login.input.dto';
import { RegisterUserInputDto } from './dto/register-user.input.dto';
import { Public } from 'src/decorators/public.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserBasicInfoDto } from './dto/basic-info.dto';
import { UserInfoReponse } from './dto/user-info.response.dto';
import { UpdateUserInput } from './dto/update-user.input.dto';
import { LoginResponseDto } from './dto/login.response';
import { Serialize } from 'src/interceptor/serialize.interceptor';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('/users/login')
  @Serialize(LoginResponseDto)
  login(@Body() loginDto: LoginInputDto): Promise<LoginResponseDto> {
    return this.usersService.loginWithEmail(loginDto);
  }

  @Public()
  @Post('/users')
  @Serialize(UserInfoReponse)
  registerUser(@Body() registerUserInputDto: RegisterUserInputDto): Promise<UserInfoReponse> {
    return this.usersService.registerUser(registerUserInputDto);
  }

  @Get('/user')
  @Serialize(UserInfoReponse)
  async getCurrentUser(
    @CurrentUser() user: UserBasicInfoDto,
  ): Promise<UserInfoReponse> {
    return await this.usersService.getCurrentUser(user);
  }

  @Put('/user')
  @Serialize(UserInfoReponse)
  async updateUser(
    @CurrentUser() user: UserBasicInfoDto,
    @Body() updateUserInput: UpdateUserInput,
  ): Promise<UserInfoReponse> {
    return await this.usersService.updateUser(user, updateUserInput);
  }
}
