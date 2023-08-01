import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Ramis } from '@prisma/client';

@Injectable()
export class RamisService {
  constructor(private prisma: PrismaService) {}

  async createRamis(data: Prisma.RamisCreateInput): Promise<Ramis> {
    return this.prisma.ramis.create({
      data: {
        ...data,
      },
    });
  }

  async getRamisById(id: string): Promise<Ramis | null> {
    return this.prisma.ramis.findUnique({
      where: { id },
    });
  }

  async editRamis(id: string, data: Prisma.RamisUpdateInput): Promise<Ramis> {
    return this.prisma.ramis.update({
      where: { id },
      data,
    });
  }

  async getAllRamis(): Promise<Ramis[]> {
    return this.prisma.ramis.findMany();
  }

  async deleteRamiById(id: string): Promise<Ramis> {
    return this.prisma.ramis.delete({
      where: { id },
    });
  }
}
