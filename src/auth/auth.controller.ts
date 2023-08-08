import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { Prisma, Users } from '.prisma/client';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    const user: Users = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  @Post('register')
  createUser(@Body() registerDto: Prisma.UsersCreateInput): Promise<Users> {
    return this.authService.createUser(registerDto);
  }
  @Get('appleclientsecret')
  async appleclientsecret() {
    return this.authService.appleClientSecret();
  }
}
