import mongoose, { Document } from 'mongoose';
import { Fabrication } from '@/modules/produits/fabrication/entities/fabrication.entity';
export declare class NestedFabrication extends Document {
    fabricationId: Fabrication;
    quantite: number;
    part: number;
    stockProduitArticle: boolean;
}
export declare const NestedFabricationSchema: mongoose.Schema<NestedFabrication, mongoose.Model<NestedFabrication, any, any, any, mongoose.Document<unknown, any, NestedFabrication> & NestedFabrication & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NestedFabrication, mongoose.Document<unknown, {}, mongoose.FlatRecord<NestedFabrication>> & mongoose.FlatRecord<NestedFabrication> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class FabricationNestedDto {
    fabricationId: string;
    quantite: number;
    part: number;
    stockProduitArticle: boolean;
}
