import { Global, Module } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { CatalogueController } from './catalogue.controller';
import { Catalogue, CatalogueSchema } from './entities/catalogue.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Catalogue.name,
        schema: CatalogueSchema,
      },
    ]),
  ],
  controllers: [CatalogueController],
  providers: [CatalogueService],
  exports: [MongooseModule, CatalogueService],
})
export class CatalogueModule {}
