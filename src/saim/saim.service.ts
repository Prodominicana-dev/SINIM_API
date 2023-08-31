import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, SAIM } from '@prisma/client';

@Injectable()
export class SaimService {
    constructor(private prisma: PrismaService) {}

    async getSAIM(): Promise<SAIM[]> {
        return this.prisma.sAIM.findMany();
    }

    async getSAIMById(id: number): Promise<SAIM> {
        return this.prisma.sAIM.findUnique({
            where: {
                id: id,
            },
        });
    }

    async createSAIM(data: Prisma.SAIMCreateInput): Promise<SAIM> {
        return this.prisma.sAIM.create({
            data,
        });
    }
}
