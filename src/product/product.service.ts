import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getProducts(): Promise< Product[]> {
        return this.prisma.product.findMany();
    }
}
