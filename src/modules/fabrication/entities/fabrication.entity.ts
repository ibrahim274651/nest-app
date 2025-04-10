import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FabricationType } from 'src/utils/enumerations.enum';

@Schema({ timestamps: true, versionKey: false })
export class Fabrication extends Document {
  @Prop({ type: String, required: true, unique: true })
  reference: string;

  @Prop({ required: true, type: String, unique: true })
  designation: string;

  @Prop({ required: true, type: String, enum: FabricationType })
  type: FabricationType;

  @Prop({ required: true, type: Boolean })
  stock: boolean;

  @Prop({ required: true, type: Number })
  stockMin: number;
}

export const FabricationSchema = SchemaFactory.createForClass(Fabrication);
