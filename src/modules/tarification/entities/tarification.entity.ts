import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Tva } from '../../tva/entities/tva.entity';
import { ConsumptionMode } from 'src/utils/enumerations.enum';

@Schema({ timestamps: true, versionKey: false })
export class Tarrification extends Document {
  @Prop({ type: String, required: true, unique: true })
  designation: string;

  @Prop({ type: String, required: true, enum: ConsumptionMode })
  modeConsommation: ConsumptionMode;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Tva.name })
  defaultTva: Tva;
}

export const TarificationSchema = SchemaFactory.createForClass(Tarrification);

TarificationSchema.pre(['find', 'findOne'], async function (next) {
  this.populate({ path: 'defaultTva', select: '-createdAt -updatedAt' });
  next();
});
