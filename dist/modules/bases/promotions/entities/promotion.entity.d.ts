import { Document } from 'mongoose';
import { NestedArticle } from '../../../../common/article.embedabble';
export declare class Promotion extends Document {
    designation: string;
    quantite: number;
    bonus: number;
    dateDebut: Date;
    dateFin: Date;
    periodeIllimite: boolean;
    articles: NestedArticle[];
}
export declare const PromotionSchema: import("mongoose").Schema<Promotion, import("mongoose").Model<Promotion, any, any, any, Document<unknown, any, Promotion> & Promotion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Promotion, Document<unknown, {}, import("mongoose").FlatRecord<Promotion>> & import("mongoose").FlatRecord<Promotion> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
