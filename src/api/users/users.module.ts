import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import appConfig from 'src/configs/app.config';
const APP_CONFIG = appConfig();
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: APP_CONFIG.JWT.SECRET,
      signOptions: {expiresIn: APP_CONFIG.JWT.EXPIRES_IN},
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository, JwtModule],
})
export class UsersModule {}
