import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL || ''),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads') }),
    // EurekaServerModule,
    // TestModule,
    // GrpcApiModule,
    // AppHelpersModule,
    // KeyCloakServerModule,
  ],
  controllers: [],
  // providers: [PipelineService],
  // exports: [PipelineService],
})
export class AppModule {}
