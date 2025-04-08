import mongoose, { Document, Types } from 'mongoose';
import { NestedTarification } from '../../../../common/tarification.embedabble';
import { NestedFabrication } from '../../../../common/fabrication.embedabble';
import { Category } from '../../categories/entities/category.entity';
import { NestedCatalog } from 'src/common/catalogue.embedabble';
import { UniteMesure } from '../../unite-mesure/entities/unite-mesure.entity';
export declare class NestedUnite {
    unite?: UniteMesure;
    cond?: number;
    prixCond?: number;
}
export declare const NestedUniteSchema: mongoose.Schema<NestedUnite, mongoose.Model<NestedUnite, any, any, any, mongoose.Document<unknown, any, NestedUnite> & NestedUnite & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NestedUnite, mongoose.Document<unknown, {}, mongoose.FlatRecord<NestedUnite>> & mongoose.FlatRecord<NestedUnite> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Article extends Document {
    reference: string;
    categorie: Category;
    designation: string;
    seuilMinimum: number;
    codeBarre?: string;
    catalogue: NestedCatalog;
    accompagnement: Types.ObjectId[];
    tarification: NestedTarification[];
    cuisson: boolean;
    gererStockProduit: boolean;
    visibleCaisse: boolean;
    fabrication: NestedFabrication[];
    articleGeneric: boolean;
    uniteDetails?: NestedUnite;
}
declare const articleSchema: mongoose.Schema<Article, mongoose.Model<Article, any, any, any, mongoose.Document<unknown, any, Article> & Article & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Article, mongoose.Document<unknown, {}, mongoose.FlatRecord<Article>> & mongoose.FlatRecord<Article> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export { articleSchema };
