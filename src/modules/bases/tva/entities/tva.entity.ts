import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Tva extends Document {
  @Prop({ required: true, type: String, unique: true })
  designation: string;

  @Prop({ required: true, type: Number })
  taux: number;

  @Prop({ required: true, type: String })
  compte_comptable_vente: string;

  @Prop({ required: true, type: String })
  compte_comptable_collecte: string;
}

export const TvaSchema = SchemaFactory.createForClass(Tva);
