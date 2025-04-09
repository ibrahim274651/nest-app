import { Document, Types } from 'mongoose';
export declare class NestedCatalog extends Document {
    id: Types.ObjectId;
    image: string;
}
export declare const NestedCatalogSchema: import("mongoose").Schema<NestedCatalog, import("mongoose").Model<NestedCatalog, any, any, any, Document<unknown, any, NestedCatalog> & NestedCatalog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NestedCatalog, Document<unknown, {}, import("mongoose").FlatRecord<NestedCatalog>> & import("mongoose").FlatRecord<NestedCatalog> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class NestedCatalogDto {
    id: string;
    image: string;
}
