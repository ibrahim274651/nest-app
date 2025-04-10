import { Global, Module } from '@nestjs/common';
import { UniteMesureService } from './unite-mesure.service';
import { UniteMesureController } from './unite-mesure.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UniteMesure, uniteMesureSchema } from './entities/unite-mesure.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UniteMesure.name, schema: uniteMesureSchema },
    ]),
  ],
  controllers: [UniteMesureController],
  providers: [UniteMesureService],
  exports: [MongooseModule, UniteMesureService],
})
export class UniteMesureModule {}
