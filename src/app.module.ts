import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppHelpersModule } from './helpers/app.helpers.module';
import { DomainModule } from './modules/domain.module';
import { EurekaServerModule } from './eureka-server/eureka-server.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL || ''),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads') }),
    EurekaServerModule,
    // GrpcApiModule,
    AppHelpersModule,
    DomainModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
