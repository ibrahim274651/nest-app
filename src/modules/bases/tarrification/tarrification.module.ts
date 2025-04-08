import { Global, Module } from '@nestjs/common';
import { TarrificationService } from './tarrification.service';
import { TarrificationController } from './tarrification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Tarrification,
  TarrificationSchema,
} from './entities/tarrification.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tarrification.name, schema: TarrificationSchema },
    ]),
  ],
  controllers: [TarrificationController],
  providers: [TarrificationService],
  exports: [MongooseModule, TarrificationService],
})
export class TarrificationModule {}
