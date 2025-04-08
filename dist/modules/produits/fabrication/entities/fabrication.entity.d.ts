import { Document } from 'mongoose';
import { FabricationType } from 'src/utils/enumerations.enum';
export declare class Fabrication extends Document {
    reference: string;
    designation: string;
    type: FabricationType;
    stock: boolean;
    stockMin: number;
}
export declare const FabricationSchema: import("mongoose").Schema<Fabrication, import("mongoose").Model<Fabrication, any, any, any, Document<unknown, any, Fabrication> & Fabrication & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Fabrication, Document<unknown, {}, import("mongoose").FlatRecord<Fabrication>> & import("mongoose").FlatRecord<Fabrication> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
