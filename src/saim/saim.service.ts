import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product, Saim } from '@prisma/client';
import { paginator, searchPaginator } from '@nodeteam/nestjs-prisma-pagination';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { SuscriberService } from 'src/suscriber/suscriber.service';
import { MailService } from 'src/mail/mail.service';
import { Queue, Worker } from 'bullmq';
import IORedis, { Redis } from 'ioredis';
import { QueueService } from 'src/queue/queue.service';

const paginate: PaginatorTypes.PaginateFunction = paginator({
  page: 1,
  perPage: 8,
});

@Injectable()
export class SaimService {
  constructor(private prisma: PrismaService, private suscriberService : SuscriberService, private queueService: QueueService,) {}
  
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

  async publishSaim(id: number): Promise<any> {
    const saim = await this.getSAIMById(id);
    const products = saim.products.map((p: any) => p.id);
    const countries = saim.countries.map((c: any) => c.id);
    const suscribers = await this.suscriberService.getAllSuscribersEmailsByProductsOrCountries(products, countries);
    const job = {
      saim,
      subscribers: suscribers
    }
    // Usa el método addJob en lugar de llamar directamente a la cola.
    await this.queueService.addJob(job);

    return this.prisma.saim.update({
      where: {
        id: id,
      },
      data: {
        published: true,
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
