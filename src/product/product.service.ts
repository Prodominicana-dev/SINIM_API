import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    // Get all products
    async getProducts(): Promise< Product[]> {
        return this.prisma.product.findMany();
    }

    // Get product by id
    async findOne(id: number): Promise<Product | null> {
        return this.prisma.product.findUnique({
            where: { id },
        });
    }
}
