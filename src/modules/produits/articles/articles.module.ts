import { Global, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, articleSchema } from './entities/article.entity';
import { ItemForSaleService } from './services/other-sale.service';
import { ItemForTestService } from './services/other-test.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: articleSchema,
      },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ItemForSaleService, ItemForTestService],
  exports: [MongooseModule, ArticlesService, ItemForSaleService],
})
export class ArticlesModule {}
