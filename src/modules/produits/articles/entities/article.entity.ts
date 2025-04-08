import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { NestedTarification } from '../../../../common/tarification.embedabble';
import {
  NestedFabrication,
  NestedFabricationSchema,
} from '../../../../common/fabrication.embedabble';
import { Category } from '../../categories/entities/category.entity';
import {
  NestedCatalog,
  NestedCatalogSchema,
} from 'src/common/catalogue.embedabble';
import { UniteMesure } from '../../unite-mesure/entities/unite-mesure.entity';

@Schema({ _id: false })
export class NestedUnite {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UniteMesure.name,
    required: false,
  })
  unite?: UniteMesure;

  @Prop({ type: Number, required: false })
  cond?: number;

  @Prop({ type: Number, required: false })
  prixCond?: number;
}

export const NestedUniteSchema = SchemaFactory.createForClass(NestedUnite);
@Schema({ timestamps: true, versionKey: false })
export class Article extends Document {
  @Prop({ type: String, required: true, unique: true })
  reference: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  categorie: Category;

  @Prop({ required: true, type: String, unique: true })
  designation: string;

  @Prop({ required: false, type: Number, default: 0 })
  seuilMinimum: number;

  @Prop({ required: false, type: String })
  codeBarre?: string;

  @Prop({ type: NestedCatalogSchema, required: true })
  catalogue: NestedCatalog;

  @Prop({
    type: [Types.ObjectId],
    ref: Category.name,
    required: false,
  })
  accompagnement: Types.ObjectId[];

  @Prop({ type: [NestedTarification], required: true })
  tarification: NestedTarification[];

  @Prop({ type: Boolean, required: false, default: false })
  cuisson: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  gererStockProduit: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  visibleCaisse: boolean;

  @Prop({ type: [NestedFabricationSchema], required: false })
  fabrication: NestedFabrication[];

  @Prop({ type: Boolean, required: false, default: false })
  articleGeneric: boolean;

  @Prop({ type: NestedUniteSchema })
  uniteDetails?: NestedUnite;
}
const articleSchema = SchemaFactory.createForClass(Article);

// articleSchema.index({ codeBarre: 1 }, { unique: true, sparse: true });

export { articleSchema };
