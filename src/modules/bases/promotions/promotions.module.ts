import { Global, Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { Promotion, PromotionSchema } from './entities/promotion.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Promotion.name,
        schema: PromotionSchema,
      },
    ]),
  ],
  controllers: [PromotionsController],
  providers: [PromotionsService],
  exports: [PromotionsService, MongooseModule],
})
export class PromotionsModule {}
