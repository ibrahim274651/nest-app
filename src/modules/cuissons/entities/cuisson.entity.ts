import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  NestedCatalog,
  NestedCatalogSchema,
} from 'src/common/catalogue.embedabble';

@Schema({ timestamps: true, versionKey: false })
export class Cuisson extends Document {
  @Prop({ type: NestedCatalogSchema, required: true })
  catalogue: NestedCatalog;

  @Prop({ type: String, required: true, unique: true })
  designation: string;
}

export const CuissonSchema = SchemaFactory.createForClass(Cuisson);
