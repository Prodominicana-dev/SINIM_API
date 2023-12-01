import { Injectable } from '@nestjs/common';
import { Prisma, Datamarket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatamarketService {
  constructor(private readonly prismaService: PrismaService) {}

  async getActiveDatamarket(): Promise<Datamarket[]> {
    return this.prismaService.datamarket.findMany({
      where: {
        status: 'active',
      },
      orderBy: {
        categoryPriority: 'asc',
        priority: 'asc',
      },
    });
  }

  // Cambiar prioridad a todos los datamarket que tengan la misma categoria
  async changePriority(
    category: string,
    priority: number,
  ): Promise<Datamarket[]> {
    const datamarkets = await this.prismaService.datamarket.findMany({
      where: {
        category: category,
      },
    });
    for (const dm of datamarkets) {
      await this.prismaService.datamarket.update({
        where: {
          id: dm.id,
        },
        data: {
          categoryPriority: Number(priority),
        },
      });
    }
    return datamarkets;
  }

  async getDatamarket(): Promise<Datamarket[]> {
    return this.prismaService.datamarket.findMany({});
  }

  async getDatamarketById(id: number): Promise<Datamarket> {
    return this.prismaService.datamarket.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getGroupByCategory(): Promise<any[]> {
    return this.prismaService.datamarket.findMany({
      where: {
        status: 'active',
      },
      distinct: ['category', 'categoryPriority'],
      orderBy: {
        categoryPriority: 'asc',
        priority: 'asc',
      },
      select: {
        category: true,
        categoryPriority: true,
      },
    });
  }

  async getDatamarketByCategory(): Promise<Datamarket[]> {
    let data = [];
    const categories = await this.getGroupByCategory();
    for (const cat of categories) {
      const datamarket = await this.prismaService.datamarket.findMany({
        where: {
          category: cat.category,
          status: 'active',
        },
        orderBy: {
          categoryPriority: 'asc',
          priority: 'asc',
        },
      });
      const datacat = {
        category: cat.category,
        data: datamarket,
      };
      data.push(datacat);
    }
    return data;
  }

  async create(datamarket: Prisma.DatamarketCreateInput): Promise<Datamarket> {
    if (datamarket.category == null) {
      datamarket.category = datamarket.title;
    }
    return this.prismaService.datamarket.create({
      data: datamarket,
    });
  }

  async edit(
    id: number,
    datamarket: Prisma.DatamarketUpdateInput,
  ): Promise<Datamarket> {
    return this.prismaService.datamarket.update({
      where: {
        id: id,
      },
      data: datamarket,
    });
  }

  async deactive(id: number): Promise<Datamarket> {
    return this.prismaService.datamarket.update({
      where: {
        id: id,
      },
      data: {
        status: 'inactive',
      },
    });
  }

  async activate(id: number): Promise<Datamarket> {
    return this.prismaService.datamarket.update({
      where: {
        id: id,
      },
      data: {
        status: 'active',
      },
    });
  }

  async dDelete(id: number): Promise<Datamarket> {
    return this.prismaService.datamarket.delete({
      where: {
        id: id,
      },
    });
  }
}
