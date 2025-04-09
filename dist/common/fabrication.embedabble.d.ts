import { Document, Types } from 'mongoose';
export declare class NestedFabrication extends Document {
    fabricationId: Types.ObjectId;
    quantite: number;
    part: number;
    stockProduitArticle: boolean;
}
export declare const NestedFabricationSchema: import("mongoose").Schema<NestedFabrication, import("mongoose").Model<NestedFabrication, any, any, any, Document<unknown, any, NestedFabrication> & NestedFabrication & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NestedFabrication, Document<unknown, {}, import("mongoose").FlatRecord<NestedFabrication>> & import("mongoose").FlatRecord<NestedFabrication> & Required<{
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
