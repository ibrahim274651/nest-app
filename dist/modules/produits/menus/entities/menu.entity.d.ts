import mongoose, { Document } from 'mongoose';
import { Niveaux } from '../../../../common/level.embedabble';
import { Category } from '../../categories/entities/category.entity';
import { NestedTarification } from 'src/common/tarification.embedabble';
import { NestedCatalog } from 'src/common/catalogue.embedabble';
export declare class Menu extends Document {
    reference: string;
    designation: string;
    categorie: Category;
    catalogue: NestedCatalog;
    articleGeneric: boolean;
    niveaux: Niveaux[];
    tarification: NestedTarification[];
    visibleCaisse: boolean;
    codeBarre?: string;
    description?: string;
    happyHour: boolean;
}
export declare const MenuSchema: mongoose.Schema<Menu, mongoose.Model<Menu, any, any, any, mongoose.Document<unknown, any, Menu> & Menu & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Menu, mongoose.Document<unknown, {}, mongoose.FlatRecord<Menu>> & mongoose.FlatRecord<Menu> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
