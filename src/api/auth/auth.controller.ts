import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginInputDto } from './dto/login.input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto: loginInputDto) {
    return this.authService.loginWithEmail(loginDto)
  }
}
