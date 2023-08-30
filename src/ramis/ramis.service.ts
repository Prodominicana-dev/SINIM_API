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

  async getRamisById(id: number): Promise<Ramis | null> {
    return this.prisma.ramis.findUnique({
      where: { id },
    });
  }

  async editRamis(id: number, data: Prisma.RamisUpdateInput): Promise<Ramis> {
    return this.prisma.ramis.update({
      where: { id },
      data,
    });
  }

  async getAllRamis(): Promise<Ramis[]> {
    return this.prisma.ramis.findMany();
  }

  async deleteRamiById(id: number): Promise<Ramis> {
    return this.prisma.ramis.delete({
      where: { id },
    });
  }

  async getRamiByProductIDAndCountryID(idProduct: number, idCountry: number): Promise<Ramis | null> {
    return this.prisma.ramis.findFirst({
      where: {
        productId: Number(idProduct),
        countryId: Number(idCountry)
      },
    });
  }
}
