import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { RamisModule } from './ramis/ramis.module';
import { ReservedDomainsModule } from './reserved-domains/reserved-domains.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [RamisModule, ReservedDomainsModule],
})
export class AppModule {}
