import { Body, Controller, Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { LoginRequest, SignupRequest } from './auth/auth-type.type';
import { AuthService } from './auth/auth.service';
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('health')
  getHealth(): string {
    return 'ok';
  }

  @Post('api/auth-service/signup')
  signup(@Body() data: SignupRequest) {
    return this.authService.signup(data);
  }

  @Post('api/auth-service/login')
  login(@Body() data: LoginRequest) {
    return this.authService.login(data);
  }
}
