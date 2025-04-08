import { Global, Module } from '@nestjs/common';
import { AccompagnementsModule } from './accompagnements/accompagnements.module';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { CuissonsModule } from './cuissons/cuissons.module';
import { FabricationModule } from './fabrication/fabrication.module';
import { MenusModule } from './menus/menus.module';
import { CatalogueModule } from './catalogue/catalogue.module';
import { EnumTypeController } from 'src/utils/controller/utils.contoller';
import { MenuStageModule } from './menu-stage/menu-stage.module';
import { UniteMesureModule } from './unite-mesure/unite-mesure.module';

@Global()
@Module({
  imports: [
    CatalogueModule,
    CategoriesModule,
    UniteMesureModule,
    ArticlesModule,
    MenuStageModule,
    MenusModule,
    AccompagnementsModule,
    CuissonsModule,
    FabricationModule,
  ],
  controllers: [EnumTypeController],
  providers: [],
  exports: [],
})
export class ProductsModule {}
