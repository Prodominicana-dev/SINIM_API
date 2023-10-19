import { Module } from '@nestjs/common';
import { SiedService } from './sied.service';
import { SiedController } from './sied.controller';
import { MailModule } from 'src/mail/mail.module';
import { SuscriberModule } from 'src/suscriber/suscriber.module';
import { QueueModule } from 'src/queue/queue.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SiedService, PrismaService],
  controllers: [SiedController],
  imports: [MailModule, SuscriberModule, QueueModule],
})
export class SiedModule {}
