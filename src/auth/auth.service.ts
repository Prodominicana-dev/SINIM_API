/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Users } from '@prisma/client';
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

  getRolesByReservedDomain = (domain) => {
    return this.prismaService.rolesByDomain.findMany({
      where: { reservedDomainId: domain.id },
    });
  };

  assignRolesForUser = async (user) => {
    const reservedDomains = await this.prismaService.reservedDomains.findMany(
      {},
    );
    const roleSchema = [2];
    const email = user.email.split('@');
    const domain = email[1];

    for (const reservedDomain of reservedDomains) {
      if (domain.includes(reservedDomain.name)) {
        const roles = await this.getRolesByReservedDomain(reservedDomain);
        roles.forEach((role) => roleSchema.push(role.roleId));
      }
    }

    return roleSchema;
  };

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    const roles = await this.assignRolesForUser(data);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prismaService.users.create({
      data: {
        ...data,
        password: hashedPassword,
        roleId: {
          create: roles.map((role) => ({ role: { connect: { id: role } } })),
        },
      },
    });
  }
}
