import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Saim } from '@prisma/client';
import { paginator, searchPaginator } from '@nodeteam/nestjs-prisma-pagination';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';

const paginate: PaginatorTypes.PaginateFunction = paginator({
    page: 1,
    perPage: 10,
});

@Injectable()
export class SaimService {
    constructor(private prisma: PrismaService) {}

    async getSAIM(): Promise<Saim[]> {
        return this.prisma.saim.findMany();
    }


    async getPaginatedSaim({ page, perPage,where, orderBy  }: {
        page?: number,
        perPage?: number,
        where?: Prisma.SaimWhereInput,
        orderBy?: Prisma.SaimOrderByWithRelationInput
    }): Promise<PaginatorTypes.PaginatedResult<Saim>> {
        return paginate(
            this.prisma.saim,
            {
                where,
                orderBy,
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
}
