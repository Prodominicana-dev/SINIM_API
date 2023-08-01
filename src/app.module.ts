import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { RamisModule } from './ramis/ramis.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [AuthModule, UsersModule, RamisModule],
})
export class AppModule {}
