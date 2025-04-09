import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { join } from 'path';
import mongoose from 'mongoose';
import { GlobalExceptionFilter } from './helpers/filter/custom.exception';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import { MonitoringInterceptor } from './helpers/monitoring/monitoring.interceptor';
import { swaggerConfiguration } from './helpers/swagger/swagger';

async function bootstrap() {
  const PORT = process.env.PORT ?? 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: '*',
    credentials: true,
  };

  // swagger openAi setup
  swaggerConfiguration(app);

  mongoose.set('strictPopulate', false);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  app.useGlobalInterceptors(new MonitoringInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix(process.env.URL_PREFIX || 'api');
  app.enableCors(corsOptions);
  app.use(json({ limit: '50mb' }));
  app.useStaticAssets(join(__dirname, '..', 'src', 'uploads'), {
    // prefix: '/uploads',
  });

  await app.listen(PORT, () => {
    console.log('Port is listining on :', PORT);
  });
}

void bootstrap();
