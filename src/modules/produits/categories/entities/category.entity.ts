import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CategorieType } from 'src/utils/enumerations.enum';
import { Tarrification } from 'src/settings/bases/tarrification/entities/tarrification.entity';
import {
  NestedCatalog,
  NestedCatalogSchema,
} from 'src/common/catalogue.embedabble';

@Schema({ timestamps: true, versionKey: false })
export class Category extends Document {
  @Prop({ type: String, required: true, unique: true })
  designation: string;

  @Prop({ type: NestedCatalogSchema, required: true })
  catalogue: NestedCatalog;

  // @Prop({
  //     type: Number,
  //     default: 0,
  //     required: true
  // })
  // nombreMax: number;

  // @Prop({
  //     type: Number,
  //     default: 0,
  //     required: true
  // })
  // nombreObligatoire: number;

  @Prop({ type: Boolean, default: false })
  stock: boolean;

  @Prop({ enum: CategorieType, required: true })
  typeFamille: CategorieType;

  @Prop({
    type: [Types.ObjectId],
    ref: Tarrification.name,
    required: true,
  })
  tarification: Types.ObjectId[];
}

export const categorySchema = SchemaFactory.createForClass(Category);
