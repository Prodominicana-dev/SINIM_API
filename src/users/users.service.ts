/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getRolesByReservedDomain = (domain) => {
    return this.prisma.rolesByDomain.findMany({
      where: { reservedDomainId: domain.id },
    });
  };

  assignRolesForUser = async (user) => {
    const reservedDomains = await this.prisma.reservedDomains.findMany({});
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
    return this.prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
        roleId: {
          create: roles.map((role) => ({ role: { connect: { id: role } } })),
        },
      },
    });
  }

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async getUserById(id: number): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, data: Prisma.UsersUpdateInput): Promise<Users> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<Users> {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
