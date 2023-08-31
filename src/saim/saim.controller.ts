import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { SaimService } from './saim.service';

@Controller('saim')
export class SaimController {
    constructor(private readonly saimService: SaimService) {}

    @Get()
    async getSAIM() {
        return this.saimService.getSAIM();
    }

    @Post()
    async createSAIM(@Body() data ) {
        return this.saimService.createSAIM(data);
    }
}
