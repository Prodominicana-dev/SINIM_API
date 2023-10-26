import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('apiv2/category')
export class CategoryController {
    constructor( private readonly categoryService : CategoryService){}

    @Get('saim')
    async getSaimCategories() {
        return await this.categoryService.getSaimCategories();
    }

    @Get('sied')
    async getSiedCategories() {
        return await this.categoryService.getSiedCategories();
    }

    @Post()
    async createCategory(@Body() data) {
        return await this.categoryService.createCategory(data);
    }

    @Get('select/sied')
    async getSelectSiedCategories() {
        return await this.categoryService.getSelectSiedCategories();
    }
}
