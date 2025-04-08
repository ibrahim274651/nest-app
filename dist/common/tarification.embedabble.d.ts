import mongoose, { Document } from 'mongoose';
import { Tarrification } from 'src/modules/bases/tarrification/entities/tarrification.entity';
import { Tva } from 'src/modules/bases/tva/entities/tva.entity';
export declare class NestedTarification extends Document {
    tarificationId: Tarrification;
    caisse: boolean;
    tvaId: Tva;
    prixTTC: number;
    prixHT: number;
}
export declare const NestedTarificationSchema: mongoose.Schema<NestedTarification, mongoose.Model<NestedTarification, any, any, any, mongoose.Document<unknown, any, NestedTarification> & NestedTarification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NestedTarification, mongoose.Document<unknown, {}, mongoose.FlatRecord<NestedTarification>> & mongoose.FlatRecord<NestedTarification> & Required<{
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
