import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { DatamarketService } from './datamarket.service';

@Controller('apiv2/datamarket')
export class DatamarketController {
    constructor(private readonly datamarketService: DatamarketService){}

    @Get()
    async getDatamarket() {
        return this.datamarketService.getDatamarket();
    }

    @Post()
    async createDatamarket(@Body() data) {
        return this.datamarketService.create(data);
    }

    @Get(':id')
    async getDatamarketById(@Param('id') id: number) {
        return this.datamarketService.getDatamarketById(Number(id));
    }

    @Patch(':id')
    async editDatamarket(@Param('id') id: number, @Body() data) {
        return this.datamarketService.edit(Number(id), data);
    }

    @Patch('deactive/:id')
    async deactiveDatamarket(@Param('id') id: number) {
        return this.datamarketService.deactive(Number(id));
    }

    @Get('group/category')
    async getGroupByCategory() {
        return this.datamarketService.getGroupByCategory();
    }

    @Get('category/:category')
    async getDatamarketByCategory(@Param('category') category: string) {
        return this.datamarketService.getDatamarketByCategory(category);
    }

    @Delete(':id')
    async deleteDatamarket(@Param('id') id: number) {
        return this.datamarketService.dDelete(Number(id));
    }
}
