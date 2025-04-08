import mongoose, { Document } from 'mongoose';
import { Tva } from '../../tva/entities/tva.entity';
import { ConsumptionMode } from 'src/utils/enumerations.enum';
export declare class Tarrification extends Document {
    designation: string;
    modeConsommation: ConsumptionMode;
    defaultTva: Tva;
}
export declare const TarrificationSchema: mongoose.Schema<Tarrification, mongoose.Model<Tarrification, any, any, any, mongoose.Document<unknown, any, Tarrification> & Tarrification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Tarrification, mongoose.Document<unknown, {}, mongoose.FlatRecord<Tarrification>> & mongoose.FlatRecord<Tarrification> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
