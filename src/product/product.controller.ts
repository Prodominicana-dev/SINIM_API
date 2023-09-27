import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
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
}
