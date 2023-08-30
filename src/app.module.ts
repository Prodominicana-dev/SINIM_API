import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { RamisModule } from './ramis/ramis.module';
import { ReservedDomainsModule } from './reserved-domains/reserved-domains.module';
import { DatamarketModule } from './datamarket/datamarket.module';
import { ToolsModule } from './tools/tools.module';
import { SectorModule } from './sector/sector.module';
import { CountryModule } from './country/country.module';


@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [RamisModule, DatamarketModule, ReservedDomainsModule, ToolsModule, SectorModule, CountryModule],
})
export class AppModule {}
