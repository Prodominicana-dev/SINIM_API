import { Module } from '@nestjs/common';
import { SaimService } from './saim.service';
import { SaimController } from './saim.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailModule } from 'src/mail/mail.module';
import { SuscriberModule } from 'src/suscriber/suscriber.module';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  providers: [SaimService, PrismaService],
  controllers: [SaimController],
  exports: [SaimService],
  imports: [MailModule, SuscriberModule, QueueModule],
})
export class SaimModule {}
