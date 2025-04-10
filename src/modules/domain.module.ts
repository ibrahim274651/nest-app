import { Global, Module } from '@nestjs/common';
import { TvaModule } from './tva/tva.module';
import { ConfigModule } from '@nestjs/config';
import { CatalogueModule } from './catalogue/catalogue.module';
import { TarificationModule } from './tarification/tarification.module';
import { VerificationService } from './verification.service';
import { PromotionModule } from './promotions/promotions.module';
import { ArticleModule } from './articles/articles.module';
import { CategorieModule } from './categories/categories.module';
import { CuissonModule } from './cuissons/cuissons.module';
import { FabricationModule } from './fabrication/fabrication.module';
import { MenuStageModule } from './menu-stage/menu-stage.module';
import { MenuModule } from './menus/menus.module';
import { UniteMesureModule } from './unite-mesure/unite-mesure.module';
import { AccompagnementModule } from './accompagnements/accompagnements.module';
import { PipelineService } from 'src/pipeline';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TvaModule,
    TarificationModule,
    PromotionModule,
    CatalogueModule,
    CategorieModule,
    UniteMesureModule,
    ArticleModule,
    MenuStageModule,
    MenuModule,
    AccompagnementModule,
    CuissonModule,
    FabricationModule,
  ],
  controllers: [],
  providers: [VerificationService, PipelineService],
  exports: [VerificationService, PipelineService],
})
export class DomainModule {}
