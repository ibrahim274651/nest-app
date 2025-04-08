import { Global, Module } from '@nestjs/common';
import { TvaService } from './tva.service';
import { TvaController } from './tva.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tva, TvaSchema } from './entities/tva.entity';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Tva.name, schema: TvaSchema }])],
  controllers: [TvaController],
  providers: [TvaService],
  exports: [TvaService, MongooseModule],
})
export class TvaModule {}
