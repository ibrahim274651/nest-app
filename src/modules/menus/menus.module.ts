import { Global, Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { Menu, MenuSchema } from './entities/menu.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Menu.name,
        schema: MenuSchema,
      },
    ]),
  ],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService, MongooseModule],
})
export class MenuModule {}
