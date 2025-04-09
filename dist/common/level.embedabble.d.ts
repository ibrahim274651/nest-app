import { Document, Types } from 'mongoose';
export declare class Niveaux extends Document {
    niveauId: Types.ObjectId;
    articleIds: Types.ObjectId[];
}
export declare const NiveauxSchema: import("mongoose").Schema<Niveaux, import("mongoose").Model<Niveaux, any, any, any, Document<unknown, any, Niveaux> & Niveaux & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Niveaux, Document<unknown, {}, import("mongoose").FlatRecord<Niveaux>> & import("mongoose").FlatRecord<Niveaux> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class NiveauxDto {
    niveauId?: string;
    articleIds?: string[];
}
