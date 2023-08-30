import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Sector } from '@prisma/client';

@Injectable()
export class SectorService {
    constructor(private prisma: PrismaService) {}

    async getSectorById(id: number): Promise<Sector | null> {
        return this.prisma.sector.findUnique({
            where: { id },
        });
    }

    async getSectorByName(name: string): Promise<Sector | null> {
        return this.prisma.sector.findUnique({
            where: { name },
        });
    }

    async getAllSectors(): Promise<Sector[]> {
        return this.prisma.sector.findMany();
    }
}
