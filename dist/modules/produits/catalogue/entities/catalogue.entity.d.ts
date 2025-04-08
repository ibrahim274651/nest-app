import { Document } from 'mongoose';
export declare class Catalogue extends Document {
    designation: string;
    images: string[];
}
export declare const CatalogueSchema: import("mongoose").Schema<Catalogue, import("mongoose").Model<Catalogue, any, any, any, Document<unknown, any, Catalogue> & Catalogue & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Catalogue, Document<unknown, {}, import("mongoose").FlatRecord<Catalogue>> & import("mongoose").FlatRecord<Catalogue> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
