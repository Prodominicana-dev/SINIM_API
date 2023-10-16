import { Controller, Get, Post, Body, Param, ValidationPipe, Patch, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('apiv2/')
export class ProductController {
    constructor(private productService : ProductService) {}

    // Product list
    @Get('products')
    async getProducts(){
        return this.productService.getProducts();
    }

    // Find product by id
    @Get('product/:id')
    async getProductById(id: number){
        return this.productService.findOne(Number(id));
    }

    //Get products with label and value
    @Get('products/select')
    async getProductsLabelValue(){
        return this.productService.getProductsLabelValue();
    }

    // Create product
    @Post('product')
    async createProduct(@Body() data: any){
        return this.productService.create(data).then((res) => {
        });
    }

    // Edit product
    @Patch('product/:id')
    async editProduct(@Param('id') id: number, @Body() data: any){
        return this.productService.edit(Number(id), data);
    }

    // Delete product
    @Delete('product/:id')
    async deleteProduct(@Param('id') id: number){
        return this.productService.deactivate(Number(id));
    }

}
