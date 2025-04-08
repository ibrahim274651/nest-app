import { Document } from 'mongoose';
export declare class MenuStage extends Document {
    designation: string;
}
export declare const MenuStageSchema: import("mongoose").Schema<MenuStage, import("mongoose").Model<MenuStage, any, any, any, Document<unknown, any, MenuStage> & MenuStage & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MenuStage, Document<unknown, {}, import("mongoose").FlatRecord<MenuStage>> & import("mongoose").FlatRecord<MenuStage> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
