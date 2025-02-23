import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { swaggerConfig } from './configs/swagger';
import { GlobalExceptionFilter } from './configs/globalException.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  swaggerConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
