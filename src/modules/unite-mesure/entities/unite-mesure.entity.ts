import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class UniteMesure extends Document {
  @Prop({ required: true, unique: true })
  designation: string;

  @Prop({ required: true, unique: true })
  symbole: string;
}

export const uniteMesureSchema = SchemaFactory.createForClass(UniteMesure);
