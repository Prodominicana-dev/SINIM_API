import { Module } from '@nestjs/common';
import { DataController } from './data.controller';


@Module({
  controllers: [DataController],
  providers: []
})
export class DataModule {}
