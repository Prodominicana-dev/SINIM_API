import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { RamisModule } from './ramis/ramis.module';
import { ReservedDomainsModule } from './reserved-domains/reserved-domains.module';
import { DatamarketModule } from './datamarket/datamarket.module';
import { ToolsModule } from './tools/tools.module';
import { CountryModule } from './country/country.module';
import { ProductModule } from './product/product.module';
import { SaimController } from './saim/saim.controller';
import { SaimModule } from './saim/saim.module';
import { DataModule } from './data/data.module';
import { MailModule } from './mail/mail.module';
import { SuscriberModule } from './suscriber/suscriber.module';


@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [RamisModule, DatamarketModule, ReservedDomainsModule, ToolsModule, CountryModule, ProductModule, SaimModule, DataModule, MailModule, SuscriberModule],
})
export class AppModule {}
