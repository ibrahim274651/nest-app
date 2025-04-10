import { Global, Module } from '@nestjs/common';
import { TvaModule } from './tva/tva.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot(), TvaModule],
  controllers: [],
})
export class DomainModule {}
