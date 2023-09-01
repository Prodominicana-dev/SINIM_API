import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { SaimService } from './saim.service';

@Controller('saim')
export class SaimController {
    constructor(private readonly saimService: SaimService) {}

    @Get()
    async getSAIM() {
        return this.saimService.getSAIM();
    }

    @Get(':id')
    async getSAIMById(@Param('id') id: number) {
        return this.saimService.getSAIMById(Number(id));
    }

    @Put(':id')
    async updateSAIM(@Param('id') id: number, @Body() data) {
        return this.saimService.updateSAIM(Number(id), data);
    }

    @Post()
    async createSAIM(@Body() data ) {
        return this.saimService.createSAIM(data);
    }
}
