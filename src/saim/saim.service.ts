import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Alerts } from '@prisma/client';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { SuscriberService } from 'src/suscriber/suscriber.service';
import { QueueService } from 'src/queue/queue.service';

const paginate: PaginatorTypes.PaginateFunction = paginator({
  page: 1,
  perPage: 8,
});

@Injectable()
export class SaimService {
  constructor(
    private prisma: PrismaService,
    private suscriberService: SuscriberService,
    private queueService: QueueService,
  ) {}

  async getActiveSAIMAlerts(): Promise<Alerts[]> {
    return this.prisma.alerts.findMany({
      where: {
        status: 'active',
        platform: 'saim',
      },
      orderBy: {
        date: 'desc',
      },
      include: {
        category: true,
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
    where?: Prisma.AlertsWhereInput;
    orderBy?: Prisma.AlertsOrderByWithRelationInput;
  }): Promise<PaginatorTypes.PaginatedResult<Alerts>> {
    return paginate(
      this.prisma.alerts,
      {
        where: {
          status: 'active',
          platform: 'saim',
        },
        orderBy: {
          date: 'desc',
        },
        include: {
          category: true,
        },
      },
      {
        page,
        perPage: 8,
      },
    );
  }

  async getPublicPaginated({
    page,
    perPage,
    where,
    orderBy,
  }: {
    page?: number;
    perPage?: number;
    where?: Prisma.AlertsWhereInput;
    orderBy?: Prisma.AlertsOrderByWithRelationInput;
  }): Promise<PaginatorTypes.PaginatedResult<Alerts>> {
    return paginate(
      this.prisma.alerts,
      {
        where: {
          status: 'active',
          platform: 'saim',
          isPublic: true,
        },
        orderBy: {
          date: 'desc',
        },
        include: {
          category: true,
        },
      },
      {
        page,
        perPage: 8,
      },
    );
  }

  async getSAIM(): Promise<Alerts[]> {
    return this.prisma.alerts.findMany({
      where: {
        platform: 'saim',
      },
      orderBy: [
        {
          status: 'desc',
        },
        {
          id: 'desc',
        },
      ],
      include: {
        category: true,
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
    where?: Prisma.AlertsWhereInput;
    orderBy?: Prisma.AlertsOrderByWithRelationInput;
  }): Promise<PaginatorTypes.PaginatedResult<Alerts>> {
    return paginate(
      this.prisma.alerts,
      {
        orderBy: [
          {
            status: 'desc',
          },
          {
            id: 'desc',
          },
        ],
        where: {
          platform: 'saim',
        },
        include: {
          category: true,
        },
      },
      {
        page,
        perPage: 8,
      },
    );
  }

  async getSAIMById(id: number): Promise<Alerts> {
    return this.prisma.alerts.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
      },
    });
  }

  // Update SAIM data
  async updateSAIM(
    id: number,
    data: Prisma.AlertsUpdateInput,
  ): Promise<Alerts> {
    const saim = await this.getSAIMById(id);
    data.published = Boolean(data.published);
    if (!saim.published && data.published) {
      await this.publishSaim(id);
    }
    return this.prisma.alerts.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async createSAIM(data: Prisma.AlertsCreateInput): Promise<Alerts> {
    data.published = Boolean(data.published);
    const saim = await this.prisma.alerts.create({
      data,
    });

    return saim;
  }

  async publishSaim(id: number): Promise<any> {
    const saim = await this.getSAIMById(id);
    const products = saim.products.map((p: any) => p.id);
    console.log(saim);
    const countries = saim.countries.map((c: any) => c.id);
    console.log(countries);
    const suscribers =
      await this.suscriberService.getAllSuscribersEmailsByProductsOrCountries(
        products,
        countries,
      );
    const job = {
      saim,
      subscribers: suscribers,
    };
    // Usa el método addJob en lugar de llamar directamente a la cola.
    await this.queueService.addJob(job);

    return this.prisma.alerts.update({
      where: {
        id: id,
      },
      data: {
        published: true,
      },
    });
  }

  async enable(id: number): Promise<Alerts> {
    return this.prisma.alerts.update({
      where: {
        id: id,
      },
      data: {
        status: 'active',
      },
    });
  }

  async disable(id: number): Promise<Alerts> {
    return this.prisma.alerts.update({
      where: {
        id: id,
      },
      data: {
        status: 'inactive',
      },
    });
  }

  async deleteDefinitiveSAIM(id: number): Promise<Alerts> {
    return this.prisma.alerts.delete({
      where: {
        id: id,
      },
    });
  }

  async getTest(): Promise<any> {
    return await this.prisma.alerts.groupBy({
      by: ['platform'],
      _count: {
        platform: true,
      },
    });
  }
}
