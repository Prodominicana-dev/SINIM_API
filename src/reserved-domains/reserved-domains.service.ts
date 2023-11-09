import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, reservedDomains } from '@prisma/client';

@Injectable()
export class ReservedDomainsService {
  constructor(private prisma: PrismaService) {}

  async createReservedDomains(
    data: Prisma.reservedDomainsCreateInput,
  ): Promise<reservedDomains> {
    return this.prisma.reservedDomains.create({
      data: {
        ...data,
      },
    });
  }

  async getReservedDomainsById(id: number): Promise<reservedDomains | null> {
    return this.prisma.reservedDomains.findUnique({
      where: { id },
    });
  }

  async getReservedDomainsByPlatform(
    platform: string,
  ): Promise<reservedDomains[] | null> {
    return this.prisma.reservedDomains.findMany({
      where: { platform },
    });
  }

  async editReservedDomains(
    id: number,
    data: Prisma.reservedDomainsUpdateInput,
  ): Promise<reservedDomains> {
    return this.prisma.reservedDomains.update({
      where: { id },
      data,
    });
  }

  async getAllReservedDomains(): Promise<any> {
    // Hacer un arreglo de strings con los dominios reservados de SAIM y SIED
    const saimDomains = await this.getReservedDomainsByPlatform('saim');
    const siedDomains = await this.getReservedDomainsByPlatform('sied');
    const saimDomainsArray = saimDomains.map((domain) => domain.name);
    const siedDomainsArray = siedDomains.map((domain) => domain.name);
    const data = {
      saim: saimDomainsArray,
      sied: siedDomainsArray,
    };
    return data;
  }

  async deleteReservedDomainsById(id: number): Promise<reservedDomains> {
    return this.prisma.reservedDomains.delete({
      where: { id },
    });
  }
}
