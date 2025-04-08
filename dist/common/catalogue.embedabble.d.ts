import mongoose, { Document } from 'mongoose';
import { Catalogue } from 'src/modules/produits/catalogue/entities/catalogue.entity';
export declare class NestedCatalog extends Document {
    id: Catalogue;
    image: string;
}
export declare const NestedCatalogSchema: mongoose.Schema<NestedCatalog, mongoose.Model<NestedCatalog, any, any, any, mongoose.Document<unknown, any, NestedCatalog> & NestedCatalog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NestedCatalog, mongoose.Document<unknown, {}, mongoose.FlatRecord<NestedCatalog>> & mongoose.FlatRecord<NestedCatalog> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class NestedCatalogDto {
    id: string;
    image: string;
}
