import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Users } from '.prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password?: string): Promise<Users> {
    const Users = await this.prismaService.users.findUnique({
      where: { email },
    });
    if (!Users) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, Users.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return Users;
  }

  async login(Users: Users) {
    const payload = { sub: Users.id, email: Users.email, role: Users };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
