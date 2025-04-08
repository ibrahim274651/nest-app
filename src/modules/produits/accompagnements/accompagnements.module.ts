import { Global, Module } from '@nestjs/common';
import { AccompagnementsService } from './accompagnements.service';
import { AccompagnementsController } from './accompagnements.controller';
import {
  Accompagnement,
  AccompagnementSchema,
} from './entities/accompagnement.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Accompagnement.name,
        schema: AccompagnementSchema,
      },
    ]),
  ],
  controllers: [AccompagnementsController],
  providers: [AccompagnementsService],
  exports: [MongooseModule, AccompagnementsService],
})
export class AccompagnementsModule {}
