import { Global, Module } from '@nestjs/common';
import { CuissonsService } from './cuissons.service';
import { CuissonsController } from './cuissons.controller';
import { Cuisson, CuissonSchema } from './entities/cuisson.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cuisson.name,
        schema: CuissonSchema,
      },
    ]),
  ],
  controllers: [CuissonsController],
  providers: [CuissonsService],
  exports: [MongooseModule, CuissonsService],
})
export class CuissonModule {}
