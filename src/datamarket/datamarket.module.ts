import { Module } from '@nestjs/common';
import { DatamarketService } from './datamarket.service';
import { DatamarketController } from './datamarket.controller';

@Module({
  providers: [DatamarketService],
  controllers: [DatamarketController]
})
export class DatamarketModule {}
