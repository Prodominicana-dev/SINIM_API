import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Saim } from '@prisma/client';
import { paginator, searchPaginator } from '@nodeteam/nestjs-prisma-pagination';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';

const paginate: PaginatorTypes.PaginateFunction = paginator({
  page: 1,
  perPage: 8,
});

@Injectable()
export class SaimService {
  constructor(private prisma: PrismaService) {}

  async getActiveSAIM(): Promise<Saim[]> {
    return this.prisma.saim.findMany({
      where: {
        status: 'active',
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getActivePaginatedSaim({
    page,
    perPage,
    where,
    orderBy,
  }: {
    page?: number;
    perPage?: number;
    where?: Prisma.SaimWhereInput;
    orderBy?: Prisma.SaimOrderByWithRelationInput;
  }): Promise<PaginatorTypes.PaginatedResult<Saim>> {
    return paginate(
      this.prisma.saim,
      {
        where: {
          status: 'active',
        },
        orderBy: {
          date: 'desc',
        },
      },
      {
        page,
        perPage: 8,
      },
    );
  }

  async getSAIM(): Promise<Saim[]> {
    return this.prisma.saim.findMany({
      orderBy: {
        status: 'asc',
      },
    });
  }

  async getPaginatedSaim({
    page,
    perPage,
    where,
    orderBy,
  }: {
    page?: number;
    perPage?: number;
    where?: Prisma.SaimWhereInput;
    orderBy?: Prisma.SaimOrderByWithRelationInput;
  }): Promise<PaginatorTypes.PaginatedResult<Saim>> {
    return paginate(
      this.prisma.saim,
      {
        orderBy: {
          status: 'asc',
        },
      },
      {
        page,
        perPage: 8,
      },
    );
  }

  async getSAIMById(id: number): Promise<Saim> {
    return this.prisma.saim.findUnique({
      where: {
        id: id,
      },
    });
  }

  // Update SAIM data
  async updateSAIM(id: number, data: Prisma.SaimUpdateInput): Promise<Saim> {
    return this.prisma.saim.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async createSAIM(data: Prisma.SaimCreateInput): Promise<Saim> {
    return this.prisma.saim.create({
      data,
    });
  }

  async deleteSAIM(id: number): Promise<Saim> {
    return this.prisma.saim.update({
      where: {
        id: id,
      },
      data: {
        status: 'deleted',
      },
    });
  }

  async deleteDefinitiveSAIM(id: number): Promise<Saim> {
    return this.prisma.saim.delete({
      where: {
        id: id,
      },
    });
  }
}
