import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginInputDto } from './dto/login.input.dto';
import { comparePassword, hashPassword } from 'src/untils/bcrypt.untils';
import { RegisterUserInputDto } from './dto/register-user.input.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async loginWithEmail(loginInputDto: LoginInputDto) {
    const user = await this.usersRepository.findOneBy({
      email: loginInputDto.email,
    });
    if (!user) {
      throw new BadRequestException('Email or password wrong!!!');
    }
    await this.verifyPassword(loginInputDto.password, user.password);
    const loginToken = this.generateJwtToken({
      userId: user.id,
    });
    return {
      email: user.email,
      tokenLogin: loginToken,
    };
  }

  async registerUser(registerUserInputDto: RegisterUserInputDto) {
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

    return {
      emai: newUser.email,
      userName: newUser.userName,
      bio: newUser.bio,
      image: newUser.image,
    }
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
