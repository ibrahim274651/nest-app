import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NestedTarification } from 'src/common/tarification.embedabble';
import {
  NestedCatalogSchema,
  NestedCatalog,
} from 'src/common/catalogue.embedabble';
import { Niveaux, NiveauxSchema } from 'src/common/level.embedabble';
import { Category } from 'src/modules/categories/entities/category.entity';

@Schema({ timestamps: true, versionKey: false })
export class Menu extends Document {
  @Prop({ type: String, required: true, unique: true })
  reference: string;

  @Prop({ type: String, required: true })
  designation: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  categorie: Category;

  @Prop({ type: NestedCatalogSchema, required: true })
  catalogue: NestedCatalog;

  @Prop({ type: Boolean, required: false, default: false })
  articleGeneric: boolean;

  @Prop({
    type: [NiveauxSchema],
    required: true,
  })
  niveaux: Niveaux[];

  @Prop({ type: [NestedTarification], required: false, default: [] })
  tarification: NestedTarification[];

  @Prop({ required: false, type: Boolean, default: false })
  visibleCaisse: boolean;

  @Prop({ required: false, type: String, unique: true })
  codeBarre?: string;

  @Prop({ required: false, type: String, default: '' })
  description?: string;

  @Prop({ type: Boolean, required: false, default: false })
  happyHour: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
