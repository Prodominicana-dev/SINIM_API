import { Module } from '@nestjs/common';
import { RamisService } from './ramis.service';
import { RamisController } from './ramis.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RamisService, PrismaService],
  controllers: [RamisController],
})
export class RamisModule {}
