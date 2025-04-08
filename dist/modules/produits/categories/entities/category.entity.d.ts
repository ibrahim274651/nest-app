import { Document, Types } from 'mongoose';
import { CategorieType } from 'src/utils/enumerations.enum';
import { NestedCatalog } from 'src/common/catalogue.embedabble';
export declare class Category extends Document {
    designation: string;
    catalogue: NestedCatalog;
    stock: boolean;
    typeFamille: CategorieType;
    tarification: Types.ObjectId[];
}
export declare const categorySchema: import("mongoose").Schema<Category, import("mongoose").Model<Category, any, any, any, Document<unknown, any, Category> & Category & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Category, Document<unknown, {}, import("mongoose").FlatRecord<Category>> & import("mongoose").FlatRecord<Category> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
