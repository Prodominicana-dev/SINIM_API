import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { RamisModule } from './ramis/ramis.module';
import { ReservedDomainsModule } from './reserved-domains/reserved-domains.module';
import { DatamarketModule } from './datamarket/datamarket.module';
import { CountryModule } from './country/country.module';
import { ProductModule } from './product/product.module';
import { SaimController } from './saim/saim.controller';
import { SaimModule } from './saim/saim.module';
import { DataModule } from './data/data.module';
import { MailModule } from './mail/mail.module';
import { SuscriberModule } from './suscriber/suscriber.module';
import { QueueModule } from './queue/queue.module';
import { SiedModule } from './sied/sied.module';
import { CategoryModule } from './category/category.module';
import { PartnerModule } from './partner/partner.module';
import { PostModule } from './post/post.module';
import { LogModule } from './log/log.module';


@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [RamisModule, DatamarketModule, ReservedDomainsModule, CountryModule, ProductModule, SaimModule, DataModule, MailModule, SuscriberModule, QueueModule, SiedModule, CategoryModule, PartnerModule, PostModule, LogModule],
})
export class AppModule {}
