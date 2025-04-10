import { Global, Module } from '@nestjs/common';
import { MenuStageService } from './menu-stage.service';
import { MenuStageController } from './menu-stage.controller';
import { MenuStage, MenuStageSchema } from './entities/menu-stage.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuStage.name, schema: MenuStageSchema },
    ]),
  ],
  controllers: [MenuStageController],
  providers: [MenuStageService],
  exports: [MongooseModule, MenuStageService],
})
export class MenuStageModule {}
