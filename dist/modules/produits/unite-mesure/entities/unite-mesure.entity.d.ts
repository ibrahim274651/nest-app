import { Document } from 'mongoose';
export declare class UniteMesure extends Document {
    designation: string;
    symbole: string;
}
export declare const uniteMesureSchema: import("mongoose").Schema<UniteMesure, import("mongoose").Model<UniteMesure, any, any, any, Document<unknown, any, UniteMesure> & UniteMesure & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UniteMesure, Document<unknown, {}, import("mongoose").FlatRecord<UniteMesure>> & import("mongoose").FlatRecord<UniteMesure> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
