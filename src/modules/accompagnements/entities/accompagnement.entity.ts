import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NestedTarification } from 'src/common/tarification.embedabble';
import { NestedFabrication } from 'src/common/fabrication.embedabble';
import { Category } from '../../categories/entities/category.entity';
import {
  NestedCatalogSchema,
  NestedCatalog,
} from 'src/common/catalogue.embedabble';

@Schema({ timestamps: true, versionKey: false })
export class Accompagnement extends Document {
  @Prop({ type: String, required: true, unique: true })
  reference: string;

  // @Prop({ required: false, type: String, unique: true })
  // codeBarre?: string;

  @Prop({ required: true, type: String, unique: true })
  designation: string;

  @Prop({ type: [NestedTarification], required: true })
  tarification: NestedTarification[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  categorie: Category;

  @Prop({ type: NestedCatalogSchema, required: true })
  catalogue: NestedCatalog;

  @Prop({ required: false, type: Boolean, default: false })
  gererStockProduit: boolean;

  @Prop({ required: false, type: Number, default: 0 })
  stockMini: number;

  // @Prop({ required: false, type: Number, default: 0 })
  // stockReapr: number;

  @Prop({ type: [NestedFabrication], required: false, default: [] })
  fabrication: NestedFabrication[];

  @Prop({ required: false, type: Boolean, default: false })
  visibleCaisse: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  accompGeneric: boolean;

  @Prop({ required: false, type: String })
  description?: string;
}

export const Accompagnementchema = SchemaFactory.createForClass(Accompagnement);
