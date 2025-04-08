import mongoose, { Document } from 'mongoose';
import { Article } from '@/modules/produits/articles/entities/article.entity';
import { MenuStage } from '@/modules/produits/menu-stage/entities/menu-stage.entity';
export declare class Niveaux extends Document {
    niveauId: MenuStage;
    articleIds: Article[];
}
export declare const NiveauxSchema: mongoose.Schema<Niveaux, mongoose.Model<Niveaux, any, any, any, mongoose.Document<unknown, any, Niveaux> & Niveaux & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Niveaux, mongoose.Document<unknown, {}, mongoose.FlatRecord<Niveaux>> & mongoose.FlatRecord<Niveaux> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class NiveauxDto {
    niveauId?: string;
    articleIds?: string[];
}
