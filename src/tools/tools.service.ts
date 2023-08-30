import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Tools } from '@prisma/client';

@Injectable()
export class ToolsService {
    constructor(private prisma: PrismaService) {}

    async getTools(): Promise< Tools[]> {
        return this.prisma.tools.findMany();
    }

    async getToolsByTitle(title: string): Promise<Tools | null> {
        return this.prisma.tools.findUnique({
            where: { title },
        });
    }
}
