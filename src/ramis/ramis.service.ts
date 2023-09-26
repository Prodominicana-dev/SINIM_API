import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Ramis } from '@prisma/client';
import { CountryService } from 'src/country/country.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class RamisService {
  constructor(private prisma: PrismaService, 
    private countryService : CountryService,
    private productService : ProductService) {}

  async createRamis(data: Prisma.RamisCreateInput): Promise<Ramis> {
    return this.prisma.ramis.create({
      data: {
        ...data,
      },
    });
  }

  async getRamisById(id: number): Promise<any> {
    return this.prisma.ramis.findUnique({
      where: { id },
      include: {
        country: true,
        product: true,
      }
    });
    
  }

  // Get Rami by productId and CountryId
  async getRamisByProductIdAndCountryId(productId: number, countryId: number): Promise<Ramis | null> {
    return this.prisma.ramis.findFirst({
      where: {
        productId,
        countryId,
      },
    });
  } 

  async editRamis(id: number, data: Prisma.RamisUpdateInput): Promise<Ramis> {
    return this.prisma.ramis.update({
      where: { id },
      data,
    });
  }

  async getAllRamis(): Promise<{ id: number; countryId: number; productId: number; }[]> {
    return this.prisma.ramis.findMany({
        where: {
            status: "active"
        },
        select: {
            id: true,
            countryId: true,
            productId: true,
        }
    });
}

  async deleteRamiById(id: number): Promise<Ramis> {
    return this.prisma.ramis.delete({
      where: { id },
    });
  }
}
