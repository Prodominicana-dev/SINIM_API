import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Saim } from '@prisma/client';

@Injectable()
export class SaimService {
    constructor(private prisma: PrismaService) {}

    async getSAIM(): Promise<Saim[]> {
        return this.prisma.saim.findMany();
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
}
