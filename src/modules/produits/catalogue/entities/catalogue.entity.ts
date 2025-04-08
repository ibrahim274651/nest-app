import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Catalogue extends Document {
  @Prop({ type: String, required: true, unique: true })
  designation: string;

  @Prop({ type: [String], required: false, default: [] })
  images: string[];
}

export const CatalogueSchema = SchemaFactory.createForClass(Catalogue);
