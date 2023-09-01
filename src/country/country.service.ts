import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Country } from '@prisma/client';

@Injectable()
export class CountryService {
    constructor(private prisma: PrismaService) {}

    async getCountries(): Promise< Country[]> {
        return this.prisma.country.findMany();
    }

    async getCountryById(id: number): Promise<Country | null> {
        return this.prisma.country.findUnique({
            where: { id },
        });
    }
}