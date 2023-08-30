import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(private productService : ProductService) {}

    @Get('products')
    async getProducts(){
        return this.productService.getProducts();
    }
}
