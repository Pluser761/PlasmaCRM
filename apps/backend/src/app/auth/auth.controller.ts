import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, JwtKeys } from '@plasma-crm/shared-types';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Omit<User, 'id'>): Promise<JwtKeys> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() tokenDto: {token: string}): Promise<JwtKeys> {
    return this.authService.refresh(tokenDto.token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.jwt_payload;
  }
}
