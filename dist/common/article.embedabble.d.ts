import { Document, Types } from 'mongoose';
export declare class NestedArticle extends Document {
    articleId: Types.ObjectId;
    achat: boolean;
    offert: boolean;
}
export declare const NestedArticleSchema: import("mongoose").Schema<NestedArticle, import("mongoose").Model<NestedArticle, any, any, any, Document<unknown, any, NestedArticle> & NestedArticle & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NestedArticle, Document<unknown, {}, import("mongoose").FlatRecord<NestedArticle>> & import("mongoose").FlatRecord<NestedArticle> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class NestedArticleDto {
    articleId: string;
    achat: boolean;
    offert: boolean;
}
