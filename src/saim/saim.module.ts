import { Module } from '@nestjs/common';
import { SaimService } from './saim.service';
import { SaimController } from './saim.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SaimService, PrismaService],
  controllers: [SaimController]})
export class SaimModule {}
