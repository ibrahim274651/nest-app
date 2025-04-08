import { Document } from 'mongoose';
export declare class Tva extends Document {
    designation: string;
    taux: number;
    compte_comptable_vente: string;
    compte_comptable_collecte: string;
}
export declare const TvaSchema: import("mongoose").Schema<Tva, import("mongoose").Model<Tva, any, any, any, Document<unknown, any, Tva> & Tva & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tva, Document<unknown, {}, import("mongoose").FlatRecord<Tva>> & import("mongoose").FlatRecord<Tva> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
