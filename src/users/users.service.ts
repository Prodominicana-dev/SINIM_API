import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async getUserById(id: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, data: Prisma.UsersUpdateInput): Promise<Users> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<Users> {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
