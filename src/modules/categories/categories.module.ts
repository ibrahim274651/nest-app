import { Global, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from './entities/category.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: categorySchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [MongooseModule, CategoriesService],
})
export class CategorieModule {}
