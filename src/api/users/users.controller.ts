import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginInputDto } from './dto/login.input.dto';
import { RegisterUserInputDto } from './dto/register-user.input.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() loginDto: LoginInputDto) {
    return this.usersService.loginWithEmail(loginDto);
  }

  @Post()
  registerUser(@Body() registerUserInputDto: RegisterUserInputDto) {
    return this.usersService.registerUser(registerUserInputDto)
  }
}
