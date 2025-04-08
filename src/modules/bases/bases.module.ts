import { Global, Module } from '@nestjs/common';
import { EnumTypeController } from 'src/utils/controller/utils.contoller';
import { PromotionsModule } from './promotions/promotions.module';
import { TvaModule } from './tva/tva.module';
import { TarrificationModule } from './tarrification/tarrification.module';

@Global()
@Module({
  imports: [TvaModule, TarrificationModule, PromotionsModule],
  controllers: [EnumTypeController],
  providers: [],
  exports: [],
})
export class BasesModule {}
