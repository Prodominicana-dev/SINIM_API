import { Module } from '@nestjs/common';
import { SuscriberService } from './suscriber.service';
import { SuscriberController } from './suscriber.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  providers: [SuscriberService, PrismaService],
  controllers: [SuscriberController],
  exports: [SuscriberService],
  imports: [MailModule],
})
export class SuscriberModule {}
