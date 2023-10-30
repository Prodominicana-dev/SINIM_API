import { Injectable } from '@nestjs/common';
import { Prisma, Partner } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PartnerService {
    constructor(private prisma: PrismaService) {}

    // Crear partner
    async create(data: Prisma.PartnerCreateInput): Promise<Partner> {
        return this.prisma.partner.create({ data });
    }

    // Buscar partner por id
    async findOne(partnerId: number): Promise<Partner | null> {
        return this.prisma.partner.findUnique({ where: { id: partnerId } });
    }

    // Editar partner
    async update(
        partnerId: number,
        data: Prisma.PartnerUpdateInput,
    ): Promise<Partner> {
        return this.prisma.partner.update({
            where: { id: partnerId },
            data,
        });
    }

    // Borrar partner
    async deleteOne(partnerId: number): Promise<Partner> {
        return this.prisma.partner.delete({ where: { id: partnerId } });
    }

    // Buscar por tipo
    async findByType(type: string): Promise<Partner[]> {
        return this.prisma.partner.findMany({ where: { type } });
    }

    // Obtener todo
    async findAll(): Promise<Partner[]> {
        return this.prisma.partner.findMany();
    }
}
