import mongoose, { Document } from 'mongoose';
import { NestedTarification } from 'src/common/tarification.embedabble';
import { NestedFabrication } from 'src/common/fabrication.embedabble';
import { Category } from '../../categories/entities/category.entity';
import { NestedCatalog } from 'src/common/catalogue.embedabble';
export declare class Accompagnement extends Document {
    reference: string;
    designation: string;
    tarification: NestedTarification[];
    categorie: Category;
    catalogue: NestedCatalog;
    gererStockProduit: boolean;
    stockMini: number;
    fabrication: NestedFabrication[];
    visibleCaisse: boolean;
    accompGeneric: boolean;
    description?: string;
}
export declare const AccompagnementSchema: mongoose.Schema<Accompagnement, mongoose.Model<Accompagnement, any, any, any, mongoose.Document<unknown, any, Accompagnement> & Accompagnement & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Accompagnement, mongoose.Document<unknown, {}, mongoose.FlatRecord<Accompagnement>> & mongoose.FlatRecord<Accompagnement> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
