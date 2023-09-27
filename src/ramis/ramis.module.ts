import { Module } from '@nestjs/common';
import { RamisService } from './ramis.service';
import { RamisController } from './ramis.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CountryModule } from 'src/country/country.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [RamisService, PrismaService],
  controllers: [RamisController],
  imports: [CountryModule, ProductModule],
})
export class RamisModule {}
