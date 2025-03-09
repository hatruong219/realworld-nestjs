import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginInputDto } from './dto/login.input.dto';
import { comparePassword, hashPassword } from 'src/untils/bcrypt.untils';
import { RegisterUserInputDto } from './dto/register-user.input.dto';
import { UserEntity } from './entities/user.entity';
import { UserBasicInfoDto } from './dto/basic-info.dto';
import { UserInfoReponse } from './dto/user-info.response.dto';
import { UpdateUserInput } from './dto/update-user.input.dto';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from './dto/login.response';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async loginWithEmail(
    loginInputDto: LoginInputDto,
  ): Promise<LoginResponseDto> {
    const user = await this.usersRepository.findOneBy({
      email: loginInputDto.email,
    });
    if (!user) {
      throw new BadRequestException('Email or password wrong!!!');
    }
    await this.verifyPassword(loginInputDto.password, user.password);
    const loginToken = this.generateJwtToken({
      userId: user.id,
      email: user.email,
    });
    return plainToInstance(LoginResponseDto, {
      email: user.email,
      accessToken: loginToken,
    });
  }

  async registerUser(
    registerUserInputDto: RegisterUserInputDto,
  ): Promise<UserInfoReponse> {
    const user = await this.usersRepository.findOneBy({
      email: registerUserInputDto.email,
    });
    if (user) {
      throw new BadRequestException('Email is registered!!!');
    }
    const passwordHash = await hashPassword(registerUserInputDto.password);
    const newUser = new UserEntity();
    newUser.email = registerUserInputDto.email;
    newUser.userName = registerUserInputDto.userName;
    newUser.bio = registerUserInputDto.bio;
    newUser.image = registerUserInputDto.image;
    newUser.password = passwordHash;
    await this.usersRepository.save(newUser);

    return plainToInstance(UserInfoReponse, newUser, {
      excludeExtraneousValues: true,
    });
  }

  async getCurrentUser(
    currentUser: UserBasicInfoDto,
  ): Promise<UserInfoReponse> {
    const user = await this.usersRepository.findOneBy({
      id: currentUser.userId,
    });
    if (!user) {
      throw new NotFoundException('User is not found!!!');
    }
    return plainToInstance(UserInfoReponse, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(
    currentUser: UserBasicInfoDto,
    updateUserInput: UpdateUserInput,
  ): Promise<UserInfoReponse> {
    const user = await this.usersRepository.findOneBy({
      id: currentUser.userId,
    });
    if (!user) {
      throw new NotFoundException('User is not found!!!');
    }

    const { user: updateUserInfo } = updateUserInput;

    const updatedFields = {
      email: updateUserInfo.email ?? user.email,
      bio: updateUserInfo.bio ?? user.bio,
      image: updateUserInfo.image ?? user.image,
      userName: updateUserInfo.userName ?? user.userName,
      password: updateUserInfo.password
        ? await hashPassword(updateUserInfo.password)
        : user.password,
    };

    Object.assign(user, updatedFields);
    await this.usersRepository.save(user);

    return plainToInstance(UserInfoReponse, user, {
      excludeExtraneousValues: true,
    });
  }

  async verifyPassword(password: string, hashPassword: string): Promise<void> {
    const isCorect = await comparePassword(password, hashPassword);
    if (!isCorect) {
      throw new BadRequestException('Email or password wrong!!!');
    }
  }

  generateJwtToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload);
  }
}
