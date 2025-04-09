import { Document, Types } from 'mongoose';
export declare class NestedTarification extends Document {
    tarificationId: Types.ObjectId;
    caisse: boolean;
    tvaId: Types.ObjectId;
    prixTTC: number;
    prixHT: number;
}
export declare const NestedTarificationSchema: import("mongoose").Schema<NestedTarification, import("mongoose").Model<NestedTarification, any, any, any, Document<unknown, any, NestedTarification> & NestedTarification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NestedTarification, Document<unknown, {}, import("mongoose").FlatRecord<NestedTarification>> & import("mongoose").FlatRecord<NestedTarification> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class NestedTarificationDto {
    tarificationId: string;
    caisse: boolean;
    tvaId: string;
    prixTTC?: number;
    prixHT?: number;
}
