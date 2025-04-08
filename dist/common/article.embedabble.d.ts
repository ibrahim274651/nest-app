import mongoose, { Document } from 'mongoose';
import { Article } from 'src/modules/produits/articles/entities/article.entity';
export declare class NestedArticle extends Document {
    articleId: Article;
    achat: boolean;
    offert: boolean;
}
export declare const NestedArticleSchema: mongoose.Schema<NestedArticle, mongoose.Model<NestedArticle, any, any, any, mongoose.Document<unknown, any, NestedArticle> & NestedArticle & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NestedArticle, mongoose.Document<unknown, {}, mongoose.FlatRecord<NestedArticle>> & mongoose.FlatRecord<NestedArticle> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class NestedArticleDto {
    articleId: string;
    achat: boolean;
    offert: boolean;
}
