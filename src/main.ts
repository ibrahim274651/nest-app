import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { join } from 'path';
import mongoose from 'mongoose';
import { GlobalExceptionFilter } from './helpers/filter/custom.exception';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MonitoringInterceptor } from './helpers/monitoring/monitoring.interceptor';
import { swaggerConfiguration, swaggerLogger } from './helpers/swagger/swagger';
import { GrpcExceptionFilter } from './grpc/exception/grpc-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = process.env.PORT || 3015;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const loggerInstance = new Logger('Bootstrap');
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
      // forbidNonWhitelisted: true,
      // forbidUnknownValues: true,
    }),
  );
  app.useGlobalInterceptors(new MonitoringInterceptor());
  app.useGlobalFilters(new GrpcExceptionFilter(), new GlobalExceptionFilter());
  app.setGlobalPrefix(process.env.URL_PREFIX || 'api');
  app.enableCors(corsOptions);
  app.use(json({ limit: '50mb' }));
  app.useStaticAssets(join(__dirname, '..', 'src', 'uploads'), {
    // prefix: '/uploads',
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'stock',
      protoPath: join(__dirname, 'grpc/proto/stock.proto'),
    },
  });
  app.startAllMicroservices();

  await app.listen(PORT, () => {
    console.log('Port is listining on :', PORT);
    swaggerLogger(loggerInstance);
  });
}

bootstrap();
