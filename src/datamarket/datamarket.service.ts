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
      },
    });
  }

  async getDatamarket(): Promise<Datamarket[]> {
    return this.prismaService.datamarket.findMany({
      orderBy: {
        categoryPriority: 'asc',
      },
    });
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
      distinct: ['category'],
      orderBy: {
        categoryPriority: 'asc',
      },
      select: {
        category: true,
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

  async onlyCategories(): Promise<any[]> {
    const categories = await this.prismaService.datamarket.findMany({
      distinct: ['category'],
      orderBy: {
        categoryPriority: 'asc',
      },
      select: {
        category: true,
        categoryPriority: true,
      },
    });
    return categories;
  }

  // Actualizar todos los datamarkets que tengan la misma categoria
  async updateDatamarketByCategory(
    category: string,
    data: Prisma.DatamarketUpdateInput,
  ): Promise<any> {
    return this.prismaService.datamarket.updateMany({
      where: {
        category,
      },
      data,
    });
  }
}
