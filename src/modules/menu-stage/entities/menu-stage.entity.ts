import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class MenuStage extends Document {
  @Prop({ type: String, required: true, unique: true })
  designation: string;
}

export const MenuStageSchema = SchemaFactory.createForClass(MenuStage);
