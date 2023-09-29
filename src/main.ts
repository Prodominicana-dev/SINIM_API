import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: {
    origin: "https://sinim.prodominicana.god.do",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  } });
  await app.listen(process.env.PORT || 3001, '0.0.0.0');
}
bootstrap();
