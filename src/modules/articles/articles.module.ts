import { Global, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, articleSchema } from './entities/article.entity';

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
  providers: [ArticlesService],
  exports: [MongooseModule, ArticlesService],
})
export class ArticleModule {}
