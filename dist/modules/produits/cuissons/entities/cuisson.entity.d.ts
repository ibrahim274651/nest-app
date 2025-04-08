import { Document } from 'mongoose';
import { NestedCatalog } from 'src/common/catalogue.embedabble';
export declare class Cuisson extends Document {
    catalogue: NestedCatalog;
    designation: string;
}
export declare const CuissonSchema: import("mongoose").Schema<Cuisson, import("mongoose").Model<Cuisson, any, any, any, Document<unknown, any, Cuisson> & Cuisson & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cuisson, Document<unknown, {}, import("mongoose").FlatRecord<Cuisson>> & import("mongoose").FlatRecord<Cuisson> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
