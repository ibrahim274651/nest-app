import { Global, Module } from '@nestjs/common';
import { TvaModule } from './tva/tva.module';
import { ConfigModule } from '@nestjs/config';
import { CatalogueModule } from './catalogue/catalogue.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot(), TvaModule, CatalogueModule],
  controllers: [],
})
export class DomainModule {}
