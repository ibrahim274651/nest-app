import { Global, Module } from '@nestjs/common';
import {
  Accompagnement,
  Accompagnementchema,
} from './entities/accompagnement.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AccompagnementController } from './accompagnements.controller';
import { Accompagnementervice } from './accompagnements.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Accompagnement.name,
        schema: Accompagnementchema,
      },
    ]),
  ],
  controllers: [AccompagnementController],
  providers: [Accompagnementervice],
  exports: [MongooseModule, Accompagnementervice],
})
export class AccompagnementModule {}
