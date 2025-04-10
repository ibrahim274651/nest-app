import { Global, Module } from '@nestjs/common';
import { TarificationService } from './tarification.service';
import { TarificationController } from './tarification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TarificationSchema,
  Tarrification,
} from './entities/tarification.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tarrification.name, schema: TarificationSchema },
    ]),
  ],
  controllers: [TarificationController],
  providers: [TarificationService],
  exports: [MongooseModule, TarificationService],
})
export class TarificationModule {}
