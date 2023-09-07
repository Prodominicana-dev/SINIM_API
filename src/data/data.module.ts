import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { SaimModule } from 'src/saim/saim.module';


@Module({
  controllers: [DataController],
  providers: [],
  imports: [SaimModule],
})
export class DataModule {}
