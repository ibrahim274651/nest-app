import { Global, Module } from '@nestjs/common';
import { FabricationService } from './fabrication.service';
import { FabricationController } from './fabrication.controller';
import { Fabrication, FabricationSchema } from './entities/fabrication.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Fabrication.name,
        schema: FabricationSchema,
      },
    ]),
  ],
  controllers: [FabricationController],
  providers: [FabricationService],
  exports: [MongooseModule, FabricationService],
})
export class FabricationModule {}
