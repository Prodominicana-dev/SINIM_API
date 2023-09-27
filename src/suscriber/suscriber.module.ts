import { Module } from '@nestjs/common';
import { SuscriberService } from './suscriber.service';
import { SuscriberController } from './suscriber.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SuscriberService, PrismaService],
  controllers: [SuscriberController]
})
export class SuscriberModule {}
