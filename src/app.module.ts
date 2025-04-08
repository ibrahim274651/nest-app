import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelineService } from './pipeline';
import { join } from 'path';
import { TestModule } from './grpc-test/test.module';
import { GrpcApiModule } from './grpc/grpc-api.module';
import { AppHelpersModule } from './helpers/app.helpers.module';
import { KeyCloakServerModule } from './helpers/keycloak-config/keycloak.server.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL || ''),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads') }),
    // EurekaServerModule,
    TestModule,
    GrpcApiModule,
    AppHelpersModule,
    KeyCloakServerModule,
    // SettingsModule,
  ],
  controllers: [],
  providers: [PipelineService],
  exports: [PipelineService],
})
export class AppModule {}
