import { Module } from '@nestjs/common';
import { SaimService } from './saim.service';
import { SaimController } from './saim.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  providers: [SaimService, PrismaService],
  controllers: [SaimController],
  exports: [SaimService],
  imports: [MailModule],
})
export class SaimModule {}
