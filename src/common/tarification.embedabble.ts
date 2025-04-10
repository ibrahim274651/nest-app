import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class NestedTarification extends Document {
  @Prop({ type: Types.ObjectId, required: false })
  tarificationId: Types.ObjectId;

  @Prop({ required: false, type: Boolean, default: false })
  caisse: boolean;

  @Prop({ type: Types.ObjectId, required: false })
  tvaId: Types.ObjectId;

  @Prop({ required: false, type: Number, default: 0 })
  prixTTC: number;

  @Prop({ required: false, type: Number, default: 0 })
  prixHT: number;
}

export const NestedTarificationSchema =
  SchemaFactory.createForClass(NestedTarification);

// DTO
export class NestedTarificationDto {
  @ApiProperty({
    example: '674a2cfa56ec9a24f3c4d901',
    description: 'Tarification ID',
    required: false,
    type: 'string',
  })
  @IsMongoId()
  tarificationId: string;

  @ApiProperty({
    example: false,
    description: 'Caisse',
    required: false,
    type: 'boolean',
  })
  caisse: boolean;

  @ApiProperty({
    example: '67740803a5a1dfc22a47c6e2',
    type: 'string',
    description: 'Tva',
    required: false,
  })
  @IsMongoId()
  tvaId: string;

  @ApiPropertyOptional({
    example: 12.99,
    description: 'Selling price including taxes (TTC). Optional field.',
    type: 'number',
  })
  @IsOptional()
  @IsNumber({}, { message: 'The prixTTC must be a valid number if provided' })
  @Type(() => Number)
  prixTTC?: number;

  @ApiPropertyOptional({
    example: 12.99,
    description: 'Buying price including taxes (HT). Optional field.',
    type: 'number',
  })
  @IsOptional()
  @IsNumber({}, { message: 'The prixHT must be a valid number if provided' })
  @Type(() => Number)
  prixHT?: number;
}
