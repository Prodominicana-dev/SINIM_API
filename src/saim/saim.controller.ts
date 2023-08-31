import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { SaimService } from './saim.service';
import { Prisma, SAIM } from '@prisma/client';

@Controller('saim')
export class SaimController {
    constructor(private readonly saimService: SaimService) {}

    @Get()
    async getSAIM() {
        this.saimService.getSAIM();
    }

    @Post()
    async createSAIM(@Body() data : Prisma.SAIMCreateInput) {
        this.saimService.createSAIM(data);
    }
}
